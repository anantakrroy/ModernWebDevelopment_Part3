const express = require("express");

const app = express();

// app.use(express.json());

const phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.status(200).json(phonebook);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.set({
    "Content-Type": "text/html",
    Date: date.toString(),
  });
  // console.log(Object.values(response))
  response.send(
    `<p>Phonebook has info for <strong>${
      phonebook.length
    } people</strong></p><p>${response.get("Date")}<p/>`
  );
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT} ...`);
});
