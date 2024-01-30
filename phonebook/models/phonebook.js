require('dotenv').config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(() => console.log(`Connected to DB.....`))
.catch(error => console.log(`Error connecting to DB.....${error}`));

// Phonebook schema
const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = String(returnedObj._id);
        delete returnedObj._id;
        delete returnedObj.__v;
    }
})

module.exports = mongoose.model('Phone', phoneSchema);