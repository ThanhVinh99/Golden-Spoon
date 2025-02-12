import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextPlan = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Plans", (planList) => {
      setPlan(planList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPlan.Provider value={plan}>
      {children}
    </ContextPlan.Provider>
  );
};
