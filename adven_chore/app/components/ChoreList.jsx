import { useState } from "react";
import { chores as initialChores } from "../state/tasks";

export default function ChoreList({ selectedLevel, highlightedTask, onTaskClick }) {
  const [chores, setChores] = useState(initialChores);

  const handleSave = async () => {
    const updatedChores = {};
    Object.entries(chores).forEach(([level, tasks]) => {
      updatedChores[level] = tasks.map((task) => {
        const nameInput = document.getElementById(`name-${task.id}`).value;
        const damageInput = document.getElementById(`damage-${task.id}`).value; // Update this
        return { ...task, name: nameInput, damage: damageInput }; // Use "damage" here
      });
    });
  
    const response = await fetch('/api/saveTasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedChores),
    });
  
    if (response.ok) {
      console.log('Tasks saved successfully!');
    } else {
      console.error('Failed to save tasks');
    }
  };
  

  const getOptionsForLevel = (level) => {
    switch (level) {
      case 'cantrips':
        return [10, 20, 30];
      case '1stLevel':
        return [20, 30, 40];
      case '2ndLevel':
        return [30, 40, 60];
      default:
        return [];
    }
  };

  return (
    <div className="flex">
      <div className="w-2/3">
      {Object.entries(chores).map(([level, tasks]) => (
  <div key={level} className="bg-gray-100 p-4 rounded-md shadow mb-4">
    <h2 className="text-xl font-bold text-gray-700 capitalize">{level}</h2>
    <ul className="grid grid-cols-2 gap-4 mt-2">
      {tasks.map((task) => {
        return (
          <li key={task.id} className="flex justify-between p-2 rounded-md cursor-pointer">
            <input
              type="text"
              id={`name-${task.id}`}
              defaultValue={task.name}
              className="mr-2 p-1 border rounded"
            />
            <select id={`damage-${task.id}`} defaultValue={task.damage} className="p-1 border rounded">
              {getOptionsForLevel(level).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </li>
        );
      })}
    </ul>
  </div>
))}

        <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">Save</button>
      </div>
      <div className="w-1/3 flex items-center justify-center">
        {/* Placeholder for the dragon image */}
        <img src="/path/to/dragon-image.png" alt="Dragon" className="max-w-full h-auto" />
      </div>
    </div>
  );
}