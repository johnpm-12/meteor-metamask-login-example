import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './web3-init.js';
import App from '/imports/ui/app.js';

Meteor.startup(() => {
    render(<App />, document.getElementById('react-target'));
});
