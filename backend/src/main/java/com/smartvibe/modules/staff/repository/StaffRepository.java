package com.smartvibe.modules.staff.repository;

import com.smartvibe.modules.staff.dto.StaffDTO;
import com.smartvibe.modules.staff.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartvibe.modules.staff.entity.Staff;
import com.smartvibe.modules.staff.dto.StaffInfo;
import java.util.Optional;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUserId(Long userId);

    @Query("SELECT new com.smartvibe.modules.staff.dto.StaffInfo(s.id, u.fullname, u.phone, u.email, s.type) " +
           "FROM Staff s " +
           "LEFT JOIN User u ON s.userId = u.id " +
           "WHERE s.id = :id")
    Optional<StaffInfo> findStaffInfoById(@Param("id") Long id);
}
