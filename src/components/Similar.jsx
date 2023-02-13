import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilar } from "../actions/actionSimilare";
import Card from "./Card";
import Loader from "./Loader";

const Similar = ({movie_id, media_type}) => {
  const movies = useSelector((store) => store.reducerSimilar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSimilar(movie_id, media_type));
  }, []);

  return (
    <section>
      <h1 className="title">Similar recommendations</h1>
      <div className="card-container">
        {movies.length == 0 || undefined ? (
          <Loader />
        ) : (
          movies.map((movie) => {
              return <Card data={movie} key={movie.id} />;
          })
        )}
      </div>
    </section>
  );
};

export default Similar;
