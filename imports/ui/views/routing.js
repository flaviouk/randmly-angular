//**********************************************************************************
//                            ANGULAR ROUTING
//**********************************************************************************
import { Meteor } from 'meteor/meteor';
import { Subs } from '../../api/Subs';
export default ( $locationProvider, $urlRouterProvider, $stateProvider ) => {
		'ngInject';

		$locationProvider.html5Mode( true );

		$urlRouterProvider.otherwise(
			function( $injector, $location ) {
				var state = $injector.get( '$state' );
				state.go( 'profile' );
				return $location.path();
			}
		);

		let isLogged = ( $q ) => {
			if ( !Meteor.userId() ) {
				return $q.reject( 'AUTH_REQUIRED' );
			} else {
				return $q.resolve();
			}
		};

		$stateProvider
			.state(
				'home', {
					template: '<landing></landing>'
				}
			)
			.state(
				'profile',{
					template: '<profile></profile>',
					resolve: {
						isLogged,
						socialAccounts(){
							return Subs.subscribe( 'userData' );
						}
					}
				}
			)
//			.state(
//				'friends', {
//					template: '<friends></friends>',
//					resolve: {
//						isLogged,
//						myFriends(){
//							return Subs.subscribe( 'myFriends' );
//						}
//					}
//				}
//			)
			.state(
				'live', {
					template: '<live></live>',
					resolve: {
						isLogged,
						socialAccounts(){
							return Subs.subscribe( 'userData' );
						},
						myWebRTC(){
							return Subs.subscribe( 'myWebRTC' );
						}
					}
				}
			)
//			.state(
//				'premium', {
//					template: '<premium></premium>',
//					resolve: { isLogged }
//				}
//			)
			.state(
				'settings',{
					template: '<settings></settings>',
					resolve: {
						isLogged,
						socialAccounts(){
							return Subs.subscribe( 'userData' );
						}
					}
				}
			);

	};
