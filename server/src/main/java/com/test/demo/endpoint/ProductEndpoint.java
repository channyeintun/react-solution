package com.test.demo.endpoint;

import com.test.demo.model.dto.ProductDto;
import com.test.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
public class ProductEndpoint {

    private final ProductService productService;

    @Autowired
    public ProductEndpoint(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> showProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<?> registerProduct(@RequestBody ProductDto request) {
        if ((request.getProcessTitle() == null) || (request.getSubprocessTitle() == null) || (request.getSubprocessVersion() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(productService.registerProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDto request) {
        if ((id == null) || (request.getProcessTitle() == null) || (request.getSubprocessTitle() == null) || (request.getSubprocessVersion() == null)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        request.setId(id);
        return ResponseEntity.ok(productService.updateProduct(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        ProductDto product = productService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteProduct(id);
        return ResponseEntity.ok(product);
    }
}
