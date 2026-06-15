import express from "express";
import taskRoute from './routes/tasksRouters.js';

const app = express();

app.use("/api/tasks",taskRoute)

app.listen(5001,() => {
    console.log("Server dang bat dau tren cong 5001");    
});
//phia duoi dong author ben package.json tra ve dong nay neu co loi gi lien quan "type": "commonjs",
