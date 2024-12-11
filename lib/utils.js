import db from './db';

async function getTrendyCaptionsOfTheWeek() {
    try {
        const currentDate = new Date();
        const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const currentMonth = Months[currentDate.getMonth()];
        const currentDay = currentDate.getDate();

        const query = `
            WITH target_row AS (
                SELECT * 
                FROM top_captions_per_day
                WHERE month_day = ?
            )
            SELECT * 
            FROM (
                SELECT *, 
                    ABS(DAYOFYEAR(STR_TO_DATE(month_day, '%M-%d')) - 
                        DAYOFYEAR(STR_TO_DATE(?, '%M-%d'))) AS day_difference
                FROM top_captions_per_day
            ) subquery
            WHERE month_day != ?
            ORDER BY day_difference ASC
            LIMIT 6;
        `;

        const response = await db.query(query, [
            `${currentMonth}-${currentDay}`,
            `${currentMonth}-${currentDay}`,
            `${currentMonth}-${currentDay}`,
        ]);

        return response;
    } catch (error) {
        console.error('Error fetching trendy captions:', error);
        throw error;
    }
}

export { getTrendyCaptionsOfTheWeek };
