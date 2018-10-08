var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	birthday:{
		type: String
	},
	phone:{
		type: String
	},
	gender: {
		type: String
	},
	address: {
		type: String
	},
	company: {
		type: String
	},
	addrCom: {
		type: String
	},
	notes: {
		type: String
	},
	avt : {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

//getupdate
module.exports.updateuser = function(newUser, callback){
	//var query = {username: username};
	//User.findOne(query, callback);
//var thayten = newUser.username;
//Lets try to Find a user
//var User1 = mongoose.model('User1', {username: String, name: String, phone: String, address: String});
User.findOne({username: newUser.username}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    //For demo purposes lets update the user on condition.
    
      //Some demo manipulation
	  userObj.name = newUser.name;
		userObj.email = newUser.email;
		userObj.birthday = newUser.birthday;
		userObj.phone= newUser.phone;
		userObj.notes = newUser.notes;
		userObj.company = newUser.company;
		userObj.addrCom = newUser.addrCom;
		userObj.address = newUser.address;
		userObj.gender = newUser.gender;

      //Lets save it
      userObj.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated', userObj);
        }
      });
    
  } else {
    console.log('User not found!');
  }
});
}

module.exports.updateavt = function(newUser, callback){
	//var query = {username: username};
	//User.findOne(query, callback);
//var thayten = newUser.username;
//Lets try to Find a user
//var User1 = mongoose.model('User1', {username: String, name: String, phone: String, address: String});
User.findOne({username: newUser.username}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    //For demo purposes lets update the user on condition.
    
      //Some demo manipulation
	  userObj.avt = newUser.avt;

      //Lets save it
      userObj.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated', userObj);
        }
      });
    
  } else {
    console.log('User not found!');
  }
});
}



module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}