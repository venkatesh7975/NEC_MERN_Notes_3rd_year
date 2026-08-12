import { useState, useEffect } from 'react';

export function useCourseSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      // Simulated API response
      const mockData = [
        { id: 1, name: `Mastering ${query} in 2026` },
        { id: 2, name: `${query} Full Stack Architecture` }
      ];
      setResults(mockData);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { query, setQuery, results, isSearching };
}
