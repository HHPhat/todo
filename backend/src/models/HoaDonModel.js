import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class HoaDonModel extends BaseModel {
    constructor() {
        super('HOA_DON', 'id');
    }

    // Lấy danh sách hóa đơn của 1 người dùng, mới nhất trước
    async findByNguoiDung(nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM HOA_DON WHERE nguoi_dung_id = ? ORDER BY ngay_tao_hoa_don DESC',
            [nguoiDungId]
        );
        return rows;
    }

    // Cập nhật trạng thái hóa đơn (vd: chờ xử lý / đã giao / đã hủy...)
    async updateTrangThai(id, trangThai) {
        const [result] = await pool.query(
            'UPDATE HOA_DON SET trang_thai = ? WHERE id = ?',
            [trangThai, id]
        );
        return result.affectedRows;
    }
}
export default new HoaDonModel();