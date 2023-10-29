const mongoose = require('mongoose')

const password = process.argv[2];
let name;
let number;

const url = `mongodb+srv://fullstackopen:${password}@cluster0.uchyez0.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  name = process.argv[3];
  number = process.argv[4];

  const person = new Person({
    name,
    number
  });

  person.save().then(result => {
    console.log('new person saved');
    mongoose.connection.close();
    process.exit(1);
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  })
}