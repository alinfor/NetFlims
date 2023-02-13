import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/scss";
import { fetchScroll } from "../actions/actionMovies";
import { initMovies } from "../actions/initMovies";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SeriesList from "./SeriesList";

const Series = () => {
  const series = useSelector((store) => store.reducerMovies);
  const dispatch = useDispatch();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const infiniteCheck = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop === clientHeight) {
        setPageIndex((pageIndex) => pageIndex + 1);
        // console.log(pageIndex);
        dispatch(fetchScroll(pageIndex + 1));
      }
    };
    
    window.addEventListener("scroll", infiniteCheck);
    return () => {
      window.removeEventListener("scroll", infiniteCheck);
    };
  }, [pageIndex]);

  useEffect(() => {
    dispatch(initMovies());
  }, []);

  const loadMoreData = () => {
    dispatch(fetchScroll(pageIndex + 1));
  };

  return (
    <main className="container">
      <h1 className="title">Series</h1>
      <div className="card-container">
        {series.length == 0 || undefined ? (
          <Loader />
        ) : (
          series.map((serie) => {
            if (serie.media_type === "tv") {
              return <Card data={serie} key={serie.id} />;
            }
          })
        )}
        <SeriesList />
      </div>
    </main>
  );
};

export default Series;
