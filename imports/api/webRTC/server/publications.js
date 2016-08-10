//**********************************************************************************
//                               PUBLICATIONS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { WebRTC } from '../collection';

Meteor.publish(
	'myWebRTC',
	function() {
		if ( !this.userId ) {
			return this.ready();
		} else {
			return WebRTC.find( { userId: this.userId } );
		}
	}
);
