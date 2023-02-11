import React, { useState, useEffect } from "react";
import { Main } from "./components/Main";

const getDatafromLS = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const App = () => {
  const [books, setbooks] = useState(getDatafromLS());

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    let book = {
      title,
      author,
      isbn,
    };
    setbooks([...books, book]);
    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  const deleteBook = (isbn) => {
    const filteredBooks = books.filter((element, index) => {
      return element.isbn !== isbn;
    });
    setbooks(filteredBooks);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <button className="link">
        <a
          target="_blank"
          className="link1"
          href="https://github.com/ParamPragyan/fitness_club_bullseye"
        >
          ➱Source-Code: GitHub
        </a>
      </button>
      <h1>BookList Maintenance Form</h1>
      <p>Add and view your books using local storage</p>
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddBookSubmit}
          >
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <br></br>
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            ></input>
            <br></br>
            <label>ISBN#</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
            ></input>
            <br></br>
            <button type="submit" className="btn  btn-md">
              ADD
            </button>
          </form>
        </div>

        <div className="main-container">
          {books.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ISBN#</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Main books={books} deleteBook={deleteBook} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setbooks([])}
              >
                Remove All
              </button>
            </>
          )}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
