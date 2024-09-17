import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Card, Form } from "react-bootstrap";
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageRange, setPageRange] = useState([1, 4]);

  useEffect(() => {
    fetchAllAnime();
  }, [currentPage, itemsPerPage]);

  const fetchAllAnime = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?limit=${itemsPerPage}&page=${currentPage}`
      );
      setAnimeList(response.data.data);
      setTotalPages(
        response.data.pagination.items.total
          ? Math.ceil(response.data.pagination.items.total / itemsPerPage)
          : 1
      );
      // Adjust page range after fetching data
      updatePageRange(currentPage, 'init');
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm) {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}&order_by=score&sort=desc&limit=${itemsPerPage}&page=${currentPage}`
        );
        setAnimeList(response.data.data);
        setTotalPages(
          response.data.pagination.items.total
            ? Math.ceil(response.data.pagination.items.total / itemsPerPage)
            : 1
        );
        // Adjust page range after fetching data
        updatePageRange(currentPage, 'init');
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      fetchAllAnime();
    }
  };

  const handleFilter = async (genreId) => {
    try {
      let url = `https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&limit=${itemsPerPage}&page=${currentPage}`;
      
      if (genreId) {
        url = `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&sort=desc&limit=${itemsPerPage}&page=${currentPage}`;
      }
  
      const response = await axios.get(url);
      setAnimeList(response.data.data);
      setTotalPages(
        response.data.pagination.items.total
          ? Math.ceil(response.data.pagination.items.total / itemsPerPage)
          : 1
      );
      setShowFilterModal(false);
      // Adjust page range after fetching data
      updatePageRange(currentPage, 'init');
    } catch (error) {
      console.error("Error fetching filtered anime:", error);
    }
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
    const sortedList = [...animeList].sort((a, b) => {
      return direction === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setAnimeList(sortedList);
  };

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setShowDetail(true);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        updatePageRange(newPage, 'next');
        return newPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        updatePageRange(newPage, 'previous');
        return newPage;
      });
    }
  };

  const updatePageRange = (page, direction) => {
    if (direction === 'next') {
      if (page > pageRange[1]) {
        const start = Math.floor(page / 4) * 4 + 1;
        const end = Math.min(start + 3, totalPages);
        setPageRange([start, end]);
      }
    } else if (direction === 'previous') {
      if (page < pageRange[0]) {
        const end = Math.floor((page - 1) / 4) * 4 + 4;
        const start = Math.max(end - 3, 1);
        setPageRange([start, end]);
      }
    } else if (direction === 'init') {
      // Initialize or adjust page range based on current page and total pages
      const start = Math.floor((page - 1) / 4) * 4 + 1;
      const end = Math.min(start + 3, totalPages);
      setPageRange([start, end]);
    }
  };

  return (
    <div className="container mt-12" style={{ backgroundColor: "#e3f2fd", minHeight: "100vh", minWidth: "100vw" }}>
      <h1 className="text-center text-primary">All Anime</h1>

      {/* Search Bar */}
      <Form className="mb-3" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {/* Filter and Sort Section */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <Button variant="outline-primary" onClick={() => setShowFilterModal(true)}>
            Filter Genres
          </Button>
          <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Select a Genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button onClick={() => handleFilter(1)}>Action</Button>
              <Button onClick={() => handleFilter(2)}>Adventure</Button>
              <Button onClick={() => handleFilter(14)}>Horror</Button>
              <Button onClick={() => handleFilter(10)}>Fantasy</Button>
              <Button onClick={() => handleFilter(22)}>Romance</Button>
              <Button onClick={() => handleFilter(30)}>Sport</Button>
              <Button onClick={() => handleFilter(19)}>Music</Button>
              <Button onClick={() => handleFilter(8)}>Drama</Button>
              <Button onClick={() => handleFilter(23)}>School</Button>
              <Button onClick={() => handleFilter(36)}>Slice of Life</Button>
              <Button onClick={() => handleFilter(41)}>Thriller</Button>
              <Button onClick={() => handleFilter(7)}>Mystery</Button>
              <Button onClick={() => handleFilter(24)}>Sci-Fi</Button>
              <Button onClick={() => handleFilter(62)}>Isekai</Button>
              <Button onClick={() => handleFilter(13)}>History</Button>
              <Button onClick={() => handleFilter(17)}>Martial Arts</Button>
              <Button onClick={() => handleFilter(37)}>Supernatural</Button>
              <Button onClick={() => handleFilter(4)}>Comedy</Button>
              <Button onClick={() => handleFilter('')}>All</Button>
            </Modal.Body>
          </Modal>
        </div>

        <div className="d-flex flex-column">
          <div className="mb-2">
            <Button variant="outline-primary" onClick={() => handleSort("asc")}>
              Sort Asc ↑
            </Button>
            <Button variant="outline-primary" onClick={() => handleSort("desc")}>
              Sort Desc ↓
            </Button>
          </div>
          {/* Limit Selection */}
          <Form.Select
            aria-label="Select number of items per page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
            className="w-auto"
          >
            <option value={10}>10 per page</option>
            <option value={24}>24 per page</option>
          </Form.Select>
        </div>
      </div>

      {/* Anime Cards */}
      <div className="row">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="col-md-4 mb-4">
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(anime)}
            >
              <Card.Img variant="top" src={anime.images.jpg.image_url} />
              <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                <Card.Text>Rated: {anime.rating}</Card.Text>
                <Card.Text>
                  Audience Rating: {anime.score} / 10
                </Card.Text>
                <Card.Text>
                  Genres: {anime.genres.map((g) => g.name).join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="custom-pagination d-flex justify-content-center align-items-center">
        <button
          className="circle-btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="pagination-numbers">
          {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, i) => (
            <button
              key={pageRange[0] + i}
              className={`page-btn ${currentPage === pageRange[0] + i ? "active" : ""}`}
              onClick={() => handlePagination(pageRange[0] + i)}
            >
              {pageRange[0] + i}
            </button>
          ))}
        </div>
        <button
          className="circle-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      {/* Anime Detail Modal */}
      {selectedAnime && (
        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedAnime.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedAnime.images.jpg.image_url}
              alt={selectedAnime.title}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Year:</strong> {selectedAnime.aired.prop.from.year}
            </p>
            <p>
              <strong>Rating:</strong> {selectedAnime.rating}
            </p>
            <p>
              <strong>Audience Rating:</strong> {selectedAnime.score} / 10
            </p>
            <p>
              <strong>Company:</strong>{" "}
              {selectedAnime.producers.map((producer) => producer.name).join(", ")}
            </p>
            <p>
              <strong>Synopsis:</strong> {selectedAnime.synopsis}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {selectedAnime.genres.map((genre) => genre.name).join(", ")}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetail(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;
