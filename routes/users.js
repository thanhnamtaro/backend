var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//up avt
var fs = require('fs');
var formidable = require('formidable');

var User = require('../models/user');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});
// Register User
// profile
router.get('/usersetting', function (req, res) {
	res.render('usersetting');
});

//updateprofile
router.get('/update', function (req, res) {
	res.render('update');
});

router.get('/getupdate', function (req, res) {
	res.render('usersetting');
});

router.get('/upavt', function (req, res) {
	res.render('usersetting');
});


router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password,
						avt: '/IMG_0227.jpg'

					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'Bạn đã đăng ký thành công. Bây giờ bạn có thể đăng nhập');
					res.redirect('/users/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Tên tài khoản không đúng' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Mật khẩu không hợp lệ' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

//get update
router.post('/getupdate', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var notes = req.body.notes;
	var phone = req.body.phone;
	var gender = req.body.gender;
	var address = req.body.address;
	var addrCom = req.body.addrCom;
	var birthday = req.body.birthday;
	var company = req.body.company;
	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();

	var errors = req.validationErrors();

	if (errors) {
		res.render('update', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
			var newUser = new User({
				username: username,
				name: name,
				email: email,
				notes:notes,
				phone: phone,
				birthday: birthday,
				company: company,
				addrCom: addrCom,
				address:address,
				gender: gender
			});
			User.updateuser(newUser,function (err, user) {
				if (err) throw err;
				console.log(user);
			});
	 req.flash('success_msg', 'Bạn đã cập nhật thành công');
			res.redirect('/users/usersetting');
			});
		});
	}
});

//up avt
router.post('/upavt', function (req, res) {
	var username = req.body.username;
	console.log(username);
	var errors = req.validationErrors();

	if (errors) {
		res.render('usersetting', {
			errors: errors
		});
	}
	else {

		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {

	var form =  new formidable.IncomingForm();
	//Thiết lập thư mục chứa file trên server
	form.uploadDir = "avataruser/";
	//xử lý upload
	form.parse(req,function (err, fields, file) {
		//path tmp trên server
		var username1 = req.body.username;
		console.log(username1);
		var path = file.files.path;
		//thiết lập path mới cho file
		var newpath = form.uploadDir + file.files.name;
		var luupath = "/" + file.files.name;
		fs.rename(path, newpath, function (err) {
			if (err) throw err;
			//res.end('Upload Thanh cong!');
		});
		var newUser = new User({
			username: username,
			avt: luupath
		});
		User.updateavt(newUser,function (err, user) {
			if (err) throw err;
			console.log(user);
		});
 	req.flash('success_msg', 'Bạn đã cập nhật avatar');
		res.redirect('/users/usersetting');
	});
	

	
});
	}
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});
// get profile
router.post('/usersetting',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/usersetting');
	});

router.post('/update',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/update');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'Bạn đã đăng xuất');

	res.redirect('/users/login');
});

module.exports = router;