package com.smartvibe.modules.staff.repository;

import com.smartvibe.modules.staff.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartvibe.modules.staff.entity.Staff;
import java.util.Optional;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUserId(Long userId);
}
