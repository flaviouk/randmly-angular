//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './liveMsg.html';

const name = 'liveMsg';

class LiveMsg {
	constructor( $scope, $reactive ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		Meteor._debug = ( function( super_meteor_debug ) {
			return function( error, info ) {
				if ( !( info && _.has( info, 'msg' ) ) ) {
					super_meteor_debug( error, info );
				}
			};
		} )( Meteor._debug );

		this.msgs = [];

		this.helpers(
			{
				messages(){
					return this.msgs;
				}
			}
		);

		Streamy.on(
			Meteor.userId(), ( d, s ) => {
				this.msgs.push( d.data );
				console.log( d.data );
				console.log( this.msgs );
				return this.msgs;
			}
		);

		$( document ).keypress(
			e => {
				if ( e.which === 13 ) {
					let inputMessage = $( '#inputMessage' );
					console.log( this.myPartner.userId );
					if ( inputMessage.val() !== '' ) {
						Streamy.broadcast(
							this.myPartner.userId,
							{
								data: {
									message: inputMessage.val(),
									date: Date.now(),
									me: false
								}
							}
						);
						this.msgs.push(
							{
								message: inputMessage.val(),
								date: Date.now(),
								me: true
							}
						);
						inputMessage.val( '' );
						return this.msgs;
					}
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
		angularMeteor
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: LiveMsg,
		bindings: {
			webrtc: '=',
			myPartner: '='
		}
	}
);
