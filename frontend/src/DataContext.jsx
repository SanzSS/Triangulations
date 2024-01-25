import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const handleRowClick = (index, rowData) => {
    console.log(1);
    console.log(sessionStorage.getItem(index));
    console.log(3);
    if (sessionStorage.getItem(index) === null) {
      sessionStorage.setItem(index, JSON.stringify(rowData));
      console.log("added");
    } else {
      sessionStorage.removeItem(index);
      console.log("deleted");
    }
  };

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(1);
    // console.log(JSON.parse(value));
    console.log(2);
  
  }
  return (
    <DataContext.Provider value={{  handleRowClick }}>
      {children}
    </DataContext.Provider>
  );
};