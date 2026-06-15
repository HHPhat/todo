export const GetAllTasks = (request, response) => {
    response.status(200).send("bạn có một việc cần làm");
}

export const CreateTasks = (req,res) => {
    response.status(201).json({ message: "Task mới đã được thêm thành công."});
}

export const UpdateTasks = (req,res) => {
    response.status(202).json({ message: "Task đã được update thành công."});
}

export const DeleteTasks = (req,res) => {
    response.status(203).json({ message: "Task đã được xóa thành công."});
}