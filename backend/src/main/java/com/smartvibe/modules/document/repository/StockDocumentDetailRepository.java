package com.smartvibe.modules.document.repository;

import com.smartvibe.modules.document.entity.StockDocumentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockDocumentDetailRepository extends JpaRepository<StockDocumentDetail, Long> {
    List<StockDocumentDetail> findByDocumentId(Long documentId);
}
