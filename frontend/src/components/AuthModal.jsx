import React, { useState } from 'react';
import axios from 'axios';

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' hoặc 'register'
  const [showPassword, setShowPassword] = useState(false);
  
  // States cho Form
  const [formData, setFormData] = useState({
    email: '',
    ho_ten: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); // Xóa lỗi khi người dùng gõ lại
  };

  // Nút đóng modal và reset state
  const handleClose = () => {
    setFormData({ email: '', ho_ten: '', password: '', confirmPassword: '' });
    setErrorMsg('');
    setSuccessMsg('');
    onClose();
  };

  // Gọi API Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/user/login', {
        email: formData.email,
        password: formData.password
      });
      
      if (res.data.success) {
        // Lưu token vào localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        setSuccessMsg(res.data.message);
        setTimeout(() => {
          handleClose();
          window.location.reload(); // Reload để cập nhật header (hoặc dùng Context/Redux)
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Có lỗi xảy ra khi đăng nhập.");
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi API Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/user/register', formData);
      if (res.data.success) {
        // --- THÊM: Lưu state đăng nhập hệt như hàm login ---
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        setSuccessMsg(res.data.message);
        setTimeout(() => {
          handleClose(); // Đóng popup
          window.location.reload(); // Load lại trang để Homepage nhận trạng thái mới
        }, 1000);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Có lỗi xảy ra khi đăng ký.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Kiểm tra xem nút submit có nên bị mờ đi không
  const isSubmitDisabled = activeTab === 'login' 
    ? (!formData.email || !formData.password) 
    : (!formData.email || !formData.ho_ten || !formData.password || !formData.confirmPassword);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-4 text-center font-bold text-[15px] border-b-2 transition-colors ${activeTab === 'login' ? 'border-primary-container text-primary-container' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Đăng nhập
          </button>
          <button 
            className={`flex-1 py-4 text-center font-bold text-[15px] border-b-2 transition-colors ${activeTab === 'register' ? 'border-primary-container text-primary-container' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Đăng ký
          </button>
        </div>

        <div className="p-6">
          {/* Thông báo lỗi / thành công */}
          {errorMsg && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{errorMsg}</div>}
          {successMsg && <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded">{successMsg}</div>}

          <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-4">
            
            {/* Trường dùng chung (Email) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 font-medium">Số điện thoại/Email</label>
              <input 
                type="text" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập số điện thoại hoặc email" 
                className="w-full border border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2.5 text-sm outline-none transition-all"
              />
            </div>

            {/* Trường chỉ hiện ở Đăng ký (Họ Tên) */}
            {activeTab === 'register' && (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 font-medium">Họ và tên</label>
                <input 
                  type="text" 
                  name="ho_ten"
                  value={formData.ho_ten}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên" 
                  className="w-full border border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2.5 text-sm outline-none transition-all"
                />
              </div>
            )}

            {/* Trường dùng chung (Mật khẩu) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600 font-medium">Mật khẩu</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu" 
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2.5 pr-12 text-sm outline-none transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* Trường chỉ hiện ở Đăng ký (Nhập lại mật khẩu) */}
            {activeTab === 'register' && (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 font-medium">Nhập lại mật khẩu</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu" 
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded px-3 py-2.5 text-sm outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Quên mật khẩu (Chỉ đăng nhập) */}
            {activeTab === 'login' && (
              <div className="text-right mt-1">
                <a href="#" className="text-primary-container hover:underline text-sm font-medium">Quên mật khẩu?</a>
              </div>
            )}

            {/* Các nút bấm */}
            <div className="flex flex-col gap-3 mt-4">
              <button 
                type="submit" 
                disabled={isSubmitDisabled || isLoading}
                className={`w-full py-2.5 rounded font-bold transition-all ${
                  isSubmitDisabled 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary-container text-white hover:opacity-90 shadow-md'
                }`}
              >
                {isLoading ? "Đang xử lý..." : (activeTab === 'login' ? "Đăng nhập" : "Đăng ký")}
              </button>
              
              <button 
                type="button" 
                onClick={handleClose}
                className="w-full py-2.5 bg-white border border-primary-container text-primary-container font-bold rounded hover:bg-red-50 transition-colors"
              >
                Bỏ qua
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};