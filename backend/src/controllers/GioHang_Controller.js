import SachTrongGioHangModel from '../models/SachTrongGioHangModel.js';

// 1. Lấy toàn bộ giỏ hàng của 1 người dùng
export const getGioHang = async (req, res) => {
    try {
        const { nguoiDungId } = req.params;

        if (!nguoiDungId) {
            return res.status(400).json({ success: false, message: "Thiếu nguoiDungId" });
        }

        const cartItems = await SachTrongGioHangModel.getGioHang(nguoiDungId);
        return res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 2. Kiểm tra sách đã có trong giỏ hàng chưa
export const checkGioHang = async (req, res) => {
    try {
        const { nguoiDungId, sachId } = req.params;

        if (!nguoiDungId || !sachId) {
            return res.status(400).json({ success: false, message: "Thiếu tham số" });
        }

        const isExist = await SachTrongGioHangModel.isGioHang(sachId, nguoiDungId);
        const itemDetail = await SachTrongGioHangModel.findItem(nguoiDungId, sachId);

        return res.status(200).json({ 
            success: true, 
            isExist,
            data: itemDetail
        });
    } catch (error) {
        console.error("Lỗi khi kiểm tra sách trong giỏ:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 3. Thêm sách vào giỏ hàng (nếu có rồi sẽ tự cộng dồn số lượng)
export const addItemToCart = async (req, res) => {
    try {
        const { nguoiDungId, sachId, soLuong } = req.body;

        if (!nguoiDungId || !sachId) {
            return res.status(400).json({ success: false, message: "Thiếu nguoiDungId hoặc sachId" });
        }

        await SachTrongGioHangModel.addItem(nguoiDungId, sachId, soLuong || 1);
        return res.status(201).json({ success: true, message: "Đã thêm vào giỏ hàng thành công!" });
    } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 4. Cập nhật số lượng chính xác của 1 sách trong giỏ
export const updateSoLuong = async (req, res) => {
    try {
        const { nguoiDungId, sachId } = req.params;
        const { soLuong } = req.body;

        if (!nguoiDungId || !sachId || soLuong === undefined) {
            return res.status(400).json({ success: false, message: "Thiếu tham số hoặc soLuong" });
        }

        const affectedRows = await SachTrongGioHangModel.updateSoLuong(nguoiDungId, sachId, soLuong);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm trong giỏ để cập nhật" });
        }

        return res.status(200).json({ success: true, message: "Cập nhật số lượng thành công!" });
    } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 5. Xóa 1 sách khỏi giỏ hàng
export const removeItem = async (req, res) => {
    try {
        const { nguoiDungId, sachId } = req.params;

        if (!nguoiDungId || !sachId) {
            return res.status(400).json({ success: false, message: "Thiếu tham số" });
        }

        const affectedRows = await SachTrongGioHangModel.removeItem(nguoiDungId, sachId);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm để xóa" });
        }

        return res.status(200).json({ success: true, message: "Đã xóa sản phẩm khỏi giỏ hàng!" });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm trong giỏ:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 6. Xóa toàn bộ giỏ hàng (Khi thanh toán thành công)
export const clearGioHang = async (req, res) => {
    try {
        const { nguoiDungId } = req.params;

        if (!nguoiDungId) {
            return res.status(400).json({ success: false, message: "Thiếu nguoiDungId" });
        }

        await SachTrongGioHangModel.clearGioHang(nguoiDungId);
        
        return res.status(200).json({ success: true, message: "Đã dọn dẹp toàn bộ giỏ hàng!" });
    } catch (error) {
        console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};