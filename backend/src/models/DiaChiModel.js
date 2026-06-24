import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class DiaChiModel extends BaseModel {
    constructor() {
        super('Dia_chi', 'id');
    }

    // Lấy tất cả địa chỉ của 1 người dùng
    async findByNguoiDung(nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM Dia_chi WHERE nguoi_dung_id = ?',
            [nguoiDungId]
        );
        return rows;
    }
}
export default new DiaChiModel();
