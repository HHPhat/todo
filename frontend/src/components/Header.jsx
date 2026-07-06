import React from 'react';
import { Grid, ChevronDown, Search, Bell, ShoppingCart, User, ChevronRight } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm w-full sticky top-0 z-50">
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
          <button className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group">
            <Bell size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">Thông Báo</span>
          </button>
          <button className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group relative">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">Giỏ Hàng</span>
            <span className="absolute -top-1 -right-2 bg-primary-container text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">3</span>
          </button>
          <button className="flex flex-col items-center text-on-surface-variant hover:text-primary-container transition-colors gap-1 group">
            <User size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px]">Tài khoản</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb (Desktop) */}
      <div className="bg-surface-container-low border-t border-outline-variant py-2 px-gutter hidden md:block">
        <div className="max-w-container-max mx-auto flex items-center gap-2 text-body-sm text-on-surface-variant">
          <a className="hover:text-primary-container" href="#">TRANG CHỦ</a>
          <ChevronRight size={14} />
          <span className="text-primary-container">SIÊU ƯU ĐÃI - MUA SẮM ...</span>
        </div>
      </div>
    </header>
  );
};