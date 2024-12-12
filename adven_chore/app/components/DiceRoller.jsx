import { chores } from "../state/tasks";

export default function DiceRoller() {
  // Combine all tasks from all levels
  const allTasks = Object.values(chores).flat();

  const rollDice = () => {
    const randomIndex = Math.floor(Math.random() * allTasks.length); // Pick a random task
    const task = allTasks[randomIndex]; // Get the selected task
    alert(`You rolled: ${task.name} (${task.damage} HP)`); // Display the task
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={rollDice}
        className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600"
      >
        Roll the Dice
      </button>
    </div>
  );
}
