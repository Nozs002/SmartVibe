package com.smartvibe.modules.inventory_transaction.repository;

import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smartvibe.modules.inventory_transaction.dto.InventoryTransactionDTO;
import java.util.List;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {

    // Lấy tất cả lịch sử biến động kho
    @Query("SELECT new com.smartvibe.modules.inventory_transaction.dto.InventoryTransactionDTO(" +
           "t.id, t.transactionType, t.quantityChanged, t.referenceType, t.referenceId, t.createdAt, " +
           "i.productId, p.name, i.branchId, b.name) " + 
           "FROM InventoryTransaction t " +
           "JOIN Inventory i ON t.inventoryId = i.id " +
           "JOIN Product p ON i.productId = p.id " +
           "JOIN Branch b ON i.branchId = b.id " +  
           "ORDER BY t.createdAt DESC")
    List<InventoryTransactionDTO> findAllHistory();

    // lịch sử biến động kho theo một Chi nhánh cụ thể
    @Query("SELECT new com.smartvibe.modules.inventory_transaction.dto.InventoryTransactionDTO(" +
           "t.id, t.transactionType, t.quantityChanged, t.referenceType, t.referenceId, t.createdAt, " +
           "i.productId, p.name, i.branchId, b.name) " +
           "FROM InventoryTransaction t " +
           "JOIN Inventory i ON t.inventoryId = i.id " +
           "JOIN Product p ON i.productId = p.id " +
           "JOIN Branch b ON i.branchId = b.id " +
           "WHERE i.branchId = :branchId " +
           "ORDER BY t.createdAt DESC")
    List<InventoryTransactionDTO> findHistoryByBranch(@Param("branchId") Long branchId);
}