package com.smartvibe.modules.inventory_transaction.repository;

import com.smartvibe.modules.inventory_transaction.entity.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    
}