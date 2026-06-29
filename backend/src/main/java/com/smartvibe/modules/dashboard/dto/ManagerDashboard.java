package com.smartvibe.modules.dashboard.dto;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ManagerDashboard {
    private String branchName;
    private double totalRevenue;
    private int activeStaff;
    private int totalStaff;
    private long lowStockAlerts;
    private List<PendingApprovalDTO> pendingApprovals;

    @Data
    @Builder
    public static class PendingApprovalDTO {
        private Long documentId;
        private Long staffId;
        private String note;
        private String type;
    }
}
