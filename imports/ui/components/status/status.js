//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                            TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './status.html';

const name = 'status';

class Status {
	constructor( $scope, $reactive ){
		'ngInject';

		$reactive( this ).attach( $scope );

		let count = ( data ) => {
			let count = 0;
			for ( var key in data ){
				count++;
			}
			return count;
		};

		this.helpers(
			{
				countFriends(){
					return count( this.friends );
				},
				countThumbsUp(){
					return count( this.thumbsup );
				}
			}
		);
	}
	update( what, partnerId ){
		Meteor.call( `socialAccounts.updateStatus`, what, partnerId );
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
		controller: Status,
		bindings: {
			friends: '=',
			thumbsup: '=',
			remote: '=',
			isProfile: '=',
			partnerId: '='
		}
	}
);
