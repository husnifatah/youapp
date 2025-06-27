'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '@/components/ui/InputField';
import { registerUser } from '@/lib/api';

// --- KOMPONEN IKON & UI ---
const ChevronLeftIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);

// --- BARU: Komponen Pesan (Toast/Snackbar) ---
const Message = ({ text, type }: { text: string; type: 'success' | 'error' }) => {
  const baseClasses = "fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-300 z-50";
  const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return <div className={`${baseClasses} ${typeClasses}`}>{text}</div>;
};


export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); 

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({ email, username, password });
      
      setMessage({ text: 'Registration successful! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        router.push('/login');
      }, 2000); 

    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ text: err.message, type: 'error' });
        console.error(err);
      } else {
        setMessage({ text: "An unexpected error occurred.", type: 'error' });
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-youapp-background bg-[radial-gradient(ellipse_80%_100%_at_80%_-20%,rgba(7,289,233,0.4),transparent)]">
      
      {message && <Message text={message.text} type={message.type} />}

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <header className="absolute left-4 top-4">
          <Link href="/" className="flex items-center text-white">
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="ml-2">Back</span>
          </Link>
        </header>

        <main className="w-full max-w-md space-y-6 text-white">
          <h1 className="text-2xl font-bold">Register</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField id="email" label="Enter Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <InputField id="username" label="Create Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <InputField id="password" label="Create Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <InputField id="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            
            {message && message.type === 'error' && (
              <p className="text-sm text-red-400">{message.text}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3 font-bold text-white shadow-[0_4px_14px_0_rgb(0,118,255,39%)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,118,255,23%)]"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-gray-400">
            Have an account?{' '}
            <Link href="/login" className="font-semibold text-cyan-400 hover:underline">
              Login here
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}