import React, { useState } from 'react';

export default function BasicCourseCard({ title = "React 19 Basics", level = "Beginner" }) {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', maxWidth: '300px' }}>
      <h3>{title}</h3>
      <p>Level: <strong>{level}</strong></p>
      <button onClick={() => setLikes(prev => prev + 1)}>
        ❤️ Like ({likes})
      </button>
    </div>
  );
}
