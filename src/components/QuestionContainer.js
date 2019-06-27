import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Well, Glyphicon } from 'react-bootstrap'
import QuestionAnswering from './QuestionAnswering'
import QuestionResults from './QuestionResults';

/** Container component for answering questions or displaying results */
const QuestionContainer = ({
  question,
  author,
  optOne,
  optTwo,
  questionDoesNotExist
}) => {

  const renderQuestionNotFound = () => (
    <div className="center">
      <Glyphicon glyph="alert" /> Question not found
    </div>
  );

  const renderQuestionToAnswer = () => (
    <QuestionAnswering
      question={question}
      author={author} />
  );

  const renderQuestionResults = () => (
    <QuestionResults
      question={question}
      author={author}
      optOne={optOne}
      optTwo={optTwo} />
  )

  const optionToDisplay = () => (
    optOne || optTwo ? renderQuestionResults() : renderQuestionToAnswer()
  );

  return (
    <Well>
      {questionDoesNotExist ? renderQuestionNotFound() : optionToDisplay() }
    </Well>
  )
}

function mapStateToProps ({ users, questions, authedUser }, ownProps) {
  const question = questions[ownProps.match.params.questionId]
  if (!question) // bad url
    return { questionDoesNotExist: true }
  const author = users[question.author]
  const optOne = question.optionOne.votes.includes(authedUser)
  const optTwo = question.optionTwo.votes.includes(authedUser)

  return {
    loading: false,
    optOne,
    optTwo,
    question,
    author
  }
}

export default connect(mapStateToProps)(QuestionContainer)
