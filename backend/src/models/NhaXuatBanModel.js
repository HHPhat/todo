import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class NhaXuatBanModel extends BaseModel {
    constructor() {
        super('NHA_XUAT_BAN', 'id');
    }

    // Tìm nhà xuất bản theo tên (tìm gần đúng)
    async findByTen(tenNxb) {
        const [rows] = await pool.query(
            'SELECT * FROM NHA_XUAT_BAN WHERE ten_nxb LIKE ?',
            [`%${tenNxb}%`]
        );
        return rows;
    }
}

export default new NhaXuatBanModel();
