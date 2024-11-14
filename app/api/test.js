import db from '../../lib/db.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch all rows from the 'user' table
            const users = await db.getAll('user');
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ success: false, message: 'Error retrieving users' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}