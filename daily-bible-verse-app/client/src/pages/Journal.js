// client/src/pages/Journal.js
import React from 'react';

function Journal() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Write Your Journal</h1>
      <p>Verse: John 3:16</p>
      <textarea placeholder="Write your thoughts..." rows="10" cols="50" />
      <br />
      <button style={{ marginTop: '1rem' }}>Save Entry</button>
    </div>
  );
}

export default Journal;
