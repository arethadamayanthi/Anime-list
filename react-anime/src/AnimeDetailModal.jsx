import React from "react";
import { Modal, Button } from "react-bootstrap";
import './AnimeDetailModal.css';

function AnimeDetailModal({ show, anime, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{anime?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={anime?.images?.jpg?.image_url} alt={anime?.title} className="img-fluid mb-3" />
        <p><strong>Episodes:</strong> {anime?.episodes || "N/A"}</p>  {/* Add this line */}
        <p><strong>Genres:</strong> {anime?.genres?.map((genre) => genre.name).join(", ")}</p>
        <p><strong>Rating:</strong> {anime?.rating}</p>
        <p><strong>Audience Rating:</strong> {anime?.score} / 10</p>
        <p><strong>Year:</strong> {anime?.aired?.prop?.from?.year}</p>
        <p><strong>Synopsis:</strong> {anime?.synopsis}</p>
      </Modal.Body>
      <Modal.Footer  style={{ backgroundColor: "#fff" }} >
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AnimeDetailModal;
