Nyaya Sahayak
Overview
Nyaya Sahayak is an AI-powered web application designed to simplify legal research by enabling users to search for answers to legal questions. Built end-to-end using Retrieval-Augmented Generation (RAG), it retrieves and simplifies complex legal information, such as IPC/BNS sections and legal articles, making legal insights accessible to everyone without requiring authentication. The project leverages a robust tech stack, including React.js for the frontend, Python/FastAPI for the backend, and Zilliz vector databases for efficient data retrieval. Future plans include expanding the platform to connect users with lawyers for case management and consultations.
Note: The website is currently running on http://183.82.62.137:5173/ and is still under development.
Features

Legal Search: Users can query legal questions and receive clear, context-aware answers powered by RAG and NLP.
Simplified Legal Insights: Complex legal jargon (e.g., IPC/BNS sections) is translated into user-friendly explanations.
Scalable Backend: Optimized embedding storage and retrieval for fast query responses (25% faster response times).
User Feedback: Iterative improvements based on user input to enhance search accuracy.
Planned Lawyer Connectivity: Upcoming feature to connect users with lawyers for professional legal services.

Tech Stack

Frontend: React.js for a responsive, user-friendly interface.
Backend: Python, FastAPI for scalable API development.
AI/ML: Retrieval-Augmented Generation (RAG) with Sentence Transformers for semantic query understanding.
Database: Zilliz vector database for efficient legal data storage and retrieval.
Web Scraping: Python, BeautifulSoup for curating legal data from Nyay and LawRato.com.

Installation

Clone the Repository:
git clone https://github.com/abhiiibheema/LegalShield.git
cd LegalShield


Backend Setup:

Install Python dependencies:pip install -r requirements.txt


Set up Zilliz Cloud account and configure API keys in .env.
Run the FastAPI server:uvicorn main:app --reload




Frontend Setup:

Navigate to the frontend directory:cd frontend


Install React dependencies:npm install


Start the React app:npm start




Data Scraping (Optional):

Run the scraping script:python scripts/scrape_nyay_lawrato.py


Ensure BeautifulSoup and requests are installed.



Usage

Access the application at http://183.82.62.137:5173/ or locally at http://localhost:3000.
Enter a legal question (e.g., "What is IPC Section 302?") in the search bar.
View simplified, accurate responses retrieved from the legal dataset.
Provide feedback via the interface to improve answer relevance.

Data Sources

Nyay: Scraped legal articles and FAQs to build the RAG knowledge base.
LawRato.com: Curated legal Q&A and articles to enhance the dataset.

Future Enhancements

Integrate a lawyer connectivity platform for case management and consultations.
Expand the dataset with additional legal sources (e.g., Indian Kanoon).
Enhance RAG models with advanced LLMs for deeper legal reasoning.

Contributing
Contributions are welcome! Please:

Fork the repository.
Create a feature branch:git checkout -b feature-name


Commit changes:git commit -m "Add feature"


Push to the branch:git push origin feature-name


Submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out via GitHub Issues.
