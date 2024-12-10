import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), text: task, completed: false });
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white p-2">Add</button>
    </form>
  );
}