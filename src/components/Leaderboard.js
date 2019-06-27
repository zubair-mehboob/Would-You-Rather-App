import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, Image, Well,
  ListGroup, ListGroupItem, Badge } from 'react-bootstrap'

class Leaderboard extends Component {

  getLeader = (l, index) => (
    <Panel key={l.id} bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          <Badge className="leader-badge">{index + 1} </Badge>
          {l.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={3}>
            <Image circle className="avatar" src={l.avatarURL} />
          </Col>
          <Col xs={5}>
            <ListGroup className="leaderboard-stat">
              <ListGroupItem>
                <span>{(Object.keys(l.answers)).length}</span>
                Answered Questions
              </ListGroupItem>
              <ListGroupItem>
                <span>{l.questions.length}</span>
                Created Questions
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={4}>
            <Panel className="score">
              <Panel.Heading className="scoreHeader">Score</Panel.Heading>
              <Panel.Body>
                <p>
                  {(Object.keys(l.answers)).length + l.questions.length}
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  )

  render() {
    return (
      <Well>
        {this.props.leaders.map((leader, index) => (
          this.getLeader(leader, index)
        ))}
      </Well>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  const sortedLeaders = (Object.values(users)).sort((a, b) => {
    const aRank = (Object.keys(a.answers)).length + a.questions.length
    const bRank = (Object.keys(b.answers)).length + b.questions.length
    return bRank >= aRank
  })
  return {
    authedUser,
    leaders: sortedLeaders
  }
}

export default connect(mapStateToProps)(Leaderboard)
