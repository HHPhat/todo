import SachModel from '../models/SachModel.js';

export const listAllBooks = async (req, res) => {
    try {
        const books = await BookModel.getAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};

export const GetAllTasks = (request, response) => {
    response.status(200).send("bạn có một việc cần làm");
}

export const CreateTasks = (req,res) => {
    response.status(201).json({ message: "Task mới đã được thêm thành công."});
}

export const UpdateTasks = (req,res) => {
    response.status(200).json({ message: "Task đã được update thành công."});
}

export const DeleteTasks = (req,res) => {
    response.status(200).json({ message: "Task đã được xóa thành công."});
}

// 200 — thành công (GET, PUT, DELETE...)
// 201 — tạo thành công (POST)
// 400 — lỗi do client gửi thiếu/sai dữ liệu
// 404 — không tìm thấy
// 409 — xung đột (vd: email đã tồn tại)
// 500 — lỗi phía server