import React, { useState, useEffect } from 'react';
import { Grid, ChevronDown, Search, Bell, ShoppingCart, User, ChevronRight, Heart, X, Star } from 'lucide-react';
import { AuthModal } from './AuthModal'; 
import axios from 'axios';

export const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // --- STATE CHỨA LOGIC CỦA HEADER ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // --- STATE MỚI CHO TÍNH NĂNG YÊU THÍCH ---
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  // Lấy thông tin user khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu user", error);
      }
    }
  }, []);

  // Gọi API lấy danh sách sách yêu thích khi mở Box
  const fetchFavorites = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/favorites/user/${userId}`);
      
      // Kiểm tra nghiêm ngặt: Nếu dữ liệu trả về đúng cấu trúc { success: true, data: [...] }
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setFavoritesList(res.data.data);
      } 
      // Nếu API trả về thẳng một mảng [...]
      else if (Array.isArray(res.data)) {
        setFavoritesList(res.data);
      } 
      // Nếu API trả về sai cấu trúc hoặc lỗi, ép về mảng rỗng để không bị sập web
      else {
        setFavoritesList([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error);
      setFavoritesList([]); // Gặp lỗi mạng/API cũng ép về mảng rỗng
    }
  };

  // Xử lý khi nhấn nút "Yêu Thích"
  const handleFavoritesClick = () => {
    if (!currentUser) {
      // Nếu chưa đăng nhập -> Hiện thông báo chữ đỏ dưới góc trong 3 giây
      setShowAuthAlert(true);
      setTimeout(() => setShowAuthAlert(false), 3000);
      return;
    }
    // Nếu đã đăng nhập -> Mở Box hiển thị sách và Fetch dữ liệu
    setIsFavoritesOpen(true);
    fetchFavorites(currentUser.id || currentUser._id);
  };

  // Xử lý xóa sách khỏi danh sách yêu thích (Nút X của từng item)
  const handleRemoveFavorite = async (sachId) => {
    const userId = currentUser.id || currentUser._id;
    try {
      const res = await axios.delete(`http://localhost:5001/api/favorites/${userId}/${sachId}`);
      if (res.data.success) {
        // Cập nhật lại state trực tiếp tại Frontend để giao diện thay đổi ngay lập tức
        setFavoritesList(prev => prev.filter(book => book.id !== sachId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa sách yêu thích:", error);
    }
  };

  // Lắng nghe sự kiện phím ESC để đóng Box Yêu thích
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFavoritesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Xử lý sự kiện cuộn trang (Ẩn/Hiện Header)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    window.location.reload(); 
  };

  return (
    <>
      <header 
        className={`bg-surface border-b border-outline-variant shadow-sm w-full sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20 gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <a className="text-headline-lg font-headline-lg font-black text-primary-container flex-shrink-0" href="#">
              Aemy Store
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full hidden md:flex">
            <div className="relative w-full flex items-center">
              <button className="flex items-center gap-1 bg-surface-container-low border border-outline-variant rounded-l px-3 py-2 text-on-surface-variant text-sm hover:bg-surface-container transition-colors h-10">
                <Grid size={20} />
                <ChevronDown size={16} />
              </button>
              <input 
                className="w-full border-y border-r-0 border-outline-variant px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-container h-10 rounded-none" 
                placeholder="Tìm kiếm sản phẩm..." 
                type="text" 
              />
              <button className="bg-primary-container hover:opacity-90 text-on-primary px-6 py-2 rounded-r flex items-center justify-center transition-opacity h-10">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Trailing Icons */}
          <div className="flex items-center gap-6 flex-shrink-0">
                        
            {/* NÚT YÊU THÍCH ĐÃ ĐƯỢC THÊM LOGIC CLICK */}
            <button 
              onClick={handleFavoritesClick}
              className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group"
            >
              <Heart size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px]">Yêu Thích</span>
            </button>

            <button className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group relative">
              <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
              <span className="text-[10px]">Giỏ Hàng</span>
              <span className="absolute -top-1 -right-2 bg-primary-container text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
            </button>
            
            {/* User Area */}
            {currentUser ? (
              <div className="relative group flex flex-col items-center">
                <button className="flex flex-col items-center text-primary-container transition-colors gap-1">
                  <User size={24} className="scale-110" />
                  <span className="text-[10px] font-bold truncate max-w-[80px]">
                    {currentUser.ho_va_ten}
                  </span>
                </button>

                <div className="absolute top-full mt-2 right-0 w-32 bg-white rounded shadow-lg border border-gray-200 hidden group-hover:flex flex-col z-[100]">
                  <button className="px-4 py-2 text-sm text-left hover:bg-gray-100 text-gray-700">Tài khoản của tôi</button>
                  <button className="px-4 py-2 text-sm text-left hover:bg-gray-100 text-gray-700 border-b border-gray-100">Đơn hàng</button>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 font-medium">
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group"
              >
                <User size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px]">Tài khoản</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ==================== BOX HIỂN THỊ DANH SÁCH YÊU THÍCH ==================== */}
      {isFavoritesOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[200] animate-fadeIn">
          <div className="bg-white rounded-[2rem] p-6 max-w-md w-full mx-4 relative max-h-[85vh] flex flex-col shadow-2xl border border-gray-100">
            
            {/* Nút X nhỏ ở góc để đóng Box */}
            <button 
              onClick={() => setIsFavoritesOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Tiêu đề đỏ chuẩn UI */}
            <h2 className="text-2xl font-black text-red-600 text-center mb-6 uppercase tracking-wider">
              Sách Ưa Thích
            </h2>

            {/* Danh sách các cuốn sách cuộn mượt */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
              {!Array.isArray(favoritesList) || favoritesList.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">Danh sách yêu thích trống.</p>
            ) : (
              favoritesList.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#D9D9D9] rounded-[1.5rem] p-4 flex items-center gap-4 relative shadow-sm hover:shadow transition-shadow"
                >
                                        {/* 1. Hình ảnh minh họa sách */}
                  <div className="w-16 h-24 flex-shrink-0 bg-white rounded overflow-hidden shadow-sm">
                    <img 
                      src={`/src/img/${item.danh_muc_id}/${item.id}.png`} 
                      alt={item.tieu_de} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150x225?text=No+Image'; }}
                    />
                  </div>

                  {/* 2. Phần thông tin chi tiết (Đã sửa lại để đẩy text lên cao và căn lề trái sát ảnh) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start items-start text-left h-24 py-0.5 pl-1">
                    {/* Tên sách đưa lên cao nhất, sát ảnh */}
                    <h3 className="font-bold text-base text-gray-900 truncate w-full leading-tight">
                      {item.tieu_de}
                    </h3>
                    
                    {/* YÊU CẦU: Thêm dòng hiển thị giá tiền (được định dạng VND gọn gàng) */}
                    <p className="text-sm font-bold text-red-600 mt-1">
                      {item.gia ? new Intl.NumberFormat('vi-VN').format(item.gia) + ' đ' : 'Chưa có giá'}
                    </p>

                    {/* YÊU CẦU: Dòng chữ "Đã bán" đã được căn lề trái hoàn toàn */}
                    <p className="text-xs text-gray-600 mt-0.5 w-full">
                      Đã bán: {item.da_ban || 0}
                    </p>
                    
                    {/* 5 Ngôi sao rỗng nằm ở dưới cùng của khung thông tin */}
                    <div className="flex text-gray-800 mt-auto">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="stroke-[1.5]" />)}
                    </div>
                  </div>

                    {/* Cụm Action: Giỏ hàng & Nút X xóa bỏ */}
                    <div className="flex items-center gap-3 pr-1">
                      {/* Icon giỏ hàng (chỉ để hiển thị trực quan) */}
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                        <ShoppingCart size={20} className="stroke-[2]" />
                      </div>

                      {/* Nút X to trong vòng tròn đen hủy yêu thích */}
                      <button 
                        onClick={() => handleRemoveFavorite(item.id)}
                        className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                      >
                        <X size={20} className="stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TOAST THÔNG BÁO YÊU CẦU ĐĂNG NHẬP Ở GÓC DƯỚI ==================== */}
      {showAuthAlert && (
        <div className="fixed bottom-6 right-6 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg z-[250] animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-sm">
              ⚠️ Vui lòng đăng nhập để sử dụng tính năng Yêu thích!
            </span>
          </div>
        </div>
      )}

      {/* Modal đăng nhập/đăng ký */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};