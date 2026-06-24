import pool from '../config/db.js';
import BaseModel from './BaseModel.js';

class NguoiDungModel extends BaseModel {
    constructor() {
        super('NGUOI_DUNG', 'id');
    }

    // Tìm người dùng theo email - dùng cho đăng nhập / kiểm tra trùng khi đăng ký
    async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM NGUOI_DUNG WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    }

    // Lấy danh sách người dùng theo vai trò (vd: 'admin', 'khach_hang'...)
    async findByRole(role) {
        const [rows] = await pool.query(
            'SELECT * FROM NGUOI_DUNG WHERE role = ?',
            [role]
        );
        return rows;
    }

    // Khóa / mở khóa tài khoản
    async updateTrangThai(id, trangThai) {
        const [result] = await pool.query(
            'UPDATE NGUOI_DUNG SET trang_thai = ? WHERE id = ?',
            [trangThai, id]
        );
        return result.affectedRows;
    }

    // Đổi mật khẩu (password truyền vào nên đã được hash sẵn ở service)
    async updatePassword(id, hashedPassword) {
        const [result] = await pool.query(
            'UPDATE NGUOI_DUNG SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );
        return result.affectedRows;
    }
}

export default  new NguoiDungModel();