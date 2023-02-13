import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import Card from "../components/Card";
import Pin from "../components/Pin";

const Bookmark = () => {
  const user = useSelector((store) => store.reducerUser);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(user.bookmarks);
  }, [user, []]);

  // console.log(bookmarks);
  
  return (
    <div className="container">
      <section className="trending">
        <h1 className="title">Bookmarks</h1>
      </section>
      <section className="recommend">
        <div className="card-container">
          {bookmarks?.length > 0 ? (
            bookmarks?.map((movie) => {
              return <Card data={movie} key={movie.id} />;
          })
          ) : (
            <p className="empty">You don't have bookmark !</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Bookmark;
