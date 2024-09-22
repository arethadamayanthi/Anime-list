// import deklarasi dan pemanggilan
import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeSearchAndList from "./AnimeSearchAndList";
import Pagination from "./Pagination";
import AnimeDetailModal from "./AnimeDetailModal";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// use state mengelola informasi anime 
function App() {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filter, setFilter] = useState("");  
  const [sortOrder, setSortOrder] = useState(null);  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);  
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");  
  const [pageRange, setPageRange] = useState([1, 4]);  

  // use effect menampilkan dan memperbarui data anime
  useEffect(() => {
    fetchAnime();
  }, [filter, sortOrder, currentPage, itemsPerPage, searchTerm]);

  // proses pemintaan data ke jikan api
  const fetchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
        params: {
          q: searchTerm || undefined,
          genres: filter || undefined,  
          order_by: sortOrder ? "popularity" : "title",  
          sort: sortOrder || undefined,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setAnimeList(response.data.data);
      const totalItems = response.data.pagination.items.total;
      const newTotalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1;
      setTotalPages(newTotalPages);
      updatePageRange(currentPage, newTotalPages);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  // pagination
  const updatePageRange = (page, totalPages) => {
    const maxVisiblePages = 4;  // pagination maksimal 4
    const startPage = Math.floor((page - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    setPageRange([startPage, endPage]);
  };

  // navigasi halaman otomatis scroll
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });  // otomatis scroll ke atas
  };

  // handle fungsi pagination
  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    updatePageRange(newPage, totalPages);
    handleScrollToTop();
  };

  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    updatePageRange(newPage, totalPages);
    handleScrollToTop();
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
    updatePageRange(page, totalPages);
    handleScrollToTop();
  };

  // yang terjadi bila card dijalankan
  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowDetail(true);
  };

  // yang terjadi bila fitur dijalankan (halaman akan direset)
  const handleFilter = (genreId) => {
    setFilter(genreId);
    setCurrentPage(1);
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // render component untuk memangil component fungsi di atas agar ditampilkan ke layar
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
