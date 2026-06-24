import pool from '../config/db.js';
/**
 * BaseModel: chứa các hàm CRUD dùng chung cho các bảng có khóa chính 1 cột.
 * Các model của bảng có khóa chính kép (ví dụ NHAN_SACH, YEU_THICH...)
 * không kế thừa class này mà tự định nghĩa hàm riêng.
 */
class BaseModel {
    constructor(tableName, primaryKey = 'id') {
        this.table = tableName;
        this.pk = primaryKey;
    }

    // Lấy tất cả bản ghi
    async findAll() {
        const [rows] = await pool.query(`SELECT * FROM ${this.table}`);
        return rows;
    }

    // Lấy 1 bản ghi theo khóa chính
    async findById(id) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE ${this.pk} = ?`,
            [id]
        );
        return rows[0] || null;
    }

    // Lấy danh sách bản ghi theo điều kiện đơn giản, ví dụ: { trang_thai: 1 }
    async findWhere(conditions = {}) {
        const keys = Object.keys(conditions);
        if (keys.length === 0) return this.findAll();

        const whereClause = keys.map((k) => `${k} = ?`).join(' AND ');
        const values = keys.map((k) => conditions[k]);

        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE ${whereClause}`,
            values
        );
        return rows;
    }

    // Tạo bản ghi mới, trả về id vừa tạo (AUTO_INCREMENT)
    async create(data) {
        const [result] = await pool.query(`INSERT INTO ${this.table} SET ?`, [data]);
        return result.insertId;
    }

    // Cập nhật bản ghi theo khóa chính
    async update(id, data) {
        const [result] = await pool.query(
            `UPDATE ${this.table} SET ? WHERE ${this.pk} = ?`,
            [data, id]
        );
        return result.affectedRows;
    }

    // Xóa bản ghi theo khóa chính
    async delete(id) {
        const [result] = await pool.query(
            `DELETE FROM ${this.table} WHERE ${this.pk} = ?`,
            [id]
        );
        return result.affectedRows;
    }

    // Đếm tổng số bản ghi trong bảng
    async count() {
        const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM ${this.table}`);
        return rows[0].total;
    }
}
export default BaseModel;
//module.exports = BaseModel;