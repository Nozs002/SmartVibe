package com.smartvibe.modules.stock_transfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartvibe.modules.stock_transfer.dto.StockTransferDetailResponseDTO;
import com.smartvibe.modules.stock_transfer.entity.StockTransferDetail;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockTransferDetailRepository extends JpaRepository<StockTransferDetail, Long> {
    List<StockTransferDetail> findByTransferId(Long transferId);

    @Query("SELECT new com.smartvibe.modules.stock_transfer.dto.StockTransferDetailResponseDTO(" +
       "d.id, d.productId, p.name, d.quantity, d.productItemSerial) " +
       "FROM StockTransferDetail d " +
       "JOIN Product p ON d.productId = p.id " +
       "WHERE d.transferId = :transferId")
    List<StockTransferDetailResponseDTO> findDetailsWithProductName(@Param("transferId") Long transferId);
}
