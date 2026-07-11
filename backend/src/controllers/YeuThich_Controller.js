import YeuThichModel from '../models/YeuThichModel.js';

// 1. Kiểm tra xem người dùng đã yêu thích sách này chưa
export const checkYeuThich = async (req, res) => {
    try {
        const { sachId, nguoiDungId } = req.params;

        if (!sachId || !nguoiDungId) {
            return res.status(400).json({ success: false, message: "Thiếu sachId hoặc nguoiDungId" });
        }

        const isLiked = await YeuThichModel.isYeuThich(sachId, nguoiDungId);
        return res.status(200).json({ success: true, isLiked });
    } catch (error) {
        console.error("Lỗi khi kiểm tra yêu thích:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 2. Thêm sách vào danh sách yêu thích
export const addYeuThich = async (req, res) => {
    try {
        const { sachId, nguoiDungId } = req.body;

        if (!sachId || !nguoiDungId) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đủ sachId và nguoiDungId" });
        }

        // Kiểm tra xem đã yêu thích trước đó chưa để tránh lỗi trùng lặp
        const isLiked = await YeuThichModel.isYeuThich(sachId, nguoiDungId);
        if (isLiked) {
            return res.status(400).json({ success: false, message: "Sách này đã có trong danh sách yêu thích!" });
        }

        await YeuThichModel.add(sachId, nguoiDungId);
        return res.status(201).json({ success: true, message: "Đã thêm vào danh sách yêu thích!" });
    } catch (error) {
        console.error("Lỗi khi thêm yêu thích:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 3. Xóa sách khỏi danh sách yêu thích
export const removeYeuThich = async (req, res) => {
    try {
        const { sachId, nguoiDungId } = req.params;

        if (!sachId || !nguoiDungId) {
            return res.status(400).json({ success: false, message: "Thiếu sachId hoặc nguoiDungId" });
        }

        const affectedRows = await YeuThichModel.remove(sachId, nguoiDungId);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy dữ liệu yêu thích để xóa!" });
        }

        return res.status(200).json({ success: true, message: "Đã xóa khỏi danh sách yêu thích!" });
    } catch (error) {
        console.error("Lỗi khi xóa yêu thích:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 4. Lấy danh sách Sách mà 1 Người dùng đã yêu thích
export const getSachYeuThichByNguoiDung = async (req, res) => {
    try {
        const { nguoiDungId } = req.params;

        if (!nguoiDungId) {
            return res.status(400).json({ success: false, message: "Thiếu nguoiDungId" });
        }

        const books = await YeuThichModel.getSachByNguoiDung(nguoiDungId);
        return res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error("Lỗi khi lấy sách yêu thích:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 5. Lấy danh sách Người dùng đã yêu thích 1 Cuốn sách
export const getNguoiDungYeuThichBySach = async (req, res) => {
    try {
        const { sachId } = req.params;

        if (!sachId) {
            return res.status(400).json({ success: false, message: "Thiếu sachId" });
        }

        const users = await YeuThichModel.getNguoiDungBySach(sachId);
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Lỗi khi lấy người dùng yêu thích sách:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

export const getLikeNumberBySach = async (req, res) => {
    try {
        const { sachId } = req.params;

        if (!sachId) {
            return res.status(400).json({ success: false, message: "Thiếu sachId" });
        }

        // Gọi hàm LikeNumber từ Model
        const totalLikes = await YeuThichModel.LikeNumber(sachId);
        
        return res.status(200).json({ 
            success: true, 
            sachId: sachId,
            total_likes: totalLikes 
        });
    } catch (error) {
        console.error("Lỗi khi đếm số lượt thích:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};