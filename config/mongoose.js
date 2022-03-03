const mongoose = require('mongoose');


//connect to the MongoDb
mongoose.connect('mongodb://localhost/codeial_development');

//generating connection
const db= mongoose.connection;

db.on('error',console.error.bind(console,"error in connecting to MngoDb"));
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports=db;