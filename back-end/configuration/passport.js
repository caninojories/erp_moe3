(function() {
	'use strict';

	var node_module = app_require( 'services/module.config' );

	module.exports = function( passport ) {
		passport.serializeUser(function( user, done ) {
			console.log( user );
			done( null, user.id );
		});

		passport.use( 'local-login', new node_module.LocalStrategy({
			usernameField: 'email'
		}, function( email, password, done ) {
			node_module.mongoDBDB.db( 'erp_moe3' )
			.then(function( connection ) {
				node_module.User.findOne({
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

		passport.use( 'local-register', new node_module.LocalStrategy({
			usernameField: 'email'
		}, function( email, password, done ) {
			node_module.mongoDB.db( 'erp_moe3' )
			.then(function( connection ) {
				var newUser = node_module.User({
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
