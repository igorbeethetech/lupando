'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}

const NavLink = ({ href, children, exact = false }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  
  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
    >
      {children}
    </Link>
  );
};

export default function DashboardNav() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 mr-8">Lupa</Link>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">Painel</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            <NavLink href="/dashboard" exact>
              Painel
            </NavLink>
            <NavLink href="/pessoas">
              Pessoas
            </NavLink>
            <NavLink href="/avaliacao">
              Avaliação
            </NavLink>
            <NavLink href="/perfil">
              Perfil
            </NavLink>
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
