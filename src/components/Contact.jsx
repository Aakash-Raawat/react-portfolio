import React from "react";
import "./Contact.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";

const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "https://react-portfolio-24zb.onrender.com";

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
      {/* Heading */}
      <h2>Contact Me</h2>

      {/* Intro */}
      <div className="contact-intro">
        <div className="contact-icon">
          <FaComments />
        </div>

        <h3>Let's Connect</h3>

        <p>
          Have a question, project idea, or just want to say hello?
          <br />
          Feel free to send me a message.
        </p>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
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
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="contact-form">
            {/* Name */}
            <div className="contact-field">
              <label htmlFor="name">
                <FaUser /> Your Name
              </label>

              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />

              <ErrorMessage
                name="name"
                component="p"
                className="error"
              />
            </div>

            {/* Email */}
            <div className="contact-field">
              <label htmlFor="email">
                <FaEnvelope /> Your Email
              </label>

              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="error"
              />
            </div>

            {/* Message */}
            <div className="contact-field">
              <label htmlFor="message">
                <FaComments /> Your Message
              </label>

              <Field
                as="textarea"
                id="message"
                name="message"
                rows="6"
                placeholder="Write your message..."
              />

              <ErrorMessage
                name="message"
                component="p"
                className="error"
              />
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}>
              <FaPaperPlane />

              {isSubmitting ? " Sending..." : " Send Message"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Contact;
