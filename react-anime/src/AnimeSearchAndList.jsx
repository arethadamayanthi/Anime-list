import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; 
import './AnimeSearchAndList.css'; 
import AnimeCard from "./AnimeCard"; 
import FilterAndSort from './FilterAndSort';

// Komponen utama AnimeSearchAndList untuk mengelola pencarian, filter, dan tampilan daftar anime
function AnimeSearchAndList({ animeList, handleCardClick, handleSearch, showFilterModal, setShowFilterModal, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata kunci pencarian

  // Fungsi untuk menangani pengiriman form pencarian
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form dikirim
    handleSearch(searchTerm); // Memanggil fungsi pencarian dengan kata kunci pencarian
  };

  // Fungsi untuk menghapus pencarian (reset kata kunci)
  const handleClearSearch = () => {
    setSearchTerm("");  // Menghapus kata kunci pencarian
    handleSearch("");   // Mengatur ulang pencarian dan menampilkan semua anime
  };

  return (
    <div>
      {/* Search Bar (Kolom Pencarian) */}
      <Form className="search-bar" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Search anime..." // Placeholder input pencarian
          value={searchTerm} // Menghubungkan nilai input dengan state searchTerm
          onChange={(e) => setSearchTerm(e.target.value)}  // Mengubah nilai searchTerm saat pengguna mengetik
        />
        <Button variant="primary" type="submit">Search</Button> {/* Tombol untuk memulai pencarian */}
        {searchTerm && ( // Jika ada kata kunci pencarian, tampilkan tombol 'X' untuk menghapus pencarian
          <Button variant="danger" type="button" className="clear-btn" onClick={handleClearSearch}>
            X
          </Button>
        )}
      </Form>

      {/* Filter dan Sort Controls */}
      <FilterAndSort
        showFilterModal={showFilterModal} // State untuk modal filter
        setShowFilterModal={setShowFilterModal} // Fungsi untuk membuka/tutup modal filter
        onFilter={onFilter} // Fungsi untuk menjalankan filter berdasarkan genre
        onSort={onSort} // Fungsi untuk mengurutkan anime
      />

      {/* Tampilkan daftar anime */}
      <div className="row">
        {animeList.map((anime) => ( // Looping melalui array animeList untuk menampilkan setiap anime dalam bentuk card
          <AnimeCard key={anime.mal_id} anime={anime} onCardClick={handleCardClick} /> // Memanggil komponen AnimeCard untuk menampilkan setiap anime
        ))}
      </div>
    </div>
  );
}

export default AnimeSearchAndList;
