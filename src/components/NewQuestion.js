import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/shared.js'
import { Panel, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap'

class NewQuestion extends Component {

  defaultState =  {
    optionOneText: '',
    optionTwoText: '',
    disabled: true,
    toHome: false
  }
  state = this.defaultState

  handleChange = (e) => {
    const optionText = e.target.id
    const text = e.target.value
    this.setState({
      [optionText]: text
    }, () => {
      this.state.optionOneText && this.state.optionTwoText
        ? this.setState({ disabled: false })
        : this.setState({ disabled: true })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { state: { optionOneText, optionTwoText}, props: { authedUser, dispatch} } = this
    dispatch(handleSaveQuestion(authedUser, optionOneText, optionTwoText))
    this.setState({
      ...this.defaultState,
      toHome: true
    })
  }

  renderForm = () => (
    <Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          <Glyphicon glyph="pencil" />
          Create New Question
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <h4>Would you rather...</h4>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              id="optionOneText"
              type="text"
              placeholder="Enter First Option"
              onChange={this.handleChange}/>
          </FormGroup>
          <p className="small">OR</p>
          <FormGroup>
            <FormControl
              id="optionTwoText"
              type="text"
              placeholder="Enter Second Option"
              onChange={this.handleChange}/>
          </FormGroup>
          <Button disabled={this.state.disabled} type="submit" bsStyle="info">
            <span><Glyphicon glyph="send" /> Submit</span>
          </Button>
        </form>
      </Panel.Body>
    </Panel>
  )

  render() {
    return this.state.toHome ? <Redirect to='/' /> : this.renderForm()
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(NewQuestion)
