"use client"
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 mt-16 border-t bg-gray-light">
      <div className="container-app">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-dark">
              © {new Date().getFullYear()} Lupa - Matching Cultural
            </p>
          </div>
          <div>
            <ul className="flex gap-6 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-dark hover:text-primary transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-gray-dark hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-gray-dark hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
