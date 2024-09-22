import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import './FilterAndSort.css';

function FilterAndSort({ showFilterModal, setShowFilterModal, onFilter, onSort }) {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeSort, setActiveSort] = useState(null);

  const handleFilter = (genreId) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);  // Deselect genre
      onFilter(null);  // Reset filter
    } else {
      setSelectedGenre(genreId);  // Select genre
      onFilter(genreId);
    }
    setShowFilterModal(false);  // Close modal
  };

  const handleSort = (direction) => {
    if (activeSort === direction) {
      setActiveSort(null);  // Reset sorting
      onSort(null);  // Remove sorting
    } else {
      setActiveSort(direction);  // Set sorting
      onSort(direction);
    }
  };

  return (
    <div className="filter-sort-container">
      <div className="sort-container">
        <Button variant="outline-primary" onClick={() => handleSort("asc")} className={activeSort === "asc" ? "active" : ""}>
          Sort Asc ↑
        </Button>
        <Button variant="outline-primary" onClick={() => handleSort("desc")} className={activeSort === "desc" ? "active" : ""}>
          Sort Desc ↓
        </Button>
      </div>
      <div className="filter-container">
        <Button variant="outline-primary" onClick={() => setShowFilterModal(true)}>
          Filter Genres
        </Button>
        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
          <Modal.Header closeButton style={{ backgroundColor: "#007bff" }}>
            <Modal.Title>Select a Genre</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {[{ id: 1, label: 'Action' }, { id: 2, label: 'Adventure' }, { id: 14, label: 'Horror' }, 
              { id: 10, label: 'Fantasy' }, { id: 22, label: 'Romance' }, { id: 30, label: 'Sport' }, 
              { id: 19, label: 'Music' }, { id: 8, label: 'Drama' }, { id: 23, label: 'School' }, 
              { id: 36, label: 'Slice of Life' }, { id: 41, label: 'Thriller' }, { id: 7, label: 'Mystery' }, 
              { id: 24, label: 'Sci-Fi' }, { id: 62, label: 'Isekai' }, { id: 13, label: 'History' }, 
              { id: 17, label: 'Martial Arts' }, { id: 37, label: 'Supernatural' }, { id: 4, label: 'Comedy' }, 
              { id: '', label: 'All' }
            ].map(genre => (
              <Button key={genre.id} onClick={() => handleFilter(genre.id)} className={selectedGenre === genre.id ? 'active' : ''}>
                {genre.label}
              </Button>
            ))}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default FilterAndSort;
