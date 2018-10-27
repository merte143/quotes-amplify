import React from 'react';
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../routes/home'
import Quote from '../../routes/quote'
import About from '../../routes/about'
import Member from '../../routes/member'
import Header from '../header'
import Footer from '../footer'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path='/' component={Home} />
          <Route exact path='/quote' component={Quote} />
          <Route exact path='/about-us' component={About} />
          <Route exact path='/member' component={Member} />
        </main>

        <Footer />
      </div>
    )
  }
}
export default App;
