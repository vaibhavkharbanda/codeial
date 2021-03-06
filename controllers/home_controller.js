const Post= require('../models/post');
const User = require('../models/user');
// const { post } = require('../routes/posts');


module.exports.home = async function(req,res){
  
    try{
        // //populate the user of each post
    let posts= await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    let users= await User.find({});


    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users: users
    });  
    }
    catch(err){
        console.log("Error",err);
        return;
    }
     
         // let post=Post.find({}).populate('user').populate({
    //     path:'comments',
    //     popluate:{
    //         path:'user'
    //     }}).exec(User.find({}));
}



   
    
            
    
    

