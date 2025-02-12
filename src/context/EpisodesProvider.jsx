import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextEpisodes = createContext();

export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu tập phim từ Firebase theo thời gian thực
    const unsubscribe = fetchDocumentsRealtime("Episodes", (episodesList) => {
      setEpisodes(episodesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextEpisodes.Provider value={episodes}>
      {children}
    </ContextEpisodes.Provider>
  );
};
