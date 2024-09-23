import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Import komponen Button dan Modal dari Bootstrap
import './FilterAndSort.css'; // Import file CSS untuk styling

// Komponen FilterAndSort menerima prop: showFilterModal, setShowFilterModal, onFilter, dan onSort
function FilterAndSort({ showFilterModal, setShowFilterModal, onFilter, onSort }) {
  
  // State untuk menyimpan genre yang dipilih oleh user
  const [selectedGenre, setSelectedGenre] = useState(null); 
  
  // State untuk menyimpan sorting yang dipilih (ascending atau descending)
  const [activeSort, setActiveSort] = useState(null); 

  // Fungsi untuk menangani pemilihan genre
  const handleFilter = (genreId) => {
    // Jika genre yang dipilih sama dengan genre yang sudah aktif, maka deselect (batalkan pilihan)
    if (selectedGenre === genreId) {
      setSelectedGenre(null);  // Deselect genre yang aktif
      onFilter(null);  // Reset filter untuk menampilkan semua genre
    } else {
      // Jika genre berbeda, set genre yang baru dan aktifkan filter berdasarkan genre tersebut
      setSelectedGenre(genreId);  // Set genre yang dipilih
      onFilter(genreId);  // Memanggil fungsi filter dari parent component dengan genre yang dipilih
    }
    setShowFilterModal(false);  // Tutup modal setelah genre dipilih
  };

  // Fungsi untuk menangani pemilihan sorting (ascending/descending)
  const handleSort = (direction) => {
    // Jika user memilih sorting yang sama, reset (non-aktifkan) sorting
    if (activeSort === direction) {
      setActiveSort(null);  // Reset sorting jika sudah aktif
      onSort(null);  // Menghapus sorting dan menampilkan urutan default
    } else {
      // Jika user memilih sorting baru, aktifkan sorting tersebut
      setActiveSort(direction);  // Set sorting yang dipilih (asc atau desc)
      onSort(direction);  // Memanggil fungsi sorting dari parent component
    }
  };

  return (
    <div className="filter-sort-container">
      {/* Bagian untuk sorting */}
      <div className="sort-container">
        {/* Tombol untuk mengurutkan secara ascending */}
        <Button
          variant="outline-primary"
          onClick={() => handleSort("asc")} // Memanggil handleSort dengan nilai "asc"
          className={activeSort === "asc" ? "active" : ""} // Jika sort aktif, tambahkan class 'active'
        >
          Sort ↑
        </Button>

        {/* Tombol untuk mengurutkan secara descending */}
        <Button
          variant="outline-primary"
          onClick={() => handleSort("desc")} // Memanggil handleSort dengan nilai "desc"
          className={activeSort === "desc" ? "active" : ""} // Jika sort aktif, tambahkan class 'active'
        >
          Sort ↓
        </Button>
      </div>

      {/* Bagian untuk filter berdasarkan genre */}
      <div className="filter-container">
        {/* Tombol untuk membuka modal filter genre */}
        <Button variant="outline-primary" onClick={() => setShowFilterModal(true)}>
          Filter Genres
        </Button>

        {/* Modal yang berisi daftar genre */}
        <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
          <Modal.Header closeButton style={{ backgroundColor: "#007bff" }}>
            <Modal.Title>Select a Genre</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Daftar genre yang bisa dipilih */}
            {[
              { id: 1, label: 'Action' },
              { id: 2, label: 'Adventure' },
              { id: 14, label: 'Horror' },
              { id: 10, label: 'Fantasy' },
              { id: 22, label: 'Romance' },
              { id: 30, label: 'Sport' },
              { id: 19, label: 'Music' },
              { id: 8, label: 'Drama' },
              { id: 23, label: 'School' },
              { id: 36, label: 'Slice of Life' },
              { id: 41, label: 'Thriller' },
              { id: 7, label: 'Mystery' },
              { id: 24, label: 'Sci-Fi' },
              { id: 62, label: 'Isekai' },
              { id: 13, label: 'History' },
              { id: 17, label: 'Martial Arts' },
              { id: 37, label: 'Supernatural' },
              { id: 4, label: 'Comedy' },
              { id: '', label: 'All' } // Option 'All' untuk menampilkan semua genre
            ].map(genre => (
              // Tombol untuk memilih genre
              <Button
                key={genre.id} // Kunci unik untuk setiap genre
                onClick={() => handleFilter(genre.id)} // Panggil handleFilter ketika tombol diklik
                className={selectedGenre === genre.id ? 'active' : ''} // Tambahkan class 'active' jika genre dipilih
              >
                {genre.label} {/* Tampilkan nama genre */}
              </Button>
            ))}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default FilterAndSort;
