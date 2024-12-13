import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'state', 'tasks.json');

    try {
      // Read tasks from the JSON file
      const data = fs.readFileSync(filePath, 'utf8');
      const tasks = JSON.parse(data);
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      res.status(500).json({ message: 'Failed to load tasks.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}