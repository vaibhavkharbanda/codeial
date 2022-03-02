const express= require('express');
const app= express();
const port =4000;



app.use('/',require('./routes'));
app.set('case sensitive routing','true');
app.set('view engine','ejs');
app.set('views', './views');




app.listen(port,function(err){
    if(err){
        console.log(`Error in opening the port:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})