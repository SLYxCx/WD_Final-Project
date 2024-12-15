import { useState } from "react";

/**
 * The ChoreList component manages the display and interaction of tasks (chores).
 * It allows users to add chores and mark them as complete.
 */

export default function ChoreList({ selectedLevel, highlightedTask, onTaskClick, isQuestStarted, onQuestStart, chores, setChores }) {
  const [completedTasks, setCompletedTasks] = useState({});


  /**
   * Handles changes to the checkbox for a task.
   * When a task is checked for the first time, deals damage to the dragon based on the task's damage value
   * and marks the task as completed.
   */
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

  /**
   * Returns an array of possible damage options based on the task's level.
   */
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

  /**
   * Adds a new task to the list of chores for the specified level.
   * The new task is initialized with a default name and damage value.
   */
  const addTask = (level) => {
    const newTask = { id: Date.now(), name: '', damage: 10 }; // '10' default value.
    setChores((prev) => ({
      ...prev,
      [level]: [...prev[level], newTask],
    }));
  };

  /**
   * This function updates the damage property for the corresponding task when the user selects a new value.
   * @param  e : Event to trigger change of dropdown
   * @param {*} level  : Level of the task difficulty.
   * @param {*} taskId : Task ID
   */
  const handleDamageChange = (e, level, taskId) => {
    const newDamage = parseInt(e.target.value, 10); // Parse selected value
    setChores((prevChores) => ({
      ...prevChores,
      [level]: prevChores[level].map((task) =>
        task.id === taskId ? { ...task, damage: newDamage } : task
      ),
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
                    value={task.damage}
                    className="p-1 border rounded"
                    disabled={completedTasks[task.id] || isQuestStarted}
                    onChange={(e) => handleDamageChange(e, level, task.id)}
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
      
    </div>
  );
}
