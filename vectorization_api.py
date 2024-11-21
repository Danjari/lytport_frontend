# from flask import Flask, request, jsonify
# from sentence_transformers import SentenceTransformer
# import logging
# from flask_cors import CORS


# # Set up logging
# logging.basicConfig(level=logging.INFO)

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app) 
# # Load the pre-trained SentenceTransformer model
# logging.info("Loading SentenceTransformer model...")
# model = SentenceTransformer('all-mpnet-base-v2')

# @app.route("/vectorize", methods=["POST"])
# def vectorize():
#     """
#     API endpoint to vectorize user input text.
#     Expects JSON payload with 'userInput'.
#     """
#     try:
#         # Parse input JSON
#         data = request.json
#         user_input = data.get("userInput", "")

#         if not user_input:
#             return jsonify({"error": "User input is required"}), 400

#         # Generate embedding
#         logging.info(f"Vectorizing input: {user_input}")
#         embedding = model.encode(user_input, convert_to_tensor=False).tolist()

#         return jsonify({"embedding": embedding}), 200
#     except Exception as e:
#         logging.error(f"Error during vectorization: {e}")
#         return jsonify({"error": "Internal server error"}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8000)


from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from fpdf import FPDF
from flask import send_file

# Initialize Flask app and SentenceTransformer model
app = Flask(__name__)
model = SentenceTransformer('all-mpnet-base-v2')



def generate_pdf(report, output_file="report.pdf"):
    """
    Generate a PDF report.

    Args:
        report (str): The report content as a string.
        output_file (str): The output PDF file name.

    Returns:
        str: The path to the generated PDF file.
    """
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for line in report.split("\n"):
        pdf.multi_cell(0, 10, line)

    pdf.output(output_file)
    return output_file

def generate_report(user_input, embedding, instagram_insights, influencer_insights):
    """
    Generate a structured text report from the insights.

    Args:
        user_input (str): The original user input.
        embedding (list): The embedding of the user input.
        instagram_insights (dict): Insights from the Instagram dataset.
        influencer_insights (dict): Insights from the influencer dataset.

    Returns:
        str: A formatted report as a string.
    """
    report = []
    report.append(f"User Input: {user_input}\n")
    report.append(f"Embedding: {embedding}\n")

    report.append("\nInstagram Insights:\n")
    for col, rows in instagram_insights.items():
        report.append(f"  - Based on {col}:\n")
        for row in rows:
            report.append(f"    - {row['name']} on {row['date']}, Similarity: {row['similarity']:.2f}\n")

    report.append("\nInfluencer Insights:\n")
    for col, rows in influencer_insights.items():
        report.append(f"  - Based on {col}:\n")
        for row in rows:
            report.append(f"    - Influencer: {row['username']}, Similarity: {row['similarity']:.2f}\n")

    return "\n".join(report)

def find_relevant_rows(embedding, data_csv, embedding_columns, top_n=3):
    """
    Retrieve the most relevant rows based on cosine similarity for specified embedding columns.

    Args:
        embedding (list): User input embedding.
        data_csv (str): Path to the CSV file with precomputed embeddings.
        embedding_columns (list): List of columns to compare embeddings with.
        top_n (int): Number of top relevant rows to return.

    Returns:
        dict: Top N relevant rows as dictionaries, grouped by embedding column.
    """
    # Load the dataset
    df = pd.read_csv(data_csv)

    # Parse embedding columns into numpy arrays
    for col in embedding_columns:
        df[col] = df[col].apply(eval).apply(np.array)

    # Store results for each embedding column
    results = {}
    for col in embedding_columns:
        # Compute cosine similarity
        similarities = df[col].apply(
            lambda x: cosine_similarity([embedding], [x])[0][0]
        )

        # Add similarity scores and sort
        df['similarity'] = similarities
        top_rows = df.nlargest(top_n, 'similarity')

        # Convert numpy arrays back to lists for JSON serialization
        top_rows[col] = top_rows[col].apply(lambda x: x.tolist())
        results[col] = top_rows.applymap(
            lambda x: x.tolist() if isinstance(x, np.ndarray) else x
        ).to_dict(orient='records')

    return results
@app.route("/vectorize", methods=["POST"])
def vectorize():
    """
    Endpoint to vectorize user input and retrieve relevant data from pre-vectorized CSVs.
    """
    try:
        # Parse JSON input
        data = request.json
        user_input = data.get("userInput", "")

        if not user_input:
            return jsonify({"error": "User input is required"}), 400

        # Generate embedding for the user input
        embedding = model.encode(user_input, convert_to_tensor=False).tolist()

        # Retrieve relevant Instagram data
        ig_results = find_relevant_rows(
            embedding=embedding,
            data_csv="vectorized_instagram_data.csv",
            embedding_columns=["impressions_embedding", "engagement_rate_embedding"],
            top_n=3
        )

        # Retrieve relevant Influencer data
        influencer_results = find_relevant_rows(
            embedding=embedding,
            data_csv="vectorized_influencer_data.csv",
            embedding_columns=["captions_y_embedding", "name_embedding"],
            top_n=3
        )

        # Generate the report
        report = generate_report(user_input, embedding, ig_results, influencer_results)
        # # Return insights as JSON
        # return jsonify({
        #     "embedding": embedding,
        #     "instagram_insights": ig_results,
        #     "influencer_insights": influencer_results,
        #      "report": report
        # }), 200
        # Generate PDF
        pdf_path = generate_pdf(report, output_file="report.pdf")

        # Return PDF as a downloadable file
        return send_file(pdf_path, as_attachment=True)

    except Exception as e:
        # Handle errors gracefully
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)