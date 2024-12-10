import { useState } from "react";

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
