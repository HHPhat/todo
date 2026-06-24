import pool from '../config/db.js';
/**
 * CHI_TIET_HOA_DON: khóa chính kép (hoa_don_id, sach_id), không kế thừa BaseModel.
 */
class ChiTietHoaDonModel {
    // Lấy chi tiết hóa đơn kèm tên sách
    async getByHoaDon(hoaDonId) {
        const [rows] = await pool.query(
            `SELECT ct.*, s.tieu_de, s.tac_gia
             FROM CHI_TIET_HOA_DON ct
             JOIN SACH s ON ct.sach_id = s.id
             WHERE ct.hoa_don_id = ?`,
            [hoaDonId]
        );
        return rows;
    }

    // Thêm 1 dòng chi tiết hóa đơn
    async create(hoaDonId, sachId, soLuong, donGia) {
        await pool.query(
            `INSERT INTO CHI_TIET_HOA_DON (hoa_don_id, sach_id, so_luong, don_gia)
             VALUES (?, ?, ?, ?)`,
            [hoaDonId, sachId, soLuong, donGia]
        );
        return true;
    }

    // Thêm nhiều dòng chi tiết hóa đơn cùng lúc (vd: khi tạo hóa đơn từ giỏ hàng)
    // items: [{ sach_id, so_luong, don_gia }, ...]
    async createMany(hoaDonId, items) {
        const values = items.map((item) => [
            hoaDonId,
            item.sach_id,
            item.so_luong,
            item.don_gia
        ]);
        await pool.query(
            'INSERT INTO CHI_TIET_HOA_DON (hoa_don_id, sach_id, so_luong, don_gia) VALUES ?',
            [values]
        );
        return true;
    }
}
export default new ChiTietHoaDonModel();
