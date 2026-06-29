package com.smartvibe.modules.user.repository;

import com.smartvibe.modules.user.entity.User;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartvibe.modules.user.dto.response.UserResponse;

import java.util.stream.Collectors;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByPhoneAndRole(String phone, String role);
    boolean existsByEmailAndRole(String email, String role);

    long countByAccountStatus(String accountStatus);

    List<User> findTop5ByOrderByCreatedAtDesc();

    List<User> findByCreatedAtAfter(java.time.LocalDateTime startDate);

    @Query("SELECT u FROM User u JOIN Staff s ON u.id = s.userId WHERE u.role = 'staff' AND s.type = 'manager' AND s.branchId = :branchId")
    Optional<User> findManagerByBranchId(@Param("branchId") Long branchId);
}
