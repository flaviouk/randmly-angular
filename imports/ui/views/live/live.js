//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import SimpleWebRTC from 'simplewebrtc/latest-v2';
//**********************************************************************************
//                                 DATA
//**********************************************************************************
import { SocialAccounts } from '../../../api/socialAccounts';
import { WebRTC } from '../../../api/webRTC';
//**********************************************************************************
//                               COMPONENTS
//**********************************************************************************
import { name as PreLive } from '../../components/preLive/preLive';
import { name as Camera } from '../../components/camera/camera';
import { name as RemoteCamera } from '../../components/remoteCamera/remoteCamera';
import { name as LiveControls } from '../../components/liveControls/liveControls';
import { name as Finding } from '../../components/finding/finding';
import { name as LiveMsg } from '../../components/liveMsg/liveMsg';
import { name as Status } from '../../components/status/status';
//**********************************************************************************
//                           TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './live.html';

const name = 'live';

class Live {
	constructor( $scope, $reactive, $timeout, $q ) {
		'ngInject';

		$reactive( this )
		.attach( $scope );

		this.helpers(
			{
				userData(){
					return SocialAccounts.findOne();
				},
				myWebRTC(){
					return WebRTC.findOne();
				},
				myPartner(){
					return {};
				}
			}
		);

		$( '.modal-trigger' )
		.leanModal();

		this.webrtc = new SimpleWebRTC(
			{
				localVideoEl: 'myCamera',
				remoteVideosEl: 'remoteCamera',
//				url: 'http://localhost:8888',
				media: {
					video: true,
					audio: true
				},
				nick: Meteor.userId()
			}
		);

		this.webrtc.on(
			`connectionReady`, ( sessionId ) => {
				console.log( `SESSION ID: ${sessionId}` );
				this.webrtc.on(
					`createdPeer`, peer => {
						$timeout( () => {
							Meteor.call(
								`socialAccounts.getMyPartner`,
								peer.nick,
								( err, result ) => {
									this.myPartner = result;
								}
							);
						}, 700 );
					}
				);

			}
		);
		this.webrtc.on(
			`videoRemoved`,
			( videoEl, peer ) => {
				console.log( 'VIDEO REMOVED' );
				this.webrtc.leaveRoom();
				this.nextCall();
			}
		);

		// local p2p/ice failure
		this.webrtc.on(
			'iceFailed', function( peer ) {
				console.log( `Local failed.`, peer );
			}
		);

		// remote p2p/ice failure
		this.webrtc.on(
			'connectivityError', function( peer ) {
				console.log( `Remote failed.`, peer );
			}
		);

	}

	nextCall() {
		Meteor.call( `webRTC.sessionTF`, true );
		Meteor.call(
			`webRTC.randomPartner`, ( err, response ) => {
				if ( err ) {
					Materialize.toast( 'Something went wrong, try again later!', 2000 );
				}
				if ( response ) {
					console.log( `Joining Room ${response}` );
					this.webrtc.joinRoom( `${response}` );
				}
			}
		);
	}

}
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
		PreLive,
		Camera,
		RemoteCamera,
		LiveControls,
		Finding,
		LiveMsg,
		Status
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: Live
	}
);
