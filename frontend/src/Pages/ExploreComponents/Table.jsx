import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

import ColumnLabels from "./ColumnLabels";
import "../ExploreStyles/DisplayTable.css";

const Table = (props) => {
  console.log('refresh')
  const database = props.database;
  const [indices, setIndices] = useState([]);
  let pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  let sortedDatabase = database;
  const handleRowClick = (index, rowData) => {

    if (sessionStorage.getItem(index) === null) {
      sessionStorage.setItem(index, JSON.stringify(rowData));
    } else {
      sessionStorage.removeItem(index);
    }
  };
  if (sortConfig !== null) {
    sortedDatabase = [...database].sort((a, b) => {
      const key = sortConfig.key;
      let first = '';
      let second = '';
      if (key === "date") {
        first = parseInt(a[key]);
        second = parseInt(b[key]);
      } else { 
        first = a[key];
        second = b[key];
      }
      if (first < second) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (first > second) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  // const currentTableData = useMemo(() => {
  //     const firstPageIndex = (currentPage - 1) * pageSize;
  //     const lastPageIndex = firstPageIndex + pageSize;
  //     return database.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  const toggleSort = (key) => {
    let direction = "ascending";

    if (sortConfig === null) {
      setSortConfig({ key, direction });
    }
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const databaseToUse = sortConfig ? sortedDatabase : database;
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;

  const currentTableData = databaseToUse.slice(firstPageIndex, lastPageIndex);

  const defaultValue = "N/A";

  const [popupContents, setPopupContents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = (index) => {
    console.log(index, database[index]);
    setPopupContents((prevPopupContents) => {
      return prevPopupContents.filter((_, i) => i !== index);
    });
    setIndices((prevIndices) => {
      return prevIndices.filter((_, i) => i !== index);
    });
    currentTableData[index]["selected"] = false;
  };

  useEffect(() => {
    let popups = [];
    let indexes = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      popups.push(value);
      indexes.push(parseInt(key));
    }
    console.log(sessionStorage);
    setPopupContents(popups);
    setIndices(indexes);
  }, []);

  const togglePopupRow = (index) => {
    console.log(index, database[index]);

    if (!popupContents.includes(JSON.stringify(database[index]))) {
      setPopupContents((prevPopupContents) => {
        console.log([...prevPopupContents, JSON.stringify(database[index])]);
        return [...prevPopupContents, JSON.stringify(database[index])];
      });
      setIndices((prevIndices) => {
        return [...prevIndices, index];
      });
    } else {
      closePopup(popupContents.indexOf(JSON.stringify(database[index])));
    }
    
  };
  return (
    <div role="document" className="">
      <table className="table font">
        {/* removed role='grid' from table tag */}
        <ColumnLabels toggleSort={toggleSort} />
        <tbody>
          {currentTableData.map((r, index) => {
            console.log(JSON.stringify(r));
            console.log(popupContents[index]);
            let color = " bg-[#B1A296]";
            console.log(popupContents.includes(JSON.stringify(currentTableData[index])));
            if (
              popupContents.includes(JSON.stringify(r))
            ) {
              color = " bg-[#2779a7]";
            }
            return (
              <>
                <tr
                  className={
                    "row-item  hover:bg-[#2779a7] hover:cursor-pointer " + color
                  }
                  key={index}
                  onClick={() => {
                    togglePopupRow(index);
                    handleRowClick(index, r);
                  }}
                >
                  <td className="text-[14px]">
                    {r.authorNameOriginal ? r.authorNameOriginal : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.authorNameTranslit ? r.authorNameTranslit : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.titleOriginal ? r.titleOriginal : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.titleTranslit ? r.titleTranslit : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.language ? r.language : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.genre ? r.genre : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.textType ? r.textType : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.date ? r.date : defaultValue}
                  </td>
                  <td className="text-[14px]">
                    {r.dimensionLabel ? r.dimensionLabel : defaultValue}
                  </td>
                  
                   
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={database.length}
        pageSize={pageSize}
        onPageChange={(page) => {
          setCurrentPage(page);
          setIsPopupOpen(false);
        }}
      />
    </div>
  );
};

export default Table;
