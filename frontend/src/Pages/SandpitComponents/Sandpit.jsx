import React, { useState, useEffect, useRef } from "react";
import "../SandpitStyles/Sandpit.css";
import Draggable from "react-draggable";

const Sandpit = () => {
  const [rows, setRow] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      // console.log(JSON.parse(value));
      // const result = rows.filter((row) => deepCompare(row[0], JSON.parse(value)))
      // console.log(result);

      temp.push([JSON.parse(value), key, "NEW", true]);
    }
    // console.log(temp);
    setRow(temp);
  }, []);

  const Delete = (data, indexToRemove) => {
    setRow((prevState) => {
      return prevState.filter((item, index) => index !== indexToRemove);
    });
    const key = data[1];
    sessionStorage.removeItem(key);
  };

  let temp = [];
  rows.map((data, index) => {
    console.log(data);
    const row = data[0];
    let hidden = "";
    if (data[3] === false) {
      hidden = " hidden";
    }
    let color = "";
    let text = "NEW";
    if (data[2] === "ORANGE") {
      color = "bg-orange-500";
      text = "ORANGE";
    } else if (data[2] === "RED") {
      color = "bg-red-500";
      text = "RED";
    }
    let addLink = true;
    if (row.link === "") {
      addLink = false;
    }
    temp.push([
      <div className={"card-body font max-h-fit "}>
        <div className="flex justify-center">
          <div
            className={
              "badge text-[12px] font-bold bg-[#2779a7] border-none text-white " +
              color
            }
          >
            {text}
          </div>
        </div>

        <h3 className="card-title text-[20px] justify-center">
          {row.titleTranslit}
        </h3>

        <p className="text-[15px] font-bold mb-0">Additional Details</p>
        <p className="text-[14px] mb-0">
          <span className="font-bold">Original location: </span>
          {row.originalLocation ? row.originalLocation : ""} <br />
          <span className="font-bold"> Publisher:</span>{" "}
          {row.publisher ? row.publisher : ""} <br />
          <span className="font-bold">Script:</span>{" "}
          {row.script ? row.script : ""} <br />
          {/* <span className="font-bold">Page count: </span>{" "}
          {row.pageCount ? row.pageCount : ""} <br />
          <span className="font-bold">Dimensions:</span>{" "}
          {row.dimensions ? row.dimensions : ""} <br />
          <span className="font-bold">Additional information: </span>
          {row.additionalInfo ? row.additionalInfo : ""}<br /> */}
          {addLink &&
          <span className="font-bold" >Some Link: <br />
          <a href={row.link ? row.link : ""} className=" hover:text-[#2779a7]">{row.link ? row.link : ""} </a></span>
          }
        </p>
        <div className="card-actions justify-evenly">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="!bg-[#2779a7] btn btn-sm h-[2rem] !rounded-[0.5rem] !px-[14.25px] min-h-[0.5rem] !justify-center !py-[10px]"
            >
              <p className="text-[12px] font-bold text-white mb-0 h-min">
                Add Badge
              </p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
            >
              <li
                className="hover:bg-orange-500 rounded-[0.5rem]"
                onClick={() =>
                  setRow((prevState) => {
                    return [
                      ...prevState.slice(0, index),
                      [row, data[1], "ORANGE"],
                      ...prevState.slice(index + 1),
                    ];
                  })
                }
              >
                <a className="text-[12px]">Orange</a>
              </li>
              <li
                className="hover:bg-red-500 rounded-[0.5rem]"
                onClick={() =>
                  setRow((prevState) => {
                    return [
                      ...prevState.slice(0, index),
                      [row, data[1], "RED"],
                      ...prevState.slice(index + 1),
                    ];
                  })
                }
              >
                <a className="text-[12px]">Red</a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-sm flex content-center mb-0 bg-[#2779a7] border-none text-white hover:bg-[#2779a7] hover:opacity-50"
            onClick={() => Delete(data, index)}
          >
            Remove
          </button>
        </div>
      </div>,
      hidden,
    ]);
  });

  return (
    <div className="flex flex-col items-center" ref={componentRef}>
      <h1 className="font mb-4">The Sandpit</h1>
      <div className="mb-2">
        <legend className="text-[14px] font font-bold">Badge Filter:</legend>
        <div className="join">
          <input
            type="radio"
            className={
              "join-item btn btn-xs btn-outline input input-bordered border-black bg-inherit !m-0 !rounded-none"
            }
            name="options"
            aria-label="Orange"
            onChange={() => {
              setRow((prevState) => {
                const newState = [...prevState];
                return newState.map((item) => {
                  if (item[2] !== "ORANGE") {
                    item[3] = false;
                  } else {
                    item[3] = true;
                  }
                  return item;
                });
              });
            }}
          />
          <input
            type="radio"
            className={
              "join-item btn btn-xs btn-outline input input-bordered border-black bg-inherit !m-0 !rounded-none"
            }
            name="options"
            aria-label="Red"
            onChange={() => {
              setRow((prevState) => {
                const newState = [...prevState];
                return newState.map((item) => {
                  if (item[2] !== "RED") {
                    item[3] = false;
                  } else {
                    item[3] = true;
                  }
                  return item;
                });
              });
            }}
          />
          <input
            type="radio"
            className={
              "join-item btn btn-xs btn-outline input input-bordered border-black bg-inherit !m-0 !rounded-none"
            }
            name="options"
            aria-label="All"
            onChange={() => {
              setRow((prevState) => {
                const newState = [...prevState];
                return newState.map((item) => {
                  item[3] = true;
                  return item;
                });
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-[2.3rem] justify-center">
        {rows &&
          temp.map((row, index) => (
            <Draggable>
              <div
                className={
                  "card card-bordered card-compact w-[15rem] bg-base-100 shadow-xl " +
                  row[1]
                }
                key={index}
              >
                {row[0]}
              </div>
            </Draggable>
          ))}
      </div>
    </div>
  );
};

export default Sandpit;
