const mongoose = require('mongoose');

async function connect(){
    
    // const db = await mongoose.connect("mongodb://localhost:27017/tasks");
    const db = await mongoose.connect("mongodb+srv://tejalshigwan:RRaHPN5pY4715vUn@tasksmern.jzydor9.mongodb.net/?retryWrites=true&w=majority&appName=TasksMERN");
    console.log("Database Connected");
    return db;
}

// mongodb+srv://tejalshigwan:<password>@tasksmern.jzydor9.mongodb.net/  - connection str
// RRaHPN5pY4715vUn  - password

exports.connect = connect ;