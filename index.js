import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    password: "bahae03",
    host: "localhost",
    database: "books",
    port: 5432,
});

db.connect();

// variables:
let books = [];

app.get("/", async (req, res) => {
    try {
        books = (await db.query("SELECT * FROM book")).rows;
        books.forEach(book => {
            book["img_url"] = "https://covers.openlibrary.org/b/isbn/" + book.isbn + "-L.jpg";
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    console.log(books);
    res.render("index.ejs", { books: books });
});

app.get("/add_book", (req, res) => {
    res.render("add_book.ejs");
});

app.post("/add_book_data", async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;
    const isbn = req.body.isbn;
    const summary = req.body.summary;

    try {
        await db.query("INSERT INTO book (title, author, year, isbn, summary) VALUES ($1, $2, $3, $4, $5)",
            [title, author, year, isbn, summary]
        );
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.redirect("/");
});


app.get("/book_notes", async (req, res) => {
    const id = req.query.id;
    let book = {};
    try {
        book = (await db.query("SELECT id, title, author, notes FROM book WHERE id=$1", [id])).rows[0];
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.render("book_notes.ejs", { book: book });
});

app.get("/add_notes", async (req, res) => {
    const id = req.query.id;
    let notes = {};
    try {
        notes = (await db.query("SELECT notes FROM book WHERE id=$1", [id])).rows[0];
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.render("add_notes.ejs", { id: id, notes: notes });
});

app.post("/add_notes_data", async (req, res) => {
    const notes = req.body.notes;
    const book_id = req.body.id;
    try {
        await db.query("UPDATE book SET notes=$1 WHERE id=$2",
            [notes, book_id]
        );
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.redirect("/book_notes?id=" + book_id);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}, http://localhost:${port}/`);
});