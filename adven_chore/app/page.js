'use client'
import { useState } from "react";
import ChoreChart from "./components/ChoreChart";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar";

export default function Home() {
  const [level, setLevel] = useState("cantrips");
  const {user, loading } = useAuth();

  return (
    user ? ( <div className="flex flex-col min-h-screen">
      <Navbar /> </div>) :
    <div className="p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-red-600">
        Slay the Dragon!
      </h1>
      <p className="text-center mt-2 text-gray-700">
        Complete chores to deal damage and defeat the dragon!
      </p>
      <main>
      {/* Components */}
      <ChoreChart />
      </main>
    </div>
  );
}