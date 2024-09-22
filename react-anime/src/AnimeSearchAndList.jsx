import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import './AnimeSearchAndList.css';
import AnimeCard from "./AnimeCard";
import FilterAndSort from './FilterAndSort';

function AnimeSearchAndList({ animeList, handleCardClick, handleSearch, showFilterModal, setShowFilterModal, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");  // Clear search term
    handleSearch("");   // Reset search and display all
  };

  return (
    <div>
      {/* Search Bar */}
      <Form className="search-bar" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
        />
        <Button variant="primary" type="submit">Search</Button>
        {searchTerm && (
          <Button variant="danger" type="button" className="clear-btn" onClick={handleClearSearch}>
            X
          </Button>
        )}
      </Form>

      {/* Filter and Sort Controls */}
      <FilterAndSort
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        onFilter={onFilter}
        onSort={onSort}
      />

      {/* Anime List */}
      <div className="row">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default AnimeSearchAndList;
