import React from 'react'
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import QuoteContainer from '../../containers/QuoteContainer'
import IntroModal from '../../components/IntroModal/Index';
import { setOnboardingStatus } from '../../actions/onboarding'

class Quote extends Component {

  render() {
    const { user, onboarding } = this.props
    console.log(onboarding)
    console.log(user)
    return (
      <Grid>
        <IntroModal
          isOpen={ onboarding }
          closeModal={ () => this.finishOnboarding() }
          content={ 'hallo' }
        />
        <Row>
          <Col xs={ 12 } md={ 10 } mdOffset={ 1 } lg={ 8 } lgOffset={ 2 }>
            <QuoteContainer />
          </Col>
        </Row>
      </Grid>
    )
  }

  finishOnboarding() {
    const { setOnboardingStatus } = this.props
    setOnboardingStatus(false)
  }
}

const mapStateToProps = state => ({
  user: state.user,
  onboarding: state.onboarding
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path),
  setOnboardingStatus
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote)