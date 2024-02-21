import React from "react";
import SearchBar from "./SearchBar";
import Select from "react-select";
import { useState, useEffect } from "react";
import {
  typeFilterKeys,
  languageFilterKeys,
  scriptFilterKeys,
  genreFilterKeys,
  defaultDateValues,
  defaultDimensionValues,
} from "./FilterUtils";
import DoubleSlider from "./DoubleSlider";
import "../ExploreStyles/FilterBar.css";

const FilterBar = (props) => {
  let h,
    g,
    n = 0;
  const [checkedHijiri, setCheckedHijiri] = useState("");
  const [checkedGregorian, setCheckedGregorian] = useState("");
  const [checkedNone, setCheckedNone] = useState("");
  const [typeFilter, setTypeFilter] = useState(null);
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const handleSubmit = () => {
    setDateFilter([number1, number2]);
  };

  const [languageFilter, setLanguageFilter] = useState(null);
  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  const [scriptFilter, setScriptFilter] = useState(null);
  const handleScriptFilterChange = (e) => {
    setScriptFilter(e.target.value);
  };

  const [genreFilter, setGenreFilter] = useState([]);
  const handleGenreFilterChange = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setGenreFilter(value);
  };

  const [dateFilter, setDateFilter] = useState(defaultDateValues);
  const handleDateFilterChange = (bounds) => {
    console.log(bounds);
    setDateFilter(bounds);
  };

  const [dimensionFilter, setDimensionFilter] = useState(
    defaultDimensionValues
  );
  const handleDimensionFilterChange = (bounds) => {
    console.log(bounds);
    setDimensionFilter(bounds);
  };

  // Handles the lag in asynchronous function setState()
  useEffect(() => {
    props.filterByType(typeFilter);
    props.filterByLanguage(languageFilter);
    props.filterByScript(scriptFilter);
    props.filterByGenre(genreFilter);
    props.filterByDate(dateFilter);
    props.filterByDimension(dimensionFilter);
  });
  return (
    <div className="grid font items-end">
      <div className="flex flex-col">
        <small className="text-[14px]">Search:</small>
        <SearchBar onChange={props.searchChange} />
      </div>
      <div className="flex flex-col">
        <small className="text-[14px]">Type:</small>
        <select
          id="type"
          className="select text-[12px] bg-inherit select-bordered border-[black] "
          required
          onChange={handleTypeFilterChange}
        >
          <option value={null} selected>
            All
          </option>
          {typeFilterKeys.map((key) => {
            return <option value={key}>{key}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <small className="text-[14px]">Language:</small>
        <select
          id="language"
          className="select text-[12px] bg-inherit select-bordered border-black"
          required
          onChange={handleLanguageFilterChange}
        >
          <option value={null} selected>
            All
          </option>
          {languageFilterKeys.map((key) => {
            return <option value={key}>{key}</option>;
          })}
        </select>
      </div>
      <div className=" flex flex-col">
        <small className="text-[14px]">Script:</small>
        <select
          id="script"
          className="select text-[12px] bg-inherit select-bordered border-black"
          required
          onChange={handleScriptFilterChange}
        >
          <option value={null} selected>
            All
          </option>
          {scriptFilterKeys.map((key) => {
            return <option value={key}>{key}</option>;
          })}
        </select>
      </div>
      <div className=" flex flex-col">
        <small className="text-[14px]">Genre:</small>
        <select
          id="genre"
          className="select text-[12px] bg-inherit select-bordered border-black"
          required
          onChange={handleGenreFilterChange}
          multiple="multiple"
        >
          <option value={null} selected>
            All
          </option>
          {genreFilterKeys.map((key) => {
            return <option value={key}>{key}</option>;
          })}
        </select>
     
      </div>


      <div className="mb-[19px]">
        <legend className="text-[14px]">Calendar:</legend>
        <div className="join join-vertical">
          {/* <label className="label cursor-pointer"> */}
          {/* <span className="label-text text-black text-[12px]">Hijiri</span> */}
          <input
            type="radio"
            className={
              "join-item btn  btn-xs input btn-outline input-bordered border-black bg-inherit " +
              checkedHijiri
            }
            name="options"
            aria-label="Hijiri"
            onChange={() => {
              if (checkedHijiri === "") {
                setCheckedGregorian("");
                setCheckedHijiri("!bg-[#2779a7] !border-black !text-white");
                setCheckedNone("");
              }
            }}
          />
          <input
            type="radio"
            className={
              "join-item btn btn-xs btn-outline input input-bordered border-black bg-inherit " +
              checkedGregorian
            }
            name="options"
            aria-label="Gregorian"
            onChange={() => {
              if (checkedGregorian === "") {
                setCheckedGregorian("!bg-[#2779a7] !border-black !text-white");
                setCheckedHijiri("");
                setCheckedNone("");
              }
            }}
          />
          <input
            type="radio"
            className={
              "join-item btn btn-xs btn-outline input input-bordered border-black bg-inherit " +
              checkedNone
            }
            name="options"
            aria-label="None"
            onChange={() => {
              if (checkedNone === "") {
                setCheckedGregorian("");
                setCheckedHijiri("");
                setCheckedNone("!bg-[#2779a7] !border-black !text-white");
              }
            }}
          />

        </div>

      </div>
      <form className="flex flex-col mb-[19px]" onSubmit={handleSubmit}>
        <p className="text-[14px]  mb-0">Start:</p>
        <input
          type="number"
          className="input  text-[12px] input-bordered border-black bg-inherit mb-0"
          value={number1}
          required
          onChange={(e) => setNumber1(parseInt(e.target.value))}
        ></input>
        <p className="text-[14px]  mb-0">End:</p>
        <input
          type="number"
          className="input text-[12px] input-bordered border-black bg-inherit"
          value={number2}
          required
          onChange={(e) => setNumber2(parseInt(e.target.value))}
        ></input>
        <input
          type="submit"
          value="Apply"
          className="submit !btn !btn-xs !btn-outline !text-[12px] mt-2 !mb-0"
        ></input>
      </form>
    </div>
  );
};

export default FilterBar;
