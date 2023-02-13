import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Navbar from "./layouts/Navbar";
import Bookmark from "./pages/Bookmark";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import Person from "./pages/Person";
import Profile from "./pages/Profile";
import Series from "./pages/Series";
import { ScrollToTop } from "./ScrollToTop";
import store from "./Store";

const App = () => {
  const [sessionStatus, setSessionStatus] = useState();
  // console.log(sessionStatus);

  return (
    <>
      {sessionStatus != "SIGNED_IN" ? (
        <>
          <Auth setSessionStatus={setSessionStatus} />
        </>
      ) : (
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
            <Navbar setSessionStatus={setSessionStatus} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/person" element={<Person />} />
              <Route path="/profile" element={<Profile />} />
              <Route path=":detail" element={<Details />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
};

export default App;
