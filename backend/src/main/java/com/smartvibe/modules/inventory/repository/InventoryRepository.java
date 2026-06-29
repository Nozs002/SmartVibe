package com.smartvibe.modules.inventory.repository;

import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.dto.ProductInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartvibe.modules.inventory.dto.InventoryDTO;
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

    @Query("SELECT new com.smartvibe.modules.inventory.dto.InventoryDTO(" +
       "i.id, i.quantityAvailable, " +
       "new com.smartvibe.modules.branch.dto.BranchDTO(b.id, b.name, b.address, b.phone, b.email, b.operatingStatus,b.type, b.numberOfStaff, b.capacity), " +
       "new com.smartvibe.modules.product.dto.ProductDTO(p.id, p.sku, p.name, p.categoryId, p.brandId, p.isSerialized, p.description, p.price, p.warrantyMonths, p.specifications, p.thumbnail, p.status)) " +
       "FROM Inventory i " +
       "LEFT JOIN Branch b ON i.branchId = b.id " +
       "JOIN Product p ON i.productId = p.id")
    List<InventoryDTO> findAllInventoryDTOs();

    @Query("SELECT new com.smartvibe.modules.inventory.dto.InventoryDTO(" +
       "i.id, i.quantityAvailable, " +
       "new com.smartvibe.modules.branch.dto.BranchDTO(b.id, b.name, b.address, b.phone, b.email, b.operatingStatus,b.type, b.numberOfStaff, b.capacity), " +
       "new com.smartvibe.modules.product.dto.ProductDTO(p.id, p.sku, p.name, p.categoryId, p.brandId, p.isSerialized, p.description, p.price, p.warrantyMonths, p.specifications, p.thumbnail, p.status)) " +
       "FROM Inventory i " +
       "LEFT JOIN Branch b ON i.branchId = b.id " +
       "JOIN Product p ON i.productId = p.id WHERE i.productId = :productId ")
    List<InventoryDTO> getAvailableStockByProductId(@Param("productId") Long productId);

    long countByBranchIdAndQuantityAvailableLessThanEqual(Long branchId, Long threshold);
}
