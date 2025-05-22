from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import requests
import json
import google.generativeai as genai
from typing import Optional

# Initialize FastAPI app
app = FastAPI(title="Operation Legal Shield Search API")

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define the Zilliz endpoint
ZILLIZ_ENDPOINT = "https://in03-b94f636e631eba3.serverless.gcp-us-west1.cloud.zilliz.com/v2/vectordb/entities/search"

# Define the collection name
COLLECTION_NAME = "my_articles"

# Request model for input validation
class SearchRequest(BaseModel):
    query: str
    zilliz_api_key: str
    gemini_api_key: Optional[str] = None  # Optional, in case Gemini is not used
    limit: int = 10

def encode_input(text):
    """Convert the input text to a vector."""
    return model.encode(text).tolist()

def similarity_search(user_input, api_key, limit=10):
    """
    Perform a similarity search on Zilliz Cloud.
    """
    if not user_input or not isinstance(user_input, str):
        raise ValueError("User input must be a non-empty string.")
    if not api_key:
        raise ValueError("Zilliz API key must be provided.")

    vector = encode_input(user_input)
    if not vector:
        raise ValueError("Failed to encode user input.")

    body = {
        "collectionName": COLLECTION_NAME,
        "data": [vector],
        "limit": limit,
        "outputFields": ["title", "content"]
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(ZILLIZ_ENDPOINT, headers=headers, data=json.dumps(body), timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error making request to Zilliz: {str(e)}")

def clean_zilliz_response(zilliz_results):
    """
    Clean Zilliz response to keep only title and content for each article.
    """
    articles = zilliz_results.get('data', [])
    cleaned_articles = [
        {"title": article.get("title", ""), "content": article.get("content", "")}
        for article in articles
    ]
    return {"data": cleaned_articles}

def process_with_gemini(query, cleaned_articles, gemini_api_key):
    """
    Process cleaned Zilliz results with Gemini 1.5 Flash to generate a user-friendly response.
    """
    if not gemini_api_key:
        raise ValueError("Gemini API key must be provided.")

    # Configure Gemini
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Extract content from cleaned articles
    articles = cleaned_articles.get('data', [])
    if not articles:
        return "No relevant articles found to process."

    # Concatenate titles and content for context (limit to top 5 for consistency with your script)
    context = ""
    for article in articles[:5]:
        title = article.get('title', 'No Title')
        content = article.get('content', 'No Content')
        context += f"Title: {title}\nContent: {content}\n\n"

    # Prompt for Gemini to act as an agent
    prompt = f"""
    You are a legal assistant helping marginalized communities in India understand legal information.
    Based on the following articles and the user's query, provide a concise, easy-to-understand response in simple language.
    Avoid legal jargon and focus on clarity. Act as an agent by directly addressing the user's query, summarizing key points, and guiding the user on practical next steps they can take to address their situation.
    If the articles don't fully answer the query, provide a general explanation and suggest actionable steps, such as contacting a local lawyer, visiting a police station, or seeking help from a legal aid organization.

    User Query: {query}

    Articles:
    {context}

    Response (2-3 sentences, followed by 1-2 specific next steps):
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing with Gemini: {str(e)}")

@app.post("/search")
async def search(request: SearchRequest):
    """
    Perform a similarity search, clean the results, and process with Gemini 1.5 Flash.
    
    Args:
        request: SearchRequest containing query, zilliz_api_key, gemini_api_key, and optional limit.
    
    Returns:
        Dict with cleaned Zilliz results and Gemini-processed response (if gemini_api_key provided).
    """
    try:
        # Perform Zilliz similarity search
        zilliz_results = similarity_search(request.query, request.zilliz_api_key, request.limit)
        if not zilliz_results or not zilliz_results.get('data'):
            raise HTTPException(status_code=404, detail="No results found from Zilliz.")

        # Clean the Zilliz response to keep only title and content
        cleaned_results = clean_zilliz_response(zilliz_results)

        # Initialize response
        response = {"zilliz_results": cleaned_results}

        # Process with Gemini if API key is provided
        if request.gemini_api_key:
            gemini_response = process_with_gemini(request.query, cleaned_results, request.gemini_api_key)
            response["gemini_response"] = gemini_response

        return response
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Input error: {str(ve)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# Run the app (for local testing, not needed in Colab with uvicorn)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)