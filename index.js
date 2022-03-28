const cookieParser = require('cookie-parser');
const express= require('express');
const app= express();
const port =4000;
const expressLayouts= require('express-ejs-layouts');
const db = require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal= require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
//use express Layouts
app.use(expressLayouts);


//use static files
app.use(express.static('./assets'));


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

app.set('case sensitive routing',false);

//setup view engine
app.set('view engine','ejs');
app.set('views', './views');


//creating passport session with encr. key
app.use(session({
    name:'codeial',
    //ToDo change the secret before deployment in production mode
    secret:'blashsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express routers
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in opening the port:${err}`);
    }
    console.log(`Server is running on port:${port}`);
})