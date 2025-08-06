// client/src/pages/Entries.js
import React, { useEffect, useState } from 'react';

function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(saved);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📂 Past Journal Entries</h1>
      {entries.length === 0 ? (
        <p>No entries yet. Write your first one on the Journal page 📝</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {entries.map((entry, index) => (
            <li
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
              <p><strong>Verse:</strong> {entry.verse}</p>
              <blockquote style={{ fontStyle: 'italic' }}>"{entry.text}"</blockquote>
              <p><strong>Your Thoughts:</strong></p>
              <p>{entry.entry}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Entries;
