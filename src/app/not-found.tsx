import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Ops! Esta página não existe.
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Talvez você tenha tomado um caminho errado.
          </p>
        </div>
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para o início
          </Link>
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Ou tente um destes links
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-6">
            <Link href="/login" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
              Entrar
            </Link>
            <Link href="/#contact" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
