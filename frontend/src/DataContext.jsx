import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const handleRowClick = (index, rowData) => {

    if (sessionStorage.getItem(index) === null) {
      sessionStorage.setItem(index, JSON.stringify(rowData));
    } else {
      sessionStorage.removeItem(index);
    }
  };

  return (
    <DataContext.Provider value={{  handleRowClick }}>
      {children}
    </DataContext.Provider>
  );
};