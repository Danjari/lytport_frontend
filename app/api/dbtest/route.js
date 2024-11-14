import db from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    console.log(req.method);
    if (req.method === 'GET') {
        try {
            // const users = await db.getAll('users');
            const users = await db.query('select * from users');
            return NextResponse.json(users, { status: 200 });
        } catch (error) {
            console.error('Error retrieving users:', error);
            return  NextResponse.json({ message: 'Error retrieving users'}, { status: 500 });
        }
    } else {
        return NextResponse({ message: 'Method not allowed' }, { status: 405 });
    }
}