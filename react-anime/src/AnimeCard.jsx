import React from "react";
import { Card } from "react-bootstrap";
import './AnimeCard.css';

function AnimeCard({ anime, onCardClick }) {
  return (
    <div className="col-md-4 mb-4">
      <Card className="anime-card" onClick={() => onCardClick(anime)}>
        <Card.Img variant="top" src={anime.images.jpg.image_url} className="card-img-top"/>
        <Card.Body>
          <Card.Title>{anime.title}</Card.Title>
          <Card.Text>Rated: {anime.rating}</Card.Text>
          <Card.Text>Audience Rating: {anime.score} / 10</Card.Text>
          <Card.Text>Genres: {anime.genres.map((g) => g.name).join(", ")}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AnimeCard;
