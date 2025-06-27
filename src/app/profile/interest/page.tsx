'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, updateProfile } from '@/lib/api';

const BackIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6" /></svg>;
const CloseIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const LoadingSpinner = () => <div className="flex h-screen w-full items-center justify-center bg-youapp-background"><div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div></div>;

const Message = ({ text, type }: { text: string; type: 'success' | 'error' }) => {
  const baseClasses = "fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-300 z-50";
  const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return <div className={`${baseClasses} ${typeClasses}`}>{text}</div>;
};

interface ProfilePayload {
  name?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  interests?: string[];
}

export default function EditInterestPage() {
  const router = useRouter();
  const [interests, setInterests] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfilePayload | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
        setInterests(data.interests || []);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const addInterest = () => {
    const trimmedInterest = currentInput.trim();
    if (trimmedInterest && !interests.includes(trimmedInterest)) {
      setInterests([...interests, trimmedInterest]);
    }
    setCurrentInput('');
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addInterest();
    }
  };

  const handleSave = async () => {
    if (!profileData) return;
    setIsSaving(true);
    try {
      const payload: ProfilePayload = {
        ...profileData, 
        interests: interests, 
      };
      await updateProfile(payload);
      setMessage({ text: 'Interests saved successfully!', type: 'success' });
      setTimeout(() => router.push('/profile'), 1000); 
    } catch (error) {
      console.error("Failed to save interests:", error);
      setMessage({ text: 'Failed to save. Please try again.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-youapp-background text-white">
      {message && <Message text={message.text} type={message.type} />}
      
      <div className="mx-auto max-w-xl p-4">
        <header className="flex items-center justify-between py-4">
          <button onClick={() => router.back()} className="flex items-center">
            <BackIcon className="h-6 w-6" />
            <span className="ml-2 font-bold">Back</span>
          </button>
          <button onClick={handleSave} disabled={isSaving} className="font-bold text-cyan-400 disabled:text-gray-500">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </header>

        <main className="mt-12 space-y-4">
          <h2 className="text-lg font-bold text-cyan-400">Tell everyone about yourself</h2>
          <h1 className="text-2xl font-bold">What interest you?</h1>
          
          <div className="rounded-lg bg-transparent p-4 min-h-[100px] border border-white/20 flex flex-wrap gap-3 items-center">
            {interests.map(interest => (
              <div key={interest} className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                <span>{interest}</span>
                <button type="button" onClick={() => removeInterest(interest)} aria-label={`Remove ${interest}`} className="flex items-center justify-center">
                  <CloseIcon className="text-white/80 hover:text-white" />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent p-1 outline-none text-base"
              placeholder={interests.length === 0 ? "Type an interest and press Enter..." : ""}
            />
          </div>
        </main>
      </div>
    </div>
  );
}