//**********************************************************************************
//                               SCHEMAS
//**********************************************************************************
import { Mongo } from 'meteor/mongo';
import { SocialAccounts } from './collection';

const Schema = {};
//**********************************************************************************
//                               FACEBOOK
//**********************************************************************************
Schema.Facebook = new SimpleSchema(
	{
		id: {
			type: String
		},
		email: {
			type: String
		},
		fullName: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		link: {
			type: String
		},
		gender: {
			type: String
		},
		picture: {
			type: String
		},
		age: {
			type: String
		},
		locale: {
			type: String
		}
	}
);
//**********************************************************************************
//                               INSTAGRAM
//**********************************************************************************
Schema.Instagram = new SimpleSchema(
	{
		username: {
			type: String
		},
		fullName: {
			type: String
		},
		id: {
			type: String
		}
	}
);
//**********************************************************************************
//                               SNAPCHAT
//**********************************************************************************
Schema.Snapchat = new SimpleSchema(
	{
		username: {
			type: String
		}
	}
);
//**********************************************************************************
//                               SOCIALACCOUNTS
//**********************************************************************************
Schema.SocialAccounts = new SimpleSchema(
	{
		userId: {
			type: String
		},

		facebook: {
			type: Schema.Facebook
		},

		instagram: {
			type: Schema.Instagram,
			optional: true
		},

		snapchat: {
			type: Schema.Snapchat,
			optional: true
		},

		'public.instagram': {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ) {
					return true;
				}
			}
		},
		'public.snapchat': {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ) {
					return true;
				}
			}
		},

		thumbsUp: {
			type: [ String ],
			autoValue() {
				if ( this.isInsert ) {
					return [];
				}
			}
		},

		banned: {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ) {
					return false;
				}
			}
		}

	}
);
//**********************************************************************************
//                               ATTACH TO COLLECTION
//**********************************************************************************
SocialAccounts.attachSchema( Schema.SocialAccounts );
