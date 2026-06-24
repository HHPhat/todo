import pool from '../config/db.js';
/**
 * KHO_SACH có khóa chính là sach_id (quan hệ 1-1 với SACH)
 * nên không kế thừa BaseModel mà tự định nghĩa các hàm cần thiết.
 */
class KhoSachModel {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM KHO_SACH');
        return rows;
    }

    // Lấy thông tin kho theo sách
    async findBySach(sachId) {
        const [rows] = await pool.query(
            'SELECT * FROM KHO_SACH WHERE sach_id = ?',
            [sachId]
        );
        return rows[0] || null;
    }

    // Tạo bản ghi kho cho 1 sách mới - data: { sach_id, stt, so_luong, vi_tri }
    async create(data) {
        await pool.query('INSERT INTO KHO_SACH SET ?', [data]);
        return data.sach_id;
    }

    // Cập nhật thông tin kho (số lượng, vị trí...) theo sach_id
    async update(sachId, data) {
        const [result] = await pool.query(
            'UPDATE KHO_SACH SET ? WHERE sach_id = ?',
            [data, sachId]
        );
        return result.affectedRows;
    }

    // Tăng số lượng trong kho (vd: khi nhập hàng về)
    async increaseSoLuong(sachId, soLuong) {
        const [result] = await pool.query(
            'UPDATE KHO_SACH SET so_luong = so_luong + ? WHERE sach_id = ?',
            [soLuong, sachId]
        );
        return result.affectedRows;
    }

    // Giảm số lượng trong kho (vd: khi bán hàng), không cho âm
    async decreaseSoLuong(sachId, soLuong) {
        const [result] = await pool.query(
            'UPDATE KHO_SACH SET so_luong = GREATEST(so_luong - ?, 0) WHERE sach_id = ?',
            [soLuong, sachId]
        );
        return result.affectedRows;
    }

    async delete(sachId) {
        const [result] = await pool.query(
            'DELETE FROM KHO_SACH WHERE sach_id = ?',
            [sachId]
        );
        return result.affectedRows;
    }
}
export default new KhoSachModel();