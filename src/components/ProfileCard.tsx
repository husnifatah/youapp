import Image from "next/image";

type ProfileCardProps = {
  name?: string;
  username?: string;
  birthday?: string;
  gender?: string;
  image?: string;
  zodiac?: string; 
  horoscope?: string; 
};

export const ProfileCard = ({ name, username, birthday, gender, image, zodiac, horoscope }: ProfileCardProps) => {
  const age = birthday ? new Date().getFullYear() - new Date(birthday).getFullYear() : '';

  return (
    <div className="relative rounded-lg bg-white/5 p-4 min-h-[190px] overflow-hidden flex flex-col justify-end">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      )}
      <div className="relative z-10 text-white">
        <p className="font-bold text-lg">
          {name ? `${name},` : `@${username},`}
          {age ? ` ${age}` : ''}
        </p>
        {gender && <p className="text-sm font-light mt-1">{gender}</p>}
        
        {zodiac && horoscope && (
          <div className="flex items-center gap-2 mt-2">
            <div className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">{zodiac}</div>
            <div className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">{horoscope}</div>
          </div>
        )}
      </div>
    </div>
  );
};