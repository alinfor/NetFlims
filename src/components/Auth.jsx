import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";


export default function Auth({ setSessionStatus }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_ANON_API_KEY
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event) => {
      if (event == "SIGNED_IN") {
        setSessionStatus("SIGNED_IN");
      } else {
        setSessionStatus("SIGNED_OUT");
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value?.data?.user == null) {
          setSessionStatus("SIGNED_OUT");
        } else {
          setSessionStatus("SIGNED_IN");
        }
      });
    }
    getUserData();
  }, []);

  return (
    <div className="container">
      <div className="form-container" aria-live="polite">

          <h1 className="form-title">Login x SignUp</h1>
          <p className="form-description">
            Sign in-up via magic link with your email below
          </p>
          {loading ? (
            "Sending magic link..."
          ) : (
            <form onSubmit={handleLogin} className="form-form">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <button className="button block test" aria-live="polite">
                  Send magic link
                </button>
              </div>
            </form>
          )}

      </div>
    </div>
  );
}
