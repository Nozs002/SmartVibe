package com.smartvibe.modules.dashboard.dto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StaffDashboard {
    private long pendingTransfers;
    private long shippingTransfers; 
    private long completedTransfers;
}
