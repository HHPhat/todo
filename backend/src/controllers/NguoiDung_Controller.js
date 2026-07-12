import NguoiDungModel from '../models/NguoiDungModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// [POST] /api/users/register
export const register = async (req, res) => {
    try {
        const { email, ho_ten, password, confirmPassword } = req.body;

        // 1. Kiểm tra đầu vào cơ bản
        if (!email || !ho_ten || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng điền đủ thông tin!" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Mật khẩu nhập lại không khớp!" });
        }

        // 2. Kiểm tra email đã tồn tại chưa (Dùng hàm bạn đã viết)
        const existingUser = await NguoiDungModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email này đã được đăng ký!" });
        }

        // 3. Hash mật khẩu bằng bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Lưu vào Database (Dùng hàm create bạn đã viết)
        const newUser = {
            email: email,
            ho_va_ten: ho_ten,
            password: hashedPassword 
        };
        await NguoiDungModel.create(newUser);

        // --- ĐOẠN THÊM MỚI ---
        // Lấy lại thông tin user vừa tạo để lấy được ID của họ
        const createdUser = await NguoiDungModel.findByEmail(email);
        
        // Tạo luôn token đăng nhập cho user vừa đăng ký
        const token = jwt.sign({ id: createdUser.id || createdUser._id, email: createdUser.email }, 'secret_key', { expiresIn: '1d' });

        return res.status(201).json({ 
            success: true, 
            message: "Đăng ký thành công!",
            token: token,
            user: {
                id: user.id,
                email: createdUser.email,
                ho_va_ten: createdUser.ho_va_ten
            }
        });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// [POST] /api/users/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập Email và Mật khẩu!" });
        }

        // 1. Tìm user theo email
        const user = await NguoiDungModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "Tài khoản không tồn tại!" });
        }

        // 2. So sánh mật khẩu nhập vào với mật khẩu đã hash trong CSDL
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Sai mật khẩu!" });
        }

        // 3. Tạo Token (để Frontend lưu lại duy trì phiên đăng nhập)
        // 'secret_key' nên được lưu trong file .env
        const token = jwt.sign({ id: user.id || user._id, email: user.email }, 'secret_key', { expiresIn: '1d' });

        return res.status(200).json({ 
            success: true, 
            message: "Đăng nhập thành công!",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                ho_va_ten: user.ho_ten
            }
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

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