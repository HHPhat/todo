import BookCard from "./Bookcard";

// ── Dữ liệu mẫu cho section Tâm Lý - Kỹ Năng Sống ──
// Sau này sẽ fetch từ API theo danh mục
const tamLyBooks = [
  {
    id: 1,
    title: "Công Ty Vui Vẻ Làm Ăn Suôn Sẻ",
    price: "52.500 đ",
    originalPrice: "105.000 đ",
    discount: "-50%",
    soldCount: "148",
    rating: 4.5,
    ratingCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3WRNGVhyUNZr7qPIBBa8ovlBGtLcUzYNuQBM1L-g-jMZXp7TSb3GVg9LdmX5wL_4zRNig7rT7OsH6hUK3UZLe-5Fda56IPtW_ZRLA6Ebi0th627Mls4ydcxXCro4ZzurGcjGKHNucrJPANvV-1zvWXsRqop_p5Hqe1aZ7BdND3A0xTmqRMJ3KdxGLjjiiVCsmFG2ShlfYoY-XJD8FM_L1PJv0u_D2IG2NGYJp4MeOcoBNMYCEUgHa",
  },
  {
    id: 2,
    title: "Chưa Một Lần Đau Sao Là Tuổi Trẻ",
    price: "57.500 đ",
    originalPrice: "115.000 đ",
    discount: "-50%",
    soldCount: "215",
    rating: 4,
    ratingCount: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr7aydUtaI_-zur-fQu3L943U7pYab0iDvQY1vc2xTS6R8wTrKYJHF7m3elKKN2bkdOFOeT4Cr1yBOA6hUkEphaNaSthhWOa0rQfJu9xa1CAInNeIgmIa_Alv5YhPy0fBUinn2TK_nLxVlGzHVpqHaU9eADMWvoT8IfivxpA7BdoOTGwTMU1Vf7NilgAQuF6ya1Bu5NqFB5mJZ-H62SotoqtTVKoWE3U4ajHWXzCPS2sPmLldYapC0",
  },
  {
    id: 3,
    title: "Trò Bịp Bợm Của Lo Âu - The Worry Trick",
    price: "52.500 đ",
    originalPrice: "105.000 đ",
    discount: "-50%",
    soldCount: "424",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBlighwCyj4dTKOmqA4ELI2hHLq4ZDjar8k-Tj_NugI2cSQ5tiGXUB8X4KFiquVcjOIbwDi-wQb9NApuHdSKFU1lbCOM7d0gvkuQp6HD83sOAkfAKpRUBZnGeweWRkgWrVxvrPTBykWt72c5Y5VUkuaNXal0P0BdNXkyltCQ_3VciZ59ueIEVUQ-ab0shI33YRT4DIGUNLvMH6mvZWH30TanfCEJA4Woi2jVbUcV-cDdfRU3FRzqwD",
  },
  {
    id: 4,
    title: "Tri Thức Cực Hạn - Tối Ưu Hóa Kĩ Năng Học Tập Và Quản Lí Tri Thức",
    price: "49.500 đ",
    originalPrice: "99.000 đ",
    discount: "-50%",
    soldCount: "342",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx1QMPFsIFvZ8cDQJXoC3Q7foHoym9Pm8PRVuwPLwYCXjDOcZi1OYt9U1LI3FQxH0jvmFebe6AIVH5GEGY3ovCs-WLh6UmDGamdC0nbudceTqYcqnIBgnGEenMdFqxn02BB3JF0xA7qTF2SYviCTrN7XIQ1G2HGaTwX6f9Tgzoc9rjRZedLvPQHMAYby5bv3Fm8P5KqB044LYQSPR3RMWQthdgXurttq9kDKhqKWIR0yuRy6VwKv-3",
  },
  {
    id: 5,
    title: "Sống Lũy Tiến",
    price: "67.500 đ",
    originalPrice: "135.000 đ",
    discount: "-50%",
    soldCount: "230",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlp4en-JhekgMItQZjpatzzi96XP8H1d4MCih6mp0X_jI-9_CHNVzG4oC5DStkL75qi5TdGkjT88GpNNv6MDVHd_atB4XxYI9IDl3wdwOqGCX4VEJOI_3g8iIRjFpj2XH4vvL81OWDW8LQSBn-5gGxEEX64_MB_KdWkS1zWtA1NkbfYycYDJSOLcE1FjLJMvYtRXqNmY4zlgRM61lRIjZlGCLPoSHkheHoETwRV-EfUt1gO4aHoYGy",
  },
];

// ============================================================
// BookSection — section hiển thị sách theo danh mục dạng lưới
//
// Props:
//   title    (string)   — tên section, vd "Tâm Lý - Kỹ Năng Sống"
//   books    (array)    — mảng dữ liệu sách (dùng data mặc định nếu không truyền)
//   viewAllHref (string)— link "Xem tất cả"
// ============================================================
const BookSection = ({ title = "Tâm Lý - Kỹ Năng Sống", books = tamLyBooks, viewAllHref = "#" }) => {
  return (
    <section className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">

      {/* ── Tiêu đề section (border đỏ đậm phía dưới) ── */}
      <div className="border-b-2 border-primary-container px-6 py-4 flex items-center justify-between">
        <h2 className="text-headline-md font-bold text-primary-container uppercase tracking-wide">
          {title}
        </h2>
        <a href={viewAllHref} className="text-body-sm text-primary-container hover:underline flex items-center">
          Xem tất cả
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </a>
      </div>

      {/* ── Lưới sách ──
          grid-cols-2             — mobile: 2 cột
          md:grid-cols-3          — tablet: 3 cột
          lg:grid-cols-5          — desktop: 5 cột (đúng với thiết kế gốc)
          gap-6 p-6               — khoảng cách đều giữa các card và padding khung
       ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} variant="grid" />
        ))}
      </div>

    </section>
  );
};

export default BookSection;