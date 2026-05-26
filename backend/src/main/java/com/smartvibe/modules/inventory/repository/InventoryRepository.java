package com.smartvibe.modules.inventory.repository;

import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    @Query("SELECT new com.smartvibe.modules.inventory.dto.ProductInventory(i.productId, SUM(i.quantityAvailable)) FROM Inventory i GROUP BY i.productId")
    List<ProductInventory> getAllProductInventory();

    @Query("SELECT new com.smartvibe.modules.inventory.dto.ProductInventory(i.productId, SUM(i.quantityAvailable)) FROM Inventory i WHERE i.productId IN :productIds GROUP BY i.productId ")
    List<ProductInventory> findAllByProductIdIn(@Param("productIds") List<Long> productIds);

    // Lấy danh sách tồn kho của một sản phẩm và sắp xếp giảm dần theo số lượng
    List<Inventory> findByProductIdOrderByQuantityAvailableDesc(Long productId);

    Optional<Inventory> findByProductIdAndBranchId(Long productId, Long branchId);
}
