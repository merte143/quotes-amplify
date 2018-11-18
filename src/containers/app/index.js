import React from 'react';
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../routes/Home'
import Quote from '../../routes/Quote'
import Member from '../../routes/Member'
import Header from '../Header'
import Footer from '../Footer'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path='/' component={Quote} />
          <Route exact path='/about-us' component={Home} />
          <Route exact path='/member' component={Member} />
        </main>

        <Footer />
      </div>
    )
  }
}
export default App;
