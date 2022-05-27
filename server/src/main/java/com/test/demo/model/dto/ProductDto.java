package com.test.demo.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProductDto {
    private Long id;
    private String processTitle;
    private String subprocessTitle;
    private String subprocessVersion;
}
