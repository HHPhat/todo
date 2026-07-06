import NhaXuatBan from '../models/NhaXuatBanModel.js';

// [GET] /api/nhaxuatban
export const getAllNhaXuatBan = async (req, res) => {
    try {
        const list = await NhaXuatBan.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/nhaxuatban/:id
export const getNhaXuatBanById = async (req, res) => {
    try {
        const nxb = await NhaXuatBan.findById(req.params.id);
        if (!nxb) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
        res.status(200).json(nxb);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/nhaxuatban/tim-kiem?ten=...
export const searchNhaXuatBan = async (req, res) => {
    try {
        const { ten } = req.query;
        if (!ten) return res.status(400).json({ message: 'Thiếu tham số ten' });
        const list = await NhaXuatBan.findByTen(ten);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/nhaxuatban
export const createNhaXuatBan = async (req, res) => {
    try {
        const { ten_nxb, ten_nguoi_dai_dien, email, sdt, dia_chi } = req.body;
        if (!ten_nxb) return res.status(400).json({ message: 'Tên nhà xuất bản là bắt buộc' });
        const newId = await NhaXuatBan.create({ ten_nxb, ten_nguoi_dai_dien, email, sdt, dia_chi });
        res.status(201).json({ message: 'Tạo nhà xuất bản thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/nhaxuatban/:id
export const updateNhaXuatBan = async (req, res) => {
    try {
        const nxb = await NhaXuatBan.findById(req.params.id);
        if (!nxb) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
        const { ten_nxb, ten_nguoi_dai_dien, email, sdt, dia_chi } = req.body;
        await NhaXuatBan.update(req.params.id, { ten_nxb, ten_nguoi_dai_dien, email, sdt, dia_chi });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/nhaxuatban/:id
export const deleteNhaXuatBan = async (req, res) => {
    try {
        const affected = await NhaXuatBan.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};