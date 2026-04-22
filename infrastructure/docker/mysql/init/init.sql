SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smartvibe;
-- 1. Table: shippers (Đã sửa từ sshippers và chuẩn hóa naming)
CREATE TABLE shippers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    work_status ENUM('active', 'inactive', 'busy', 'maintenance') NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255)
);
-- 2. Table: users (Chuẩn hóa naming và kiểu dữ liệu)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('staff', 'customer', 'system admin'),
    address VARCHAR(255),
    birthday DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    avt_url VARCHAR(255),
    personal_img VARCHAR(255),
    phone VARCHAR(255) UNIQUE,
    sex ENUM('male', 'female', 'other') NOT NULL,
    identify_code VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    account_status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);
-- 3. Table: branches (Đã sửa từ branchs)
CREATE TABLE branches (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    operating_status ENUM('open', 'close', 'maintenance') NOT NULL,
    number_of_staff INT NOT NULL DEFAULT 0,
    capacity INT NOT NULL,
    type ENUM('head_warehouse', 'retail_branch') NOT NULL
);
-- 4. Table: staffs
CREATE TABLE staffs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('manager', 'sales', 'warehouse', 'technical') NOT NULL,
    work_status ENUM('working', 'resigned', 'on_leave'),
    description TEXT,
    basic_salary DECIMAL(20, 2) NOT NULL,
    allowance DECIMAL(20, 2),
    bonus DECIMAL(20, 2),
    deduction DECIMAL(20, 2),
    user_id BIGINT UNIQUE,
    branch_id BIGINT NOT NULL,
    CONSTRAINT fk_staff_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_staff_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 5. Table: customers
CREATE TABLE customers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('normal', 'vip', 'gold', 'diamond') NOT NULL,
    user_id BIGINT UNIQUE,
    CONSTRAINT fk_customer_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 6. Table: products
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    is_serialized BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    supplier VARCHAR(255)
);
-- 7. Table: product_items (Đã sửa từ product_item)
CREATE TABLE product_items (
    serial VARCHAR(255) PRIMARY KEY,
    status ENUM('in stock', 'sold', 'defective') NOT NULL,
    product_id BIGINT NOT NULL,
    branch_id BIGINT NOT NULL,
    CONSTRAINT fk_product_item_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_product_item_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 8. Table: audit_logs
CREATE TABLE audit_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    log_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    activity ENUM('log_in', 'log_out', 'change_info') NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 9. Table: orders
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type ENUM('POS', 'online') NOT NULL,
    note TEXT,
    delivery_location VARCHAR(255),
    phone VARCHAR(255),
    order_status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL,
    delivery_status ENUM('not shipped', 'shipping', 'delivered', 'failed') NOT NULL,
    account_payment VARCHAR(255),
    payment_method ENUM('bank', 'cash') NOT NULL,
    payment_status ENUM('unpaid', 'paid', 'refunded') NOT NULL,
    discount_percent DECIMAL(20, 2),
    staff_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    shipper_id BIGINT,
    branch_id BIGINT NOT NULL,
    CONSTRAINT fk_order_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_order_shipper FOREIGN KEY (shipper_id) REFERENCES shippers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_order_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 10. Table: order_details
CREATE TABLE order_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    price DECIMAL(20, 2),
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    product_serial VARCHAR(255) UNIQUE,
    CONSTRAINT fk_order_details_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_order_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_order_details_serial FOREIGN KEY (product_serial) REFERENCES product_items(serial) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 11. Table: support_tickets (Đã sửa từ support_ticket)
CREATE TABLE support_tickets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pending', 'in progress', 'resolved', 'closed') NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    customer_id BIGINT NOT NULL,
    product_serial VARCHAR(255),
    staff_id BIGINT,
    order_detail_id BIGINT,
    CONSTRAINT fk_support_ticket_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_support_ticket_serial FOREIGN KEY (product_serial) REFERENCES product_items(serial) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_support_ticket_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_support_ticket_order_detail FOREIGN KEY (order_detail_id) REFERENCES order_details(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 12. Table: stock_documents (Đã sửa từ stock_document)
CREATE TABLE stock_documents (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    supplier VARCHAR(255),
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    type ENUM('import', 'export') NOT NULL,
    branch_id BIGINT NOT NULL,
    staff_id BIGINT NOT NULL,
    CONSTRAINT fk_stock_document_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_stock_document_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 13. Table: stock_document_details
CREATE TABLE stock_document_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    price DECIMAL(20, 2) NOT NULL,
    product_id BIGINT NOT NULL,
    document_id BIGINT NOT NULL,
    CONSTRAINT fk_doc_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_doc_details_document FOREIGN KEY (document_id) REFERENCES stock_documents(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 14. Table: adjustment_tickets (Đã sửa từ adjustment_ticket)
CREATE TABLE adjustment_tickets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pending', 'in progress', 'resolved', 'closed') DEFAULT 'pending',
    description TEXT,
    staff_id BIGINT NOT NULL,
    branch_id BIGINT NOT NULL,
    CONSTRAINT fk_adjustment_ticket_staff FOREIGN KEY (staff_id) REFERENCES staffs(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_adjustment_ticket_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 15. Table: stock_transfers (Đã sửa từ stock_transfer)
CREATE TABLE stock_transfers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pending', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    from_branch_id BIGINT NOT NULL,
    to_branch_id BIGINT NOT NULL,
    CONSTRAINT fk_transfer_from_branch FOREIGN KEY (from_branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_transfer_to_branch FOREIGN KEY (to_branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 16. Table: stock_transfer_details
CREATE TABLE stock_transfer_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    transfer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_transfer_details_transfer FOREIGN KEY (transfer_id) REFERENCES stock_transfers(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_transfer_details_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE
);
-- 17. Table: inventories (Đã sửa từ Inventory)
CREATE TABLE inventories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    quantity_available INT NOT NULL DEFAULT 0,
    branch_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_inventory_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT unique_inventory UNIQUE(branch_id, product_id)
);
-- 18. Table: inventory_transactions (Đã sửa từ Inventory_transaction)
CREATE TABLE inventory_transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    transaction_type ENUM(
        'import',
        'export',
        'transfer in',
        'transfer out',
        'sale',
        'return',
        'adjustment'
    ) NOT NULL,
    quantity_changed INT NOT NULL,
    reference_type ENUM(
        'document',
        'stock transfer',
        'adjustment',
        'order'
    ),
    reference_id BIGINT NOT NULL,
    inventory_id BIGINT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_inventory FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE NO ACTION ON UPDATE CASCADE
);