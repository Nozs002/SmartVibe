package com.smartvibe.modules.document.controller;

import com.smartvibe.modules.inventory.dto.ImportRequestDTO;
import com.smartvibe.common.response.ApiResponse;
import com.smartvibe.modules.document.dto.PendingApprovalResponse;
import com.smartvibe.modules.document.service.StockDocumentService;
import com.smartvibe.modules.document.repository.StockDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-documents")
@RequiredArgsConstructor
public class StockDocumentController {

    private final StockDocumentService stockDocumentService;
    private final StockDocumentRepository stockDocumentRepository;

    // Tạo chứng từ nhập kho mới
    @PostMapping("/import")
    public ApiResponse<String> importStock(@RequestBody ImportRequestDTO request) {
        stockDocumentService.importStock(request);
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage("Nhập kho thành công!");
        return response;
    }

    // Tạo yêu cầu xuất kho
    @PostMapping("/export")
    public ApiResponse<String> createExport(@RequestBody ImportRequestDTO request) {
        stockDocumentService.createExportRequest(request);
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage("Tạo yêu cầu xuất kho thành công, đang chờ sếp duyệt!");
        return response;
    }

    // danh sách phiếu xuất chờ duyệt
    @GetMapping("/pending-exports/{branchId}")
    public ApiResponse<List<PendingApprovalResponse>> getPendingExports(@PathVariable Long branchId) {
        ApiResponse<List<PendingApprovalResponse>> response = new ApiResponse<>();
        response.setResult(stockDocumentRepository.findPendingExportsByBranch(branchId));
        return response;
    }

    // Phê duyệt phiếu xuất
    @PutMapping("/approve/{documentId}")
    public ApiResponse<String> approveExport(@PathVariable Long documentId) {
        stockDocumentService.approveExportDocument(documentId);
        ApiResponse<String> response = new ApiResponse<>();
        response.setMessage("Phê duyệt và trừ tồn kho thành công!");
        return response;
    }
}