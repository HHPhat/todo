import NguoiDungModel from '../models/NguoiDungModel.js';

export const getNguoiDungById = async (req, res) => {
    try {
        const { id } = req.params;
        const nguoiDung = await NguoiDungModel.findById(id);

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        res.status(200).json(nguoiDung);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


// [GET] /api/nguoidung
// Lấy danh sách toàn bộ người dùng
export const getAllNguoiDung = async (req, res) => {
    try {
        const list = await NguoiDungModel.findAll();
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
// [GET] /api/nguoidung/:i
// [POST] /api/nguoidung
// Tạo người dùng mới
export const createNguoiDung = async (req, res) => {
    try {
        const { email, password, ho_va_ten, gioi_thieu, role } = req.body;

        // Kiểm tra dữ liệu đầu vào tối thiểu
        if (!email || !password) {
            return res.status(400).json({ message: 'Email và password là bắt buộc' });
        }

        // Kiểm tra email đã tồn tại chưa (tận dụng hàm findByEmail trong model)
        const daTonTai = await NguoiDungModel.findByEmail(email);
        if (daTonTai) {
            return res.status(409).json({ message: 'Email đã được sử dụng' });
        }

        // LƯU Ý: password ở đây nên được hash (vd: bcrypt) trước khi lưu xuống DB,
        // xem phần giải thích bên dưới câu trả lời.
        const newId = await NguoiDungModel.create({
            email,
            password,
            ho_va_ten,
            gioi_thieu,
            role: role || 'khach_hang',
            trang_thai: 1
        });

        res.status(201).json({ message: 'Tạo người dùng thành công', id: newId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PUT] /api/nguoidung/:id
// Cập nhật thông tin người dùng (không cập nhật email/password ở đây)
export const updateNguoiDung = async (req, res) => {
    try {
        const { id } = req.params;

        const nguoiDung = await NguoiDungModel.findById(id);
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        const { ho_va_ten, gioi_thieu, role } = req.body;
        await NguoiDungModel.update(id, { ho_va_ten, gioi_thieu, role });

        res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [DELETE] /api/nguoidung/:id
// Xóa người dùng
export const deleteNguoiDung = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await NguoiDungModel.delete(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// [PATCH] /api/nguoidung/:id/trang-thai
// Khóa / mở khóa tài khoản
export const updateTrangThaiNguoiDung = async (req, res) => {
    try {
        const { id } = req.params;
        const { trang_thai } = req.body;

        if (trang_thai === undefined) {
            return res.status(400).json({ message: 'Thiếu trường trang_thai' });
        }

        await NguoiDungModel.updateTrangThai(id, trang_thai);
        res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};