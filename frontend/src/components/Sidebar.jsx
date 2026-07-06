import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Menu, TrendingUp, Brain, BookOpen, Baby, BookType, Flame, 
  Book, GraduationCap, Languages, Briefcase 
} from 'lucide-react';

export const Sidebar = () => {
  // State lưu trữ danh sách danh mục từ API
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gọi API lấy danh mục khi component được render lần đầu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/Category');
        // Tùy thuộc vào cấu trúc trả về của backend, có thể là response.data hoặc response.data.data
        // Giả sử API trả về trực tiếp một mảng chứa các object danh mục
        const data = response.data.data || response.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi gọi API danh mục:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Hàm tự động chọn icon dựa trên từ khóa của tên danh mục
  const getIconForCategory = (categoryName) => {
    if (!categoryName) return <Book size={20} />; // Icon mặc định
    
    const nameLower = categoryName.toLowerCase();
    
    if (nameLower.includes('kinh tế') || nameLower.includes('kinh doanh') || nameLower.includes('tài chính')) {
      return <TrendingUp size={20} />;
    }
    if (nameLower.includes('tâm lý') || nameLower.includes('kỹ năng')) {
      return <Brain size={20} />;
    }
    if (nameLower.includes('văn học')) {
      return <BookOpen size={20} />;
    }
    if (nameLower.includes('thiếu nhi') || nameLower.includes('trẻ em')) {
      return <Baby size={20} />;
    }
    if (nameLower.includes('tiểu thuyết')) {
      return <BookType size={20} />;
    }
    if (nameLower.includes('giáo khoa') || nameLower.includes('giáo trình')) {
      return <GraduationCap size={20} />;
    }
    if (nameLower.includes('ngoại ngữ') || nameLower.includes('tiếng anh')) {
      return <Languages size={20} />;
    }
    
    // Nếu không khớp từ khóa nào thì trả về icon sách chung
    return <Book size={20} />;
  };

  return (
    <aside className="hidden lg:flex flex-col h-full w-64 flex-shrink-0 bg-surface rounded-xl border border-outline-variant shadow-md overflow-hidden sticky top-32">
      {/* Header Sidebar */}
      <div className="p-4 border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary font-bold text-lg">A</div>
          <div>
            <h2 className="text-headline-md font-headline-md font-bold text-primary-container">Aemy Store</h2>
            <p className="text-body-sm text-on-surface-variant">Nhà sách trực tuyến</p>
          </div>
        </div>
      </div>
      
      {/* Danh sách danh mục */}
      <div className="flex flex-col py-2 space-y-1 overflow-y-auto">
        <a className="bg-secondary-container text-on-secondary-container rounded-lg mx-2 my-1 flex items-center gap-3 p-3 font-label-bold transition-all" href="#">
          <Menu size={20} /> Danh Mục Sản Phẩm
        </a>
        
        {/* Render danh mục từ API */}
        {isLoading ? (
          <div className="text-center p-4 text-body-sm text-on-surface-variant">
            Đang tải danh mục...
          </div>
        ) : (categories.map((item, idx) => {
  const itemTransientId = item.id || item._id;
  return (
    <a 
      key={itemTransientId || idx} 
      className="text-on-surface-variant hover:bg-surface-container-high rounded-lg flex items-center gap-3 p-3 mx-2 my-1 font-label-bold transition-all" 
      // THAY ĐỔI: href dẫn trực tiếp tới id tương ứng của section danh mục
      href={`#danh-muc-${itemTransientId}`} 
    >
      {getIconForCategory(item.ten_danh_muc)} 
      {item.ten_danh_muc}
    </a>
  )
}))}
      </div>
      
      {/* Footer Sidebar */}
      <div className="p-4 mt-auto border-t border-outline-variant">
        <button className="w-full bg-primary-container text-on-primary py-2 rounded font-label-bold hover:opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2">
          <Flame size={18} /> Khuyến Mãi Hot
        </button>
      </div>
    </aside>
  );
};