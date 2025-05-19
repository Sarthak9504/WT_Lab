// model/Student.java
package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_marks")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String rollNo;
    private int cnMse;
    private int cnEse;
    private int csMse;
    private int csEse;
    private int wtMse;
    private int wtEse;
    private int osMse;
    private int osEse;

    // Getters and Setters
}
