import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

class App extends React.Component {
    handleConnectAccounts = (e) => {
        web3.currentProvider.enable();
    }

    handleSignIn = (e) => {
        web3.personal.sign('Log into this dapp', web3.eth.defaultAccount, (err, res) => {
            if (err) throw err;
            Accounts.callLoginMethod({ methodArguments: [{ ethereum: true, address: web3.eth.defaultAccount, signature: res }] });
        });
    }

    render() {
        let rightNavItems = [];
        if (this.props.web3Status.init && this.props.web3Status.network != 'Unknown') {
            rightNavItems.push((
                <span className='navbar-text nav-link disabled'>Network: {this.props.web3Status.network}</span>
            ));
            if (this.props.web3Status.provided) {
                if (typeof this.props.web3Status.address === 'undefined') {
                    rightNavItems.push((
                        <button className='navbar-text btn btn-sm shadow-none' onClick={this.handleConnectAccounts}>Log into Metamask to use this dapp</button>
                    ));
                } else {
                    rightNavItems.push((
                        <span className='navbar-text nav-link disabled' title={this.props.web3Status.address}>{this.props.web3Status.address.slice(0, 6) + '...' + this.props.web3Status.address.slice(38)}</span>
                    ));
                    if (!this.props.user || this.props.user.username != this.props.web3Status.address) {
                        rightNavItems.push((
                            <button className='navbar-text btn btn-sm shadow-none' onClick={this.handleSignIn}>Sign a message with MetaMask to log in</button>
                        ));
                    }
                }
            } else {
                rightNavItems.push((
                    <a className='navbar-text btn btn-sm shadow-none' target='_blank' rel='noopener noreferrer' href='https://metamask.io'>Install MetaMask to use this Dapp</a>
                ));
            }
        }
        return (
            <div className='container'>
                <nav className='navbar navbar-expand navbar-light bg-light'>
                    <a className='navbar-brand' href='/'>Meteor MetaMask Login Example</a>
                    <ul className='navbar-nav ml-auto'>
                        {rightNavItems.map((navItem, idx) => {
                            return (
                                <li key={idx} className='nav-item'>
                                    {navItem}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className='container text-center'>
                    <br />
                    <br />
                    <h4>Welcome to the Meteor MetaMask Login example</h4>
                    <br />
                    <p>This demonstrates a simple flow to allow users to log into your site by signing a message with MetaMask</p>
                    <p>The username is the address and there are no passwords</p>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        web3Status: web3Status.get(),
        user: Meteor.user()
    };
})(App);
