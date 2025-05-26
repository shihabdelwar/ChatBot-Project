#backend/ChatBot.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app) #this allows cross-origin requests from the frontend

@app.route("/ask", methods=["POST"])

def ask():
    data = request.json
    question = data.get("question", "").strip()
    print(f"Received question: {question}")

    if not question:
        return jsonify({"answers": []})

    # Bing search URL with query param
    search_url = "https://www.bing.com/search"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }
    params = {"q": question}

    response = requests.get(search_url, headers=headers, params=params)
    if response.status_code != 200:
        return jsonify({"answers": []})

    soup = BeautifulSoup(response.text, "html.parser")

    # Bing's search snippet containers have class 'b_algo'
    results = soup.find_all("li", class_="b_algo")[:3]  # top 3 results

    answers = []
    for result in results:
        title = result.find("h2")
        snippet = result.find("p")
        if title and snippet:
            text = f"{title.get_text(strip=True)}: {snippet.get_text(strip=True)}"
            answers.append(text)

    print(f"Answers found: {answers}")
    return jsonify({"answers": answers})

if __name__ == "__main__":
    app.run(debug=True)