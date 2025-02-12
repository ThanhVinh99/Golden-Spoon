import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextCharacters = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu realtime từ Firebase
    const unsubscribe = fetchDocumentsRealtime("Characters", (charactersList) => {
      setCharacters(charactersList);
    });

    // Hủy lắng nghe khi component unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCharacters.Provider value={characters}>
      {children}
    </ContextCharacters.Provider>
  );
};
