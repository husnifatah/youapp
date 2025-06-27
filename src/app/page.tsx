'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-900 text-white flex flex-col relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/40 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-purple-600/40 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[20%] left-[25%] w-[300px] h-[300px] bg-blue-500/30 rounded-full filter blur-2xl animate-blob animation-delay-2000"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-4xl text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }} 
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-slate-400">
              Find Your Perfect Match
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto">
              Discover a new way to connect with people who share your interests. Join our community and start exploring today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="text-6xl animate-pulse"
          >
            <span role="img" aria-label="Heart">❤️</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => router.push('/register')}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Create an Account
            </button>
            <button
              onClick={() => router.push('/login')}
              className="w-full sm:w-auto border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Login
            </button>
          </motion.div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500 z-10">
        <p>&copy; {new Date().getFullYear()} YouApp. All rights reserved.</p>
      </footer>
    </div>
  );
}