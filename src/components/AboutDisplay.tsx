type AboutDisplayProps = {
  profile: {
    name?: string;
    birthday?: string;
    height?: number;
    weight?: number;
  };
  zodiac: string;
  horoscope: string;
};

export const AboutDisplay = ({ profile, zodiac, horoscope }: AboutDisplayProps) => {
  const hasData = profile.birthday || profile.height || profile.weight;

  if (!hasData) {
    return <p className="text-gray-400">Add in your to help others know you better</p>;
  }

  return (
    <table className="w-full text-left text-sm">
      <tbody>
        {profile.birthday && (
          <tr>
            <td className="py-1 w-1/3 text-gray-400">Birthday:</td>
            <td className="font-medium">
              {new Date(profile.birthday).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},
              ({new Date().getFullYear() - new Date(profile.birthday).getFullYear()} yo)
            </td>
          </tr>
        )}
        {zodiac && (
          <tr>
            <td className="py-1 w-1/3 text-gray-400">Zodiac:</td>
            <td className="font-medium">{zodiac}</td>
          </tr>
        )}
        {horoscope && (
          <tr>
            <td className="py-1 w-1/3 text-gray-400">Horoscope:</td>
            <td className="font-medium">{horoscope}</td>
          </tr>
        )}
        {profile.height && (
          <tr>
            <td className="py-1 w-1/3 text-gray-400">Height:</td>
            <td className="font-medium">{profile.height} cm</td>
          </tr>
        )}
        {profile.weight && (
          <tr>
            <td className="py-1 w-1/3 text-gray-400">Weight:</td>
            <td className="font-medium">{profile.weight} kg</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};