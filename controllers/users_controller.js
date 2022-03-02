
module.exports.home= function(req,res){
    return res.render('user_profile',{
        title:"User Page"
    });
}

module.exports.profile= function(req,res){
    return res.render('user_profile',{
        title:"User Page"
    });
}