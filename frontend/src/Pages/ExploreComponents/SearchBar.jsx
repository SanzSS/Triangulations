import React, { useState } from "react";
import '../ExploreStyles/SearchBar.css';

const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        props.onChange(searchQuery);
    };
    props.onChange(searchQuery);

    return (
      <input
        type="search"
        className="input text-[12px] input-bordered border-black bg-inherit"
        placeholder="..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    );
};

export default SearchBar;
