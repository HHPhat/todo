import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export const ProductCard = ({ image, title, price, originalPrice, discount, sold, badge, rating }) => {
  return (
    <div className="flex-shrink-0 w-44 md:w-52 flex flex-col gap-3 bg-surface snap-start group/card relative rounded hover:-translate-y-1 transition-transform duration-200">
      {badge && (
        <span className="absolute -top-2 -left-2 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded z-10 shadow-sm border border-blue-200">
          {badge}
        </span>
      )}
      
      <div className="relative w-full aspect-[2/3] bg-surface-container-lowest border border-outline-variant rounded overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] group-hover/card:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-body-md font-body-md text-on-surface line-clamp-2 leading-tight group-hover/card:text-primary-container transition-colors">
          {title}
        </h3>
        
        <div className="flex items-end gap-2 mt-auto pt-2">
          <span className="text-price-lg font-price-lg text-primary-container">{price}</span>
          <span className="bg-primary-container text-white text-[10px] font-bold px-1 py-0.5 rounded">{discount}</span>
        </div>
        
        <span className="text-body-sm text-on-surface-variant line-through">{originalPrice}</span>
        
        {rating ? (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-amber-400">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <StarHalf size={14} fill="currentColor" />
            </div>
            <span className="text-[11px] text-on-surface-variant">({rating}) | Đã bán {sold}</span>
          </div>
        ) : (
          <>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: "75%" }}></div>
            </div>
            <span className="text-[11px] text-on-surface-variant mt-1">Đã bán {sold}</span>
          </>
        )}
      </div>
      
      <button className="w-full mt-2 py-2 border-2 border-primary-container text-primary-container rounded font-label-bold bg-white hover:bg-primary-container hover:text-white transition-colors">
        Thêm giỏ hàng
      </button>
    </div>
  );
};