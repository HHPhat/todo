import express from 'express';
import {
    checkYeuThich,
    addYeuThich,
    removeYeuThich,
    getSachYeuThichByNguoiDung,
    getNguoiDungYeuThichBySach,
    getLikeNumberBySach
} from '../controllers/YeuThich_Controller.js';

const router = express.Router();

// [GET] Lấy danh sách sách mà 1 người dùng yêu thích
router.get('/user/:nguoiDungId', getSachYeuThichByNguoiDung);

// [GET] Lấy danh sách người dùng đã yêu thích 1 cuốn sách
router.get('/book/:sachId', getNguoiDungYeuThichBySach);

// [GET] Kiểm tra xem user đã yêu thích sách chưa
router.get('/check/:nguoiDungId/:sachId', checkYeuThich);

// [POST] Thêm vào danh sách yêu thích
// Dữ liệu truyền qua req.body (sachId, nguoiDungId)
router.post('/', addYeuThich);
router.get('/count/:sachId', getLikeNumberBySach);
// [DELETE] Xóa khỏi danh sách yêu thích
router.delete('/:nguoiDungId/:sachId', removeYeuThich);

export default router;