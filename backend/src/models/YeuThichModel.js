import pool from '../config/db.js';
/**
 * YEU_THICH là bảng trung gian quan hệ n-n giữa NGUOI_DUNG và SACH
 * khóa chính kép (sach_id, nguoi_dung_id) nên không kế thừa BaseModel.
 */
class YeuThichModel {
    // Kiểm tra người dùng đã yêu thích sách này chưa
    async isYeuThich(sachId, nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM YEU_THICH WHERE sach_id = ? AND nguoi_dung_id = ?',
            [sachId, nguoiDungId]
        );
        return rows.length > 0;
    }

    async LikeNumber(sachId) {
        const [rows] = await pool.query(
            'SELECT COUNT(*) as total_likes FROM YEU_THICH WHERE sach_id = ?',
            [sachId]
        );
        return rows[0].total_likes;
    }

    // Thêm vào yêu thích
    async add(sachId, nguoiDungId) {
        await pool.query(
            'INSERT INTO YEU_THICH (sach_id, nguoi_dung_id) VALUES (?, ?)',
            [sachId, nguoiDungId]
        );
        return true;
    }

    // Bỏ yêu thích
    async remove(sachId, nguoiDungId) {
        const [result] = await pool.query(
            'DELETE FROM YEU_THICH WHERE sach_id = ? AND nguoi_dung_id = ?',
            [sachId, nguoiDungId]
        );
        return result.affectedRows;
    }

    // Lấy danh sách sách mà 1 người dùng đã yêu thích
    async getSachByNguoiDung(nguoiDungId) {
        const [rows] = await pool.query(
            `SELECT s.* FROM SACH s
             JOIN YEU_THICH yt ON s.id = yt.sach_id
             WHERE yt.nguoi_dung_id = ?`,
            [nguoiDungId]
        );
        return rows;
    }

    // Lấy danh sách người dùng đã yêu thích 1 sách
    async getNguoiDungBySach(sachId) {
        const [rows] = await pool.query(
            `SELECT u.* FROM NGUOI_DUNG u
             JOIN YEU_THICH yt ON u.id = yt.nguoi_dung_id
             WHERE yt.sach_id = ?`,
            [sachId]
        );
        return rows;
    }
}
export default new YeuThichModel();
//module.exports = new YeuThichModel();