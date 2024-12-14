'use client'
import { useState } from "react";
import ChoreChart from "./components/ChoreChart";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar";

export default function Home() {
  const [level, setLevel] = useState("cantrips");

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-yellow-500 pt-2">
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