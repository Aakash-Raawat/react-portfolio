import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import "./Contact.css";
const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:5000";

function Contact() {

    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {

        fetch(`${BASE_URL}/api/contact`)
            .then((res) => res.json())
            .then((data) => setContacts(data))
            .catch((err) => console.log(err));

    };

    useEffect(() => {

        fetchContacts();

    }, []);

    const deleteContact = async (id) => {

        if (!window.confirm("Delete this message?")) return;

        try {

            const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            alert(data.message);

            fetchContacts();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <AdminLayout>

            <div className="contact-admin">

                <h1>Contact Messages</h1>

                <div className="table-container">

                    <table className="contact-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                contacts.length === 0 ?

                                    (
                                        <tr>

                                            <td colSpan="4">
                                                No Messages Found
                                            </td>

                                        </tr>

                                    )

                                    :

                                    contacts.map((contact) => (

                                        <tr key={contact._id}>

                                            <td>{contact.name}</td>

                                            <td>{contact.email}</td>

                                            <td>{contact.message}</td>

                                            <td>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteContact(contact._id)}
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Contact;