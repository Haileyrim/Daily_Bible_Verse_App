import React, { useEffect, useState } from 'react';

function Home() {
  const [verse, setVerse] = useState(null);

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

  return (
    <div className="container">
      <div className="verse-card verse-fade">
        <h1>📖 Today's Bible Verse</h1>
        {verse ? (
          <>
            <p className="verse-reference">
              {verse.bookname} {verse.chapter}:{verse.verse}
            </p>
            <blockquote className="verse-text">
              "{verse.text}"
            </blockquote>
            <p className="encouragement">Let this truth guide your day. 💛</p>
            <button onClick={fetchVerse} style={{ marginTop: '1.5rem' }}>
              🔁 New Verse
            </button>
          </>
        ) : (
          <p>Loading verse...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
