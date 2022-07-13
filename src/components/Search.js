import React from "react";

const Search = ({ setSearchInput, searchInput }) => {
  return (
    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search for the news"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
        autoFocus
      />
    </form>
  );
};

export default Search;
