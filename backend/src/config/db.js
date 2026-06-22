// Nhập thư viện mysql2 hỗ trợ promise
import mysql from 'mysql2/promise';

// Tạo Connection Pool kết nối đến database 'book'
export const pool = mysql.createPool({
    host: 'localhost',       
    user: 'root',            
    password: '',            
    database: 'book',        
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0
});

// Hàm kiểm tra kết nối
export const connectDB = async()=> {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Kết nối đến CSDL "book" thành công!');
        connection.release(); 
    } catch (error) {
        console.error('❌ Lỗi kết nối CSDL:', error.message);
    }
};

// Chạy hàm kiểm tra
//testConnection();
// Xuất pool để dùng ở các file khác (ví dụ: controllers, models)
//module.exports = pool;
//mongodb+srv://phatb2203463:Nu2QCgChHDzka7Z8@todo-shard-00-00.4vmiryz.mongodb.net/dev?retryWrites=true&w=majority&appname=ToDo
//mongodb://phatb2203463_db_user:Nu2QCgChHDzka7Z8@todo-shard-00-00.4vmiryz.mongodb.net:27017,todo-shard-00-01.4vmiryz.mongodb.net:27017,todo-shard-00-02.4vmiryz.mongodb.net:27017/todo?tls=true&replicaSet=atlas-4vmiryz-shard-0&authSource=admin&retryWrites=true&w=majority
