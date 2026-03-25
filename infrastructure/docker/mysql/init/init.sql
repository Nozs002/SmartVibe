SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
use smartvibe;
create table Shippers (
    ShipperID int primary key auto_increment unique,
    name varchar(255) not null,
    work_status enum('active', 'inactive', 'busy', 'maintenance') not null,
    email varchar(255) not null,
    phone varchar(255)
);
create table Users (
    UserID int primary key auto_increment unique,
    username varchar(255) not null unique,
    password varchar(255) not null,
    role enum('staff', 'customer', 'system admin'),
    address varchar(255),
    birthday date,
    email varchar(255) not null unique,
    description text,
    avt_url varchar(255),
    personal_img varchar(255),
    phone varchar(255) unique,
    sex enum('male', 'female', 'other') not null,
    identify_code varchar(255),
    created_at datetime default current_timestamp,
    account_status enum('active', 'inactive', 'banned') default 'active'
);
create table Branchs (
    BranchID int primary key auto_increment unique,
    name varchar(255) not null,
    address varchar(255) not null,
    phone varchar(255) not null,
    email varchar(255) not null,
    operating_status enum('open', 'close', 'maintenance') not null,
    number_of_staff int not null,
    capacity int not null,
    type enum('head_warehouse', 'retail_branch') not null
);
create table Staffs (
    StaffID int primary key auto_increment unique,
    type enum('manager', 'sales', 'warehouse', 'technical') not null,
    work_status enum('working', 'resigned', 'on_leave'),
    description text,
    basic_salary decimal(20, 2) not null,
    allowance decimal(20, 2),
    bonus decimal(20, 2),
    deduction decimal(20, 2),
    userID int unique,
    branchID int not null,
    constraint fk_staff_user foreign key (userID) references Users(UserID) on delete no action on update cascade,
    constraint fk_staff_branch foreign key(branchID) references Branchs(BranchID) on delete no action on update cascade
);
create table Customers (
    CustomerID int primary key auto_increment unique,
    type enum('normal', 'vip', 'gold', 'diamond') not null,
    userID int unique,
    constraint fk_customer_user foreign key (userID) references Users(UserID) on delete no action on update cascade
);
create table Products (
    ProductsID int primary key auto_increment unique not null,
    name varchar(255) unique not null,
    is_serialized boolean not null default false,
    description text,
    supplier varchar(255)
);
create table Product_item (
    Serial varchar(255) primary key unique not null,
    status enum('in stock', 'sold', 'defective') not null,
    productsID int not null,
    constraint fk_productItem_products foreign key (productsID) references Products(ProductsID) on delete no action on update cascade,
    branchID int not null,
    constraint fk_productItem_branchs foreign key (branchID) references Branchs(BranchID) on delete no action on update cascade
);
create table Audit_Logs (
    Audit_logID int primary key auto_increment unique,
    date datetime default current_timestamp,
    activity enum('log_in', 'log_out', 'change_info') not null,
    userID int not null,
    constraint fk_auditLogs_user foreign key (userID) references Users(UserID) on delete no action on update cascade
);
create table Orders (
    OrdersID int primary key auto_increment unique,
    created_at datetime default current_timestamp not null,
    type enum('POS', 'online') not null,
    note text,
    delivery_location varchar(255),
    phone varchar(255),
    orders_status enum('pending', 'confirmed', 'completed', 'cancelled') not null,
    delivery_status enum('not shipped', 'shipping', 'delivered', 'failed') not null,
    account_payment varchar(255),
    payment_method enum('bank', 'cash') not null,
    payment_status enum('unpaid', 'paid', 'refunded') not null,
    discount_percent decimal(20, 2),
    staffID int not null,
    constraint fk_order_staff foreign key (staffID) references Staffs(StaffID) on delete no action on update cascade,
    customerID int not null,
    constraint fk_order_customer foreign key (customerID) references Customers(CustomerID) on delete no action on update cascade,
    shipperID int,
    constraint fk_order_shipper foreign key (shipperID) references Shippers(ShipperID) on delete no action on update cascade,
    branchID int not null,
    constraint fk_orders_branchs foreign key (branchID) references Branchs(BranchID) on delete no action on update cascade
);
create table OrderDetails (
    OrderDetailsID int primary key auto_increment unique,
    quantity int not null,
    price decimal(20, 2),
    orderID int not null,
    constraint fk_oderDetails_orders foreign key (orderID) references Orders(OrdersID) on delete no action on update cascade,
    productsID int,
    constraint fk_orderDetails_peoducts foreign key (productsID) references Products(ProductsID) on delete no action on update cascade,
    product_itemSerial varchar(255) unique,
    constraint fk_orderDetail_productItem foreign key (product_itemSerial) references Product_item(Serial) on delete no action on update cascade
);
create table Support_ticket (
    TicketID int primary key auto_increment not null,
    status enum('pending', 'in progress', 'resolved', 'closed') not null,
    description text,
    created_at datetime default current_timestamp not null,
    customerID int not null,
    constraint fk_supportTicket_customers foreign key (customerID) references Customers(CustomerID) on delete no action on update cascade,
    product_itemSerial varchar(255),
    constraint fk_supportTicket_productItem foreign key (product_itemSerial) references Product_item(Serial) on delete no action on update cascade,
    staffID int,
    constraint fk_supportTicket_staffs foreign key (staffID) references Staffs(StaffID) on delete no action on update cascade,
    orderDetailID int,
    constraint fk_supportTicket_orderDetails foreign key (orderDetailID) references OrderDetails(OrderDetailsID) on delete no action on update cascade
);
create table Stock_document (
    DocumentID int primary key auto_increment not null,
    supplier varchar(255),
    status enum('pending', 'completed', 'cancelled') default 'pending',
    created_at datetime default current_timestamp,
    type enum('import', 'export') not null,
    branchID int not null,
    constraint fk_document_branchs foreign key (branchID) references Branchs(BranchID) on delete no action on update cascade,
    staffID int not null,
    constraint fk_document_staffs foreign key (staffID) references Staffs(StaffID) on delete no action on update cascade
);
create table Stock_document_details (
    Document_detailID int primary key auto_increment not null,
    quantity int not null,
    price decimal(20, 2) not null,
    productsID int not null,
    constraint fk_documentDetails_products foreign key (productsID) references Products(ProductsID) on delete no action on update cascade,
    documentID int not null,
    constraint fk_documentDetails_documents foreign key (documentID) references Stock_document(DocumentID) on delete no action on update cascade
);
create table Adjustment_ticket (
    Adjustment_ticketID int primary key auto_increment not null,
    status enum('pending', 'in progress', 'resolved', 'closed') default 'pending',
    description text,
    staffID int not null,
    constraint fk_adjustmentTicket_staffs foreign key (staffID) references Staffs(StaffID) on delete no action on update cascade,
    branchID int not null,
    constraint fk_adjustmentTicket_branchs foreign key (branchID) references Branchs(BranchID) on delete no action on update cascade
);
create table Stock_transfer (
    TransferID int primary key auto_increment not null,
    status enum('pending', 'shipping', 'completed', 'cancelled') default 'pending',
    created_at datetime default current_timestamp,
    completed datetime,
    FromBranchID int not null,
    constraint fk_fromBranch foreign key (FromBranchID) references Branchs(BranchID) on delete no action on update cascade,
    ToBranchID int not null,
    constraint fk_toBranch foreign key (ToBranchID) references Branchs(BranchID) on delete no action on update cascade
);
create table Stock_transfer_details (
    Transfer_detailsID int primary key auto_increment not null,
    quantity int not null,
    transferID int not null,
    constraint fk_transferDetails_transfer foreign key (transferID) references Stock_transfer(TransferID) on delete no action on update cascade,
    productsID int not null,
    constraint fk_transferDetails_products foreign key (productsID) references Products(ProductsID) on delete no action on update cascade
);
create table Inventory (
    InventoryID int primary key auto_increment not null,
    quantity_available int not null default 0,
    branchID int not null,
    constraint fk_inventory_branchs foreign key (branchID) references Branchs(BranchID) on delete no action on update cascade,
    productID int not null,
    constraint fk_inventory_products foreign key (productID) references Products(ProductsID) on delete no action on update cascade,
    constraint unique_inventory unique(branchID, productID)
);
create table Inventory_transaction (
    TransactionID int primary key auto_increment not null,
    transaction_type enum(
        'import',
        'export',
        'transfer in',
        'transfer out',
        'sale',
        'return',
        'adjustment'
    ) not null,
    quantity_changed int not null,
    references_type enum(
        'document',
        'stock transfer',
        'adjustment',
        'order'
    ),
    referencesID int not null,
    created_at datetime default current_timestamp,
    InventoryID int not null,
    constraint fk_transaction_inventory foreign key (InventoryID) references Inventory(InventoryID) on delete no action on update cascade
);