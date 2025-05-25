import React, { use, useEffect, useState } from 'react';
import './App.css'
function App() {
  const [books, setBooks] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    fetch("http://localhost:5151/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // ← add this
        setBooks(data);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);
  
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5151/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.text())
      .then((message) => {
        alert(message);
        setNewUser({ firstName: "", lastName: "", email: "" });
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  return (
    <div className="App">
      <h1>📚 Library Books</h1>
      <ul>
        {books.map((book, i) => (
          <li key={i}>
            <strong>{book.title}</strong> — {book.genre}, {book.year}
          </li>
        ))}
      </ul>

      <h2>👤 Add User</h2>
      <form onSubmit={handleUserSubmit}>
        <input type="text" name="firstName" placeholder="First name" value={newUser.firstName} onChange={handleUserChange} />
        <input type="text" name="lastName" placeholder="Last name" value={newUser.lastName} onChange={handleUserChange} />
        <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleUserChange} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;

