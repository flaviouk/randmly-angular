//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
//**********************************************************************************
//                               TEMPLATE & INIT
//**********************************************************************************
import { name as Randmly } from '../imports/ui/randmly/randmly';

function onReady() {
	angular.bootstrap(
		document, [
			Randmly
		], {
			strictDi: true
		}
	);
}

if ( Meteor.isCordova ) {
	angular.element( document )
	.on( 'deviceready', onReady );
} else {
	angular.element( document )
	.ready( onReady );
}
