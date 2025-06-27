'use client'; 

import { useRouter } from 'next/navigation';

type InterestCardProps = {
  interests: string[];
};

const EditIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>;

export const InterestCard = ({ interests }: InterestCardProps) => {
  const router = useRouter(); 

  return (
    <div className="rounded-lg bg-white/5 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Interest</h2>
        <button onClick={() => router.push('/profile/interest')} aria-label="Edit interest section">
          <EditIcon className="text-white/80" />
        </button>
      </div>
      {interests && interests.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span key={index} className="rounded-full bg-white/20 px-3 py-1 text-sm">{interest}</span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Add in your interest to find a better match</p>
      )}
    </div>
  );
};