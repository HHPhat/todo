import DiaChi from '../models/DiaChiModel.js';

// [GET] /api/diachi/nguoidung/:nguoiDungId
// Lấy tất cả địa chỉ của 1 người dùng
export const getDiaChiByNguoiDung = async (req, res) => {
    try {
        const list = await DiaChi.findByNguoiDung(req.params.nguoiDungId);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/diachi/:id
export const getDiaChiById = async (req, res) => {
    try {
        const dc = await DiaChi.findById(req.params.id);
        if (!dc) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
        res.status(200).json(dc);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/diachi
export const createDiaChi = async (req, res) => {
    try {
        const { nguoi_dung_id, dia_chi_nha } = req.body;
        if (!nguoi_dung_id || !dia_chi_nha) {
            return res.status(400).json({ message: 'nguoi_dung_id và dia_chi_nha là bắt buộc' });
        }
        const newId = await DiaChi.create({ nguoi_dung_id, dia_chi_nha });
        res.status(201).json({ message: 'Thêm địa chỉ thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/diachi/:id
export const updateDiaChi = async (req, res) => {
    try {
        const dc = await DiaChi.findById(req.params.id);
        if (!dc) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
        const { dia_chi_nha } = req.body;
        await DiaChi.update(req.params.id, { dia_chi_nha });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/diachi/:id
export const deleteDiaChi = async (req, res) => {
    try {
        const affected = await DiaChi.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy địa chỉ' });
        res.status(200).json({ message: 'Xóa địa chỉ thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};