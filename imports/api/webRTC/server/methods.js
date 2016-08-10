//**********************************************************************************
//                               WEBRTC METHODS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { SocialAccounts } from '../../socialAccounts/collection';
import { WebRTC } from '../collection';
import { Random } from 'meteor/random';

Meteor.methods(
	{
		// Searches for a random user with property liveChat.searching true and returns it
		'webRTC.randomPartner'(){
			Meteor.call( `webRTC.searchingTF`, true );
			const query = {
				'status.searching': true,
				'status.tosAccepted': true,
				'status.inSession': true,
				userId: {
					$ne: this.userId
				}
			};
			const count = WebRTC.find( query ).count();
			console.log( count );
			if ( count < 1 ) {
				const random = Random.id();
				WebRTC.update( { userId: this.userId }, { $set: { tempRoom: random } } );
				return random;
			}

			const random = Math.floor( Math.random() * count );
			const randomUser = WebRTC.find( query, { limit: 1, skip: random } );
			const userData = [];
			randomUser.forEach( item => userData.push( item ) );
			// Searching false
			Meteor.call( `webRTC.searchingTF`, false );
			return userData[0].tempRoom;
		},
		'webRTC.nextPartner'( userId, randomUser ){
			// Find which one started looking the ealiest
			const userData = WebRTC.findOne( { userId: userId } );
			if ( userData.status.started > randomUser.status.started ) {
				// User Calls
				return {
					caller: userId,
					receiver: randomUser.userId
				};
			} else {
				// User Receives
				return {
					caller: userId,
					receiver: userData.userId
				};
			}
		},
		'webRTC.searchingTF'( boolean ){
			WebRTC.update(
				{
					userId: this.userId
				},
				{
					$set: {
						'status.searching': boolean,
						'status.started': Date.now()
					}
				}
			);
		},
		'webRTC.acceptTos'(){
			WebRTC.update(
				{
					userId: this.userId
				},
				{
					$set: {
						'status.tosAccepted': true
					}
				}
			);
		},
		'webRTC.sessionTF'( boolean ){
			WebRTC.update(
				{
					userId: this.userId
				},
				{
					$set: {
						'status.inSession': boolean
					}
				}
			);
		},
		'webRTC.insertUser'( userId ){
			WebRTC.insert(
				{
					userId: userId
				},
				( err, result ) => {
					if ( err ) console.log( `ERROR CREATING USER WEBRTC COLLECTION: ${err}` );
				}
			);
		},
		'webRTC.removeUser'(){
			WebRTC.remove(
				{
					userId: this.userId
				}
			);
		},
		'webRTC.close'( userId ){
			WebRTC.update(
				{
					userId
				},
				{
					$set: {
						'status.inSession': false,
						'status.searching': false
					},
					$unset: {
						tempRoom: 1
					}
				}
			);
		}
	}
);
