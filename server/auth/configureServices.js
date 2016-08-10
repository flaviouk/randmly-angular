//**********************************************************************************
//                     ADD AUTH SECRETS TO SERVICECONFIGURATION
//**********************************************************************************
import { Meteor } from 'meteor/meteor';

const services = Meteor.settings.private.oAuth;

if ( services ) {
	for ( let service in services ) {
		ServiceConfiguration.configurations.upsert(
			{ service: service },
			{
				$set: services[ service ]
			}
		);
	}
}
