//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './liveControls.html';

const name = 'liveControls';

class LiveControls {
	constructor( $scope, $reactive, $state ){
		'ngInject';

		$reactive( this ).attach( $scope );

		$( '.tooltipped' ).tooltip( { delay: 50 } );

		this.muted = false;

		// $( document ).keyup( ( e ) => {
		// 	if ( e.keyCode == 32 ) {
		// 		this.nextPartner();
		// 	}
		// } );

		this.stopCall = () => {
			this.webrtc.stopLocalVideo();
			this.webrtc.leaveRoom();
			this.webrtc.disconnect();
			Meteor.call( `webRTC.searchingTF`, false );
			Meteor.call( `webRTC.sessionTF`, false );
			$state.go( 'profile' );
		};
	}
	toggleMute(){
		if ( this.muted ) {
			this.webrtc.mute();
		} else {
			this.webrtc.unmute();
		}
		this.muted = !this.muted;
		console.log( this.muted );
	}
	nextPartner(){
		this.webrtc.leaveRoom();
		this.nextCall();
	}
}
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: LiveControls,
		bindings: {
			webrtc: '=',
			nextCall: '='
		}
	}
);
