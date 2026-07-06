import React from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { HeroBanner, DealHot, CategorySection } from "../components/HomeSections";

const HomePage = () => {
  return (
    <div className="w-full text-on-background font-body-md antialiased bg-[#F8F8F8] min-h-screen">
      <Header />
      
      <div className="max-w-[1200px] mx-auto w-full px-4 flex gap-6 pt-6 pb-12">
        <Sidebar />
        
        <main className="flex-1 w-full flex flex-col gap-8 min-w-0">
          <HeroBanner />
          <DealHot />
          <CategorySection />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;