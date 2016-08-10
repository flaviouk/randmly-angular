//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './logout.html';

const name = 'logout';

class Logout {
	logout(){
		Meteor.logout();
	}
}
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name,
	[
		angularMeteor
	]
)
.component(
	name,
	{
		template,
		controllerAs: name,
		controller: Logout
	}
);
