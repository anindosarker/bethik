import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Dash/Sidebar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Table from "../../components/Dash/Table";

export default function leaderboard() {
  const supabase = useSupabaseClient();

  const [profileData, setProfileData] = useState<any[] | null>([]);
  const patha = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`*, sentences(count)`)
        .order("edit_count", { ascending: false });

      console.log("sentence count", data);
      setProfileData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // Fetch the count of corrected sentences for the user from your profileDatabase
    // and update the state using setCount
    patha();
  }, []);

  return (
    <div className="grid m-0 grid-cols-6 gap-4 h-screen">
      <div className="row-span-full shadow-lg col-start-1 hidden md:inline">
        <Sidebar />
      </div>
      <div className="container mt-5 row-span-full space-y-4 col-span-full md:col-span-5  px-4">
        <h1 className="text-xl">Top Contributors</h1>

        <Table tableData={profileData} />
      </div>
    </div>
  );
}
