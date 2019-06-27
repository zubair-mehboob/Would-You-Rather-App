import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Panel, Image,
  ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'

const QuestionPreview = (props) => {
  const { question, author, answered } = props
  const questionLink = `/questions/${question.id}`
  return (
    <Panel bsStyle="primary" className="QuestionContainer">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          {author.name} {answered ? 'asked:' : 'asks:'}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3} className="test">
            <Image circle className="avatar" src={author.avatarURL} />
          </Col>
          <Col xs={9}>
            <h5>Would you rather...</h5>
            <ListGroup>
              <ListGroupItem>{question.optionOne.text}</ListGroupItem>
              <ListGroupItem>{question.optionTwo.text}</ListGroupItem>
            </ListGroup>
            <Link className="btn btn-info" to={questionLink}>
              {answered ? viewResultsBtn() : answerQuestionBtn()}
            </Link>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )
}

const answerQuestionBtn = () => (
  <span><Glyphicon glyph="question-sign" />  Answer Question</span>
)

const viewResultsBtn = () => (
  <span><Glyphicon glyph="eye-open" /> View Results</span>
)

function mapStateToProps ({ users }, ownProps) {
  const questionAuthor = ownProps.question.author
  return {
    author: users[questionAuthor]
  }
}

export default connect(mapStateToProps)(QuestionPreview)
