//**********************************************************************************
//                               SCHEMAS
//**********************************************************************************
import { Mongo } from 'meteor/mongo';
import { WebRTC } from './collection';

const Schema = {};
//**********************************************************************************
//                              STATUS
//**********************************************************************************
Schema.Status = new SimpleSchema(
	{
		searching: {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ) {
					return false;
				}
			}
		},
		started: {
			type: Number,
			autoValue() {
				return Date.now();
			}
		},
		tosAccepted: {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ){
					return false;
				}
			}
		},
		inSession: {
			type: Boolean,
			autoValue() {
				if ( this.isInsert ){
					return false;
				}
			}
		}
	}
);
//**********************************************************************************
//                               WEBRTC
//**********************************************************************************
Schema.WebRTC = new SimpleSchema(
	{
		userId: {
			type: String
		},

		session: {
			type: String,
			optional: true
		},

		status: {
			type: Schema.Status
		},

		tempRoom: {
			type: String,
			optional: true
		}

	}
);
//**********************************************************************************
//                               ATTACH TO COLLECTION
//**********************************************************************************
WebRTC.attachSchema( Schema.WebRTC );
