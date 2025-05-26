'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        // Successful login - manually redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Bem-vindo de volta" description="Entre na sua conta">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error === 'Invalid login credentials' ? 'Credenciais de login inválidas' : error}</p>
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleLogin}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <FormInput
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Lembrar de mim
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={loading}
        >
          Entrar
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <Link href="/#contact" className="text-sm text-indigo-600 hover:text-indigo-500">
          Solicitar uma demonstração
        </Link>
      </div>
    </AuthLayout>
  );
}
