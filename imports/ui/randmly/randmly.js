//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import Routing from '../views/routing';
import { Accounts } from 'meteor/accounts-base';
//**********************************************************************************
//                               VIEWS
//**********************************************************************************
import { name as Landing } from '../views/landing/landing';
import { name as Live } from '../views/live/live';
import { name as Profile } from '../views/profile/profile';
//import { name as Premium } from '../views/premium/premium';
import { name as Friends } from '../views/friends/friends';
import { name as Settings } from '../views/settings/settings';
//**********************************************************************************
//                           TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './randmly.html';

const name = 'randmly';
//**********************************************************************************
//                               MODULE EXPORT
//**********************************************************************************
export default angular.module(
	name, [
		angularMeteor,
		uiRouter,
		Landing,
		Live,
		Profile,
//		Premium,
		Friends,
		Settings
	]
)
.component(
	name, {
		template,
		controllerAs: name
	}
)
.config( Routing )
.run(
	function( $rootScope, $state ) {
		'ngInject';

		$rootScope.$on(
			'$stateChangeError',
			( event, toState, toParams, fromState, fromParams, error ) => {
				if ( error === 'AUTH_REQUIRED' ) {
					$state.go( 'home' );
				}
			}
		);

		Accounts.onLogin( () => {
			if ( $state.is( 'home' ) ) {
				$state.go( 'profile' );
			}
		} );

		Accounts.onLoginFailure( () => $state.go( 'home' ) );

	}
);
