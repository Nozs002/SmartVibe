package com.smartvibe.modules.dashboard.dto;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class AdminDashboard {
    private long activeUsers;
    private long inactiveUsers;
    private long bannedUsers;
    private long totalUsers;
    private List<RecentUserDTO> recentUsers;

    @Data
    @Builder
    public static class RecentUserDTO {
        private String username;
        private String fullname;
        private String status;
        private LocalDateTime createdAt;
    }

    @Data
    @Builder
    public static class ChartDataDTO {
        private String date; 
        private long count;  
    }

    private List<ChartDataDTO> userGrowthChart;
}
