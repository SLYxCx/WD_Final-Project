export default function RandomPicker({ tasks }) {
  const pickRandomTask = () => {
    if (tasks.length === 0) {
      alert("No tasks available!");
      return;
    }
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    alert(`Your next task: ${randomTask.text}`);
  };

  return (
    <button onClick={pickRandomTask} className="mt-4 bg-green-500 text-white p-2">
      Roll Dice
    </button>
  );
}