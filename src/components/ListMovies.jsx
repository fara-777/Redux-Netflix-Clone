import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import { baseImgUrl, options } from "../constants/constants";
import { Link } from "react-router-dom";

const ListMovies = ({ genre }) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios
      .get(
        `/discover/movie?sort_by=popularity.desc&with_genres=${genre.id}`,
        options
      )
      .then((res) => setMovies(res.data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="row p-4 ">
      <div className="">
        <h1>{genre.name}</h1>
        {!movies && <p>Loading...</p>}
        {movies && (
          <Splide
            options={{
              autoWidth: true,
              gap: "10px",
              pagination: false,
            }}
          >
            {movies.map((movie) => (
              <SplideSlide key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className=" movie rounded "
                    src={`${baseImgUrl}${movie.poster_path}`}
                  />
                </Link>
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </div>
  );
};

export default ListMovies;
