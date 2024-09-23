import React from "react";
import { Modal, Button } from "react-bootstrap"; // Import komponen Modal dan Button dari React Bootstrap
import './AnimeDetailModal.css'; // Import file CSS untuk styling komponen

// Komponen AnimeDetailModal yang menerima prop: show (untuk kontrol tampilan modal), anime (data anime yang ditampilkan), dan onClose (fungsi untuk menutup modal)
function AnimeDetailModal({ show, anime, onClose }) {
  return (
    // Komponen Modal dari Bootstrap untuk menampilkan detail anime
    <Modal show={show} onHide={onClose}> 
      {/* Bagian header modal yang berisi judul anime dan tombol untuk menutup modal */}
      <Modal.Header closeButton> 
        {/* Menampilkan judul anime dari data prop anime */}
        <Modal.Title>{anime?.title}</Modal.Title> 
      </Modal.Header>
      
      {/* Bagian body modal untuk menampilkan detail lengkap anime */}
      <Modal.Body>
        {/* Menampilkan gambar anime dari data yang diterima */}
        <img src={anime?.images?.jpg?.image_url} alt={anime?.title} className="img-fluid mb-3" /> 
        
        {/* Menampilkan jumlah episode, atau N/A jika data tidak tersedia */}
        <p><strong>Episodes:</strong> {anime?.episodes || "N/A"}</p>  
        
        {/* Menampilkan daftar genre anime yang digabung dengan koma */}
        <p><strong>Genres:</strong> {anime?.genres?.map((genre) => genre.name).join(", ")}</p> 
        
        {/* Menampilkan rating anime */}
        <p><strong>Rating:</strong> {anime?.rating}</p> 
        
        {/* Menampilkan skor penonton (rating dari audience) */}
        <p><strong>Audience Rating:</strong> {anime?.score} / 10</p> 
        
        {/* Menampilkan tahun penayangan anime */}
        <p><strong>Year:</strong> {anime?.aired?.prop?.from?.year}</p> 
        
        {/* Menampilkan sinopsis anime */}
        <p><strong>Synopsis:</strong> {anime?.synopsis}</p>
      </Modal.Body>

      {/* Bagian footer modal yang berisi tombol untuk menutup modal */}
      <Modal.Footer style={{ backgroundColor: "#f8faff" }}>
        {/* Tombol untuk menutup modal, memanggil fungsi onClose */}
        <Button variant="secondary" onClick={onClose}>Close</Button> 
      </Modal.Footer>
    </Modal>
  );
}

export default AnimeDetailModal;
