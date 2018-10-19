import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
var EthSigUtil = require('eth-sig-util');

Accounts.registerLoginHandler('ethereum', loginRequest => {
    if (!loginRequest.ethereum) {
        return undefined;
    }
    let unsigned = '0x' + Buffer.from('Log into this dapp').toString('hex');
    let recoveredAddress = EthSigUtil.recoverPersonalSignature({ data: unsigned, sig: loginRequest.signature });
    if (loginRequest.address != recoveredAddress) {
        return null;
    }
    let userId;
    let user = Meteor.users.findOne({ username: loginRequest.address });
    if (!user) {
        userId = Meteor.users.insert({ username: loginRequest.address });
    } else {
        userId = user._id;
    }
    return { userId: userId };
});
