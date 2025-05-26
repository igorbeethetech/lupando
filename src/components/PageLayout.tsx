
'use client'
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  noHeader?: boolean;
  noFooter?: boolean;
  className?: string;
  containerClass?: string;
}

const PageLayout = ({ 
  children, 
  noHeader = false, 
  noFooter = false,
  className = "",
  containerClass = "container mx-auto px-6 max-w-full lg:max-w-7xl"
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!noHeader && <Header />}
      <main className={`flex-grow ${className}`}>
        <div className={containerClass}>
          {children}
        </div>
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
