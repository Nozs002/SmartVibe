package com.smartvibe.modules.stock_transfer.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartvibe.modules.stock_transfer.dto.StockTransferResponseDTO;
import com.smartvibe.modules.stock_transfer.entity.StockTransfer;

import java.util.List;

@Repository
public interface StockTransferRepository extends org.springframework.data.jpa.repository.JpaRepository<StockTransfer, Long> {
    List<StockTransfer> findByFromBranchIdOrToBranchId(Long fromBranchId, Long toBranchId);

    @Query("SELECT new com.smartvibe.modules.stock_transfer.dto.StockTransferResponseDTO(" +
           "t.id, t.status, t.createdAt, t.completedAt, " +
           "t.fromBranchId, bf.name, " +
           "t.toBranchId, bt.name) " +
           "FROM StockTransfer t " +
           "JOIN Branch bf ON t.fromBranchId = bf.id " +
           "JOIN Branch bt ON t.toBranchId = bt.id " +
           "WHERE t.fromBranchId = :branchId OR t.toBranchId = :branchId " +
           "ORDER BY t.createdAt DESC")
    List<StockTransferResponseDTO> findTransfersWithBranchNames(@Param("branchId") Long branchId);
}
