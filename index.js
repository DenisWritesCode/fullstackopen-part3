const express = require("express");
const app = express();

const phoneBookUsers = [
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

app.use(express.json());

// Fetch all users
app.get("/api/persons", (request, response) => {
    response.json(phoneBookUsers);
});

// Fetch number of users and time of request
app.get('/info', (request, response) => {
    const timeOfReceivingRequest = new Date();
    const responseString = `<p>Phonebook has info for ${phoneBookUsers.length} people.<p>${timeOfReceivingRequest}</p>`
    response.send(responseString);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
