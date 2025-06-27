'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '@/components/ui/InputField';
import { loginUser, LoginPayload } from '@/lib/api'; 

const ChevronLeftIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);

export default function LoginPage() {
  const router = useRouter();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload: LoginPayload = {
        email: '',
        username: '',
        password: password,
      };
      if (account.includes('@')) {
        payload.email = account;
      } else {
        payload.username = account;
      }

      await loginUser(payload);
      router.push('/profile');

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-youapp-background bg-[radial-gradient(ellipse_80%_100%_at_80%_-20%,rgba(7,289,233,0.4),transparent)]">
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        
        <header className="absolute left-4 top-4">
          <Link href="/" className="flex items-center text-white">
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="ml-2">Back</span>
          </Link>
        </header>

        <main className="w-full max-w-md space-y-6 text-white">
          <h1 className="text-2xl font-bold">Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField 
              id="account" 
              label="Enter Email/Username" 
              type="text" 
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required 
            />
            <InputField 
              id="password" 
              label="Enter Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
                disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3 font-bold text-white shadow-[0_4px_14px_0_rgb(0,118,255,39%)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,118,255,23%)]"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-400">
            No account yet?{' '}
            <Link href="/register" className="font-semibold text-cyan-400 hover:underline">
              Register here
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}