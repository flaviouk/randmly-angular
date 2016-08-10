//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { SocialAccounts } from '../collection';
import { HTTP } from 'meteor/http';

//**********************************************************************************
//                               METHODS
//**********************************************************************************
Meteor.methods(
	{
		//################### INSERT ################################
		'socialAccounts.insertUser'( user ){

			const facebookUser = {
				id: user.services.facebook.id,
				email: user.services.facebook.email,
				fullName: user.services.facebook.name,
				firstName: user.services.facebook.first_name,
				lastName: user.services.facebook.last_name,
				link: user.services.facebook.link,
				locale: user.services.facebook.locale,
				gender: user.services.facebook.gender,
				picture: `http://graph.facebook.com/${user.services.facebook.id}/picture?type=large`
			};

			HTTP.call(
				`GET`,
				`https://graph.facebook.com/${user.services.facebook.id}?access_token=${user.services.facebook.accessToken}&fields=birthday`,
				{},
				( error, response ) => {
					if ( error ) {
						SocialAccounts.insert(
							{
								userId: user._id,
								facebook: facebookUser
							},
							( err, result ) => {
								if ( err ) console.log( `ERROR CREATING USER SOCIALACCOUNT COLLECTION: ${err}` );
								return true;
							}
						);
					}
					if ( response.data.birthday ) {
						facebookUser.age = response.data.birthday;
						SocialAccounts.insert(
							{
								userId: user._id,
								facebook: facebookUser
							},
							( err, result ) => {
								if ( err ) console.log( `ERROR CREATING USER SOCIALACCOUNT COLLECTION: ${err}` );
								return true;
							}
						);
					}
					return false;
				}
			);
		},
		'socialAccounts.insertSnapchat'( username ){
			SocialAccounts.update(
				{
					userId: this.userId
				},
				{
					$set: {
						snapchat: {
							username: username
						}
					}
				}
			);
		},
		//################### REMOVE ################################
		'socialAccounts.removeUser'(){ // TODO ROLES
			SocialAccounts.remove(
				{
					userId: this.userId
				}
			);
			Meteor.users.remove(
				{
					_id: this.userId
				}
			);
		},
		'socialAccounts.removeInstagram'(){
			SocialAccounts.update(
				{
					userId: this.userId
				},
				{
					$unset: {
						instagram: 1
					}
				}
			);
		},
		'socialAccounts.removeSnapchat'(){
			SocialAccounts.update(
				{
					userId: this.userId
				},
				{
					$unset: {
						snapchat: 1
					}
				}
			);
		},
		'socialAccounts.updatePublic'( publicc ){
			SocialAccounts.update(
				{
					userId: this.userId
				},
				{
					$set: {
						public: publicc
					}
				}
			);
		},
		'socialAccounts.getMyPartner'( userId ){
			const partnerCursor = SocialAccounts.find( { userId: userId } );
			const partnerData = [];
			partnerCursor.forEach( item => partnerData.push( item ) );
			let today = new Date();
			let birthday = partnerData[0].facebook.age;
			let birthDate = new Date( birthday );
		    let age = today.getFullYear() - birthDate.getFullYear();
		    let m = today.getMonth() - birthDate.getMonth();
		    if ( m < 0 || ( m === 0 && today.getDate() < birthDate.getDate() ) ) { age--; }
		    partnerData[0].facebook.age = age;
			return partnerData[0];
		},
		'socialAccounts.updateStatus'( what, partnerId ){
			console.log( what, partnerId, this.userId );
			if ( what === 'thumbsUp' ) {
				SocialAccounts.update(
					{
						userId: partnerId
					},
					{
						$addToSet: {
							thumbsUp: this.userId
						}
					}
				);
			}
			if ( what === 'friends' ) {
				SocialAccounts.update(
					{
						userId: this.userId
					},
					{
						$addToSet: {
							friends: partnerId
						}
					}
				);
			}

		}
	}
);
