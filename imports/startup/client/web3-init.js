import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
var Web3 = require('web3');

web3Status = new ReactiveVar({ init: false, provided: false, network: 'Unknown', address: undefined });

function checkNetworkLoop() {
    web3.version.getNetwork((err, netId) => {
        if (err) throw err;
        let web3Stat = web3Status.get();
        switch (netId) {
            case '1':
                web3Stat.network = 'Ethereum';
                break;
            case '2':
                web3Stat.network = 'Morden';
                break;
            case '3':
                web3Stat.network = 'Ropsten';
                break;
            case '4':
                web3Stat.network = 'Rinkeby';
                break;
            case '42':
                web3Stat.network = 'Kovan';
                break;
            default:
                web3Stat.network = 'Unknown';
        }
        web3Status.set(web3Stat);
        setTimeout(checkNetworkLoop, 500);
    });
}

function checkAccountLoop() {
    web3.eth.getAccounts((err, accounts) => {
        if (err) throw err;
        let web3Stat = web3Status.get();
        if (web3.eth.defaultAccount != accounts[0]) {
            web3.eth.defaultAccount = accounts[0];
        }
        if (web3Stat.address != accounts[0]) {
            web3Stat.address = accounts[0];
            web3Status.set(web3Stat);
        }
        setTimeout(checkAccountLoop, 250);
    });
}

Meteor.startup(() => {
    window.addEventListener('load', () => {
        let web3Stat = web3Status.get();
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            web3Stat.provided = true;
            checkNetworkLoop();
            checkAccountLoop();
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));
            web3Stat.network = 'Ethereum';
        }
        web3Stat.init = true;
        web3Status.set(web3Stat);
    });
});
