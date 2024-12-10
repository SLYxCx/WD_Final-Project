'use client'
import { useState } from "react";
import ChoreList from "./components/ChoreList";
import DiceRoller from "./components/DiceRoller";

export default function Home() {
  const [level, setLevel] = useState("cantrips");

  return (
    <div>
      <h1 className="text-2xl font-bold">Slay the Dragon</h1>
      <div className="flex space-x-4 mt-4">
        <button onClick={() => setLevel("cantrips")} className="bg-blue-500 text-white p-2">Cantrips</button>
        <button onClick={() => setLevel("level1")} className="bg-yellow-500 text-white p-2">1st Level</button>
        <button onClick={() => setLevel("level2")} className="bg-red-500 text-white p-2">2nd Level</button>
      </div>

      <ChoreList level={level} />
      <DiceRoller level={level} />
    </div>
  );
}