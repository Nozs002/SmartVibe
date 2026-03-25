use smartvibe;
-- Dữ liệu bảng Shippers
INSERT INTO Shippers (name, work_status, email, phone)
VALUES (
        'Giao Hàng Nhanh',
        'active',
        'ghn@smartvibe.vn',
        '19001234'
    ),
    (
        'Giao Hàng Tiết Kiệm',
        'active',
        'ghtk@smartvibe.vn',
        '19005678'
    ),
    (
        'AhaMove',
        'busy',
        'ahamove@smartvibe.vn',
        '19001111'
    ),
    (
        'Viettel Post',
        'active',
        'viettel@smartvibe.vn',
        '18008095'
    ),
    (
        'VNPost',
        'inactive',
        'vnpost@smartvibe.vn',
        '19005454'
    ),
    (
        'GrabExpress',
        'active',
        'grab@smartvibe.vn',
        '02871087'
    ),
    (
        'Lalamove',
        'maintenance',
        'lalamove@smartvibe.vn',
        '02473010'
    ),
    (
        'Ninja Van',
        'active',
        'ninja@smartvibe.vn',
        '19008888'
    ),
    (
        'J&T Express',
        'active',
        'jt@smartvibe.vn',
        '19001088'
    ),
    (
        'SmartVibe Internal',
        'active',
        'shipping@smartvibe.vn',
        '09090001'
    );
-- Dữ liệu bảng Users (1-4: Staff, 5-9: Customer, 10: Admin)
INSERT INTO Users (
        username,
        password,
        role,
        address,
        birthday,
        email,
        sex,
        phone
    )
VALUES (
        'staff_minh',
        'hash123',
        'staff',
        'Hà Nội',
        '1995-05-10',
        'minh@sv.vn',
        'male',
        '0911000001'
    ),
    (
        'staff_lan',
        'hash123',
        'staff',
        'TP HCM',
        '1997-08-20',
        'lan@sv.vn',
        'female',
        '0911000002'
    ),
    (
        'staff_tung',
        'hash123',
        'staff',
        'Đà Nẵng',
        '1992-01-15',
        'tung@sv.vn',
        'male',
        '0911000003'
    ),
    (
        'staff_hoa',
        'hash123',
        'staff',
        'Hà Nội',
        '1998-12-05',
        'hoa@sv.vn',
        'female',
        '0911000004'
    ),
    (
        'cus_an',
        'hash456',
        'customer',
        'Hải Phòng',
        '2000-02-14',
        'an@gmail.com',
        'male',
        '0922000001'
    ),
    (
        'cus_binh',
        'hash456',
        'customer',
        'Cần Thơ',
        '1994-07-22',
        'binh@gmail.com',
        'female',
        '0922000002'
    ),
    (
        'cus_cuong',
        'hash456',
        'customer',
        'Huế',
        '1989-11-30',
        'cuong@gmail.com',
        'male',
        '0922000003'
    ),
    (
        'cus_dung',
        'hash456',
        'customer',
        'Quảng Ninh',
        '1996-03-18',
        'dung@gmail.com',
        'female',
        '0922000004'
    ),
    (
        'cus_em',
        'hash456',
        'customer',
        'Bình Dương',
        '2001-09-09',
        'em@gmail.com',
        'other',
        '0922000005'
    ),
    (
        'admin_vibe',
        'root123',
        'system admin',
        'Hà Nội',
        '1990-01-01',
        'admin@smartvibe.vn',
        'male',
        '0900000000'
    );
-- Dữ liệu bảng Branchs
INSERT INTO Branchs (
        name,
        address,
        phone,
        email,
        operating_status,
        number_of_staff,
        capacity,
        type
    )
VALUES (
        'Tổng Kho Miền Bắc',
        'Gia Lâm, Hà Nội',
        '02433331',
        'kho_mb@sv.vn',
        'open',
        50,
        10000,
        'head_warehouse'
    ),
    (
        'Tổng Kho Miền Nam',
        'Quận 9, TP HCM',
        '02833332',
        'kho_mn@sv.vn',
        'open',
        45,
        9000,
        'head_warehouse'
    ),
    (
        'SV Store Cầu Giấy',
        'Cầu Giấy, Hà Nội',
        '02433333',
        'cg@sv.vn',
        'open',
        10,
        500,
        'retail_branch'
    ),
    (
        'SV Store Hoàn Kiếm',
        'Hoàn Kiếm, Hà Nội',
        '02433334',
        'hk@sv.vn',
        'open',
        12,
        600,
        'retail_branch'
    ),
    (
        'SV Store Quận 1',
        'Quận 1, TP HCM',
        '02833335',
        'q1@sv.vn',
        'open',
        15,
        800,
        'retail_branch'
    ),
    (
        'SV Store Quận 7',
        'Quận 7, TP HCM',
        '02833336',
        'q7@sv.vn',
        'open',
        8,
        400,
        'retail_branch'
    ),
    (
        'SV Store Hải Phòng',
        'Lê Chân, HP',
        '02253337',
        'hp@sv.vn',
        'open',
        6,
        300,
        'retail_branch'
    ),
    (
        'SV Store Đà Nẵng',
        'Hải Châu, ĐN',
        '02363338',
        'dn@sv.vn',
        'open',
        9,
        500,
        'retail_branch'
    ),
    (
        'SV Store Cần Thơ',
        'Ninh Kiều, CT',
        '02923339',
        'ct@sv.vn',
        'maintenance',
        5,
        300,
        'retail_branch'
    ),
    (
        'SV Store Bảo Hành',
        'Hà Nội',
        '02433310',
        'bh@sv.vn',
        'open',
        20,
        1000,
        'retail_branch'
    );
-- Dữ liệu Staffs (Link với Users 1-4 và Admin 10)
INSERT INTO Staffs (
        type,
        work_status,
        basic_salary,
        userID,
        branchID
    )
VALUES ('manager', 'working', 20000000, 1, 1),
    ('sales', 'working', 10000000, 2, 3),
    ('warehouse', 'working', 12000000, 3, 2),
    ('technical', 'working', 15000000, 4, 10),
    ('manager', 'working', 25000000, 10, 1),
    ('sales', 'on_leave', 9000000, 1, 4),
    -- (Dữ liệu mẫu lặp user để test logic)
    ('warehouse', 'working', 11000000, 2, 5),
    ('sales', 'working', 9500000, 3, 6),
    ('technical', 'resigned', 14000000, 4, 7),
    ('sales', 'working', 10500000, 1, 8);
-- Dữ liệu Customers (Link với Users 5-9)
INSERT INTO Customers (type, userID)
VALUES ('diamond', 5),
    ('gold', 6),
    ('vip', 7),
    ('normal', 8),
    ('normal', 9),
    ('vip', 5),
    ('gold', 7),
    ('diamond', 8),
    ('normal', 6),
    ('vip', 9);
-- Dữ liệu Products
INSERT INTO Products (name, is_serialized, description, supplier)
VALUES (
        'iPhone 15 Pro',
        true,
        'Apple flagship',
        'Apple Inc'
    ),
    (
        'Samsung S24 Ultra',
        true,
        'Samsung flagship',
        'Samsung VN'
    ),
    (
        'Macbook M3 Air',
        true,
        'Laptop mỏng nhẹ',
        'Apple Inc'
    ),
    (
        'Sony WH-1000XM5',
        false,
        'Tai nghe chống ồn',
        'Sony Global'
    ),
    (
        'Logitech MX Master 3S',
        false,
        'Chuột văn phòng',
        'Logitech'
    ),
    (
        'Dell UltraSharp U2723QE',
        true,
        'Màn hình 4K',
        'Dell VN'
    ),
    ('Keychron K2', false, 'Bàn phím cơ', 'Keychron'),
    (
        'AirPods Pro Gen 2',
        false,
        'Tai nghe TWS',
        'Apple Inc'
    ),
    (
        'PlayStation 5',
        true,
        'Máy chơi game',
        'Sony Global'
    ),
    (
        'iPad Pro M2',
        true,
        'Máy tính bảng',
        'Apple Inc'
    );
-- Dữ liệu Product_item (Các item cụ thể có Serial)
INSERT INTO Product_item (Serial, status, productsID, branchID)
VALUES ('SN001', 'in stock', 1, 1),
    ('SN002', 'in stock', 1, 1),
    ('SN003', 'sold', 2, 3),
    ('SN004', 'in stock', 3, 2),
    ('SN005', 'defective', 1, 1),
    ('SN006', 'in stock', 6, 4),
    ('SN007', 'sold', 9, 5),
    ('SN008', 'in stock', 10, 1),
    ('SN009', 'in stock', 2, 1),
    ('SN010', 'in stock', 3, 1);
-- Dữ liệu Inventory (Tồn kho tổng quát)
INSERT INTO Inventory (quantity_available, branchID, productID)
VALUES (100, 1, 1),
    (50, 1, 2),
    (30, 2, 3),
    (200, 3, 4),
    (150, 3, 5),
    (40, 4, 6),
    (80, 5, 7),
    (120, 1, 8),
    (20, 2, 9),
    (45, 3, 10);
-- Dữ liệu Orders
INSERT INTO Orders (
        type,
        orders_status,
        delivery_status,
        payment_method,
        payment_status,
        staffID,
        customerID,
        branchID
    )
VALUES (
        'online',
        'confirmed',
        'shipping',
        'bank',
        'paid',
        2,
        1,
        3
    ),
    (
        'POS',
        'completed',
        'delivered',
        'cash',
        'paid',
        2,
        2,
        3
    ),
    (
        'online',
        'pending',
        'not shipped',
        'bank',
        'unpaid',
        2,
        3,
        4
    ),
    (
        'online',
        'cancelled',
        'failed',
        'bank',
        'unpaid',
        5,
        4,
        5
    ),
    (
        'POS',
        'completed',
        'delivered',
        'cash',
        'paid',
        7,
        5,
        5
    ),
    (
        'online',
        'confirmed',
        'shipping',
        'bank',
        'paid',
        8,
        6,
        6
    ),
    (
        'online',
        'pending',
        'not shipped',
        'bank',
        'unpaid',
        8,
        7,
        6
    ),
    (
        'POS',
        'completed',
        'delivered',
        'cash',
        'paid',
        10,
        8,
        1
    ),
    (
        'online',
        'completed',
        'delivered',
        'bank',
        'paid',
        10,
        9,
        1
    ),
    (
        'online',
        'confirmed',
        'shipping',
        'bank',
        'paid',
        2,
        10,
        3
    );
-- Dữ liệu OrderDetails
INSERT INTO OrderDetails (
        quantity,
        price,
        orderID,
        productsID,
        product_itemSerial
    )
VALUES (1, 30000000, 1, 1, 'SN001'),
    (1, 28000000, 2, 2, 'SN003'),
    (2, 5000000, 3, 4, NULL),
    (1, 45000000, 4, 3, 'SN004'),
    (1, 15000000, 5, 6, 'SN006'),
    (1, 12000000, 6, 9, 'SN007'),
    (5, 2000000, 7, 5, NULL),
    (1, 35000000, 8, 10, 'SN008'),
    (1, 30000000, 9, 1, 'SN002'),
    (1, 2000000, 10, 7, NULL);
-- Dữ liệu Audit_Logs
INSERT INTO Audit_Logs (activity, userID)
VALUES ('log_in', 1),
    ('log_in', 2),
    ('change_info', 5),
    ('log_out', 1),
    ('log_in', 10),
    ('change_info', 10),
    ('log_in', 3),
    ('log_out', 2),
    ('log_in', 6),
    ('log_in', 7);
-- Dữ liệu Stock_document
INSERT INTO Stock_document (supplier, type, branchID, staffID)
VALUES ('Apple Store', 'import', 1, 1),
    ('Samsung VN', 'import', 2, 3),
    ('Sony VN', 'import', 1, 1),
    ('Logitech VN', 'import', 3, 2),
    ('Internal Transfer', 'export', 1, 1),
    ('Defective Return', 'export', 3, 7),
    ('Holiday Stock', 'import', 4, 8),
    ('New Launch', 'import', 5, 7),
    ('Clearance', 'export', 6, 8),
    ('Correction', 'import', 1, 5);
-- Dữ liệu Support_ticket
INSERT INTO Support_ticket (status, description, customerID, staffID)
VALUES ('resolved', 'Màn hình bị kẻ sọc', 1, 4),
    ('pending', 'Không kết nối được wifi', 2, 4),
    ('in progress', 'Pin tụt nhanh', 3, 9),
    ('closed', 'Hỏi về bảo hành', 4, 4),
    ('resolved', 'Chuột không nhận receiver', 5, 9),
    ('pending', 'Bàn phím liệt phím A', 6, 4),
    ('in progress', 'Loa rè', 7, 9),
    ('resolved', 'Tư vấn mua máy', 8, 2),
    ('closed', 'Sai màu sản phẩm', 9, 2),
    ('pending', 'Trễ giao hàng', 10, 2);