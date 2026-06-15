import express from 'express';
import { DeleteTasks, GetAllTasks, CreateTasks, UpdateTasks } from '../controllers/tasksControllers.js';

const router = express.Router();

router.get("/", GetAllTasks);
//dung send thi nhan bat ki kieu du lieu nao
router.post("", CreateTasks);
//dung json phải viết kiểu json la ({})
router.put("/:id", UpdateTasks);

router.delete("/:id", DeleteTasks); 

export default router;