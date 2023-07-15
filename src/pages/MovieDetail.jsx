import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "../constants/constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ReactPlayer from "react-player";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const { movie_id } = useParams();
  const [detail, setDetail] = useState(null);
  const [casts, setCasts] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    axios
      .get(`movie/${movie_id}`, options)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`/movie/${movie_id}/credits`, options)
      .then((res) => setCasts(res.data.cast.slice(0, 15)))
      .catch((err) => console.log(err));

    axios
      .get(`/movie/${movie_id}/videos`, options)
      .then((res) => setTrailer(res.data.results[0]))
      .catch((err) => console.log(err));
  }, []);

  if (!detail) {
    return <p>Loading...</p>;
  }

  const sum = detail?.revenue - detail?.budget;

  return (
    // Filim detaylar bolumu
    <div className=" movie-detail row p-5 ">
      <div className="col-md-4 d-flex align-items-center justify-content-center">
        <div className=" position-relative ">
          {
            <img
              style={{ width: "380px" }}
              className=" rounded img-fluid "
              src={baseImgUrl.concat(detail?.poster_path)}
            />
          }
          <span className="position-absolute bg-warning rounded p-1 shadow bottom-0 end-0 m-2">
            {detail.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center  p-4 ">
        <h1>{detail.title}</h1>
        <p className="lead">{detail.overview}</p>
        <div className="row d-flex flex-column  ">
          <div className="col-6 col-md-12">
            <p>Budget: {detail.budget}$</p>
            <p>Revenue: {detail.revenue}$ </p>
            <p>
              {sum >= 0 ? "Profit" : "Damage"} :{sum}$
            </p>
          </div>
          <div className="col-md-6 col-md-12">
            <div className="d-flex gap-3  ">
              Categories:
              {detail.genres?.map((genre) => (
                <p className="badge bg-danger text" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="d-flex gap-3">
              Language:
              {detail.spoken_languages?.map((genre) => (
                <p className="badge bg-success" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="d-flex gap-3">
              Companies:
              {detail.production_companies?.map((genre) => (
                <p className="badge bg-primary" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            {/* Filimler bolumu */}
            {!casts && <p>Loading...</p>}
            {casts && (
              <div className="row p-2">
                <h4 className=" bg-warning">Top Cast</h4>
                <Splide
                  options={{
                    autoWidth: true,
                    gap: "10px",
                    pagination: false,
                  }}
                >
                  {casts.map((cast, i) => (
                    <SplideSlide key={i}>
                      <div className="d-flex gap-3 p-3 align-items-center justify-content-center mx-3 ">
                        <img
                          className="cast"
                          src={baseImgUrl.concat(cast?.profile_path)}
                        />
                        <h6>{cast.original_name}</h6>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* fragman bolumu */}
      {!trailer && <p>Loading...</p>}
      {trailer && (
        <div className="row p-5">
          <div className="player-wrapper d-flex justify-content-center mb-5 col-md-12 ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.key}`}
              controls
              width={"880px"}
              height={"500px"}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MovieDetail;
