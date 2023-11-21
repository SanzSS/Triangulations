import React, { useState, useMemo } from "react";
import Pagination from "./Pagination";
import Popup from "./Popup";
import ColumnLabels from "./ColumnLabels";
import "../ExploreStyles/DisplayTable.css";

const Table = (props) => {
    const database = props.database;

    let pageSize = 30;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(null);

    let sortedDatabase = database;
    if (sortConfig !== null) {
        sortedDatabase = [...database].sort((a, b) => {
            const key = sortConfig.key;
            if (a[key] < b[key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
    })
}
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * pageSize;
    //     const lastPageIndex = firstPageIndex + pageSize;
    //     return database.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    const toggleSort = (key) => {
        let direction = 'ascending';

        if (sortConfig === null) {
            setSortConfig({ key, direction});
        }
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction});
    }

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
        }
        );
        
    };

    const togglePopupRow = (index) => {
        console.log(index, database[index]);
        if (!popupContents.includes(database[index])) {
        setPopupContents((prevPopupContents) => {
            return [...prevPopupContents, database[index]];
        } );
    }
        if (!isPopupOpen) {
            setIsPopupOpen(!isPopupOpen);
        } 
    };
    return (
        <div role='document'>
            <table > 
            {/* removed role='grid' from table tag */}
                <ColumnLabels toggleSort = {toggleSort}/>
                <tbody>
                    {currentTableData.map((r, index) => {
                        return (
                            <>
                                <tr
                                    className='row-item'
                                    key={index}
                                    onClick={() => togglePopupRow(index)}
                                >
                                    <td>
                                        {r.authorNameOriginal
                                            ? r.authorNameOriginal
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.authorNameTranslit
                                            ? r.authorNameTranslit
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.titleOriginal
                                            ? r.titleOriginal
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.titleTranslit
                                            ? r.titleTranslit
                                            : defaultValue}
                                    </td>
                                    <td>
                                        {r.language ? r.language : defaultValue}
                                    </td>
                                    <td>{r.genre ? r.genre : defaultValue}</td>
                                    <td>
                                        {r.textType ? r.textType : defaultValue}
                                    </td>
                                    <td>{r.date ? r.date : defaultValue}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
            <div className="popups">
            {isPopupOpen && popupContents.map((content, index) =>(
                <Popup
                id = {index}
                    content={
                        <>
                            <b>Additional Details</b>
                            <p>
                                Original location:{" "}
                                {content.originalLocation
                                    ? content.originalLocation
                                    : ""}{" "}
                                <br />
                                Publisher:{" "}
                                {content.publisher
                                    ? content.publisher
                                    : ""}{" "}
                                <br />
                                Script:{" "}
                                {content.script
                                    ? content.script
                                    : ""}{" "}
                                <br />
                                Page count:{" "}
                                {content.pageCount
                                    ? content.pageCount
                                    : ""}{" "}
                                <br />
                                Dimensions:{" "}
                                {content.dimensions
                                    ? content.dimensions
                                    : ""}{" "}
                                <br />
                                Additional information:{" "}
                                {content.additionalInfo
                                    ? content.additionalInfo
                                    : ""}
                            </p>
                        </>
                    }
                    handleClose={closePopup}
                />
            ))}
            </div>
            <Pagination
                className='pagination-bar'
                currentPage={currentPage}
                totalCount={database.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        
        </div>
    );
};

export default Table;
