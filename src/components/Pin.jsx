import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import addToBookmark from '../assets/icons/icon-bookmark-empty.svg';
import delToBookmark from '../assets/icons/icon-bookmark-full.svg';
import { supabase } from "../supabaseClient";

const Pin = ({ pageData }) => {
  const user = useSelector((store) => store.reducerUser);
  const dispatch = useDispatch();
console.log(user)
  const [inBookmarks, setInBookmarks] = useState();

  useEffect(() => {
    const allBookmarks = () => {
      setInBookmarks(false);
      user.bookmarks?.map((item) => {
        if (item.id == pageData.id) {
          setInBookmarks(true);
        }
      });
    };
    allBookmarks();
  }, [user.bookmarks,[]]);

  const handleSubmit = async (e) => {
    // console.log(user.bookmarks);
    const tmp = user.bookmarks != null ? [...user.bookmarks] : [];
    if (e == "del") {
      const deleted = tmp.filter((item) => {
        if (item.id != pageData.id) {
          return item;
        }
      });
      dispatch({ type: "DELETE_BOOKMARK", payload: deleted });
      const { data, error } = await supabase
        .from("profiles")
        .update([{ bookmarks: deleted }])
        .eq("id", user.id);
    } else {
      tmp.push(pageData);
      // console.log(tmp);
      dispatch({ type: "ADD_BOOKMARK", payload: tmp });
      const { data, error } = await supabase
        .from("profiles")
        .update([{ bookmarks: tmp }])
        .eq("id", user.id);
    }
  };
  return (
    <div className="card-bookmark">
    { !inBookmarks ? (
      <button
        className="card-bookmark-img"
        onClick={() => {
          handleSubmit("add");
          toast("Add to bookmark", {
            icon: "✅",
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: false,
            theme: "dark",
            role: "alert",
          });
        }}
      >
        <img src={addToBookmark} alt="Add to bookmark" />
      </button>
    ) : (
      <button
        className="card-bookmark-img"
        onClick={() => {
          handleSubmit("del");
          toast("Delete to bookmark", {
            icon: '🗑️',
            autoClose: 2000,
            hideProgressBar: true,
            pauseOnHover: false,
            theme: "dark",
            role: 'alert'
          });
        }}
      >
        <img src={delToBookmark} alt="Delete to bookmark" />
      </button>
    )}
    </div>
  );
};

export default Pin;
