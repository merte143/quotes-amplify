import React from 'react'
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import QuoteContainer from '../../containers/QuoteContainer'

class Quote extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={ 12 }>
            <QuoteContainer />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote)