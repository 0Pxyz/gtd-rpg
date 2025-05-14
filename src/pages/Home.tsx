import type { AppUser, Profile } from "../types";

interface HomeProps {
  user: AppUser;
  profile: Profile;
}

const Home: React.FC<HomeProps> = ({ user, profile }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-emerald font-rpg">
        Welcome to GTD Quest, {user.email}!
      </h1>
      <div className="mt-4 text-gold font-roboto">
        <p>Level: {profile.level}</p>
        <p>XP: {profile.xp}</p>
        <p>XP to Next Level: {profile.xp_to_next_level}</p>
        <div className="mt-2">
          <p className="font-rpg">Attributes:</p>
          <ul className="ml-4">
            {Object.entries(profile.attributes).map(([key, value]) => (
              <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </li>
            ))}
          </ul>
        </div>
        {profile.avatar_url && <p>Avatar URL: {profile.avatar_url}</p>}
        <div className="mt-2">
          <p className="font-rpg">Stats:</p>
          <ul className="ml-4">
            {Object.entries(profile.stats).map(([key, value]) => (
              <li key={key}>
                {key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;