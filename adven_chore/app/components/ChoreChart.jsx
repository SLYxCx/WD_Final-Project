import { useState } from "react";
import ChoreList from "./ChoreList";

export default function ChoreChart() {
  const [totalHP, setTotalHP] = useState(0); // Dragon's total HP
  const [damageDealt, setDamageDealt] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("Cantrips"); // Default level
  const [highlightedTask, setHighlightedTask] = useState(null); // Task to highlight
  const [isQuestStarted, setIsQuestStarted] = useState(false);

  const remainingHP = totalHP - damageDealt;

  const handleDamage = (damage) => {
    setDamageDealt((prev) => Math.min(prev + parseInt(damage, 10), totalHP));
  };

  const handleDiceRoll = (chores) => {
    if (!chores[selectedLevel] || chores[selectedLevel].length === 0) {
      alert("No tasks available in the selected level!");
      return;
    }

    const randomTask =
      chores[selectedLevel][Math.floor(Math.random() * chores[selectedLevel].length)];
    setHighlightedTask(randomTask);
  };

  const startQuest = (chores) => {
    const totalDamage = Object.values(chores).flat().reduce((sum, task) => sum + parseInt(task.damage, 10), 0);
    setTotalHP(totalDamage);
    setIsQuestStarted(true);
  };

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

      {totalHP > 0 && remainingHP <= 0 && (
        <p className="text-center text-green-500 mt-4 text-xl font-bold">
          🎉 You defeated the dragon! 🎉
        </p>
      )}


      <div className="flex items-center justify-center space-x-4 mt-6">
        <select
          className="p-2 bg-white border border-gray-300 rounded-md"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="Cantrips">Cantrips</option>
          <option value="1st level">1st Level</option>
          <option value="2nd level">2nd Level</option>
        </select>

        <button
          onClick={() => handleDiceRoll()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Roll the Dice
        </button>
      </div>

      <ChoreList
        selectedLevel={selectedLevel}
        highlightedTask={highlightedTask}
        onTaskClick={handleDamage}
        isQuestStarted={isQuestStarted}
        onQuestStart={startQuest}
      />
    </div>
  );
}