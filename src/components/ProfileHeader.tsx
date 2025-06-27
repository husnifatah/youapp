'use client';

type ProfileHeaderProps = {
  username: string;
  onBack: () => void;
};

const BackIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6" /></svg>;

export const ProfileHeader = ({ username, onBack }: ProfileHeaderProps) => (
  <header className="flex items-center justify-between py-4">
    <button onClick={onBack} className="flex items-center w-24">
      <BackIcon className="h-6 w-6" />
      <span className="ml-2 font-bold">Back</span>
    </button>

    <h1 className="text-xl font-bold text-center truncate px-2">@{username}</h1>
    <div className="w-24 text-right">
    </div>
  </header>
);