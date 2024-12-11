import { chores } from "../state/tasks";

export default function ChoreList() {
  return (
    <div className="space-y-6">
      {Object.entries(chores).map(([level, tasks]) => (
        <div key={level} className="bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-xl font-bold text-gray-700 capitalize">{level}</h2>
          <ul className="divide-y divide-gray-300 mt-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between p-2 hover:bg-gray-200 rounded-md"
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
