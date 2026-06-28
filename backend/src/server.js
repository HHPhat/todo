import express from "express";
import taskRoute from './routes/tasksRouters.js';
import NguoiDung from './routes/NguoiDungRouters.js';
// dns.setServers(['8.8.8.8', '8.8.4.4']);
import { connectDB } from "./config/db.js";

const app = express();
connectDB();
app.use(express.json());
app.use("/api/tasks",taskRoute)
app.use("/api/user",NguoiDung)
app.listen(5001,() => {
    console.log("Server dang bat dau tren cong 5001");    
});
//phia duoi dong author ben package.json tra ve dong nay neu co loi gi lien quan "type": "commonjs",
