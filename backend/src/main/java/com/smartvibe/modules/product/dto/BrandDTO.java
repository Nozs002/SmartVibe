package com.smartvibe.modules.product.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandDTO {
    private Long id;
    private String name;
    private String logoUrl;
}
