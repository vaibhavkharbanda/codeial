const Post= require('../models/post');
const User = require('../models/user');
const user=require('../models/user');
const { post } = require('../routes/posts');


module.exports.home = function(req,res){
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts:posts,
    //     });
    // });


    //populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
        });
    });
    
}

