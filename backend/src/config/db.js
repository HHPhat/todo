// Nhập thư viện mysql2 hỗ trợ promise
import mysql from 'mysql2/promise';

// Tạo Connection Pool kết nối đến database 'book'
 const pool = mysql.createPool({
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


export default pool;

