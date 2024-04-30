import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

import ColumnLabels from "./ColumnLabels";
import "../ExploreStyles/DisplayTable.css";

const Table = (props) => {
  const database = props.database;
  let pageSize = 40;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  let sortedDatabase = database;
  const handleRowClick = (rowData) => {
    console.log(rowData);
    console.log(parseInt(rowData.key));
    if (sessionStorage.getItem(parseInt(rowData.key)) === null) {
      sessionStorage.setItem(parseInt(rowData.key), JSON.stringify(rowData));
    } else {
      sessionStorage.removeItem(parseInt(rowData.key));
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
  const closePopup = (index) => {
    setPopupContents((prevPopupContents) => {
      return prevPopupContents.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    let popups = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      popups.push(value);
    }
    setPopupContents(popups);
  }, []);

  const togglePopupRow = (row) => {

    if (!popupContents.includes(JSON.stringify(row))) {
      setPopupContents((prevPopupContents) => {
        return [...prevPopupContents, JSON.stringify(row)];
      });
  
    } else {
      closePopup(popupContents.indexOf(JSON.stringify(row)));
    }
    
  };
  return (
    <div role="document" className="">
      <table className="table font">
        {/* removed role='grid' from table tag */}
        <ColumnLabels toggleSort={toggleSort} />
        <tbody>
          {currentTableData.map((r, index) => {
   
            let color = " bg-[#B1A296]";
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
                    togglePopupRow(r);
                    handleRowClick(r);
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
        }}
      />
    </div>
  );
};

export default Table;
