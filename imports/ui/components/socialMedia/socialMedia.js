//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                                TEMPLATE TODO LINKS
//**********************************************************************************
import template from './socialMedia.html';

const name = 'socialMedia';
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
		bindings: {
			facebook: '=',
			instagram: '=',
			snapchat: '=',
			public: '='
		}
	}
);
