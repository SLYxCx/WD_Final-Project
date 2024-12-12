'use client'
import { useState } from "react";
import ChoreChart from "./components/ChoreChart";

export default function Home() {
  const [level, setLevel] = useState("cantrips");

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center text-red-600">
        Slay the Dragon!
      </h1>
      <p className="text-center mt-2 text-gray-700">
        Complete chores to deal damage and defeat the dragon!
      </p>

      {/* Components */}
      <ChoreChart />
    </div>
  );
}