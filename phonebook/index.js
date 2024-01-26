const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Phonebook = require("./models/phonebook");

const app = express();

app.use(cors());
app.use(express.json());

// serve static files
app.use(express.static("dist"));

// Log all requests to console in 'tiny' format
app.use(morgan("tiny"));

// Log POST requests to console in custom format
morgan.token("request-body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body"
  )
);

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((entries) => {
    response.json(entries);
  });
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  response.set({
    "Content-Type": "text/html",
    Date: date.toString(),
  });
  Phonebook.find({}).then((result) => {
    console.log(result);
    response.send(
      `<p>Phonebook has info for <strong>${
        result.length
      } people</strong></p><p>${response.get("Date")}<p/>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.filter((person) => person.id === id);
  if (person.length === 0) {
    response.status(404).json({
      message: `No person with id : ${id} found !`,
    });
  } else {
    response.status(200).json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const isAvl = phonebook.find((person) => person.id === id);
  phonebook = phonebook.filter((person) => person.id !== id);
  if (!isAvl) {
    response.status(404).json({ message: `No person with id: ${id} found !` });
  } else {
    response.status(200).json(phonebook);
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const newPerson = new Phonebook({
    name: body.name,
    number: body.number,
  });
  newPerson.save().then(savedPerson => response.json(savedPerson));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT} ...`);
});
