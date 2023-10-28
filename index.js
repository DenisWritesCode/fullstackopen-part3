const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let phoneBookUsers = [
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

app.use(cors());
app.use(express.static('dist')); // Ask express to use the 'dist' folder
app.use(express.json());
morgan.token("user", function (request, response) {
  // console.log(response);
  // return JSON.stringify(`${request.method} ${request.route.path} ${response.statusCode}`);
});

app.use(morgan(":user"));

// Fetch all users
app.get("/api/persons", (request, response) => {
  response.json(phoneBookUsers);
});

// Fetch number of users and time of request
app.get("/info", (request, response) => {
  const timeOfReceivingRequest = new Date();
  const responseString = `<p>Phonebook has info for ${phoneBookUsers.length} people.<p>${timeOfReceivingRequest}</p>`;
  response.send(responseString);
});

// Fetch single user
app.get("/api/persons/:id", (request, response) => {
  const userID = Number(request.params.id);
  const user = phoneBookUsers.find((person) => person.id === userID);

  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

// Delete single user
app.delete("/api/persons/:id", (request, response) => {
  const userID = Number(request.params.id);
  phoneBookUsers = phoneBookUsers.filter((person) => person.id !== userID);

  response.status(204).end();
});

// Add new user
const generateRandomUserID = () => Math.floor(Math.random() * 1000);
app.post("/api/persons", (request, response) => {
  const newUser = request.body;

  if (!newUser.name || !newUser.number) {
    return response.status(400).json({
      error: "kindly provide a user name and number",
    });
  }

  const user = phoneBookUsers.find(person => person.name === newUser.name);
  if(user) {
    return response.status(400).json({
        error: "user name already exists",
      });
  }

  const person = {
    id: generateRandomUserID(),
    name: newUser.name,
    number: newUser.number
  }

  phoneBookUsers = phoneBookUsers.concat(person);
  
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
