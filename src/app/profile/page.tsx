'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, updateProfile, UserProfile } from '@/lib/api';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileCard } from '@/components/ProfileCard';
import { AboutForm } from '@/components/AboutForm';
import { AboutDisplay } from '@/components/AboutDisplay';
import { InterestCard } from '@/components/InterestCard';

const getZodiac = (date: Date) => { const day = date.getDate(); const month = date.getMonth() + 1; if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"; if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"; if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"; if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"; if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"; if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"; if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"; if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"; if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"; if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"; if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"; if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"; return ""; };
const zodiacToEmoji: { [key: string]: string } = { "Aries": "♈", "Taurus": "♉", "Gemini": "♊", "Cancer": "♋", "Leo": "♌", "Virgo": "♍", "Libra": "♎", "Scorpio": "♏", "Sagittarius": "♐", "Capricorn": "♑", "Aquarius": "♒", "Pisces": "♓" };
const getHoroscopeEmoji = (zodiac: string) => zodiacToEmoji[zodiac] || '';
const EditIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>;
const LoadingSpinner = () => <div className="flex h-screen w-full items-center justify-center bg-youapp-background"><div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div></div>;

interface MessageProps {
  text: string;
  type: 'success' | 'error';
}
const Message = ({ text, type }: MessageProps) => {
  const baseClasses = "fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-300 z-50";
  const typeClasses = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return <div className={`${baseClasses} ${typeClasses}`}>{text}</div>;
};

interface DisplayProfile extends UserProfile {
  gender?: string;
  image?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DisplayProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [zodiac, setZodiac] = useState('');
  const [horoscope, setHoroscope] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  useEffect(() => {
    if (profile?.birthday) {
      const birthDate = new Date(profile.birthday);
      const calculatedZodiac = getZodiac(birthDate);
      setZodiac(calculatedZodiac);
      setHoroscope(getHoroscopeEmoji(calculatedZodiac));
    }
  }, [profile]);

  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    try {
      const apiData = await getProfile();
      const localGender = localStorage.getItem('user_profile_gender') || '';
      const localImage = localStorage.getItem('user_profile_image') || '';
      
      setProfile({ ...apiData, gender: localGender, image: localImage });
    } catch (err) {
      console.error("Gagal memuat profil, mengalihkan ke halaman login:", err);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]); 

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]); 

  interface ProfileFormData {
    name: string;
    gender: string;
    birthday: string;
    height: string;
    weight: string;
  }

  const handleSaveProfile = async (formData: ProfileFormData, imageFile: File | null) => {
    if (!profile) return;
    
    const textPayload = {
      name: formData.name,
      birthday: formData.birthday,
      height: parseInt(formData.height) || undefined,
      weight: parseInt(formData.weight) || undefined,
      interests: profile.interests || [],
    };

    try {
      await updateProfile(textPayload);
      localStorage.setItem('user_profile_gender', formData.gender);

      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          const base64Image = reader.result as string;
          localStorage.setItem('user_profile_image', base64Image);
          setProfile(prev => prev ? { ...prev, image: base64Image } : null);
        };
      }
      
      setProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: formData.name,
          birthday: formData.birthday,
          height: parseInt(formData.height) || undefined,
          weight: parseInt(formData.weight) || undefined,
          gender: formData.gender,
        };
      });

      setIsEditing(false);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setMessage({ text: 'Failed to save profile. Please try again.', type: 'error' });
    }
  };

  if (isLoading || !profile) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-youapp-background text-white">
      {message && <Message text={message.text} type={message.type} />}

      <div className="mx-auto max-w-xl p-4">
        <ProfileHeader
          username={profile.username}
          onBack={() => isEditing ? setIsEditing(false) : router.back()}
        />

        <main className="mt-4 space-y-4">
          <ProfileCard
            name={profile.name}
            username={profile.username}
            birthday={profile.birthday}
            gender={profile.gender}
            image={profile.image}
            zodiac={zodiac}
            horoscope={horoscope}
          />

          <div className="rounded-lg bg-white/5 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">About</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} aria-label="Edit about section">
                  <EditIcon className="text-white/80" />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <AboutForm
                initialData={{
                  name: profile.name || '',
                  gender: profile.gender || '',
                  birthday: profile.birthday ? profile.birthday.split('T')[0] : '',
                  height: profile.height?.toString() || '',
                  weight: profile.weight?.toString() || '',
                }}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <AboutDisplay profile={profile} zodiac={zodiac} horoscope={horoscope} />
            )}
          </div>
          
          <InterestCard interests={profile.interests || []} />
        </main>
      </div>
    </div>
  );
}