import { useState } from "react";
<<<<<<< Updated upstream

export default function Home() {
  const [health, setHealth] = useState(75);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Health Bar */}
        <div className="health-bar">
          <div
            className="health-bar-fill"
            style={{ width: `${health}%` }}
          ></div>
        </div>

        <h1>Game Page</h1>
=======
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
>>>>>>> Stashed changes

        {/* Buttons to Adjust Health */}
        <div className="flex gap-4">
          <button
            onClick={() => setHealth((prev) => Math.max(prev - 10, 0))}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decrease Health
          </button>
          <button
            onClick={() => setHealth((prev) => Math.min(prev + 10, 100))}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Increase Health
          </button>
        </div>
      </main>
    </div>
  );
}
