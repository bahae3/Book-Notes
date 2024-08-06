import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

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
        // console.log(books);
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
    res.render("index.ejs", { books: books });
});

app.get("/add_book", (req, res) => {
    res.render("add_book.ejs");
});

app.post("/add_book_data", (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;
    const isbn = req.body.isbn;
    const summary = req.body.summary;

    console.log("ADD BOOK");
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}, http://localhost:${port}/`);
});