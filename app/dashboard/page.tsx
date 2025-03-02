"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/profileCard";

interface User {
  email: string;
}

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bio: string;
  hobbies: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndProfiles = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData?.user) {
        router.push("/login");
        return;
      }
      setUser(userData.user as User);

      const { data: profilesData, error: profilesError } = await supabase
        .from("views")
        .select("*");

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError.message);
      } else {
        setProfiles(profilesData as Profile[]);
      }
    };

    fetchUserAndProfiles();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
      <div className="w-full max-w-7xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition shadow-md"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
