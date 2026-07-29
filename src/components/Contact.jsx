import React from "react";
import "./Contact.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Contact() {

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}

        validationSchema={validationSchema}

        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch(`${BASE_URL}/api/contact`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            alert(data.message);

            resetForm();
          } catch (error) {
            console.log(error);
            alert("Something went wrong!");
          }
        }}

      // onSubmit={(values, { resetForm }) => {
      //   alert("Message Sent Successfully!");

      //   console.log(values);

      //   resetForm();
      // }}
      >
        <Form className="contact-form">

          <Field
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <ErrorMessage
            name="name"
            component="p"
            className="error"
          />

          <Field
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <ErrorMessage
            name="email"
            component="p"
            className="error"
          />

          <Field
            as="textarea"
            name="message"
            rows="5"
            placeholder="Your Message"
          />
          <ErrorMessage
            name="message"
            component="p"
            className="error"
          />

          <button type="submit">
            Send Message
          </button>

        </Form>
      </Formik>

    </section>
  );
}

export default Contact;

