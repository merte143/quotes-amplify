import React from 'react';
import { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../../routes/home'
import Random from '../../routes/random'
import About from '../../routes/about'
import Header from '../header'
import Footer from '../footer'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path='/' component={Home} />
          <Route exact path='/random' component={Random} />
          <Route exact path='/about-us' component={About} />
        </main>

        <Footer />
      </div>
    )
  }
}

export default App