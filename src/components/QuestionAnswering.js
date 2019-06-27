import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVote } from '../actions/shared'
import { Row, Col, Panel, Image, ListGroup, ListGroupItem,
  FormGroup, Radio, Button, Glyphicon  } from 'react-bootstrap'

class QuestionAnswering extends Component {

  state = {
    selection: null,
    disabled: true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, authedUser, question } = this.props
    const answer = this.state.selection
    if (answer) {
      dispatch(handleVote(authedUser, question.id, answer))
    }
  }

  handleChange = (e) => {
    this.setState({
      selection: e.target.value,
      disabled: false
    })
  }

  choicesForm = () => {
    const { question } = this.props
    const { disabled } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ListGroup>
            <ListGroupItem>
              <Radio
                onChange={this.handleChange}
                name="opts"
                value="optionOne"
                inline>
                {question.optionOne.text}
              </Radio>
            </ListGroupItem>
            <ListGroupItem>
              <Radio
                onChange={this.handleChange}
                name="opts"
                value="optionTwo"
                inline>
                {question.optionTwo.text}
              </Radio>
            </ListGroupItem>
          </ListGroup>
        </FormGroup>
        <Button disabled={disabled} type="submit" bsStyle="info">
          <span><Glyphicon glyph="send" /> Submit</span>
        </Button>
      </form>
    )
  }

  render() {
    const { author } = this.props
    return (
      <Panel bsStyle="primary" className="QuestionContainer">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            Asked by {author.name}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            <Col xs={3} className="test">
              <Image circle className="avatar" src={author.avatarURL} />
            </Col>
            <Col xs={9}>
              <h5>Would you rather...</h5>
              {this.choicesForm()}
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(QuestionAnswering)
