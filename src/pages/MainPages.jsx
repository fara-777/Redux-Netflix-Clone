import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import { getMovies, setLoading, getGenres } from "../redux/actions/actions";
import ListMovies from "../components/ListMovies";

const MainPages = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.movieReducer);

  useEffect(() => {
    // loadingi true ceker
    dispatch(setLoading(true));

    // popular film verisini cektik
    dispatch(getMovies());

    // kategori verilerini cektik
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />
      {/* her bir kategory icin o kategoriye ait
       *filimleri listeleyecek bilesene basildi */}
      {state.genres.map((genre) => (
        <ListMovies key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export default MainPages;
