import { useState } from "react";

export default function ChoreList({ selectedLevel, highlightedTask, onTaskClick, isQuestStarted, onQuestStart }) {
  const [chores, setChores] = useState({ Cantrips: [], "1st level": [], "2nd level": [] });
  const [completedTasks, setCompletedTasks] = useState({});

  const handleCheckboxChange = (level, task) => {
    if (!completedTasks[task.id]) {
      const damageInput = parseInt(document.getElementById(`damage-${task.id}`).value, 10);
      onTaskClick(damageInput); // Deal damage based on the task's damage value

      setCompletedTasks((prev) => ({
        ...prev,
        [task.id]: true, // Ensure the task cannot be unchecked
      }));
    }
  };

  const getOptionsForLevel = (level) => {
    switch (level) {
      case 'Cantrips':
        return [10, 20, 30];
      case '1st level':
        return [20, 30, 40];
      case '2nd level':
        return [30, 40, 60];
      default:
        return [];
    }
  };

  const addTask = (level) => {
    const newTask = { id: Date.now(), name: '', damage: 10 };
    setChores((prev) => ({
      ...prev,
      [level]: [...prev[level], newTask],
    }));
  };

  return (
    <div className="flex">
      <div className="w-2/3">
        {Object.entries(chores).map(([level, tasks]) => (
          <div key={level} className="bg-gray-100 p-4 rounded-md shadow mb-4">
            <h2 className="text-xl font-bold text-gray-700 capitalize">{level}</h2>
            <ul className="grid grid-cols-2 gap-4 mt-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    highlightedTask?.id === task.id ? "bg-yellow-200" : "hover:bg-red-100"
                  } ${completedTasks[task.id] ? "bg-gray-300" : ""}`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${task.id}`}
                    checked={completedTasks[task.id] || false}
                    onChange={() => handleCheckboxChange(level, task)}
                    className="mr-2"
                    disabled={completedTasks[task.id]} // Disable checkbox if task is completed
                  />
                  <input
                    type="text"
                    id={`name-${task.id}`}
                    defaultValue={task.name}
                    className="mr-2 p-1 border rounded"
                    disabled={completedTasks[task.id] || isQuestStarted}
                  />
                  <select
                    id={`damage-${task.id}`}
                    defaultValue={task.damage}
                    className="p-1 border rounded"
                    disabled={completedTasks[task.id] || isQuestStarted}
                  >
                    {getOptionsForLevel(level).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
            {!isQuestStarted && (
              <button onClick={() => addTask(level)} className="mt-2 p-2 bg-green-500 text-white rounded">
                Add Task
              </button>
            )}
          </div>
        ))}
        {!isQuestStarted && (
          <button
            onClick={() => onQuestStart(chores)}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Start Quest
          </button>
        )}
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <img src="/path/to/dragon-image.png" alt="Dragon" className="max-w-full h-auto" />
      </div>
    </div>
  );
}
