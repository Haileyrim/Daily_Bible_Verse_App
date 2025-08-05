import React, { useState } from "react";

const bibleBooks = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
];


export default function BibleBrowser() {
  const [showBible, setShowBible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleBible = () => {
    setShowBible(!showBible);
    setSelectedBook(null);
    setSelectedChapter(null);
    setVerses(null);
    setError(null);
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setVerses(null);
    setError(null);
  };

  const selectChapter = async (chapter) => {
    setSelectedChapter(chapter);
    setVerses(null);
    setError(null);
    setLoading(true);
    try {
      const ref = `${selectedBook.name} ${chapter}`;
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      const data = await res.json();
      setVerses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleBible} style={{ marginBottom: 20 }}>
        {showBible ? "Close Bible" : "Bible"}
      </button>

      {showBible && (
        <div style={styles.container}>
          {!selectedBook && (
            <div>
              <h3>Select a Book</h3>
              <ul style={styles.list}>
                {bibleBooks.map((book) => (
                  <li
                    key={book.name}
                    onClick={() => selectBook(book)}
                    style={styles.listItem}
                  >
                    {book.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedBook && !selectedChapter && (
            <div>
              <button onClick={() => setSelectedBook(null)} style={styles.backBtn}>
                ← Back to Books
              </button>
              <h3>{selectedBook.name} - Select Chapter</h3>
              <ul style={styles.list}>
                {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(
                  (chapter) => (
                    <li
                      key={chapter}
                      onClick={() => selectChapter(chapter)}
                      style={styles.listItem}
                    >
                      Chapter {chapter}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {selectedChapter && (
            <div>
              <button
                onClick={() => setSelectedChapter(null)}
                style={styles.backBtn}
              >
                ← Back to Chapters
              </button>
              <h3>
                {selectedBook.name} {selectedChapter}
              </h3>

              {loading && <p>Loading verses...</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {verses && (
                <div style={styles.versesContainer}>
                  {verses.verses.map((verse) => (
                    <p key={verse.verse} style={{ marginBottom: 8 }}>
                      <sup>{verse.verse}</sup> {verse.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: 15,
    borderRadius: 6,
    maxWidth: 400,
    maxHeight: 500,
    overflowY: "auto",
    backgroundColor: "#fefefe",
  },
  list: {
    listStyle: "none",
    paddingLeft: 0,
    maxHeight: 300,
    overflowY: "auto",
    marginTop: 0,
  },
  listItem: {
    padding: "8px 12px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    userSelect: "none",
  },
  backBtn: {
    marginBottom: 10,
    backgroundColor: "#ddd",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: 4,
  },
  versesContainer: {
    maxHeight: 300,
    overflowY: "auto",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 4,
    border: "1px solid #ddd",
  },
};
