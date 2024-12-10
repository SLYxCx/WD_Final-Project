export default function TaskList({ tasks, onEdit, onRemove }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between p-2 border">
          <span>{task.text}</span>
          <div>
            <button onClick={() => onEdit(task)} className="mr-2">Edit</button>
            <button onClick={() => onRemove(task.id)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  );
}