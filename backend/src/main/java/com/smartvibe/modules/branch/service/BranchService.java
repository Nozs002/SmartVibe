package com.smartvibe.modules.branch.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartvibe.common.exception.AppException;
import com.smartvibe.common.exception.ErrorCode;
import com.smartvibe.modules.auth.service.AuthService;
import com.smartvibe.modules.branch.dto.BranchDTO;
import com.smartvibe.modules.branch.entity.Branch;
import com.smartvibe.modules.branch.repository.BranchRepository;
import com.smartvibe.modules.inventory.entity.Inventory;
import com.smartvibe.modules.inventory.repository.InventoryRepository;
import com.smartvibe.modules.product.entity.Product;
import com.smartvibe.modules.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;
    private final AuthService authService;

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    private BranchDTO mapToDTO(Branch branch) {
        return BranchDTO.builder()
                .id(branch.getId())
                .name(branch.getName())
                .address(branch.getAddress())
                .phone(branch.getPhone())
                .email(branch.getEmail())
                .operatingStatus(branch.getOperatingStatus())
                .numberOfStaff(branch.getNumberOfStaff())
                .capacity(branch.getCapacity())
                .type(branch.getType())
                .build();
    }

    public List<BranchDTO> getAllBranches() {
        return branchRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<BranchDTO> getActiveBranches() {
        return branchRepository.findByOperatingStatus("open").stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public Branch createBranch(Branch request, String username) {
        authService.verifyHeadManagerOrAdmin(username);
    
        request.setOperatingStatus("open"); 
        
        if (request.getNumberOfStaff() == null) request.setNumberOfStaff(0L);
        if (request.getCapacity() == null) request.setCapacity(0L);
        if (request.getType() == null) request.setType("retail_branch"); 

        Branch savedBranch = branchRepository.save(request);

        List<Product> allProducts = productRepository.findAll();

        if (!allProducts.isEmpty()) {
            List<Inventory> newInventories = allProducts.stream()
                    .map(product -> Inventory.builder()
                            .branchId(savedBranch.getId())
                            .productId(product.getId())
                            .quantityAvailable(0L) 
                            .build())
                    .collect(Collectors.toList());

            inventoryRepository.saveAll(newInventories);
        }

        return savedBranch;
    }

    @Transactional(rollbackFor = Exception.class)
    public Branch updateBranch(Long id, Branch request, String username) {
        authService.verifyHeadManagerOrAdmin(username);

        Branch existingBranch = branchRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCHE_NOT_FOUND));

        if (request.getName() != null) existingBranch.setName(request.getName());
        if (request.getAddress() != null) existingBranch.setAddress(request.getAddress());
        if (request.getPhone() != null) existingBranch.setPhone(request.getPhone());
        if (request.getEmail() != null) existingBranch.setEmail(request.getEmail());
        if (request.getType() != null) existingBranch.setType(request.getType());
        if (request.getOperatingStatus() != null) existingBranch.setOperatingStatus(request.getOperatingStatus());
        if (request.getCapacity() != null) existingBranch.setCapacity(request.getCapacity());
        if (request.getNumberOfStaff() != null) existingBranch.setNumberOfStaff(request.getNumberOfStaff());

        return branchRepository.save(existingBranch);
    }
}