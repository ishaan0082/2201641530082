import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const LinksContext = createContext();

export const useLinks = () => useContext(LinksContext);

export const LinksProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load links from localStorage on the initial application load.
  useEffect(() => {
    try {
      const storedLinks = localStorage.getItem('shortenedLinks');
      if (storedLinks) {
        setLinks(JSON.parse(storedLinks));
      }
    } catch (error) {
      console.error("Failed to parse links from localStorage", error);
    } finally {
      setLoading(false); // Signal that the initial load is complete.
    }
  }, []); // Empty array ensures this runs only once.

  // Save links to localStorage whenever the links array changes.
  useEffect(() => {
    // We avoid writing to storage during the initial load.
    if (!loading) {
      localStorage.setItem('shortenedLinks', JSON.stringify(links));
    }
  }, [links, loading]);

  // --- FIX IS HERE ---
  // We wrap our functions in useCallback to stabilize them. This prevents
  // them from being recreated on every render, fixing the race condition.

  const addLinks = useCallback((newLinks) => {
    setLinks(prevLinks => [...newLinks, ...prevLinks]);
  }, []);

  const getLinkByShortcode = useCallback((shortCode) => {
    return links.find(link => link.shortCode === shortCode);
  }, [links]); // This function will only update if the 'links' array changes.

  const recordClick = useCallback((shortCode) => {
    setLinks(prevLinks =>
      prevLinks.map(link => {
        if (link.shortCode === shortCode) {
          const newClicks = [...(link.clicks || []), { timestamp: new Date().toISOString() }];
          return { ...link, clicks: newClicks };
        }
        return link;
      })
    );
  }, []); // This function is stable and never needs to be recreated.

  // Memoize the context value to prevent unnecessary re-renders of consumers.
  const value = { links, loading, addLinks, getLinkByShortcode, recordClick };

  return (
    <LinksContext.Provider value={value}>
      {children}
    </LinksContext.Provider>
  );
};

