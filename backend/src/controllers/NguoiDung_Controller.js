import NguoiDungModel from '../models/NguoiDungModel.js';

export const getNguoiDungById = async (req, res) => {
    try {
        const { id } = req.params;
        const nguoiDung = await NguoiDung.findById(id);

        if (!nguoiDung) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.status(200).json(nguoiDung);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};