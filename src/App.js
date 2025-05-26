import React, { use, useEffect, useState } from 'react';
import './App.css'
function App() {
  const [books, setBooks] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5151/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5151/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("📚 Books fetched:", data);  // ← check this
        setBooks(data);
      })
      .catch(err => console.error("Error fetching books:", err));
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

  const [newBook, setNewBook] = useState({
    title: "",
    genre: "",
    year: ""
  });
  const handleBookChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5151/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newBook,
        year: parseInt(newBook.year) // Make sure year is a number
      })
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        setNewBook({ title: "", genre: "", year: "" });
      })
      .catch((err) => console.error("Error adding book:", err));
  };

  const [newLoan, setNewLoan] = useState({
    userId: "",
    bookId: "",
    borrowDate: ""
  });
  const handleLoanChange = (e) => {
    setNewLoan({ ...newLoan, [e.target.name]: e.target.value });
  };
  const handleLoanSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5151/loans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newLoan,
        userId: parseInt(newLoan.userId),
        bookId: parseInt(newLoan.bookId),
        borrowDate: newLoan.borrowDate // format: YYYY-MM-DD
      })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        setNewLoan({ userId: "", bookId: "", borrowDate: "" });
      })
      .catch(err => console.error("Error borrowing book:", err));
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
      <h2>➕ Add a New Book</h2>
      <form onSubmit={handleBookSubmit}>
        <input
          name="title"
          placeholder="Book title"
          value={newBook.title}
          onChange={handleBookChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={newBook.genre}
          onChange={handleBookChange}
        />
        <input
          name="year"
          placeholder="Year"
          value={newBook.year}
          onChange={handleBookChange}
        />
        <button type="submit">Add Book</button>
      </form>

      <h2>📖 Borrow a Book</h2>
      <div className='form-section'>
      <form onSubmit={handleLoanSubmit}>
        <select name="userId" value={newLoan.userId} onChange={handleLoanChange}>
          <option value="" disabled selected hidden>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <select name="bookId" value={newLoan.bookId} onChange={handleLoanChange}>
          <option value=""  disabled selected hidden>Select Book</option>
          {books.map(book => (
            <option key={book.bookId} value={book.bookId}>
              {book.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="borrowDate"
          value={newLoan.borrowDate}
          onChange={handleLoanChange}
        />
        <button type="submit">Borrow</button>
      </form>
    </div>
    </div>
  );

}


export default App;

