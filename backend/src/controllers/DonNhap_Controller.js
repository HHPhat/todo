import DonNhap from '../models/DonNhapModel.js';

// [GET] /api/donnhap
export const getAllDonNhap = async (req, res) => {
    try {
        const list = await DonNhap.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/donnhap/nhaxuatban/:nxbId
export const getDonNhapByNxb = async (req, res) => {
    try {
        const list = await DonNhap.findByNxb(req.params.nxbId);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/donnhap/nguoidung/:nguoiDungId
export const getDonNhapByNguoiDung = async (req, res) => {
    try {
        const list = await DonNhap.findByNguoiDung(req.params.nguoiDungId);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [GET] /api/donnhap/:id
export const getDonNhapById = async (req, res) => {
    try {
        const donNhap = await DonNhap.findById(req.params.id);
        if (!donNhap) return res.status(404).json({ message: 'Không tìm thấy đơn nhập' });
        res.status(200).json(donNhap);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [POST] /api/donnhap
export const createDonNhap = async (req, res) => {
    try {
        const { nxb_id, nguoi_dung_id, ngay_tao, VAT, tong_tien, tong_gia_tri_phieu_nhap, chung_tu_goc } = req.body;
        if (!nxb_id || !nguoi_dung_id) {
            return res.status(400).json({ message: 'nxb_id và nguoi_dung_id là bắt buộc' });
        }
        const newId = await DonNhap.create({ nxb_id, nguoi_dung_id, ngay_tao, VAT, tong_tien, tong_gia_tri_phieu_nhap, chung_tu_goc });
        res.status(201).json({ message: 'Tạo đơn nhập thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/donnhap/:id
export const updateDonNhap = async (req, res) => {
    try {
        const donNhap = await DonNhap.findById(req.params.id);
        if (!donNhap) return res.status(404).json({ message: 'Không tìm thấy đơn nhập' });
        const { nxb_id, ngay_tao, VAT, tong_tien, tong_gia_tri_phieu_nhap, chung_tu_goc } = req.body;
        await DonNhap.update(req.params.id, { nxb_id, ngay_tao, VAT, tong_tien, tong_gia_tri_phieu_nhap, chung_tu_goc });
        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/donnhap/:id
export const deleteDonNhap = async (req, res) => {
    try {
        const affected = await DonNhap.delete(req.params.id);
        if (affected === 0) return res.status(404).json({ message: 'Không tìm thấy đơn nhập' });
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};