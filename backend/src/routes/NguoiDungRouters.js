import express from 'express';
import {
    getAllNguoiDung,
    getNguoiDungById,
    createNguoiDung,
    updateNguoiDung,
    deleteNguoiDung,
    updateTrangThaiNguoiDung,
    register, login
} from '../controllers/NguoiDung_Controller.js';

const router = express.Router();

router.get('/', getAllNguoiDung);
router.get('/:id', getNguoiDungById);
router.post('/', createNguoiDung);
router.put('/:id', updateNguoiDung);
router.delete('/:id', deleteNguoiDung);
router.patch('/:id/trang-thai', updateTrangThaiNguoiDung);
router.post('/register', register);
router.post('/login', login);

export default router;