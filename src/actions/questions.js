import { _getQuestions } from '../utils/_DATA'

export const SAVE_QUESTION = 'SAVE_QUESTION'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
export const SAVE_QUESTION_VOTE = 'SAVE_QUESTION_VOTE'
export const REMOVE_QUESTION_VOTE = 'REMOVE_QUESTION_VOTE'
export const QUESTIONS_UPDATE = 'QUESTIONS_UPDATE'

export function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

export function removeQuestion (question) {
  return {
    type: REMOVE_QUESTION,
    question
  }
}

export function saveQuestionVote (authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_VOTE,
    authedUser,
    qid,
    answer
  }
}

export function removeQuestionVote (authedUser, qid, answer) {
  return {
    type: REMOVE_QUESTION_VOTE,
    authedUser,
    qid,
    answer
  }
}

/* update state after fetch */
export function updateQuestions (questions) {
  return {
    type: QUESTIONS_UPDATE,
    questions,
  }
}

/* async call to fetch all questions */
export function fetchQuestions () {
  return (dispatch) => {
    return _getQuestions().then((questions) => {
      dispatch(updateQuestions(questions))
    })
  }
}
