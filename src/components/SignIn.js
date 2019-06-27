import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Row, Col, Panel, Button,
  FormGroup, FormControl, Glyphicon, Image } from 'react-bootstrap'

class SignIn extends Component {

  state = {
    imgSrc: '/favicon.png',
    userToSignIn: null,
    disabled: true
  }

  handleChange = (e) => {
    const { [e.target.value]: selectedUser } = this.props.users
    this.setState({
      imgSrc: selectedUser.avatarURL,
      userToSignIn: selectedUser.id
    }, () => {
      if (this.state.userToSignIn) {
        this.setState({
          disabled: false
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.userToSignIn))
  }

  renderForm = () => (
    <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="formControlsSelect">
        <FormControl componentClass="select" onChange={this.handleChange}>
          <option hidden value="default">Select a user...</option>
          {(Object.values(this.props.users)).map((user) => (
            <option key={user.id} value={user.id}>
              {user.id}
            </option>
          ))}
        </FormControl>
      </FormGroup>
      <Button
        disabled={this.state.disabled}
        type="submit" bsStyle="info">
        Sign In
      </Button>
    </form>
  )

  render() {
    return (
      <Row>
        <Col xs={6} xsOffset={3}>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">
              <Glyphicon glyph="user" />
              Sign In
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body className="signin">
            <Image src={this.state.imgSrc} />
            {this.renderForm()}
          </Panel.Body>
        </Panel>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps ({ users }) {
  return { users }
}

export default connect(mapStateToProps)(SignIn)
