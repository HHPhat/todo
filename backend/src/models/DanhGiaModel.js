import pool from '../config/db.js';
/**
 * DANH_GIA: khóa chính kép (sach_id, nguoi_dung_id) - mỗi người chỉ đánh giá
 * 1 lần cho mỗi sách, nên không kế thừa BaseModel.
 */
class DanhGiaModel {
    // Lấy tất cả đánh giá của 1 sách (kèm tên người đánh giá), mới nhất trước
    async getBySach(sachId) {
        const [rows] = await pool.query(
            `SELECT dg.*, u.ho_va_ten
             FROM DANH_GIA dg
             JOIN NGUOI_DUNG u ON dg.nguoi_dung_id = u.id
             WHERE dg.sach_id = ?
             ORDER BY dg.thoi_gian DESC`,
            [sachId]
        );
        return rows;
    }

    // Lấy đánh giá của 1 người dùng cho 1 sách cụ thể
    async findOne(sachId, nguoiDungId) {
        const [rows] = await pool.query(
            'SELECT * FROM DANH_GIA WHERE sach_id = ? AND nguoi_dung_id = ?',
            [sachId, nguoiDungId]
        );
        return rows[0] || null;
    }

    // Thêm hoặc cập nhật đánh giá (mỗi người chỉ có 1 đánh giá / sách)
    async upsert(sachId, nguoiDungId, sao, noiDungDanhGia) {
        await pool.query(
            `INSERT INTO DANH_GIA (sach_id, nguoi_dung_id, sao, noi_dung_danh_gia)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                sao = ?, noi_dung_danh_gia = ?, thoi_gian = CURRENT_TIMESTAMP`,
            [sachId, nguoiDungId, sao, noiDungDanhGia, sao, noiDungDanhGia]
        );
        return true;
    }

    // Xóa đánh giá
    async remove(sachId, nguoiDungId) {
        const [result] = await pool.query(
            'DELETE FROM DANH_GIA WHERE sach_id = ? AND nguoi_dung_id = ?',
            [sachId, nguoiDungId]
        );
        return result.affectedRows;
    }

    // Tính điểm đánh giá trung bình & tổng số lượt đánh giá của 1 sách
    async getThongKe(sachId) {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS so_luot_danh_gia, ROUND(AVG(sao), 1) AS diem_trung_binh
             FROM DANH_GIA
             WHERE sach_id = ?`,
            [sachId]
        );
        return rows[0];
    }
}
export default new DanhGiaModel();
