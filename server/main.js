//**********************************************************************************
//                    IMPORT EVERYTHING SERVER RELATED
//**********************************************************************************

//**********************************************************************************
//                               SOCIAL ACCOUNTS
//**********************************************************************************
import '../imports/api/socialAccounts';
import '../imports/api/socialAccounts/server/methods';
import '../imports/api/socialAccounts/server/publications';
//**********************************************************************************
//                               WEBRTC
//**********************************************************************************
import '../imports/api/webRTC';
import '../imports/api/webRTC/server/methods';
import '../imports/api/webRTC/server/publications';

import { Meteor } from 'meteor/meteor';

UserStatus.events.on( `connectionLogout`, ( fields ) => {
	Meteor.call( `webRTC.close`, fields.userId );
} );

UserStatus.events.on( `connectionLogin`, ( fields ) => {
	Meteor.call( `webRTC.close`, fields.userId );
} );
