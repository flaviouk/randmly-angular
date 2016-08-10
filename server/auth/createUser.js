//**********************************************************************************
//                          CREATE USER
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(
	( options, user ) => {

		if ( options.profile ) {
			user.profile = options.profile;
		}

		if ( user.services.facebook ) {
			Meteor.call( 'socialAccounts.insertUser', user );
			Meteor.call( 'webRTC.insertUser', user._id );
		}

		console.log( user );

		return user;

	}
);
