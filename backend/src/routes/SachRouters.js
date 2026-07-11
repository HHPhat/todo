import express from 'express';
import {
    getAllSach,
    getSachNoiBat,
    get20Sach,
    searchSach,
    getSachByDanhMuc,
    getSachByNxb,
    getSachById,
    deleteSach,
    updateSach,
    createSach,
    getSachByDanhMuc20,
    getBookStats,
    getBookQuantity
} from '../controllers/Sach_Controller.js';

const router = express.Router();
router.get("/getbookquantity", getBookQuantity);
router.get("/getbookstats", getBookStats);
router.get("/", getAllSach);
router.get("/get-20", get20Sach);
router.get("/?query", searchSach);
router.get("/danhmuc/:id", getSachByDanhMuc);
router.get("/danhmuc20/:id", getSachByDanhMuc20);
router.get("/nxb/:id", getSachByNxb);
router.get("/:id", getSachById);
//dung send thi nhan bat ki kieu du lieu nao
router.post("", createSach);
//dung json phải viết kiểu json la ({})
router.put("/:id", updateSach);

router.delete("/:id", deleteSach); 

export default router;