import Image from "next/image";

interface Profile {
  name: string;
  age: number;
  gender: string;
  bio: string;
  hobbies: string[];
}

const hobbyColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-teal-500",
];

const getHobbyColor = (hobby: string) => {
  const firstLetter = hobby.charAt(0).toLowerCase();
  const charCode = firstLetter.charCodeAt(0);
  const index = charCode % hobbyColors.length;
  return hobbyColors[index];
};

const ProfileCard = ({ profile }: { profile: Profile }) => {
  const imageName = profile.name.split(" ")[0].toLowerCase();
  const imagePath = `/${imageName}.jpg`;

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl border border-gray-700 flex flex-col">
      <div className="relative w-full h-64">
        <Image
          src={imagePath}
          alt={profile.name}
          fill
          className="object-cover"
          onError={(e) => console.error("Image not found:", e)}
        />
      </div>

      <div className="px-6 py-4 flex flex-col flex-grow">
        <div className="font-bold text-xl mb-2 text-white">
          {profile.name}, {profile.age}
        </div>

        <p className="text-gray-400 text-sm mb-2">
          {profile.gender === "M" ? "Male" : "Female"}
        </p>

        <p className="text-gray-300 text-base mb-4 flex-grow">{profile.bio}</p>

        <div className="flex flex-wrap gap-2">
          {profile.hobbies.map((hobby, index) => (
            <span
              key={index}
              className={`${getHobbyColor(
                hobby
              )} text-white text-sm font-semibold px-3 py-1 rounded-full`}
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
