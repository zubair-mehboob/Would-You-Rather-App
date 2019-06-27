import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Grid, Row, Col } from 'react-bootstrap'
import Navigation from './Navigation'
import SignIn from './SignIn'
import Home from './Home'
import NewQuestion from './NewQuestion'
import QuestionContainer from './QuestionContainer'
import Leaderboard from './Leaderboard'
import { getAuthedUserFromCookie } from '../actions/authedUser'
import { fetchInitialData } from '../actions/shared'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {

  componentDidMount() {
    this.props.getAuth(getAuthedUserFromCookie())
    this.props.getData(fetchInitialData())
  }

  guestRoutes = () => (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Redirect from='*' to='/' />
    </Switch>
  )

  authedRoutes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/add' component={NewQuestion} />
      <Route exact path='/leaderboard' component={Leaderboard} />
      <Route exact path='/questions/:questionId' component={QuestionContainer} />
      <Redirect from='*' to='/' />
    </Switch>
  )

  fadeInContent = () => (
    <ReactCSSTransitionGroup
      transitionName="loading-complete"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            {this.props.displayLogin
              ? this.guestRoutes()
              : this.authedRoutes()}
          </Col>
        </Row>
      </Grid>
    </ReactCSSTransitionGroup>
  )

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar className="loading" />
          <div className="App">
            <Navigation />
            {this.props.loading === true
              ? null
              : this.fadeInContent()}
          </div>
        </Fragment>
      </BrowserRouter>)
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    loading: Object.keys(questions).length === 0,
    displayLogin: authedUser === null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(fetchInitialData()),
    getAuth: () => dispatch(getAuthedUserFromCookie())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
