import HoaDon from '../models/HoaDonModel.js';

// [GET] /api/hoadon
export const getAllHoaDon = async (req, res) => {
    try {
        const list = await HoaDon.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/hoadon/nguoidung/:nguoiDungId
// Lấy danh sách hóa đơn của 1 người dùng
export const getHoaDonByNguoiDung = async (req, res) => {
    try {
        const list = await HoaDon.findByNguoiDung(req.params.nguoiDungId);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/hoadon/:id
export const getHoaDonById = async (req, res) => {
    try {
        const hoaDon = await HoaDon.findById(req.params.id);
        if (!hoaDon) return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
        res.status(200).json(hoaDon);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/hoadon
export const createHoaDon = async (req, res) => {
    try {
        const { nguoi_dung_id, payment_order_id, trang_thai, thue_GTGT, tong_gia_tri } = req.body;
        if (!nguoi_dung_id) return res.status(400).json({ message: 'nguoi_dung_id là bắt buộc' });
        const newId = await HoaDon.create({
            nguoi_dung_id, payment_order_id,
            trang_thai: trang_thai ?? 0,
            thue_GTGT, tong_gia_tri
        });
        res.status(201).json({ message: 'Tạo hóa đơn thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PATCH] /api/hoadon/:id/trang-thai
// Cập nhật trạng thái hóa đơn (vd: chờ xử lý / đang giao / hoàn thành / đã hủy)
export const updateTrangThaiHoaDon = async (req, res) => {
    try {
        const { trang_thai } = req.body;
        if (trang_thai === undefined) {
            return res.status(400).json({ message: 'Thiếu trường trang_thai' });
        }
        await HoaDon.updateTrangThai(req.params.id, trang_thai);
        res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/hoadon/:id
export const deleteHoaDon = async (req, res) => {
    try {
        const affected = await HoaDon.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
        res.status(200).json({ message: 'Xóa hóa đơn thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

