const User = require('../models/user');


//reneder the user home page
module.exports.home = function (req, res) {
    return res.render('user_profile', {
        title: "User Page"
    });
}
//render the user profile page
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Page",
            profile_user: user
        });
    })


}

//render the user sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the user sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, function (err, user) {
            return res.redirect('/');
        });

    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

//Pushing the sign up for to DB
module.exports.create = function (req, res) {
    //validate confirm password
    if (req.body.password != req.body.confirm_password) {
        window.alert('Password does not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user in signing up'); return }

                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    });

}


// signing in for data and generate session
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully');
    return res.redirect('/');


}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}

module.exports.update= function(req,res){
    if(req.user.id== req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

