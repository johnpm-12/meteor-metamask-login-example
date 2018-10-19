# meteor-metamask-login

This was created by:

meteor create --react appname

cd appname

meteor add accounts-base

meteor remove autopublish insecure

meteor npm install web3@0.20.7 eth-sig-util

Then modify server code to register a new login handler which recovers addresses from signed messages, and modify client code to sign a message

This also includes a reactive header with Ethereum details
