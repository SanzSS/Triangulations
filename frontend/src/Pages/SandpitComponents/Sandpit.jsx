import React, { useState, useEffect, useContext } from "react";
import { DataContext } from '../../DataContext';
import '../SandpitStyles/Sandpit.css';

const Sandpit = () => {
    const [rows, setRow] = useState([]);

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            // console.log(JSON.parse(value));
            // const result = rows.filter((row) => deepCompare(row[0], JSON.parse(value)))
            // console.log(result);
            
            if (
              rows.includes([JSON.parse(value), true]) ||
              rows.includes([JSON.parse(value), false])
            ) {
              temp.push([JSON.parse(value), key, false]);
            } else {
              temp.push([JSON.parse(value), key, true]);
            }
          
        };
        // console.log(temp);
        setRow(temp);
    }, []);

    const Delete = (data, indexToRemove) => {
      
      setRow(prevState => {
      return prevState.filter((item, index) => index !== indexToRemove)});
      sessionStorage.removeItem(data[1]);
    };


    let temp = [];
    console.log(rows);
    rows.map((data, index) => {
      const row = data[0];
      let hidden = 'hidden';
      if (data[2] === true) {
        hidden = '';
      }
      temp.push(
        <div className="card-body items-center font">
          <div className={"badge badge-primary text-[12px] " + hidden}>New</div>
          <h3 className="card-title text-[20px] text-center">{row.titleTranslit}</h3>
          <b>Additional Details</b>
          <p className="text-[14px]">
            Original location:{" "}
            {row.originalLocation ? row.originalLocation : ""} <br />
            Publisher: {row.publisher ? row.publisher : ""} <br />
            Script: {row.script ? row.script : ""} <br />
            Page count: {row.pageCount ? row.pageCount : ""} <br />
            Dimensions: {row.dimensions ? row.dimensions : ""} <br />
            Additional information:{" "}
            {row.additionalInfo ? row.additionalInfo : ""}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm flex content-center mb-0"
            onClick={() => Delete(data, index)}>
              Remove?
            </button>
          </div>
        </div >
      );
    });
    

    return (
      <div className="flex flex-row flex-wrap gap-[1rem]">
        {rows &&
          temp.map((row, index) => (
            <div className="card card-bordered card-compact w-[11rem] bg-base-100 shadow-xl" key={index}>
              
                {/* <h2 className="card-title">{row}</h2>
                <p className="">{row}</p> */}
                {row}
                
            </div>
          ))}
          
      </div>
    );
  };

  export default Sandpit;

