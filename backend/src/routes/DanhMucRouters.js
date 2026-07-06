import express from 'express';
import {
    getAllDanhMuc,
    getDanhMucById,
    createDanhMuc,
    updateDanhMuc,
    deleteDanhMuc
} from '../controllers/DanhMuc_Controller.js';

const router = express.Router();

router.get("/", getAllDanhMuc);
router.get("/", getDanhMucById);
//dung send thi nhan bat ki kieu du lieu nao
router.post("", createDanhMuc);
//dung json phải viết kiểu json la ({})
router.put("/:id", updateDanhMuc);

router.delete("/:id", deleteDanhMuc); 

export default router;