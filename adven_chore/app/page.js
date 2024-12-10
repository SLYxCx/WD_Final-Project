'use client'
import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => setTasks([...tasks, task]);
  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };
  const removeTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <div>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onEdit={editTask} onRemove={removeTask} />
    </div>
  );
}