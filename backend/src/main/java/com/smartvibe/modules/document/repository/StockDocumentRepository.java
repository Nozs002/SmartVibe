package com.smartvibe.modules.document.repository;

import com.smartvibe.modules.document.dto.PendingApprovalResponse;
import com.smartvibe.modules.document.entity.StockDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockDocumentRepository extends JpaRepository<StockDocument, Long> {
    @Query("SELECT new com.smartvibe.modules.document.dto.PendingApprovalResponse(d.id, d.staffId, d.note, d.createdAt, SUM(dt.quantity)) " +
       "FROM StockDocument d JOIN StockDocumentDetail dt ON d.id = dt.documentId " +
       "WHERE d.type = 'export' AND d.status = 'pending' AND d.branchId = :branchId " +
       "GROUP BY d.id, d.staffId, d.note, d.createdAt")
    List<PendingApprovalResponse> findPendingExportsByBranch(@Param("branchId") Long branchId);
}
