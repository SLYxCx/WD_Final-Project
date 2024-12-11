import { useState } from "react";

export default function ChoreChart() {
  const totalHP = 310; // Dragon's total HP
  const [damageDealt, setDamageDealt] = useState(0);

  const remainingHP = totalHP - damageDealt;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-center">Dragon's HP</h2>
      <div className="bg-gray-300 w-full h-6 rounded-md mt-2">
        <div
          className="bg-red-600 h-6 rounded-md"
          style={{ width: `${(remainingHP / totalHP) * 100}%` }}
        />
      </div>
      <p className="text-center mt-2 text-gray-600">
        {remainingHP} HP remaining
      </p>
      <div className="mt-4 text-center">
        <button
          onClick={() => setDamageDealt((prev) => Math.min(prev + 10, totalHP))}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add 10 HP Damage
        </button>
      </div>
    </div>
  );
}
