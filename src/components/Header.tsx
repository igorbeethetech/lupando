
'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/Button";

const Header = () => {
  return (
    <header className="py-4 border-b bg-white sticky top-0 z-10 px-10">
      <div className="container-app">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Lupa
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link 
                  href="/#como-funciona" 
                  className="text-gray-text hover:text-primary transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link 
                  href="/#beneficios" 
                  className="text-gray-text hover:text-primary transition-colors"
                >
                  Benefícios
                </Link>
              </li>
              <li>
                <Link 
                  href="/#casos-de-uso" 
                  className="text-gray-text hover:text-primary transition-colors"
                >
                  Casos de Uso
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-4 items-center">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/#contato">
              <Button>Solicitar Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
