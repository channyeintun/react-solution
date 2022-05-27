package com.test.demo.service;

import com.test.demo.model.dto.ProductDto;
import com.test.demo.model.entity.Product;

import java.util.List;

public interface ProductService {
    public List<ProductDto> getAll();
    public ProductDto registerProduct(ProductDto productDto);
    public ProductDto updateProduct(ProductDto productDto);
    public ProductDto getProductById(Long id);
    public void deleteProduct(Long id);
}
