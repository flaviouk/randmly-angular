//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                             COMPONENT & TEMPLATE
//**********************************************************************************
import { name as Login } from '../../components/login/login';

import template from './landing.html';

const name = 'landing';
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
	    Login
	]
)
.component(
	name, {
		template,
		controllerAs: name
	}
);
