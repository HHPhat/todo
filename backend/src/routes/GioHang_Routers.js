import express from 'express';
import {
    getGioHang,
    checkGioHang,
    addItemToCart,
    updateSoLuong,
    removeItem,
    clearGioHang
} from '../controllers/GioHang_Controller.js';

const router = express.Router();

// [GET] Lấy toàn bộ giỏ hàng của user
router.get('/user/:nguoiDungId', getGioHang);

// [GET] Kiểm tra chi tiết 1 sản phẩm đã có trong giỏ chưa
router.get('/check/:nguoiDungId/:sachId', checkGioHang);

// [POST] Thêm sản phẩm vào giỏ (Truyền nguoiDungId, sachId, soLuong qua req.body)
router.post('/', addItemToCart);

// [PUT] Cập nhật số lượng của 1 sản phẩm (Truyền soLuong qua req.body)
router.put('/update/:nguoiDungId/:sachId', updateSoLuong);

// [DELETE] Xóa 1 sản phẩm khỏi giỏ
router.delete('/:nguoiDungId/:sachId', removeItem);

// [DELETE] Dọn sạch giỏ hàng của user
router.delete('/clear/:nguoiDungId', clearGioHang);

export default router;