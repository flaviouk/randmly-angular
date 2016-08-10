//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE
//**********************************************************************************
import template from './premiumPreferences.html';

const name = 'premiumPreferences';
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
		controllerAs: name
	}
);
