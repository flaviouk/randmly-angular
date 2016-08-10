//**********************************************************************************
//                                MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                              COMPONENTS
//**********************************************************************************
import { name as Navigation } from '../navigation/navigation';
//**********************************************************************************
//                           TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './preLive.html';

const name = 'preLive';

class PreLive {
	constructor( $reactive, $scope ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		this.hasCamera = false;
	}

	acceptTosAndStartSession() {
		Meteor.call( `webRTC.acceptTos` );
		this.nextCall();
		$( '#camera-tos' ).closeModal();
	}

	startSession(){
		if ( this.tosAccepted ) {
			this.nextCall();
		} else {
			$( '#camera-tos' ).openModal();
		}
	}

	startCamera(){
		this.webrtc.startLocalVideo();
		this.hasCamera = true;
	}

	stopCamera(){
		this.webrtc.stopLocalVideo();
		this.hasCamera = false;
	}

}

//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
		Navigation
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: PreLive,
		bindings: {
			myName: '=',
			myThumbsUp: '=',
			tosAccepted: '=',
			webrtc: '=',
			nextCall: '='
		}
	}
);
