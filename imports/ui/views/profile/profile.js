//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                                 DATA
//**********************************************************************************
import { SocialAccounts } from '../../../api/socialAccounts';
//**********************************************************************************
//                               COMPONENTS
//**********************************************************************************
import { name as Navigation } from '../../components/navigation/navigation';
import { name as Status } from '../../components/status/status';
import { name as SocialMedia } from '../../components/socialMedia/socialMedia';
//**********************************************************************************
//                           TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './profile.html';

const name = 'profile';

class Profile {
	constructor( $scope, $reactive ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		this.helpers(
			{
				userData(){
					return SocialAccounts.findOne( {} );
				},
				ageParsed(){
					if ( !this.userData ) return '';
					else {
						var today = new Date();
						var birthday = this.userData.facebook.age;
						var birthDate = new Date( birthday );
					    var age = today.getFullYear() - birthDate.getFullYear();
					    var m = today.getMonth() - birthDate.getMonth();
					    if ( m < 0 || ( m === 0 && today.getDate() < birthDate.getDate() ) ) { age--; }
					    return age;
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
		angularMeteor,
		Navigation,
		Status,
		SocialMedia
	]
)
.component(
	name, {
		template,
		controllerAs: name,
		controller: Profile
	}
);
