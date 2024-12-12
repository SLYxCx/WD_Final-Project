import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const tasks = req.body;

    const filePath = path.join(process.cwd(), 'state', 'tasks.js');
    const fileContent = `export const chores = ${JSON.stringify(tasks, null, 2)};`;

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save tasks' });
      } else {
        res.status(200).json({ message: 'Tasks saved successfully' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}