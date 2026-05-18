import express, { response } from "express";

const app = express();

app.listen(5001,() => {
    console.log("Server dang bat dau tren cong 5001");    
});
//phia duoi dong author ben package.json tra ve dong nay neu co loi gi lien quan "type": "commonjs",

app.get("/api/tasks", (request, response) => {
    response.status(200).send("bạn có một việc cần làm");
} );

app.post("/api/tasks", (req,res) => {
    response.status(201).json({ message: "Task mới đã được thêm thành công."});
});

app.put("/api/tasks/:id", (req,res) => {
    response.status(202).json({ message: "Task đã được update thành công."});
});

app.delete("/api/tasks/:id", (req,res) => {
    response.status(203).json({ message: "Task đã được xóa thành công."});
}); 