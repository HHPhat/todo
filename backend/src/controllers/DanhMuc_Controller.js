import DanhMuc from '../models/DanhMucModel.js';

// [GET] /api/danhmuc
export const getAllDanhMuc = async (req, res) => {
    try {
        const list = await DanhMuc.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/danhmuc/:id
export const getDanhMucById = async (req, res) => {
    try {
        const dm = await DanhMuc.findById(req.params.id);
        if (!dm) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        res.status(200).json(dm);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/danhmuc
export const createDanhMuc = async (req, res) => {
    try {
        const { ten_danh_muc, mo_ta } = req.body;
        if (!ten_danh_muc) return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
        const newId = await DanhMuc.create({ ten_danh_muc, mo_ta });
        res.status(201).json({ message: 'Tạo danh mục thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/danhmuc/:id
export const updateDanhMuc = async (req, res) => {
    try {
        const dm = await DanhMuc.findById(req.params.id);
        if (!dm) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        const { ten_danh_muc, mo_ta } = req.body;
        await DanhMuc.update(req.params.id, { ten_danh_muc, mo_ta });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/danhmuc/:id
export const deleteDanhMuc = async (req, res) => {
    try {
        const affected = await DanhMuc.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
