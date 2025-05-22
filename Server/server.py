from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import requests
import json
import google.generativeai as genai

# Load the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Zilliz endpoint and collection
ZILLIZ_ENDPOINT = "https://in03-b94f636e631eba3.serverless.gcp-us-west1.cloud.zilliz.com/v2/vectordb/entities/search"
COLLECTION_NAME = "my_articles"

def encode_input(text):
    """Convert input text to a vector."""
    return model.encode(text).tolist()

def perform_zilliz_search(query, api_key, limit=10):
    """Perform a similarity search on Zilliz Cloud."""
    vector = encode_input(query)
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
    
    response = requests.post(ZILLIZ_ENDPOINT, headers=headers, data=json.dumps(body), timeout=10)
    response.raise_for_status()
    return response.json()

def query_gemini(search_response, gemini_api_key, user_query):
    """Send Zilliz search response to Gemini and query it."""
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel('gemini-2.0-flash')

    # Extract articles from search response
    articles = search_response.get('data', [])
    if not articles:
        return "No relevant articles found to process."

    # Prepare context from search results (top 3 articles)
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

    User Query: {user_query}

    Articles:
    {context}
    """

    response = model.generate_content(prompt)
    return response.text

# Define the request body structure
class QueryRequest(BaseModel):
    query: str
    zilliz_api_key: str
    gemini_api_key: str

# Initialize FastAPI app
app = FastAPI()

# Define the API endpoint
@app.post("/query")
async def query_endpoint(request: QueryRequest):
    try:
        # Perform Zilliz search with the provided query and API key
        search_response = perform_zilliz_search(request.query, request.zilliz_api_key)
        # Query Gemini with the search results and provided API key
        gemini_response = query_gemini(search_response, request.gemini_api_key, request.query)
        # Return the Gemini response
        return {"response": gemini_response}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Zilliz search failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying Gemini: {str(e)}")
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
