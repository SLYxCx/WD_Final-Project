import { chores } from "../state/tasks";

export default function ChoreList({ level }) {
  const levelTasks = chores[level];

  return (
    <ul>
      {levelTasks.map((task) => (
        <li key={task.id} className="flex justify-between p-2 border">
          <span>{task.name}</span>
          <span className="text-gray-500">{task.damage} HP</span>
        </li>
      ))}
    </ul>
  );
}