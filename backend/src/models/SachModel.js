//const pool = require('../config/db.js');
import pool from '../config/db.js';
import BaseModel from './BaseModel.js';
//const BaseModel = require('./BaseModel');

class SachModel extends BaseModel {
    constructor() {
        super('SACH', 'id');
    }

    // Lấy 1 sách kèm tên danh mục, tên nhà xuất bản (JOIN)
    async findByIdWithDetail(id) {
        const [rows] = await pool.query(
            `SELECT s.*, dm.ten_danh_muc, nxb.ten_nxb
             FROM SACH s
             JOIN DANH_MUC dm ON s.danh_muc_id = dm.id
             JOIN NHA_XUAT_BAN nxb ON s.nxb_id = nxb.id
             WHERE s.id = ?`,
            [id]
        );
        return rows[0] || null;
    }

    // Lấy danh sách sách kèm tên danh mục / nhà xuất bản, sách mới nhất trước
    async findAllWithDetail() {
        const [rows] = await pool.query(
            `SELECT s.*, dm.ten_danh_muc, nxb.ten_nxb
             FROM SACH s
             JOIN DANH_MUC dm ON s.danh_muc_id = dm.id
             JOIN NHA_XUAT_BAN nxb ON s.nxb_id = nxb.id
             ORDER BY s.ngay_dang DESC`
        );
        return rows;
    }

    async getbookstat() {
        const [rows] = await pool.query(
            `select * from book_stats`
        );
        return rows;
    }

    async getbookquantity() {
        const [rows] = await pool.query(
            `select * from view_quan_ly_kho_sach`
        );
        return rows;
    }

    // Lấy sách theo danh mục
    async findByDanhMuc(danhMucId) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH WHERE danh_muc_id = ?',
            [danhMucId]
        );
        return rows;
    }

    async findByDanhMuc20(danhMucId) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH WHERE danh_muc_id = ? limit 20',
            [danhMucId]
        );
        return rows;
    }

    // Lấy sách theo nhà xuất bản
    async findByNxb(nxbId) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH WHERE nxb_id = ?',
            [nxbId]
        );
        return rows;
    }

    // Tìm kiếm sách theo tiêu đề hoặc tác giả
    async search(keyword) {
        const [rows] = await pool.query(
            `SELECT * FROM SACH WHERE tieu_de LIKE ? OR tac_gia LIKE ?`,
            [`%${keyword}%`, `%${keyword}%`]
        );
        return rows;
    }

    // Tăng số lượt thích (khi người dùng yêu thích sách)
    async increaseLuotThich(id) {
        const [result] = await pool.query(
            'UPDATE SACH SET luot_thich = luot_thich + 1 WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }

    // Giảm số lượt thích (khi bỏ yêu thích), không cho âm
    async decreaseLuotThich(id) {
        const [result] = await pool.query(
            'UPDATE SACH SET luot_thich = GREATEST(luot_thich - 1, 0) WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }

    // Lấy danh sách sách nổi bật (nhiều lượt thích nhất)
    async findNoiBat(limit = 10) {
        const [rows] = await pool.query(
            'SELECT * FROM SACH ORDER BY luot_thich DESC LIMIT ?',
            [limit]
        );
        return rows;
    }
}
export default new SachModel();
//module.exports = new SachModel();