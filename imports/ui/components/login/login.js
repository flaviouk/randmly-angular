//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './login.html';

const name = 'login';

class Login {
	login(){
		Meteor.loginWithFacebook(
			{
				requestPermissions: [ 'email', 'public_profile', 'user_birthday' ]
			}
		);
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
		controller: Login
	}
);
