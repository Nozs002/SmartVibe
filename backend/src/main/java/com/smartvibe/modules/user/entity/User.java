package com.smartvibe.modules.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;
    private String password;
    private String fullname;

    @Column(columnDefinition = "ENUM('staff', 'customer', 'system admin')")
    private String role;

    private String address;
    private LocalDate birthday;
    private String email;
    private String description;

    @Column(name = "avt_url")
    private String avtUrl;

    @Column(name = "personal_img")
    private String personalImg;

    private String phone;

    @Column(name = "sex", columnDefinition = "ENUM('male', 'female', 'other') DEFAULT 'other'")
    private String sex;

    @Column(name = "identify_code")
    private String identifyCode;

    @Column(name = "account_status", columnDefinition = "ENUM('active', 'inactive', 'banned') default 'active'")
    private String accountStatus;

    @CreationTimestamp // tu dong lay gio hien tai khi tao moi
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
