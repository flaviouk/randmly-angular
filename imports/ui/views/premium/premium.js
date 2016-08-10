//**********************************************************************************
//                              MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                              COMPONENTS
//**********************************************************************************
import { name as Navigation } from '../../components/navigation/navigation';
import { name as PremiumAbout } from '../../components/premiumAbout/premiumAbout';
import { name as PremiumPreferences } from '../../components/premiumPreferences/premiumPreferences';
import { name as PremiumBillingInfo } from '../../components/premiumBillingInfo/premiumBillingInfo';
//**********************************************************************************
//                              TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './premium.html';

const name = 'premium';

class Premium {
	constructor() {
		$( 'ul.tabs' ).tabs();
	}
}
//**********************************************************************************
//                              MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
		Navigation,
		PremiumAbout,
		PremiumPreferences,
		PremiumBillingInfo
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: Premium
	}
);
