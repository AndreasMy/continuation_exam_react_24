import React, { createContext, useState, useContext } from "react";

const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <CalendarContext.Provider
      value={{ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
