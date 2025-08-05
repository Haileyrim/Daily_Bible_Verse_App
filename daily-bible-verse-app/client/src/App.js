import React, { useState, useEffect } from "react";

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

export default function App() {
  // User auth state (mock)
  const [user, setUser] = useState(null);

  // Daily verse state
  const [dailyVerse, setDailyVerse] = useState(null);

  // Journaling
  const [reflection, setReflection] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);

  // Bible Browser states
  const [showBible, setShowBible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState(null);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [errorVerses, setErrorVerses] = useState(null);

  // Load daily verse on mount (mocked here, replace with real API call)
  useEffect(() => {
    async function fetchDailyVerse() {
      // For demo, get John 3:16
      const ref = "John 3:16";
      try {
        const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
        if (!res.ok) throw new Error("Failed to fetch daily verse");
        const data = await res.json();
        setDailyVerse(data);
      } catch {
        setDailyVerse({ reference: ref, text: "For God so loved the world..." });
      }
    }
    fetchDailyVerse();
  }, []);

  // User login/logout handlers (mock)
  const handleLogin = () => setUser({ name: "Woorim Nam", email: "woorim@example.com" });
  const handleLogout = () => setUser(null);

  // Save reflection for today
  const handleSaveReflection = () => {
    if (!reflection.trim()) {
      alert("Please write a reflection");
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    setJournalEntries((prev) => [
      ...prev,
      { date: today, verse: dailyVerse, reflection },
    ]);
    setReflection("");
    alert("Reflection saved!");
  };

  // Bible Browser handlers
  const toggleBible = () => {
    setShowBible(!showBible);
    setSelectedBook(null);
    setSelectedChapter(null);
    setVerses(null);
    setErrorVerses(null);
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setVerses(null);
    setErrorVerses(null);
  };

  const selectChapter = async (chapter) => {
    setSelectedChapter(chapter);
    setVerses(null);
    setErrorVerses(null);
    setLoadingVerses(true);
    try {
      const ref = `${selectedBook.name} ${chapter}`;
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref)}`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      const data = await res.json();
      setVerses(data);
    } catch (err) {
      setErrorVerses(err.message);
    } finally {
      setLoadingVerses(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1>Daily Bible Verse App</h1>
        {user ? (
          <div>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} style={styles.button}>
            Login / Signup
          </button>
        )}
      </header>

      {/* Daily Verse */}
      <section style={styles.verseSection}>
        <h2>Today's Verse</h2>
        {dailyVerse ? (
          <blockquote style={styles.verseText}>
            "{dailyVerse.text}"
            <br />
            <cite>- {dailyVerse.reference}</cite>
          </blockquote>
        ) : (
          <p>Loading daily verse...</p>
        )}
      </section>

      {/* Journaling */}
      {user && (
        <section style={styles.journalSection}>
          <h2>Your Reflection</h2>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts/reflection here..."
            rows={5}
            style={styles.textarea}
          />
          <button onClick={handleSaveReflection} style={styles.button}>
            Save Reflection
          </button>
        </section>
      )}

      {/* Bible Browser */}
      <section>
        <button onClick={toggleBible} style={{ ...styles.button, marginBottom: 20 }}>
          {showBible ? "Close Bible Browser" : "Bible"}
        </button>

        {showBible && (
          <div style={styles.bibleContainer}>
            {/* Books List */}
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

            {/* Chapters List */}
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

            {/* Verses View */}
            {selectedChapter && (
              <div>
                <button onClick={() => setSelectedChapter(null)} style={styles.backBtn}>
                  ← Back to Chapters
                </button>
                <h3>
                  {selectedBook.name} {selectedChapter}
                </h3>

                {loadingVerses && <p>Loading verses...</p>}
                {errorVerses && <p style={{ color: "red" }}>{errorVerses}</p>}

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
      </section>

      {/* Past Journal Entries */}
      {journalEntries.length > 0 && (
        <section style={styles.entriesSection}>
          <h2>Your Past Entries</h2>
          <ul style={styles.entryList}>
            {journalEntries.map((entry, idx) => (
              <li key={idx} style={styles.entryItem}>
                <strong>{entry.date}</strong>: {entry.reflection.slice(0, 100)}...
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 5,
    cursor: "pointer",
  },
  verseSection: {
    marginBottom: 30,
    backgroundColor: "#f0f8ff",
    padding: 20,
    borderRadius: 8,
  },
  verseText: {
    fontSize: 18,
    fontStyle: "italic",
  },
  journalSection: {
    marginBottom: 30,
  },
  textarea: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
    marginBottom: 10,
  },
  bibleContainer: {
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
  entriesSection: {
    marginTop: 30,
  },
  entryList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  entryItem: {
    padding: "6px 0",
    borderBottom: "1px solid #eee",
  },
};
