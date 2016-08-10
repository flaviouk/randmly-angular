//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               COMPONENTS
//**********************************************************************************
import { name as Logout } from '../logout/logout';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './navigation.html';

const name = 'navigation';

class Navigation {
	constructor( $scope, $reactive ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		let count = ( data ) => {
			let count = 0;
			for ( var key in data ){
				count++;
			}
			return count;
		};

		this.helpers(
			{
				countThumbsUp(){
					return count( this.thumbsup );
				}
			}
		);

		$( '.nav-items-mobile' )
		.on(
			'click', function() {
				$( '.button-collapse' )
				.sideNav( 'hide' );
			}
		);

		$( '.button-collapse' )
		.sideNav(
			{
				menuWidth: 200,
				edge: 'left'
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
		angularMeteor,
	    Logout
	]
)
.component(
	name,
	{
		template,
		controllerAs: name,
		controller: Navigation,
		bindings: {
			name: '=',
			thumbsup: '='
		}
	}
);
