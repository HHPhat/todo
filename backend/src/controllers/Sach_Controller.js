import Sach from '../models/SachModel.js';

// [GET] /api/sach
// Lấy toàn bộ sách, kèm tên danh mục và tên NXB
export const getAllSach = async (req, res) => {
    try {
        const list = await Sach.findAllWithDetail();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const get20Sach = async (req, res) => {
    try {
        const list = await Sach.find20();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
// [GET] /api/sach/noi-bat?limit=10
// Lấy sách nổi bật theo lượt thích
export const getSachNoiBat = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const list = await Sach.findNoiBat(limit);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/sach/tim-kiem?keyword=...
// Tìm sách theo tiêu đề hoặc tác giả
export const searchSach = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) return res.status(400).json({ message: 'Thiếu tham số keyword' });
        const list = await Sach.search(keyword);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/sach/danhmuc/:danhMucId
// Lấy sách theo danh mục
export const getSachByDanhMuc = async (req, res) => {
    try {
        const list = await Sach.findByDanhMuc(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
export const getSachByDanhMuc20 = async (req, res) => {
    try {
        const list = await Sach.findByDanhMuc20(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
// [GET] /api/sach/nhaxuatban/:nxbId
// Lấy sách theo nhà xuất bản
export const getSachByNxb = async (req, res) => {
    try {
        const list = await Sach.findByNxb(req.params.nxbId);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/sach/:id
// Lấy 1 sách theo id, kèm tên danh mục và tên NXB
export const getSachById = async (req, res) => {
    try {
        const sach = await Sach.findByIdWithDetail(req.params.id);
        if (!sach) return res.status(404).json({ message: 'Không tìm thấy sách' });
        res.status(200).json(sach);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/sach
export const createSach = async (req, res) => {
    try {
        const { danh_muc_id, nxb_id, tieu_de, tac_gia, mo_ta, gia, trang_thai } = req.body;
        if (!danh_muc_id || !nxb_id || !tieu_de || !gia) {
            return res.status(400).json({ message: 'Thiếu các trường bắt buộc: danh_muc_id, nxb_id, tieu_de, gia' });
        }
        const newId = await Sach.create({
            danh_muc_id, nxb_id, tieu_de, tac_gia,
            mo_ta, gia, trang_thai: trang_thai ?? 1
        });
        res.status(201).json({ message: 'Thêm sách thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/sach/:id
export const updateSach = async (req, res) => {
    try {
        const sach = await Sach.findById(req.params.id);
        if (!sach) return res.status(404).json({ message: 'Không tìm thấy sách' });
        const { danh_muc_id, nxb_id, tieu_de, tac_gia, mo_ta, gia, trang_thai } = req.body;
        await Sach.update(req.params.id, { danh_muc_id, nxb_id, tieu_de, tac_gia, mo_ta, gia, trang_thai });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/sach/:id
export const deleteSach = async (req, res) => {
    try {
        const affected = await Sach.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy sách' });
        res.status(200).json({ message: 'Xóa sách thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PATCH] /api/sach/:id/luot-thich
// Tăng hoặc giảm lượt thích - body: { action: 'tang' | 'giam' }
export const updateLuotThich = async (req, res) => {
    try {
        const { action } = req.body;
        if (action === 'tang') {
            await Sach.increaseLuotThich(req.params.id);
        } else if (action === 'giam') {
            await Sach.decreaseLuotThich(req.params.id);
        } else {
            return res.status(400).json({ message: 'action phải là "tang" hoặc "giam"' });
        }
        res.status(200).json({ message: 'Cập nhật lượt thích thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
// 200 — thành công (GET, PUT, DELETE...)
// 201 — tạo thành công (POST)
// 400 — lỗi do client gửi thiếu/sai dữ liệu
// 404 — không tìm thấy
// 409 — xung đột (vd: email đã tồn tại)
// 500 — lỗi phía server