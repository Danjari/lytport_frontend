import { useState } from 'react';

export default function ReportPage() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput }),
        });

        const data = await res.json();
        setResponse(data);
    };

    return (
        <div>
            <h1>Generate Report</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your request"
                    rows={4}
                    cols={50}
                />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}