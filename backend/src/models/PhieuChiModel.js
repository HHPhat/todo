import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class PhieuChiModel extends BaseModel {
    constructor() {
        // Lưu ý: khóa chính của bảng này được khai báo là "ID" (chữ hoa) trong SQL gốc
        super('PHIEU_CHI', 'ID');
    }

    // Lấy phiếu chi theo đơn nhập (quan hệ 1-1: mỗi đơn nhập chỉ có 1 phiếu chi)
    async findByDonNhap(donNhapId) {
        const [rows] = await pool.query(
            'SELECT * FROM PHIEU_CHI WHERE don_nhap_id = ?',
            [donNhapId]
        );
        return rows[0] || null;
    }

    // Lấy danh sách phiếu chi do 1 người dùng lập
    async findByNguoiDung(nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM PHIEU_CHI WHERE nguoi_dung_id = ?',
            [nguoiDungId]
        );
        return rows;
    }
}
export default new PhieuChiModel();
