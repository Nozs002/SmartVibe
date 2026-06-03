package com.smartvibe.modules.document.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PendingApprovalResponse {
    private Long id;
    private Long staffId;
    private String note;
    private LocalDateTime createdAt;
    private Long itemsCount;
}
