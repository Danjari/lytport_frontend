import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log(req.method);
    if (req.method === 'GET') {
        try {
            // Fetch all rows from the 'user' table
            const users = await db.getAll('users');
            return new NextResponse(JSON.stringify(users), { status: 200 });
        } catch (error) {
            console.error('Error retrieving users:', error);
            return new NextResponse({ message: 'Error retrieving users'}, { status: 500 });
        }
    } else {

    // Fetch all rows from the 'user' table
    const users = await db.getAll('users');
    return new NextResponse(users, { status: 400 });
            // res.status(200).json({ success: true, data: users });
    }
}