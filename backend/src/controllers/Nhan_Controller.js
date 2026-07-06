import Nhan from '../models/NhanModel.js';

// [GET] /api/nhan
export const getAllNhan = async (req, res) => {
    try {
        const list = await Nhan.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/nhan/:id
export const getNhanById = async (req, res) => {
    try {
        const nhan = await Nhan.findById(req.params.id);
        if (!nhan) return res.status(404).json({ message: 'Không tìm thấy nhãn' });
        res.status(200).json(nhan);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/nhan
export const createNhan = async (req, res) => {
    try {
        const { ten_nhan, mo_ta } = req.body;
        if (!ten_nhan) return res.status(400).json({ message: 'Tên nhãn là bắt buộc' });
        const newId = await Nhan.create({ ten_nhan, mo_ta });
        res.status(201).json({ message: 'Tạo nhãn thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/nhan/:id
export const updateNhan = async (req, res) => {
    try {
        const nhan = await Nhan.findById(req.params.id);
        if (!nhan) return res.status(404).json({ message: 'Không tìm thấy nhãn' });
        const { ten_nhan, mo_ta } = req.body;
        await Nhan.update(req.params.id, { ten_nhan, mo_ta });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/nhan/:id
export const deleteNhan = async (req, res) => {
    try {
        const affected = await Nhan.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy nhãn' });
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};