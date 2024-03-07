import React, { useState, useMemo, useContext, useEffect } from "react";
import Pagination from "./Pagination";
import Popup from "./Popup";
import ColumnLabels from "./ColumnLabels";
import "../ExploreStyles/DisplayTable.css";
import { DataContext } from "../../DataContext";

const Table = (props) => {
  const database = props.database;

  const { handleRowClick } = useContext(DataContext);
  let pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  let sortedDatabase = database;
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
  };

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      temp.push(value);
    }
    console.log(sessionStorage);
    let open = true;
    if (temp.length === 0) {
      open = false;
    }
    console.log("hi" + temp);
    setPopupContents((prev) => {
      return temp;
    });
    setIsPopupOpen(open);
  }, []);

  const togglePopupRow = (index) => {
    console.log(index, database[index]);

    if (!popupContents.includes(JSON.stringify(database[index]))) {
      setPopupContents((prevPopupContents) => {
        console.log([...prevPopupContents, JSON.stringify(database[index])]);
        return [...prevPopupContents, JSON.stringify(database[index])];
      });
    } else {
      closePopup(popupContents.indexOf(JSON.stringify(database[index])));
    }
    if (!isPopupOpen) {
      setIsPopupOpen(!isPopupOpen);
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

            //TODO - Highlighted row should stay highlighted when changing pages/rerendering/reloading.

            if (
              popupContents.includes(JSON.stringify(database[index])) ||
              popupContents.includes(database[index])
            ) {
              color = " bg-[#2779a7]";
            }
            return (
              <>
                <tr
                  className={
                    "row-item  hover:bg-[#2779a7] hover:cursor-pointer" + color
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
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Table;
