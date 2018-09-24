import React from 'react'
import { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import ChatContainer from '../../containers/ChatContainer'

class Random extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={ 12 }>
            <ChatContainer
              id='random'
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  chat: state.chat
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Random)