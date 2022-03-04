const User = require('../models/user');


//reneder the user home page
module.exports.home= function(req,res){
    return res.render('user_profile',{
        title:"User Page"
    });
}
//render the user profile page
module.exports.profile= function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                });
            }
            return res.redirect('/users/sign-in')
        });

    }
    else{
        return res.redirect('/users/sign-in');
    }

}
//render the user sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//render the user sign in page
module.exports.signIn = function(req,res){
    if(req.cookies.user_id){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

//Pushing the sign up for to DB
module.exports.create = function(req,res){
    //validate confirm password
    if(req.body.password !=req.body.confirm_password){
        window.alert('Password does not match');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user in signing up');return}

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });

}


// signing in for data and generate session
module.exports.createSession = function(req,res){
    //STEPS TO AUTHENTICATE
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return}

        //handle user if found
        if(user){
            //handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        else{
            //handle user not found
            return res.redirect('back');
        }

    }); 
}

module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/');
}