//**********************************************************************************
//                               MAIN IMPORTS
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
//**********************************************************************************
//                               TEMPLATE & CONTROLLER
//**********************************************************************************
import template from './socialMediaSettings.html';

const name = 'socialMediaSettings';

class SocialMediaSettings {
	constructor( $scope, $reactive ) {
		'ngInject';

		$reactive( this ).attach( $scope );

		$( '.modal-trigger' ).leanModal();

	}

	verifyInstagram() {
		Meteor.signInWithInstagram(
			{},
			function( err, mergedUserId ) {
				if ( err ) {
					Materialize.toast( 'Oops, something went wrong..', 2000, 'rounded' );
				}
				if ( mergedUserId ) {
					Materialize.toast( 'Instagram Added!', 2000, 'rounded' );
				}
			}
		);
	}

	deleteInstagram() {
		if ( confirm( 'Are you sure?' ) ){
			Meteor.call( `socialAccounts.removeInstagram` );
		}
	}

	addSnapchat() {
		Meteor.call(
			`socialAccounts.insertSnapchat`,
			this.snapchat,
			( err, result ) => {
				if ( err ) {
					Materialize.toast( 'Oops, something went wrong..', 2000, 'rounded' );
				}
				if ( result ) {
					Materialize.toast( 'Snapchat Added!', 2000, 'rounded' );
				}
			}
		);
	}

	updatePublic( social ) {
		if ( social === 'instagram' ) {
			this.public.instagram = !this.public.instagram;
		}
		if ( social === 'snapchat' ) {
			this.public.snapchat = !this.public.snapchat;
		}
		Meteor.call( 'socialAccounts.updatePublic', this.public );
	}

	deleteSnapchat() {
		if ( confirm( 'Are you sure?' ) ){
			Meteor.call( `socialAccounts.removeSnapchat` );
		}
	}

}
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
		controller: SocialMediaSettings,
		bindings: {
			facebook: '=',
			instagram: '=',
			snapchat: '=',
			public: '='
		}
	}
);
