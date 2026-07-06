import React from 'react';
import { Smile, MonitorPlay, Camera, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-8 py-8">
      <div className="px-4 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-4">
          <span className="text-headline-md font-headline-md font-bold text-on-surface">Aemy Store</span>
          <p className="text-body-sm text-on-surface-variant">
            Aemy Store nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua trực tiếp tại văn phòng.
          </p>
          <div className="flex gap-4 mt-2">
            <a className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow-sm text-secondary hover:text-primary-container" href="#"><Smile size={18} /></a>
            <a className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow-sm text-secondary hover:text-primary-container" href="#"><MonitorPlay size={18} /></a>
            <a className="w-8 h-8 rounded-full bg-surface flex items-center justify-center shadow-sm text-secondary hover:text-primary-container" href="#"><Camera size={18} /></a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-label-bold text-on-surface uppercase mb-2">Dịch Vụ</h4>
          <a className="text-body-sm text-on-surface-variant hover:text-primary-container hover:underline" href="#">Điều khoản sử dụng</a>
          <a className="text-body-sm text-on-surface-variant hover:text-primary-container hover:underline" href="#">Chính sách bảo mật</a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-label-bold text-on-surface uppercase mb-2">Hỗ Trợ</h4>
          <a className="text-body-sm text-on-surface-variant hover:text-primary-container hover:underline" href="#">Chính sách đổi - trả - hoàn tiền</a>
          <a className="text-body-sm text-on-surface-variant hover:text-primary-container hover:underline" href="#">Phương thức thanh toán</a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-label-bold text-on-surface uppercase mb-2">Liên Hệ</h4>
          <div className="flex items-start gap-2 text-body-sm text-on-surface-variant">
            <MapPin size={16} className="mt-0.5" /> <span>60-62 Lê Lợi, Q.1, TP. HCM</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm text-on-surface-variant mt-2">
            <Mail size={16} /> <span>cskh@aemystore.com.vn</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm text-on-surface-variant mt-2">
            <Phone size={16} /> <span>1900636467</span>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 mt-8 pt-4 border-t border-outline-variant text-center text-body-sm text-on-surface-variant">
        © 2024 Aemy Store - All Rights Reserved.
      </div>
    </footer>
  );
};