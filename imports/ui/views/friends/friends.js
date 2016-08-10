//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               COMPONENTS
//**********************************************************************************
import { name as Navigation } from '../../components/navigation/navigation';
import { name as SocialMedia} from '../../components/socialMedia/socialMedia';
import { name as Status} from '../../components/status/status';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './friends.html';

const name = 'friends';

class Friends {
	constructor() {
		$( '.collapsible' )
		.collapsible(
			{
				accordion: false
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
		Status,
		Navigation,
		SocialMedia
	]
)
.component(
	'friends', {
		template,
		controllerAs: name,
		controller: Friends
	}
);
