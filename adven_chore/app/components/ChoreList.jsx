import { useState } from "react";
import { chores as initialChores } from "../state/tasks";

export default function ChoreList({ selectedLevel, highlightedTask, onTaskClick }) {
  const [chores, setChores] = useState(initialChores);

  const handleTaskClick = (level, task) => {
    setChores((prev) => ({
      ...prev,
      [level]: prev[level].filter((t) => t.id !== task.id),
    }));

    onTaskClick(task.damage);
  };

  return (
    <div className="space-y-6">
      {Object.entries(chores).map(([level, tasks]) => (
        <div key={level} className="bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-xl font-bold text-gray-700 capitalize">{level}</h2>
          <ul className="divide-y divide-gray-30  0 mt-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between p-2 rounded-md cursor-pointer ${
                  highlightedTask?.id === task.id ? "bg-yellow-200" : "hover:bg-red-100"
                }`}
                onClick={() => handleTaskClick(level, task)}
              >
                <span>{task.name}</span>
                <span className="text-gray-500">{task.damage} HP</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
