import * as emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Contact = () => {
  const user = useSelector((store) => store.reducerUser);
  const [username, setUsername] = useState(user.username);
  
  const formik = useFormik({
    initialValues: {
      username: username,
      message: "",
    },
    enableReinitialize:true,
    validationSchema: Yup.object({
      message: Yup.string().required("Can't be empty."),
    }),
    onSubmit: (values) => {
      console.log("Submit : ", values);

      emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          values,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("email sent");
          },
          (error) => {
            console.log(error.text);
          }
        );
      formik.resetForm({ values: "" });
    },
  });

  return (
    <main className="container">
      <section className="contact">
        <h1 className="contact-title title">Contact Us !</h1>
        <form className="contact-form" onSubmit={formik.handleSubmit}>
          <label htmlFor="messasge">Your Message</label>
          <textarea
            type="text"
            id="messasge"
            placeholder="Give us your best feedback"
            autoComplete="off"
            {...formik.getFieldProps("message")}
          />
          {formik.touched.message && formik.errors.message ? (
            <p className="contact-form-error">{formik.errors.message}</p>
          ) : null}

          <button className="contact-submit" disabled={!(formik.isValid && formik.dirty)}
         type="submit" onClick={() => {
            toast("Email sent", {
              icon: "🛫",
              autoClose: 2000,
              hideProgressBar: true,
              pauseOnHover: false,
              theme: "dark",
              role: "alert",
            });
          }}>Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
