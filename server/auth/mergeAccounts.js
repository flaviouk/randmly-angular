//**********************************************************************************
//           MERGE FACEBOOK AND INSTAGRAM ACCOUNTS IN A SINGLE DOCUMENT
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { SocialAccounts } from '../../imports/api/socialAccounts/collection';

AccountsMerge.onMerge = function ( winner, loser ) {
	console.log( 'called server' );

	SocialAccounts.update(
		{
			userId: winner._id
		},
		{
			$set: {
				instagram: {
					username: winner.services.instagram.username,
					fullName: winner.services.instagram.full_name,
					id: winner.services.instagram.id
				}
			}
		},
		{
			multi: true,
			upsert: false
		},
		( error, result ) => {
			if ( error ) console.log( error );
		}
	);

	Meteor.users.remove( loser._id );

};
