import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import logo from './logo.svg';
import './App.css';

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

Amplify.configure({
  Auth: {
    // Use your Amazon Cognito Identity Pool Id
    identityPoolId: 'eu-west-1:48324b18-ddf4-45ab-a58e-aa877268a32c',
    region: 'eu-west-1'
  },
  Interactions: {
    bots: {
      "Quotes": {
        "name": "Quotes",
        "alias": "$LATEST",
        "region": "eu-west-1",
      },
    }
  }
});

class App extends Component {

  handleComplete(err, confirmation) {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ChatBot Demo</h1>
        </header>
        <ChatBot
          title="Quotes Bot"
          theme={myTheme}
          botName="Quotes"
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
        />
      </div>
    );
  }
}

export default App;
