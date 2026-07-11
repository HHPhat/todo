import express from "express";
import NguoiDung from './routes/NguoiDungRouters.js';
import Sach from './routes/SachRouters.js';
import DanhMuc from './routes/DanhMucRouters.js';
// dns.setServers(['8.8.8.8', '8.8.4.4']);
import { connectDB } from "./config/db.js";
import cors from 'cors';
import yeuThichRouter from './routes/YeuThichRouters.js';

const app = express();
connectDB();
//middleware
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json()); 
app.use("/api/book",Sach);
app.use("/api/Category",DanhMuc);
app.use('/api/favorites', yeuThichRouter);
app.use("/api/user",NguoiDung);
app.listen(5001,() => {
    console.log("Server dang bat dau tren cong 5001");    
});
//phia duoi dong author ben package.json tra ve dong nay neu co loi gi lien quan "type": "commonjs",
