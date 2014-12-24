(function() {
	'use strict';

	var User  				= require( '../model/User' ),
			LocalStrategy = require('passport-local').Strategy,
			mongo					= require('./mongodb');

	module.exports = function( passport ) {
		passport.serializeUser(function( user, done ) {
			console.log( user );
			done( null, user.id );
		});

		passport.use( 'local-login', new LocalStrategy({
			usernameField: 'email'
		}, function( email, password, done ) {
			mongo.db( 'erp_moe3' )
			.then(function( connection ) {
				User.findOne({
					email: email
				}, function( err, user ) {
					if( err ) return done(err);
					if( !user ) return done( null, false, {
						message: 'Wrong email/password'
					});

					user.comparePasswords( password, function( err, isMatch ) {
						if( err ) return done(err);
						if( !isMatch ) return done( null, false, {
							message: 'Wrong email/password'
						});
						return done( null, user);
					});
				});
			});
		}));

		passport.use( 'local-register', new LocalStrategy({
			usernameField: 'email'
		}, function( email, password, done ) {
			mongo.db( 'erp_moe3' )
			.then(function( connection ) {
				var newUser = User({
					email: email,
					password: password
				});
				return newUser;
			})
			.then( function( user ) {
				user.save(function(err) {
					done( null, user );
				});
			});
		}));
	};
}());
