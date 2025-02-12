import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextMovies = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu Movies từ Firebase theo thời gian thực
    const unsubscribe = fetchDocumentsRealtime("Movies", (moviesList) => {
      setMovies(moviesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextMovies.Provider value={movies}>
      {children}
    </ContextMovies.Provider>
  );
};
