//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               DATA
//**********************************************************************************
import { SocialAccounts } from '../../../api/socialAccounts';
import { Subs } from '../../../api/Subs';
//**********************************************************************************
//                               COMPONENTS
//**********************************************************************************
import { name as Navigation } from '../../components/navigation/navigation';
import { name as Status } from '../../components/status/status';
import { name as SocialMediaSettings } from '../../components/socialMediaSettings/socialMediaSettings';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './settings.html';

const name = 'settings';

class Settings {
	constructor( $scope, $reactive ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		this.helpers(
			{
				userData(){
					return SocialAccounts.findOne( {} );
				}
			}
		);
	}

	deleteUser() {
		if ( confirm( 'Are you sure?' ) ) {
			Meteor.call( `socialAccounts.removeUser` );
			Meteor.call( `webRTC.removeUser` );
			Meteor.call( `friends.removeUser` );
			Materialize.toast( 'We will miss you!', 2000, 'rounded' );
			Meteor.logout();
		}
	}

}
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
	    Navigation,
	    Status,
	    SocialMediaSettings
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: Settings
	}
);
