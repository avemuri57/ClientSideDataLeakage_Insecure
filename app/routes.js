 // app/routes.js
var bcrypt   = require('bcrypt-nodejs');
var User       		= require('../config/models/UserModel.js');

	module.exports = function(app,passport) {
// API routes =========================================================
	app.post('/api/register', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	app.post('/api/login', passport.authenticate('local-login'),function(req,res){
		if(req.user){
	
			console.log("logging in "+req.user);
			res.cookie('id',req.user._id)
			.status(200).send(req.user._id);
		
		}else{
			throw new Error("User Not Authenticated"); 
		}


	} );

	app.post('/api/getUser',function(req,res){
		console.log(req.body.id);
		 User.findById(req.body.id,function(err,found){
		 	if(err)
		 		res.send("Error Could not find User");

		 	res.json({name:found.local.email,role:found.local.role});
		 });


		 }); 

	app.post('/api/getAllUsers',function(req,res){
console.log("Starting up....");
userMap=[];
			User.find({}, function(err, users) {
		   			 
		   		users.forEach(function(user)
		   		{
		   			console.log(user);
		   			userMap.push(user.local);

		   		});
		   res.send(userMap);
		    
	});
	
});
	// frontend routes =========================================================
	// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/views/index.html'); // load our public/index.html file
		});

	
}
