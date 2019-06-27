import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Well } from 'react-bootstrap'
import QuestionList from './QuestionList'

const Home = ({answered, unanswered}) => {
  return (
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title="Unanswered Questions">
        <Well className="question-list-container">
          <QuestionList questions={unanswered} answered={false} />
        </Well>
      </Tab>
      <Tab eventKey={2} title="Answered Questions">
        <Well className="question-list-container">
          <QuestionList questions={answered} answered={true} />
        </Well>
      </Tab>
    </Tabs>
  );
}

function mapStateToProps ({ questions, users, authedUser }) {
  const questionsArray = Object.values(questions)
  const user = users[authedUser]
  const authedUsersAnswers = (user !== undefined)
    ? Object.keys(user.answers)
    : []
  return {
    answered: questionsArray.filter((question) => {
      return authedUsersAnswers.includes(question.id) ? question : null
    }),
    unanswered: questionsArray.filter((question) => {
      return authedUsersAnswers.includes(question.id) ? null : question
    })
  }
}

export default connect(mapStateToProps)(Home)
