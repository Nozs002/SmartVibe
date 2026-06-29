package com.smartvibe.modules.dashboard.service;

import com.smartvibe.modules.dashboard.dto.AdminDashboard;
import com.smartvibe.modules.dashboard.dto.ManagerDashboard;
import com.smartvibe.modules.dashboard.dto.StaffDashboard;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.stock_transfer.repository.StockTransferRepository;
import com.smartvibe.modules.user.entity.User;
import com.smartvibe.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final StockTransferRepository stockTransferRepository;
    private final InventoryRepository inventoryRepository;


    @Transactional(readOnly = true)
    public AdminDashboard getAdminDashboardStats() {
        var recentUsers = userRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(user -> AdminDashboard.RecentUserDTO.builder()
                        .username(user.getUsername())
                        .fullname(user.getFullname() != null ? user.getFullname() : "Chưa cập nhật")
                        .status(user.getAccountStatus())
                        .createdAt(user.getCreatedAt())
                        .build())
                .collect(Collectors.toList());


        long activeCount = userRepository.countByAccountStatus("active");
        long inactiveCount = userRepository.countByAccountStatus("inactive");
        long bannedCount = userRepository.countByAccountStatus("banned");
        long totalCount = userRepository.count();

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<User> newUsersLast7Days = userRepository.findByCreatedAtAfter(sevenDaysAgo);

        Map<LocalDate, Long> userCountByDate = newUsersLast7Days.stream()
                .collect(Collectors.groupingBy(
                        user -> user.getCreatedAt().toLocalDate(),
                        Collectors.counting()
                ));

        List<AdminDashboard.ChartDataDTO> chartData = new ArrayList<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM");

        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            long count = userCountByDate.getOrDefault(date, 0L);
            chartData.add(AdminDashboard.ChartDataDTO.builder()
                    .date(date.format(dateFormatter))
                    .count(count)
                    .build());
        }

        return AdminDashboard.builder()
                .activeUsers(activeCount)
                .inactiveUsers(inactiveCount)
                .bannedUsers(bannedCount)
                .totalUsers(totalCount)
                .recentUsers(recentUsers)
                .userGrowthChart(chartData)
                .build();
    }

    @Transactional(readOnly = true)
    public StaffDashboard getStaffDashboardStats(Long branchId) {
        return StaffDashboard.builder()
                .pendingTransfers(stockTransferRepository.countByStatusAndBranch("pending", branchId))
                .shippingTransfers(stockTransferRepository.countByStatusAndBranch("shipping", branchId))
                .completedTransfers(stockTransferRepository.countByStatusAndBranch("completed", branchId))
                .build();
    }

    @Transactional(readOnly = true)
    public ManagerDashboard getManagerDashboardStats(Long branchId) {
        

        long lowStockCount = inventoryRepository.countByBranchIdAndQuantityAvailableLessThanEqual(branchId, 5L);

        List<ManagerDashboard.PendingApprovalDTO> pendingList = new ArrayList<>();
        pendingList.add(ManagerDashboard.PendingApprovalDTO.builder()
                .documentId(101L)
                .staffId(5L)
                .note("Xin xuất 10 iPhone 15 cho khách VIP")
                .type("Xuất kho")
                .build());

        //MOCK DỮ LIỆU
        double mockRevenue = 15500000.0; 
        int mockActiveStaff = 4;
        int mockTotalStaff = 6;

        return ManagerDashboard.builder()
                .branchName("Chi nhánh " + branchId)
                .totalRevenue(mockRevenue)
                .activeStaff(mockActiveStaff)
                .totalStaff(mockTotalStaff)
                .lowStockAlerts(lowStockCount)
                .pendingApprovals(pendingList)
                .build();
    }
}