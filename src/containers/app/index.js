import React from 'react';
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../routes/home'
import Random from '../../routes/random'
import About from '../../routes/about'
import Member from '../../routes/member'
import Header from '../header'
import Footer from '../footer'

// // add authentication to app
// import Amplify from 'aws-amplify';
// import aws_exports from '../../aws-exports.js';
// import { withAuthenticator } from 'aws-amplify-react';
// Amplify.configure(aws_exports);

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path='/' component={Home} />
          <Route exact path='/random' component={Random} />
          <Route exact path='/about-us' component={About} />
          <Route exact path='/member' component={Member} />
        </main>

        <Footer />
      </div>
    )
  }
}
export default App;
//export default withAuthenticator(App, true);