/**
 * Gom tất cả model lại 1 chỗ, dùng trong controller/service như sau:
 *   const { Sach, NguoiDung, YeuThich } = require('../models');
 */
//index.js - re-export ESM
cat > models/index.js << 'EOF'
export { default as BaseModel } from './BaseModel.js';
export { default as NguoiDung } from './NguoiDung.model.js';
export { default as NhaXuatBan } from './NhaXuatBan.model.js';
export { default as DanhMuc } from './DanhMuc.model.js';
export { default as Nhan } from './Nhan.model.js';
export { default as DiaChi } from './DiaChi.model.js';
export { default as Sach } from './Sach.model.js';
export { default as HoaDon } from './HoaDon.model.js';
export { default as DonNhap } from './DonNhap.model.js';
export { default as KhoSach } from './KhoSach.model.js';
export { default as NhanSach } from './NhanSach.model.js';
export { default as YeuThich } from './YeuThich.model.js';
export { default as SachTrongGioHang } from './SachTrongGioHang.model.js';
export { default as DanhGia } from './DanhGia.model.js';
export { default as ChiTietHoaDon } from './ChiTietHoaDon.model.js';
export { default as ChiTietDonNhap } from './ChiTietDonNhap.model.js';
export { default as PhieuChi } from './PhieuChi.model.js';
// EOF

// echo "Đã chuyển xong toàn bộ model + index.js sang ESM"
// ls -la config/ models/
// Sortie

// Đã chuyển xong toàn bộ model + index.js sang ESM
// config/:
// total 4
// drwxr-xr-x 1 claude ubuntu   0 Jun 24 11:46 .
// drwxr-xr-x 1 claude ubuntu   0 Jun 23 20:07 ..
// -rw-r--r-- 1 claude ubuntu 454 Jun 24 11:46 db.js

// models/:
// total 72
// drwxr-xr-x 1 claude ubuntu    0 Jun 23 20:07 .
// drwxr-xr-x 1 claude ubuntu    0 Jun 23 20:07 ..
// -rw-r--r-- 1 claude ubuntu 1655 Jun 23 20:07 BaseModel.js
// -rw-r--r-- 1 claude ubuntu 1086 Jun 24 11:47 ChiTietDonNhap.model.js
// -rw-r--r-- 1 claude ubuntu 1076 Jun 24 11:47 ChiTietHoaDon.model.js
// -rw-r--r-- 1 claude ubuntu 1637 Jun 24 11:47 DanhGia.model.js
// -rw-r--r-- 1 claude ubuntu  177 Jun 23 20:08 DanhMuc.model.js
// -rw-r--r-- 1 claude ubuntu  418 Jun 23 20:08 DiaChi.model.js
// -rw-r--r-- 1 claude ubuntu  606 Jun 23 20:08 DonNhap.model.js
// -rw-r--r-- 1 claude ubuntu  679 Jun 23 20:08 HoaDon.model.js
// -rw-r--r-- 1 claude ubuntu 1458 Jun 23 20:08 KhoSach.model.js
// -rw-r--r-- 1 claude ubuntu 1389 Jun 23 20:07 NguoiDung.model.js
// -rw-r--r-- 1 claude ubuntu  424 Jun 23 20:07 NhaXuatBan.model.js
// -rw-r--r-- 1 claude ubuntu  167 Jun 23 20:08 Nhan.model.js
// -rw-r--r-- 1 claude ubuntu 1252 Jun 23 20:09 NhanSach.model.js
// -rw-r--r-- 1 claude ubuntu  639 Jun 24 11:47 PhieuChi.model.js
// -rw-r--r-- 1 claude ubuntu 2166 Jun 23 20:08 Sach.model.js
// -rw-r--r-- 1 claude ubuntu 1841 Jun 23 20:09 SachTrongGioHang.model.js
// -rw-r--r-- 1 claude ubuntu 1361 Jun 23 20:09 YeuThich.model.js
// -rw-r--r-- 1 claude ubuntu 1011 Jun 24 11:47 index.js