import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-300 to-transparent rounded-full animate-pulse opacity-20"></div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-indigo-600">Lupa</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        
        {children}
      </div>
    </div>
  );
}
