import React from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { ProductCard } from './ProductCard';
import axios from 'axios';
import {useState, useEffect,useRef } from 'react';

export const HeroBanner = () => (
  <section className="w-full bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden relative group">
    <img className="w-full h-48 md:h-80 object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3lpflSCgGbMkYgwvO1kniDYcdsmJB2gX1Vy2uwUwDHCC1WxB5poHpkEwfszC_lKAINto96gDyG9ZYkmSuXbDKvxcemLaNNUBHe2JAdFZ_OTHEthOjf2L87oJjmAFQcv_YGHlJJx68Gubrq1Y8jF_IYHC63OocaxqYh1bkvBlo6wg68B3znmVS9LqueAU2-vKevGe3UED2t7Er4qNVbocQXMRc0cp2a3l8gx3nSq2zs7ZYcqS6d8Nw" alt="Banner" />
    <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-on-surface shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
      <ChevronLeft size={24} />
    </button>
    <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-on-surface shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
      <ChevronRight size={24} />
    </button>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
      <div className="w-2 h-2 rounded-full bg-white/50"></div>
      <div className="w-2 h-2 rounded-full bg-white/50"></div>
    </div>
  </section>
);


export const DealHot = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref dùng để xử lý tính năng kéo/vuốt ngang (drag to scroll)
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/book/get-20');
        const data = response.data.data || response.data;
        setDeals(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    if (!price) return "0 đ";
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Hàm lấy đường dẫn ảnh động theo danh_muc_id và id
  const getImageUrl = (id, danh_muc_id) => {
    try {
      // Lưu ý: Vite có thể gặp khó khăn khi bundle đường dẫn có quá nhiều biến động.
      // Nếu ảnh không hiển thị khi build, hãy cân nhắc chuyển thư mục img vào thư mục public/
      return new URL(`../img/${danh_muc_id}/${id}.png`, import.meta.url).href;
    } catch (e) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuA3lpflSCgGbMkYgwvO1kniDYcdsmJB2gX1Vy2uwUwDHCC1WxB5poHpkEwfszC_lKAINto96gDyG9ZYkmSuXbDKvxcemLaNNUBHe2JAdFZ_OTHEthOjf2L87oJjmAFQcv_YGHlJJx68Gubrq1Y8jF_IYHC63OocaxqYh1bkvBlo6wg68B3znmVS9LqueAU2-vKevGe3UED2t7Er4qNVbocQXMRc0cp2a3l8gx3nSq2zs7ZYcqS6d8Nw"; // Ảnh mặc định nếu lỗi
    }
  };

  // --- Các hàm xử lý sự kiện kéo (Drag to scroll) ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Nhân 2 để tốc độ cuộn nhanh hơn 1 chút
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
      <div className="border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <h2 className="text-headline-md font-headline-md font-bold text-primary-container flex items-center gap-2 uppercase tracking-wide">
          <Flame size={24} fill="currentColor" /> Deal Hot Giảm Sốc
        </h2>
        <a className="text-body-sm text-primary-container hover:underline flex items-center" href="#">
          Xem tất cả <ChevronRight size={16} />
        </a>
      </div>
      
      <div className="relative group min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-on-surface-variant font-body-md py-8">Đang tải dữ liệu sách...</div>
        ) : deals.length === 0 ? (
          <div className="text-on-surface-variant font-body-md py-8">Chưa có sản phẩm nào.</div>
        ) : (
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // Thêm cursor-grab để hiển thị con trỏ tay kéo, select-none để tránh bôi đen text khi kéo
            className={`flex overflow-x-auto overflow-y-hidden gap-4 p-6 scrollbar-hide snap-x w-full cursor-grab select-none active:cursor-grabbing ${isDragging ? 'snap-none' : 'scroll-smooth'}`}
          >
            {deals.map((deal) => {
              const id = deal.id; 
              const danh_muc_id = deal.danh_muc_id;
              
              return (
                <div key={id} className="snap-start">
                  <ProductCard 
                    image={getImageUrl(id, danh_muc_id)} 
                    title={deal.tieu_de || deal.mo_ta || "Tên sách đang cập nhật"} 
                    price={formatPrice(deal.gia)} 
                    originalPrice={formatPrice((deal.gia || 0) * 1.3)} 
                    discount="-30%" 
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// export const CategorySection = () => {
//   const books = [
//     { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3WRNGVhyUNZr7qPIBBa8ovlBGtLcUzYNuQBM1L-g-jMZXp7TSb3GVg9LdmX5wL_4zRNig7rT7OsH6hUK3UZLe-5Fda56IPtW_ZRLA6Ebi0th627Mls4ydcxXCro4ZzurGcjGKHNucrJPANvV-1zvWXsRqop_p5Hqe1aZ7BdND3A0xTmqRMJ3KdxGLjjiiVCsmFG2ShlfYoY-XJD8FM_L1PJv0u_D2IG2NGYJp4MeOcoBNMYCEUgHa", title: "Công Ty Vui Vẻ Làm Ăn Suôn Sẻ", price: "52.500 đ", originalPrice: "105.000 đ", discount: "-50%", sold: "148", rating: "1" },
//     { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr7aydUtaI_-zur-fQu3L943U7pYab0iDvQY1vc2xTS6R8wTrKYJHF7m3elKKN2bkdOFOeT4Cr1yBOA6hUkEphaNaSthhWOa0rQfJu9xa1CAInNeIgmIa_Alv5YhPy0fBUinn2TK_nLxVlGzHVpqHaU9eADMWvoT8IfivxpA7BdoOTGwTMU1Vf7NilgAQuF6ya1Bu5NqFB5mJZ-H62SotoqtTVKoWE3U4ajHWXzCPS2sPmLldYapC0", title: "Chưa Một Lần Đau Sao Là Tuổi Trẻ", price: "57.500 đ", originalPrice: "115.000 đ", discount: "-50%", sold: "1.1k", rating: "2" },
//     { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBlighwCyj4dTKOmqA4ELI2hHLq4ZDjar8k-Tj_NugI2cSQ5tiGXUB8X4KFiquVcjOIbwDi-wQb9NApuHdSKFU1lbCOM7d0gvkuQp6HD83sOAkfAKpRUBZnGeweWRkgWrVxvrPTBykWt72c5Y5VUkuaNXal0P0BdNXkyltCQ_3VciZ59ueIEVUQ-ab0shI33YRT4DIGUNLvMH6mvZWH30TanfCEJA4Woi2jVbUcV-cDdfRU3FRzqwD", title: "Trò Bịp Bợm Của Lo Âu", price: "52.500 đ", originalPrice: "105.000 đ", discount: "-50%", sold: "424" },
//     { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx1QMPFsIFvZ8cDQJXoC3Q7foHoym9Pm8PRVuwPLwYCXjDOcZi1OYt9U1LI3FQxH0jvmFebe6AIVH5GEGY3ovCs-WLh6UmDGamdC0nbudceTqYcqnIBgnGEenMdFqxn02BB3JF0xA7qTF2SYviCTrN7XIQ1G2HGaTwX6f9Tgzoc9rjRZedLvPQHMAYby5bv3Fm8P5KqB044LYQSPR3RMWQthdgXurttq9kDKhqKWIR0yuRy6VwKv-3", title: "Tri Thức Cực Hạn", price: "49.500 đ", originalPrice: "99.000 đ", discount: "-50%", sold: "342" },
//     { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlp4en-JhekgMItQZjpatzzi96XP8H1d4MCih6mp0X_jI-9_CHNVzG4oC5DStkL75qi5TdGkjT88GpNNv6MDVHd_atB4XxYI9IDl3wdwOqGCX4VEJOI_3g8iIRjFpj2XH4vvL81OWDW8LQSBn-5gGxEEX64_MB_KdWkS1zWtA1NkbfYycYDJSOLcE1FjLJMvYtRXqNmY4zlgRM61lRIjZlGCLPoSHkheHoETwRV-EfUt1gO4aHoYGy", title: "Sống Lũy Tiến", price: "67.500 đ", originalPrice: "135.000 đ", discount: "-50%", sold: "230" }
//   ];

//   return (
//     <section className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
//       <div className="border-b-2 border-primary-container px-6 py-4 flex items-center justify-between">
//         <h2 className="text-headline-md font-headline-md font-bold text-primary-container uppercase tracking-wide">
//           Tâm Lý - Kỹ Năng Sống
//         </h2>
//         <a className="text-body-sm text-primary-container hover:underline flex items-center" href="#">
//           Xem tất cả <ChevronRight size={16} />
//         </a>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
//         {books.map((book, idx) => <ProductCard key={idx} {...book} />)}
//       </div>
//     </section>
//   );
// };
const CategoryRow = ({ category }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ref và State phục vụ tính năng kéo để cuộn ngang (Drag-to-scroll)
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const catId = category.id || category._id;

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        // Gọi API lấy tối đa 20 cuốn sách theo ID danh mục
        const response = await axios.get(`http://localhost:5001/api/book/danhmuc20/${catId}`);
        const data = response.data.data || response.data;
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(`Lỗi khi lấy sách của danh mục ${category.ten_danh_muc}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (catId) {
      fetchBooksByCategory();
    }
  }, [catId, category.ten_danh_muc]);

  // Hàm định dạng giá tiền
  const formatPrice = (price) => {
    if (!price) return "0 đ";
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
  };

  // Hàm lấy đường dẫn ảnh động theo cấu trúc yêu cầu
  const getImageUrl = (id, danh_muc_id) => {
    try {
      return new URL(`../img/${danh_muc_id}/${id}.png`, import.meta.url).href;
    } catch (e) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuA3lpflSCgGbMkYgwvO1kniDYcdsmJB2gX1Vy2uwUwDHCC1WxB5poHpkEwfszC_lKAINto96gDyG9ZYkmSuXbDKvxcemLaNNUBHe2JAdFZ_OTHEthOjf2L87oJjmAFQcv_YGHlJJx68Gubrq1Y8jF_IYHC63OocaxqYh1bkvBlo6wg68B3znmVS9LqueAU2-vKevGe3UED2t7Er4qNVbocQXMRc0cp2a3l8gx3nSq2zs7ZYcqS6d8Nw"; // Ảnh lỗi/mặc định
    }
  };

  // --- Các hàm xử lý sự kiện vuốt/kéo chuột ngang ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Tốc độ cuộn
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // YÊU CẦU: Nếu đã tải xong dữ liệu và danh mục KHÔNG CÓ sách -> Ẩn toàn bộ Section này
  if (!isLoading && books.length === 0) return null;

  return (
    <section 
      id={`danh-muc-${catId}`} // Đặt ID định danh duy nhất để Sidebar có thể cuộn đến vị trí này
      className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col mb-8 scroll-mt-36 transition-all"
    >
      {/* Tiêu đề danh mục */}
      <div className="border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <h2 className="text-headline-md font-headline-md font-bold text-primary-container uppercase tracking-wide">
          {category.ten_danh_muc}
        </h2>
        <a className="text-body-sm text-primary-container hover:underline flex items-center" href="#">
          Xem tất cả <ChevronRight size={16} />
        </a>
      </div>

      {/* Danh sách sách dạng cuộn/vuốt ngang */}
      <div className="relative group min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-on-surface-variant font-body-md py-8">Đang tải sách...</div>
        ) : (
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // Dùng cursor-grab để hiển thị con trỏ tay kéo lướt, select-none tránh bôi đen chữ khi đang kéo
            className={`flex overflow-x-auto overflow-y-hidden gap-4 p-6 scrollbar-hide snap-x w-full cursor-grab select-none active:cursor-grabbing ${
              isDragging ? 'snap-none' : 'scroll-smooth'
            }`}
          >
            {books.map((book) => {
              const bookId = book.id || book._id;
              return (
                <div key={bookId} className="snap-start">
                  <ProductCard
                    image={getImageUrl(bookId, catId)}
                    title={book.tieu_de || "Tên sách đang cập nhật"}
                    price={formatPrice(book.gia)}
                    originalPrice={formatPrice((book.gia || 0) * 1.3)}
                    discount="-30%"
                    sold={book.luot_thich || "0"} // Minh họa số lượt bán/thích tạm thời
                    rating="5" // Minh họa số sao tạm thời
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// ==========================================
// 2. COMPONENT CHÍNH QUẢN LÝ TẤT CẢ DANH MỤC
// ==========================================
export const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCat, setIsLoadingCat] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Gọi API lấy toàn bộ danh mục từ cơ sở dữ liệu (id từ 1 -> 20)
        const response = await axios.get('http://localhost:5001/api/Category');
        const data = response.data.data || response.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi lấy toàn bộ danh mục:", error);
      } finally {
        setIsLoadingCat(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoadingCat) {
    return <div className="text-center py-12 text-on-surface-variant">Đang chuẩn bị các danh mục sách...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {categories.map((cat) => (
        <CategoryRow key={cat.id || cat._id} category={cat} />
      ))}
    </div>
  );
};