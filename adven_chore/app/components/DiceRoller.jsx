import { chores } from "../state/tasks";

export default function DiceRoller({ level }) {
  const levelTasks = chores[level];

  const rollDice = () => {
    const randomIndex = Math.floor(Math.random() * levelTasks.length);
    const task = levelTasks[randomIndex];
    alert(`You rolled a chore: ${task.name} (${task.damage} HP)`);
  };

  return (
    <button onClick={rollDice} className="bg-green-500 text-white p-2 mt-4">
      Roll the Dice
    </button>
  );
}
