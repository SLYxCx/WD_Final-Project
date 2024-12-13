import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log('API hit'); // Add this
  if (req.method === 'POST') {
    const tasks = req.body;

    console.log('Received tasks:', tasks); // Debugging log

    const filePath = path.join(process.cwd(), 'state', 'tasks.json');

    try {
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
      console.log('Tasks saved to:', filePath); // Debugging log
      res.status(200).json({ message: 'Tasks saved successfully!' });
    } catch (error) {
      console.error('Error saving tasks:', error); // Debugging log
      res.status(500).json({ message: 'Failed to save tasks.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
