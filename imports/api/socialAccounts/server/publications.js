//**********************************************************************************
//                               PUBLICATIONS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { SocialAccounts } from '../collection';
import { WebRTC } from '../../webRTC/collection';

Meteor.publish(
	'userData',
	function() {
		if ( !this.userId ) {
			return this.ready();
		} else {
			return SocialAccounts.find( { userId: this.userId } );
		}
	}
);
