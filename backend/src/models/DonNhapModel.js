import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class DonNhapModel extends BaseModel {
    constructor() {
        super('DON_NHAP', 'id');
    }

    // Lấy danh sách đơn nhập theo nhà xuất bản
    async findByNxb(nxbId) {
        const [rows] = await pool.query(
            'SELECT * FROM DON_NHAP WHERE nxb_id = ?',
            [nxbId]
        );
        return rows;
    }

    // Lấy danh sách đơn nhập do 1 người dùng (nhân viên) tạo
    async findByNguoiDung(nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM DON_NHAP WHERE nguoi_dung_id = ?',
            [nguoiDungId]
        );
        return rows;
    }
}
export default new DonNhapModel();
