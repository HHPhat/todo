import express from 'express';
import {
    getAllNguoiDung,
    getNguoiDungById,
    createNguoiDung,
    updateNguoiDung,
    deleteNguoiDung,
    updateTrangThaiNguoiDung
} from '../controllers/NguoiDung_Controller.js';

const router = express.Router();

router.get('/', getAllNguoiDung);
router.get('/:id', getNguoiDungById);
router.post('/', createNguoiDung);
router.put('/:id', updateNguoiDung);
router.delete('/:id', deleteNguoiDung);
router.patch('/:id/trang-thai', updateTrangThaiNguoiDung);

export default router;