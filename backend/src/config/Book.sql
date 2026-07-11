-- Khởi tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS book CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE book;

-- ==========================================
-- PHẦN 1: TẠO CÁC BẢNG ĐỘC LẬP (MASTER DATA)
-- ==========================================

CREATE TABLE NGUOI_DUNG (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    ho_va_ten VARCHAR(128),
    gioi_thieu TEXT,
    role VARCHAR(20),
    trang_thai INT,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE NHA_XUAT_BAN (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nxb VARCHAR(128) NOT NULL,
    ten_nguoi_dai_dien VARCHAR(128),
    email VARCHAR(128),
    sdt VARCHAR(20),
    dia_chi VARCHAR(128)
);

CREATE TABLE DANH_MUC (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc VARCHAR(128) NOT NULL,
    mo_ta TEXT
);

CREATE TABLE NHAN (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nhan VARCHAR(128) NOT NULL,
    mo_ta TEXT
);

-- ==========================================
-- PHẦN 2: TẠO CÁC BẢNG CÓ KHÓA NGOẠI CẤP 1
-- ==========================================

CREATE TABLE Dia_chi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL,
    dia_chi_nha VARCHAR(200),
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id) ON DELETE CASCADE
);

CREATE TABLE SACH (
    id INT AUTO_INCREMENT PRIMARY KEY,
    danh_muc_id INT NOT NULL,
    nxb_id INT NOT NULL,
    tieu_de VARCHAR(128) NOT NULL,
    tac_gia VARCHAR(200),
    mo_ta TEXT,
    trang_thai INT,
    luot_thich INT DEFAULT 0,
    gia DECIMAL(10,2) NOT NULL,
    ngay_dang DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_sua_doi DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (danh_muc_id) REFERENCES DANH_MUC(id),
    FOREIGN KEY (nxb_id) REFERENCES NHA_XUAT_BAN(id)
);

CREATE TABLE HOA_DON (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT NOT NULL,
    payment_order_id INT,
    trang_thai INT,
    ngay_tao_hoa_don DATETIME DEFAULT CURRENT_TIMESTAMP,
    thue_GTGT FLOAT,
    tong_gia_tri FLOAT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id)
);

CREATE TABLE DON_NHAP (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nxb_id INT NOT NULL,
    nguoi_dung_id INT NOT NULL, -- Người tạo đơn nhập
    ngay_tao DATE,
    VAT FLOAT,
    tong_tien INT,
    tong_gia_tri_phieu_nhap INT,
    chung_tu_goc VARCHAR(10),
    FOREIGN KEY (nxb_id) REFERENCES NHA_XUAT_BAN(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id)
);

-- ==========================================
-- PHẦN 3: TẠO CÁC BẢNG TRUNG GIAN & CHI TIẾT
-- ==========================================

-- Lưu trữ vị trí & số lượng kho theo từng quyển sách
CREATE TABLE KHO_SACH (
    sach_id INT PRIMARY KEY,
    stt INT NOT NULL, -- Theo thiết kế, có thể stt là mã định danh phụ
    so_luong INT DEFAULT 0,
    vi_tri VARCHAR(255),
    ngay_cap_nhat DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sach_id) REFERENCES SACH(id) ON DELETE CASCADE
);

CREATE TABLE NHAN_SACH (
    sach_id INT NOT NULL,
    nhan_id INT NOT NULL,
    PRIMARY KEY (sach_id, nhan_id),
    FOREIGN KEY (sach_id) REFERENCES SACH(id) ON DELETE CASCADE,
    FOREIGN KEY (nhan_id) REFERENCES NHAN(id) ON DELETE CASCADE
);

CREATE TABLE YEU_THICH (
    sach_id INT NOT NULL,
    nguoi_dung_id INT NOT NULL,
    PRIMARY KEY (sach_id, nguoi_dung_id),
    FOREIGN KEY (sach_id) REFERENCES SACH(id) ON DELETE CASCADE,
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id) ON DELETE CASCADE
);

CREATE TABLE SACH_TRONG_GIO_HANG (
    sach_id INT NOT NULL,
    nguoi_dung_id INT NOT NULL,
    so_luong INT NOT NULL DEFAULT 1,
    PRIMARY KEY (sach_id, nguoi_dung_id),
    FOREIGN KEY (sach_id) REFERENCES SACH(id) ON DELETE CASCADE,
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id) ON DELETE CASCADE
);

CREATE TABLE DANH_GIA (
    sach_id INT NOT NULL,
    nguoi_dung_id INT NOT NULL,
    sao INT CHECK (sao >= 1 AND sao <= 5),
    noi_dung_danh_gia VARCHAR(200),
    thoi_gian DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sach_id, nguoi_dung_id),
    FOREIGN KEY (sach_id) REFERENCES SACH(id) ON DELETE CASCADE,
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id) ON DELETE CASCADE
);

CREATE TABLE CHI_TIET_HOA_DON (
    hoa_don_id INT NOT NULL,
    sach_id INT NOT NULL,
    so_luong INT NOT NULL,
    don_gia INT NOT NULL,
    PRIMARY KEY (hoa_don_id, sach_id),
    FOREIGN KEY (hoa_don_id) REFERENCES HOA_DON(id) ON DELETE CASCADE,
    FOREIGN KEY (sach_id) REFERENCES SACH(id)
);

CREATE TABLE CHI_TIET_DON_NHAP (
    don_nhap_id INT NOT NULL,
    sach_id INT NOT NULL,
    so_luong_dat INT NOT NULL,
    so_luong_nhan INT NOT NULL,
    don_gia INT NOT NULL,
    PRIMARY KEY (don_nhap_id, sach_id),
    FOREIGN KEY (don_nhap_id) REFERENCES DON_NHAP(id) ON DELETE CASCADE,
    FOREIGN KEY (sach_id) REFERENCES SACH(id)
);

CREATE TABLE PHIEU_CHI (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    don_nhap_id INT NOT NULL UNIQUE, -- Quan hệ 1-1 với đơn nhập
    nguoi_dung_id INT NOT NULL,      -- Người lập phiếu chi
    ngay_lap DATE,
    so_tien_thanh_toan INT,
    ghi_chu VARCHAR(100),
    FOREIGN KEY (don_nhap_id) REFERENCES DON_NHAP(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES NGUOI_DUNG(id)
);