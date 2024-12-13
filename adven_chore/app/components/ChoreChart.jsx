import { useState } from "react";
import ChoreList from "./ChoreList";

export default function ChoreChart() {
  // State for managing the total HP of the dragon
  const [totalHP, setTotalHP] = useState(0);

  // State for managing the accumulated damage dealt to the dragon
  const [damageDealt, setDamageDealt] = useState(0);

  // State for managing the current level of the user's selection.
  const [selectedLevel, setSelectedLevel] = useState("Cantrips");

  // State for holding the current highlighted task. Used for the Dice roller function.
  const [highlightedTask, setHighlightedTask] = useState(null);

  // Boolean flag to check if user has started his quest. Will lock editing tasks if true.
  const [isQuestStarted, setIsQuestStarted] = useState(false);

  // State for managing the current tasks loaded.
  const [chores, setChores] = useState({ "Cantrips": [], "1st level": [], "2nd level": [] });

  /**
   * Calculates the remaining HP of the dragon.
   * Returns 0 if damage exceeds totalHP to avoid negative values.
   */
  const remainingHP = totalHP - damageDealt;

  /**
   * Updates the accumulated damage dealt to the dragon.
   * Prevents the total damage from exceeding the dragon's total HP.
   */
  const handleDamage = (damage) => {
    setDamageDealt((prev) => Math.min(prev + parseInt(damage, 10), totalHP));
  };


  /**
   * Randomly selects a task from the list of tasks at the selected level.
   * Highlights the selected task for visual emphasis.
   */
  const handleDiceRoll = (chores) => {
    if (!chores[selectedLevel] || chores[selectedLevel].length === 0) {
      alert("No tasks available in the selected level!");
      return;
    }

    const randomTask =
      chores[selectedLevel][Math.floor(Math.random() * chores[selectedLevel].length)];
    setHighlightedTask(randomTask);
  };

  /**
   * Starts the quest by calculating the total damage potential of all tasks.
   * Locks editing and displays the dragon's HP bar.
   */
  const startQuest = (chores) => {
    const totalDamage = Object.values(chores).flat().reduce((sum, task) => sum + parseInt(task.damage, 10), 0);
    setTotalHP(totalDamage);
    setIsQuestStarted(true);
  };

// **SAVE FUNCTION**: Saves the tasks to /state/tasks.json.
const handleSave = async () => {
  try {
    const response = await fetch('/api/saveTasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chores),
    });
    const result = await response.json();
    alert(result.message); // Notify user
  } catch (error) {
    console.error('Error saving tasks:', error);
    alert('Failed to save tasks.');
  }
};

// **LOAD FUNCTION**: Loads the tasks to /state/tasks.json.
const handleLoad = async () => {
  try {
    const response = await fetch('/api/loadTasks');
    const data = await response.json();
    setChores(data); // Update tasks
    startQuest(data); // Recalculate total HP
    alert('Tasks loaded successfully!');
  } catch (error) {
    console.error('Error loading tasks:', error);
    alert('Failed to load tasks.');
  }
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


      {/* Save and load buttons */}

      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          onClick={handleSave}
          disabled={!isQuestStarted} // Disable Save until quest starts
          className={`px-4 py-2 rounded-md shadow ${
            isQuestStarted
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save
        </button>
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 cursor-pointer"
        >
          Load
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleLoad}
        />
      </div>

      <ChoreList
        selectedLevel={selectedLevel}
        highlightedTask={highlightedTask}
        onTaskClick={handleDamage}
        isQuestStarted={isQuestStarted}
        onQuestStart={(chores) => 
          startQuest(chores)}
            chores={chores} // Pass down tasks
            setChores={setChores} // Allow child to update tasks
      />
    </div>
  );
}