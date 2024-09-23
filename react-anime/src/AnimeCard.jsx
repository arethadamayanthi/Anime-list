import React from "react";
import { Card } from "react-bootstrap"; // Mengimpor komponen Card dari React Bootstrap untuk membuat layout kartu
import './AnimeCard.css'; // Mengimpor file CSS untuk styling khusus pada komponen AnimeCard

// Komponen AnimeCard menerima props 'anime' dan 'onCardClick'
function AnimeCard({ anime, onCardClick }) {
  return (
    // Menampilkan setiap kartu anime dalam grid kolom dengan ukuran sedang
    <div className="col-md-4 mb-4">
      {/* Membuat kartu anime menggunakan komponen Card dari React Bootstrap */}
      <Card className="anime-card" onClick={() => onCardClick(anime)}>
        {/* Gambar anime yang ditampilkan di bagian atas kartu */}
        <Card.Img variant="top" src={anime.images.jpg.image_url} className="card-img-top"/>
        {/* Bagian body kartu yang berisi informasi tentang anime */}
        <Card.Body>
          {/* Judul anime yang ditampilkan sebagai Title di dalam kartu */}
          <Card.Title>{anime.title}</Card.Title>
          {/* Rating anime berdasarkan klasifikasi umur atau konten */}
          <Card.Text>Rated: {anime.rating}</Card.Text>
          {/* Rating audiens berdasarkan skor, ditampilkan dalam skala 10 */}
          <Card.Text>Audience Rating: {anime.score} / 10</Card.Text>
          {/* Genre anime ditampilkan dalam format string, dipisahkan dengan koma */}
          <Card.Text>Genres: {anime.genres.map((g) => g.name).join(", ")}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnimeCard;
