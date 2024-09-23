// import deklarasi React, hooks, axios, dan komponen lain yang digunakan
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeSearchAndList from "./AnimeSearchAndList";
import Pagination from "./Pagination";
import AnimeDetailModal from "./AnimeDetailModal";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Komponen utama App
function App() {
  // State untuk menyimpan daftar anime yang ditampilkan
  const [animeList, setAnimeList] = useState([]);
  
  // State untuk menyimpan anime yang dipilih oleh pengguna (untuk modal detail)
  const [selectedAnime, setSelectedAnime] = useState(null);
  
  // State untuk mengontrol apakah modal detail anime ditampilkan atau tidak
  const [showDetail, setShowDetail] = useState(false);
  
  // State untuk filter berdasarkan genre
  const [filter, setFilter] = useState("");  
  
  // State untuk pengurutan (ascending/descending)
  const [sortOrder, setSortOrder] = useState(null);  
  
  // State untuk halaman pagination yang sedang aktif
  const [currentPage, setCurrentPage] = useState(1);
  
  // State untuk menentukan jumlah item (anime) yang ditampilkan per halaman
  const [itemsPerPage, setItemsPerPage] = useState(12);  
  
  // State untuk mengontrol tampilan modal filter
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // State untuk menyimpan total halaman dari hasil pencarian
  const [totalPages, setTotalPages] = useState(1);
  
  // State untuk menyimpan kata kunci pencarian (search term)
  const [searchTerm, setSearchTerm] = useState("");  
  
  // State untuk menyimpan range halaman yang ditampilkan dalam pagination (misal: halaman 1-4)
  const [pageRange, setPageRange] = useState([1, 4]);  

  // Menggunakan useEffect untuk memuat dan memperbarui data anime setiap kali filter, urutan, halaman, dan lainnya berubah
  useEffect(() => {
    fetchAnime();
  }, [filter, sortOrder, currentPage, itemsPerPage, searchTerm]);

  // Fungsi untuk mengambil data anime dari Jikan API (Axious)
  const fetchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
        // informasi tambahan nanti data nya mau di apain aja
        params: {
          q: searchTerm || undefined,  // Menggunakan kata kunci pencarian jika ada
          genres: filter || undefined,  // Filter berdasarkan genre jika disetel
          order_by: sortOrder ? "popularity" : "title",  // Mengurutkan berdasarkan popularitas jika diurutkan
          sort: sortOrder || undefined,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      // Menyimpan daftar anime yang didapat dari API ke dalam state
      setAnimeList(response.data.data);
      
      // Menghitung total halaman berdasarkan jumlah item total dari API
      const totalItems = response.data.pagination.items.total;
      const newTotalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;
      setTotalPages(newTotalPages);
      updatePageRange(currentPage, newTotalPages);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  // Fungsi untuk mengupdate range halaman yang ditampilkan pada pagination
  const updatePageRange = (page, totalPages) => {
    const maxVisiblePages = 4;  // Menampilkan 4 halaman dalam pagination
    const startPage = Math.floor((page - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    setPageRange([startPage, endPage]);
  };

  // Fungsi untuk otomatis scroll ke bagian atas halaman ketika terjadi pergantian halaman
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fungsi untuk menangani navigasi ke halaman berikutnya
  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    updatePageRange(newPage, totalPages);
    handleScrollToTop();
  };

  // Fungsi untuk menangani navigasi ke halaman sebelumnya
  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    updatePageRange(newPage, totalPages);
    handleScrollToTop();
  };

  // Fungsi untuk menangani navigasi langsung ke halaman tertentu pada pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
    updatePageRange(page, totalPages);
    handleScrollToTop();
  };

  // Fungsi yang dijalankan ketika pengguna mengklik salah satu card (untuk membuka modal detail)
  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowDetail(true);
  };

  // Fungsi yang dijalankan saat filter genre dipilih (reset halaman ke 1)
  const handleFilter = (genreId) => {
    setFilter(genreId);
    setCurrentPage(1);
  };

  // Fungsi yang dijalankan saat urutan sort (ascending/descending) dipilih
  const handleSort = (direction) => {
    setSortOrder(direction);
    setCurrentPage(1);
  };

  // Fungsi yang dijalankan saat pengguna melakukan pencarian anime
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Render tampilan komponen dan berbagai fungsionalitas di atas ke layar
  return (
    <div className="app-container">
      <h1 className="app-title">Anime List</h1>
      <AnimeSearchAndList
        animeList={animeList}
        handleCardClick={handleCardClick}
        handleSearch={handleSearch}
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePagination={handlePagination}
        pageRange={pageRange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      {selectedAnime && (
        <AnimeDetailModal show={showDetail} anime={selectedAnime} onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
}

export default App;
