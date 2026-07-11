import pool from '../config/db.js';
/**
 * SACH_TRONG_GIO_HANG: khóa chính kép (sach_id, nguoi_dung_id)
 * nên không kế thừa BaseModel mà tự định nghĩa các hàm cho giỏ hàng.
 */
class SachTrongGioHangModel {
    // Lấy toàn bộ giỏ hàng của 1 người dùng (kèm thông tin sách)
    async getGioHang(nguoiDungId) {
        const [rows] = await pool.query(
            `SELECT g.sach_id, g.so_luong, s.tieu_de, s.gia, s.tac_gia
             FROM SACH_TRONG_GIO_HANG g
             JOIN SACH s ON g.sach_id = s.id
             WHERE g.nguoi_dung_id = ?`,
            [nguoiDungId]
        );
        return rows;
    }

    async isGioHang(sachId, nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH_TRONG_GIO_HANG WHERE sach_id = ? AND nguoi_dung_id = ?',
            [sachId, nguoiDungId]
        );
        return rows.length > 0;
    }

    // Kiểm tra 1 sách đã có trong giỏ hàng chưa
    async findItem(nguoiDungId, sachId) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH_TRONG_GIO_HANG WHERE nguoi_dung_id = ? AND sach_id = ?',
            [nguoiDungId, sachId]
        );
        return rows[0] || null;
    }

    // Thêm sách vào giỏ hàng - nếu đã có thì cộng thêm số lượng
    async addItem(nguoiDungId, sachId, soLuong = 1) {
        await pool.query(
            `INSERT INTO SACH_TRONG_GIO_HANG (sach_id, nguoi_dung_id, so_luong)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE so_luong = so_luong + ?`,
            [sachId, nguoiDungId, soLuong, soLuong]
        );
        return true;
    }

    // Cập nhật số lượng của 1 sách trong giỏ hàng
    async updateSoLuong(nguoiDungId, sachId, soLuong) {
        const [result] = await pool.query(
            'UPDATE SACH_TRONG_GIO_HANG SET so_luong = ? WHERE nguoi_dung_id = ? AND sach_id = ?',
            [soLuong, nguoiDungId, sachId]
        );
        return result.affectedRows;
    }

    // Xóa 1 sách khỏi giỏ hàng
    async removeItem(nguoiDungId, sachId) {
        const [result] = await pool.query(
            'DELETE FROM SACH_TRONG_GIO_HANG WHERE nguoi_dung_id = ? AND sach_id = ?',
            [nguoiDungId, sachId]
        );
        return result.affectedRows;
    }

    // Xóa toàn bộ giỏ hàng (vd: sau khi đặt hàng thành công)
    async clearGioHang(nguoiDungId) {
        const [result] = await pool.query(
            'DELETE FROM SACH_TRONG_GIO_HANG WHERE nguoi_dung_id = ?',
            [nguoiDungId]
        );
        return result.affectedRows;
    }
}
export default new SachTrongGioHangModel();
