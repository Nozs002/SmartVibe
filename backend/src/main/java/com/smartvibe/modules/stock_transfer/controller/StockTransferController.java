package com.smartvibe.modules.stock_transfer.controller;

import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.stock_transfer.dto.TransferRequestDTO;
import com.smartvibe.modules.stock_transfer.dto.StockTransferDetailResponseDTO;
import com.smartvibe.modules.stock_transfer.dto.StockTransferResponseDTO;
import com.smartvibe.modules.stock_transfer.entity.StockTransfer;
import com.smartvibe.modules.stock_transfer.entity.StockTransferDetail;
import com.smartvibe.modules.stock_transfer.service.StockTransferService;
import com.smartvibe.modules.stock_transfer.repository.StockTransferRepository;
import com.smartvibe.modules.stock_transfer.repository.StockTransferDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/stock-transfers")
@RequiredArgsConstructor
public class StockTransferController {
    private final StockTransferService stockTransferService;
    private final StockTransferRepository stockTransferRepository;
    private final StockTransferDetailRepository stockTransferDetailRepository;

    @GetMapping("/branch/{branchId}")
    public ApiResponse<List<StockTransferResponseDTO>> getTransfers(@PathVariable Long branchId) {
        ApiResponse<List<StockTransferResponseDTO>> response = new ApiResponse<>();
        response.setResult(stockTransferRepository.findTransfersWithBranchNames(branchId));
        return response;
    }

    @PostMapping("/create")
    public ApiResponse<String> create(@RequestBody TransferRequestDTO request) {
        // Lấy staffBranchId trực tiếp từ request DTO
        stockTransferService.createTransferTicket(request.getStaffBranchId(), request);
        
        ApiResponse<String> res = new ApiResponse<>();
        res.setMessage("Tạo phiếu điều chuyển nháp thành công!");
        return res;
    }

    @PutMapping("/{id}/ship")
    public ApiResponse<String> ship(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        Long staffBranchId = payload.get("staffBranchId");
        stockTransferService.shipTransfer(staffBranchId, id);
        
        ApiResponse<String> res = new ApiResponse<>();
        res.setMessage("Xác nhận xuất kho vận chuyển!");
        return res;
    }

    @PutMapping("/{id}/complete")
    public ApiResponse<String> complete(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        Long staffBranchId = payload.get("staffBranchId");
        stockTransferService.completeTransfer(staffBranchId, id);
        
        ApiResponse<String> res = new ApiResponse<>();
        res.setMessage("Xác nhận nhập kho hàng điều chuyển thành công!");
        return res;
    }

    @GetMapping("/{id}/details")
    public ApiResponse<List<StockTransferDetailResponseDTO>> getTransferDetails(@PathVariable Long id) {
        ApiResponse<List<StockTransferDetailResponseDTO>> response = new ApiResponse<>();
        response.setResult(stockTransferDetailRepository.findDetailsWithProductName(id));
        response.setMessage("Lấy chi tiết lệnh điều chuyển thành công");
        return response;
    }
}
