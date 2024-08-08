# Book Notes Organizer

I read a lot of books, but after finishing them, I often don't remember the most salient parts. So, I started taking notes. This capstone project is built on this idea. Inspired by my friend Derek Sivers' fantastic website, which features all the non-fiction books he has read along with his notes, ratings, and reading dates, I aim to create a similar web application. The books will be sortable by rating, recency, and title, making it a useful tool for organizing and recalling key information from my reading.

## Features

- **Book Management**: Add a book and edit a book notes.
- **Notes**: Keep detailed notes for each book.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - PostgreSQL

## Setup and Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/bahae3/Book-Notes.git
   cd Book-Notes
   ```
   
2. **Install dependencies:**:
  
  ```sh
  npm install
  ```
3. **Set up the database**:

Create a PostgreSQL database:
  ```sh
  CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    year SMALLINT,
    isbn TEXT NOT NULL,
    summary VARCHAR(300)NOT NULL,
    notes TEXT
  );
  ```

4. **Run the application**:
  ```sh
  nodemon index.js
  ```
