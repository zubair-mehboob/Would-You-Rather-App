import React from 'react'
import { Row, Col, Panel, Image, ListGroup,
  ListGroupItem, ProgressBar, Badge, Glyphicon, Label } from 'react-bootstrap'

const QuestionResults = (props) => {
  const { author } = props
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
          <Col xs={9}>{resultsListGroup(props)}</Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
}

const resultsListGroup = (props) => {
  const { question, optOne, optTwo } = props
  const optOneVotes = question.optionOne.votes.length
  const optTwoVotes = question.optionTwo.votes.length
  const totalVotes = optOneVotes + optTwoVotes
  const optOnePercentage = (optOneVotes / totalVotes) * 100
  const optTwoPercentage = (optTwoVotes / totalVotes) * 100
  return (
    <ListGroup>
      <ListGroupItem bsStyle={optOne ? 'info' : null}>
        {optOne ? <Badge><Glyphicon glyph="star" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionOne.text}</p>
        <ProgressBar now={optOnePercentage} />
        <div className="vote-summary">
        <Label bsStyle="success">{optOneVotes} out of {totalVotes} votes</Label>
        </div>
      </ListGroupItem>
      <ListGroupItem bsStyle={optTwo ? 'info' : null}>
        {optTwo ? <Badge><Glyphicon glyph="star" /> You Voted</Badge> : null}
        <p>Would you rather {question.optionTwo.text}</p>
        <ProgressBar now={optTwoPercentage} />
        <div className="vote-summary">
        <Label bsStyle="success">{optTwoVotes} out of {totalVotes} votes</Label>
        </div>
      </ListGroupItem>
    </ListGroup>
  )
}

export default QuestionResults
