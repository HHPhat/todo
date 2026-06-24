import pool from '../config/db.js';
/**
 * NHAN_SACH là bảng trung gian quan hệ n-n giữa SACH và NHAN
 * khóa chính kép (sach_id, nhan_id) nên không kế thừa BaseModel.
 */
class NhanSachModel {
    // Lấy danh sách nhãn của 1 sách
    async getNhanBySach(sachId) {
        const [rows] = await pool.query(
            `SELECT n.* FROM NHAN n
             JOIN NHAN_SACH ns ON n.id = ns.nhan_id
             WHERE ns.sach_id = ?`,
            [sachId]
        );
        return rows;
    }

    // Lấy danh sách sách thuộc 1 nhãn
    async getSachByNhan(nhanId) {
        const [rows] = await pool.query(
            `SELECT s.* FROM SACH s
             JOIN NHAN_SACH ns ON s.id = ns.sach_id
             WHERE ns.nhan_id = ?`,
            [nhanId]
        );
        return rows;
    }

    // Gắn 1 nhãn cho sách
    async add(sachId, nhanId) {
        await pool.query(
            'INSERT INTO NHAN_SACH (sach_id, nhan_id) VALUES (?, ?)',
            [sachId, nhanId]
        );
        return true;
    }

    // Bỏ 1 nhãn khỏi sách
    async remove(sachId, nhanId) {
        const [result] = await pool.query(
            'DELETE FROM NHAN_SACH WHERE sach_id = ? AND nhan_id = ?',
            [sachId, nhanId]
        );
        return result.affectedRows;
    }

    // Xóa toàn bộ nhãn của 1 sách (dùng khi cập nhật lại danh sách nhãn cho sách)
    async removeAllBySach(sachId) {
        const [result] = await pool.query(
            'DELETE FROM NHAN_SACH WHERE sach_id = ?',
            [sachId]
        );
        return result.affectedRows;
    }
}
export default new NhanSachModel();
