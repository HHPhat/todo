import { useRef } from "react";
import BookCard from "./Bookcard";

// ── Dữ liệu mẫu cho section Deal Hot ──
// Sau này thay bằng dữ liệu thật gọi từ API
const dealHotBooks = [
  {
    id: 1,
    title: "Storytelling - Lay Động Lòng Người Bằng Chuyện Kể - Khổ Lớn",
    price: "172.000 đ",
    originalPrice: "246.000 đ",
    discount: "-30%",
    soldCount: "604",
    soldPercent: 75,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD51mZtHSkoHutGNolyw1k2EtHfy2wPvsvxNfjL2Qv3W4GVgBjUCqIy_zzvSPJgvKfztL6ec-RuocjxBes2eVyknECjd-64ZKrbFPyP3Z-AWhg50NqTFXW3F7ZnUWD1M49qrgvBw7BToooA3H9opN-t3zKTs5EK8JHK8c5EV_kdiAfToJ6bggpKWOR_rK6jo_O_2q5XiCqTO9rhbK6QDxj2XQlVjSf88TJUWVytX1D25uAGpGlseGkA",
  },
  {
    id: 2,
    title: "Lời Thú Tội Của Một Sát Thủ Kinh Tế - Bìa Cứng (Tái Bản 2023)",
    price: "172.000 đ",
    originalPrice: "245.000 đ",
    discount: "-29%",
    soldCount: "1.5k",
    soldPercent: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPvQCNuQMIZhDWCio-5QAlNjbqbB_rmjTuckYVxOl_VLim2qnTNDhK9WtipJQYfiXIY9cOuGeYWq5kND-igwiIHIOGX86ONj00bPQdWPQepLMpT6NjTn_ttrPtAMGgQAYUiZFuTQ5JGUjTIbK6mtluVZ4xaPsFBbLyonnpNnCMiCMRPaV9gFonyECZZG8aJtqLrgcda2XV_DhTxMvOJr6QUhpjpl24gH9KgbH_Ogf-UrLQC11-FPGQ",
  },
  {
    id: 3,
    title: "Tư Duy Học IELTS Đúng Từ Đầu - Nền Tảng Chiến Lược Cho Hành Trình Chinh Phục IELTS",
    price: "142.560 đ",
    originalPrice: "198.000 đ",
    discount: "-28%",
    soldCount: "802",
    soldPercent: 60,
    badge: "Sắp Có Hàng",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI8ZlSDXn-aSA5X54b1Ab1pieqG8gcJQo-sN9uyTqD7o3XDzu_V84O-HvQWz-jvGYn_bVHlBDZfex3CdtX2Il1s3VlmO9XjMzOXeqwg0YeZg5zfrJ9PewCuWCiGmkbc0PzY9q5NLoYsFgYzJ2HlxJzkELHDVzpp3zCB-HAz5YuKXOrbmkfl-3TSySaqfU0kkyrXz-0FCwnDZXv-d9YUfLXpe3BTKT2RuE6ONm3jIhwYBwirLiWcQu4",
  },
  {
    id: 4,
    title: "Muôn Kiếp Nhân Sinh - Many Times, Many Lives - Tập 3 (Khổ Lớn)",
    price: "92.160 đ",
    originalPrice: "128.000 đ",
    discount: "-28%",
    soldCount: "6.1k",
    soldPercent: 90,
    topRightBadge: "Tập 3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYppMM-1W0mUiBfkJc8PNXMnAST2nGXt61GfmdBb0riudbRFYiYN3n_6D60EGI12ZffIFjehsJ_49Eu1ly_Uh-MCbZ2-c77vCYn1is-ZbKtmwtdw5p2UIvDEmwP609nfA84gv1vnBEmja_MDYv9QYdFFKN9Js-W-mzyMkiob5JqjzT7Q625sjj18sQhKJwtATtrbXruNoGcEZ1omSFC8S10Lc-WZZYaFoMERsDJiVqmanpNWjAJ5Ba",
  },
];

// ============================================================
// DealHotSection — section "Deal Hot Giảm Sốc"
// Cuộn ngang, có nút mũi tên trái/phải điều hướng bằng JS
// ============================================================
const DealHotSection = () => {
  // ref trỏ tới container cuộn — dùng để scrollLeft thay vì dùng state
  const scrollRef = useRef(null);

  // Cuộn container sang trái/phải 250px
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -250 : 250, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">

      {/* ── Tiêu đề section ── */}
      <div className="border-b border-outline-variant px-6 py-4 flex items-center justify-between">
        <h2 className="text-headline-md font-bold text-primary-container flex items-center gap-2 uppercase tracking-wide">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          Deal Hot Giảm Sốc
        </h2>
        <a href="#" className="text-body-sm text-primary-container hover:underline flex items-center">
          Xem tất cả
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </a>
      </div>

      {/* ── Vùng chứa scroll + nút mũi tên ── */}
      {/*
        "relative group" — group để nút mũi tên chỉ xuất hiện khi hover section
        Thực ra nút đã hidden md:flex nên chỉ hiện từ md trở lên
      */}
      <div className="relative group">

        {/* Container cuộn ngang — scrollbar-hide ẩn thanh cuộn xấu */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 p-6 scrollbar-hide snap-x"
        >
          {dealHotBooks.map((book) => (
            <BookCard key={book.id} book={book} variant="deal" />
          ))}
        </div>

        {/* Nút Prev — chỉ hiện trên md+, nằm đè lên cạnh trái */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full items-center justify-center text-on-surface shadow-md border border-outline-variant hover:bg-surface-container-low transition-colors z-10 hidden md:flex"
          aria-label="Cuộn sang trái"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* Nút Next */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full items-center justify-center text-on-surface shadow-md border border-outline-variant hover:bg-surface-container-low transition-colors z-10 hidden md:flex"
          aria-label="Cuộn sang phải"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

      </div>
    </section>
  );
};

export default DealHotSection;