import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import bookmark from "../assets/icons/icon-nav-bookmark.svg";
import home from "../assets/icons/icon-nav-home.svg";
import movies from "../assets/icons/icon-nav-movies.svg";
import series from "../assets/icons/icon-nav-tv-series.svg";
import profil from "../assets/icons/image-avatar.png";
import logo from "../assets/icons/logo.svg";
import Modal from "../components/Modal";

const Navbar = ({ setSessionStatus }) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const user = useSelector((store) => store.reducerUser);

  const activeStyle = {
    filter: "invert(80%) sepia(100%) saturate(100%) hue-rotate(155deg) brightness(166%) contrast(100%)",
  };
  const dispatch = useDispatch();

  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_ANON_API
  );
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    setSessionStatus("SIGNED_OUT");
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userResponse = await supabase.auth.getUser();
        if (userResponse.error) throw userResponse.error;
        const { id } = userResponse.data.user;
        
        const { data, error } = await supabase
          .from("profiles")
          .select("username, website, avatar_url, id, bookmarks")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        
        dispatch({ type: "INIT_USER", payload: data });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    getUserData();
  }, [dispatch]);
  return (
    <section
      className="navbar"
      onMouseLeave={() => {
        setCartIsOpen(false);
      }}
    >
      <nav className="navbar-container nav-container">
        <img src={logo} alt="" className="navbar-logo" />
        <div className="navbar-links">
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
          >
            <img src={home} alt="Go to Home Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/movies"
          >
            <img src={movies} alt="Go to Movies Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/series"
          >
            <img src={series} alt="Go to Series Page" />
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/bookmark"
          >
            <img src={bookmark} alt="Go to your Favorites" />
          </NavLink>
        </div>
        {/* <ul>
          <li>
            <button
              onClick={() => setCartIsOpen(!cartIsOpen)}
              onMouseEnter={() => setCartIsOpen(true)}
            >
              <img
                src={
                  user.avatar_url
                    ? `${import.meta.env.VITE_PROJECT_URL}/storage/v1/object/public/avatars/${user.id}/${user?.avatar_url}`
                    : "https://img-19.commentcamarche.net/AINHgQU6hzAaA-eacqk4lYu9IhE=/1500x/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg"
                }
                alt="No pfp"
                className="navbar-profil"
              />
            </button>
          </li>
          <li style={{ position: "relative" }}>
            {cartIsOpen && (
              <Modal setSessionStatus={setSessionStatus} user={user} />
            )}
          </li>
        </ul> */}
      </nav>
    </section>
  );
};

export default Navbar;
