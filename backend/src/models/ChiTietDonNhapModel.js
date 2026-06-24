import pool from '../config/db.js';

/**
 * CHI_TIET_DON_NHAP: khóa chính kép (don_nhap_id, sach_id), không kế thừa BaseModel.
 */
class ChiTietDonNhapModel {
    // Lấy chi tiết đơn nhập kèm tên sách
    async getByDonNhap(donNhapId) {
        const [rows] = await pool.query(
            `SELECT ct.*, s.tieu_de
             FROM CHI_TIET_DON_NHAP ct
             JOIN SACH s ON ct.sach_id = s.id
             WHERE ct.don_nhap_id = ?`,
            [donNhapId]
        );
        return rows;
    }

    // Thêm 1 dòng chi tiết đơn nhập
    async create(donNhapId, sachId, soLuongDat, soLuongNhan, donGia) {
        await pool.query(
            `INSERT INTO CHI_TIET_DON_NHAP
                (don_nhap_id, sach_id, so_luong_dat, so_luong_nhan, don_gia)
             VALUES (?, ?, ?, ?, ?)`,
            [donNhapId, sachId, soLuongDat, soLuongNhan, donGia]
        );
        return true;
    }

    // Cập nhật số lượng thực nhận (vd: khi hàng về kho thực tế)
    async updateSoLuongNhan(donNhapId, sachId, soLuongNhan) {
        const [result] = await pool.query(
            `UPDATE CHI_TIET_DON_NHAP SET so_luong_nhan = ?
             WHERE don_nhap_id = ? AND sach_id = ?`,
            [soLuongNhan, donNhapId, sachId]
        );
        return result.affectedRows;
    }
}
export default new ChiTietDonNhapModel();
