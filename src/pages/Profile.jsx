import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "../components/Avatar";

const Profile = () => {
  const user = useSelector((store) => store.reducerUser);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState();
  const [avatar_url, setAvatarUrl] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setUsername(user.username);
    setWebsite(user.website);
    setAvatarUrl(user.avatar_url);
  }, [user]);
  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_ANON_API_KEY
  );

  // console.log(user.id);
  const handleSubmit = async (e) => {
    const { data, error } = await supabase
      .from("profiles")
      .update([{ username, website, avatar_url }])
      .eq("id", user.id);
    if (error?.code == 23505) {
      setError("This username is already taken");
      alert("Username already taken");
    } else {
      // remove all the existing pictures in user bucket
      const { data, error } = await supabase.storage
        .from("avatars")
        .list(user.id);
      console.log(data);
      const tmp = data.map((item) => {
        return user.id + "/" + item.name;
      });
      // console.log(tmp);
      {
        //Delete old avatars
      const { data, error } = await supabase.storage
      .from("avatars")
      .list(user.id);
    let tmp = [];

    data?.map((item) => {
      if (!`${avatar_url}`.includes(item.name)) {
        tmp.push(user.id + "/" + item.name);
      }
    });
    {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove(tmp);
    }
    //Delete old avatars
      }
    }
  };

  return (
    <main className="container">
      <section className="profile">
        <div className="profile-container">
          <div className="profile-infos">
            <h1 className="title">Profil of {username}</h1>
            <div className="profile-infos-form">
              <form>
                <input
                  type="text"
                  placeholder={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </form>
            </div>
          </div>
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
            }}
          />
        </div>
        <button
          className="profile-infos-form-button button-red"
          onClick={() => {
            handleSubmit();
            toast("Profil updated", {
              icon: "✅",
              autoClose: 2000,
              hideProgressBar: true,
              pauseOnHover: false,
              theme: "dark",
              role: "alert",
            });
          }}
        >
          Update the profil
        </button>
      </section>
      
      <div className="profile-link">
        <Link to="/contact">If you want to give us a feedback 😉</Link>
      </div>
    </main>
  );
};

export default Profile;
