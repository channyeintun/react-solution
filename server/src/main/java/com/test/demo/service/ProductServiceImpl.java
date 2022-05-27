package com.test.demo.service;

import com.test.demo.model.dto.ProductDto;
import com.test.demo.model.entity.Product;
import com.test.demo.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ModelMapper mapper;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              ModelMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    @Override
    public List<ProductDto> getAll() {
        Type targetListType = new TypeToken<List<ProductDto>>() {
        }.getType();
        List<ProductDto> products = mapper.map(productRepository.findAll(), targetListType);
        return products;
    }

    @Override
    public ProductDto registerProduct(ProductDto productDto) {
        Product productEntity = mapper.map(productDto, Product.class);
        Product saved = productRepository.save(productEntity);
        return mapper.map(saved, ProductDto.class);
    }

    @Override
    public ProductDto updateProduct(ProductDto productDto) {
        Product productEntity = mapper.map(productDto, Product.class);
        Product saved = productRepository.save(productEntity);
        return mapper.map(saved, ProductDto.class);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);
        Product product = optional.isPresent() ? optional.get() : null;
        return mapper.map(product, ProductDto.class);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
