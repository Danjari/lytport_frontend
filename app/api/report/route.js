// export async function POST(req) {
//     try {
//         const body = await req.json(); // Parse JSON body from the request

//         if (!body.userInput || body.userInput.trim() === "") {
//             return new Response(JSON.stringify({ error: "User input is required" }), {
//                 status: 400,
//                 headers: { "Content-Type": "application/json" },
//             });
//         }

//         // Success response
//         return new Response(
//             JSON.stringify({
//                 message: "Input received successfully",
//                 userInput: body.userInput,
//             }),
//             { status: 200, headers: { "Content-Type": "application/json" } }
//         );
//     } catch (error) {
//         console.error("Error handling POST request:", error);

//         // Error response
//         return new Response(
//             JSON.stringify({ error: "Something went wrong on the server" }),
//             { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//     }
// }

export async function POST(req) {
    const body = await req.json();

    if (!body.userInput || body.userInput.trim() === "") {
        return new Response(JSON.stringify({ error: "User input is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        // Call the Python API
        const pythonApiResponse = await fetch("http://localhost:8000/vectorize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput: body.userInput }),
        });

        const data = await pythonApiResponse.json();

        if (!pythonApiResponse.ok) {
            throw new Error(data.error || "Error from Python API");
        }

        return new Response(JSON.stringify({ message: "Vectorization successful", embedding: data.embedding }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error calling Python API:", error);
        return new Response(
            JSON.stringify({ error: "Something went wrong during vectorization" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}