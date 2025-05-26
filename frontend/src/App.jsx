import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  async function handleAsk() {
    if (!question.trim()) return;

    const response = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setAnswers(data.answers || []);
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Shihab's Web Scraper ChatBot</h1>
      <textarea
        rows={3}
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: '100%', fontSize: 16 }}
      />
      <button onClick={handleAsk} style={{ marginTop: 10, padding: '8px 16px' }}>
        Ask
      </button>

      <div style={{ marginTop: 20 }}>
        {answers.length > 0 ? (
          answers.map((answer, idx) => (
            <div 
              key={idx} 
              style={{ 
                backgroundColor: '#454545',
                color: '#e9e9e9',
                padding: '12px 16px',
                marginBottom: '12px',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {answer}
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}
      </div>
    </div>
  );
}

export default App
