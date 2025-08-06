// client/src/pages/Journal.js
import React, { useEffect, useState } from 'react';

function Journal() {
  const [verse, setVerse] = useState(null);
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);

  const fetchVerse = () => {
    fetch('https://labs.bible.org/api/?passage=random&type=json')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setVerse(data[0]);
        }
      });
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  const handleSave = () => {
    const journal = {
      verse: `${verse.bookname} ${verse.chapter}:${verse.verse}`,
      text: verse.text,
      entry,
      date: new Date().toISOString(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('journalEntries')) || [];
    localStorage.setItem('journalEntries', JSON.stringify([journal, ...existing]));

    setSaved(true);
    setEntry('');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="container">
      <h1>📝 Write Your Journal</h1>
      {verse ? (
        <>
          <p><strong>Verse:</strong> {verse.bookname} {verse.chapter}:{verse.verse}</p>
          <blockquote className="verse-text">"{verse.text}"</blockquote>
          <textarea
            placeholder="Write your thoughts..."
            rows="10"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <br />
          <button onClick={handleSave} style={{ marginTop: '1rem' }}>
            💾 Save Entry
          </button>
          {saved && <p style={{ color: 'green', marginTop: '1rem' }}>Journal saved ✅</p>}
        </>
      ) : (
        <p>Loading verse...</p>
      )}
    </div>
  );
}

export default Journal;
