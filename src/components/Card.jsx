import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import movies from "../assets/icons/icon-movies.svg";
import series from "../assets/icons/icon-series.svg";
import NotAvailble from "../assets/no-image-available-icon-6.png";
import Pin from "./Pin";

const Card = ({ data }) => {
    
  return (
    <div className="card">
      <Link to={`/${data.id}`} state={{ movie: data }}>
        {data.backdrop_path === null ? (
          <img
            className="card-img"
            src={NotAvailble}
            alt={data.name || data.original_title}
          />
        ) : (
          <img
            className="card-img"
            src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
            alt={data.name || data.original_title}
          />
        )}
      </Link>
      <Link to={`/${data.id}`} state={{ movie: data }}>
        <div className="card-description">
          <p className="card-description-date">
            {moment(data.release_date).format("YYYY")}
          </p>
          <div className="card-description-list">
            <span className="infos-circle"></span>
            <p>
              {data.media_type === "movie" ? (
                <img src={movies} className="card-description-image" />
              ) : (
                <img src={series} className="card-description-image" />
              )}
            </p>

            <p className="card-description-media">
              {data.media_type === "movie" ? "Movies" : "Tv Series"}
            </p>
            <span className="infos-circle"></span>
          </div>
        </div>
        <h2 className="card-description-title">
          {data.original_title || data.name}
        </h2>
      </Link>
      <Pin pageData={data} />
    </div>
  );
};

export default Card;