package com.test.demo.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "product")
@NoArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="process_title")
    private String processTitle;
    @Column(name="subprocess_title")
    private String subprocessTitle;
    @Column(name="subprocess_version")
    private String subprocessVersion;
}
