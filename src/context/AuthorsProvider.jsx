import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextAuthors = createContext();

export const AuthorsProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Lắng nghe danh sách tác giả từ Firebase
    const unsubscribe = fetchDocumentsRealtime("Authors", (authorsList) => {
      setAuthors(authorsList);
    });

    // Cleanup khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextAuthors.Provider value={authors}>
      {children}
    </ContextAuthors.Provider>
  );
};
