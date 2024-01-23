const mongoose = require('mongoose');

const url = "mongodb+srv://anantacodes:xxxxxxxxxx@firstcluster.kbjdkfq.mongodb.net/phonebook?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);
mongoose.connect(url);

const password = process.argv[2];

const phoneSchema = new mongoose.Schema({
    "name" : String,
    "number" : String
})

const Phone = mongoose.model('Phone', phoneSchema);

if(process.argv.length < 3) {
    console.log('Password missing from argument !!');
    process.exit(1);
}

if(process.argv.length === 3) {
    Phone.find({}).then(result => {
        console.log('phonebook : ');
        result.forEach(phone => console.log(`${phone.name} ${phone.number}`));
        mongoose.connection.close();
    })
}

if(process.argv.length > 3) {
    const name = process.argv[3];
    const phone = process.argv[4];
    const newPhoneEntry = new Phone({
        "name" : name,
        "number" : phone
    })
    newPhoneEntry.save().then(result => {
        console.log(`Added ${name} number ${phone} to phonebook`);
        mongoose.connection.close();
    })
}



// const 