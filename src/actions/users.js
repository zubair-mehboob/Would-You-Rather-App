import { _getUsers } from '../utils/_DATA'

export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const REMOVE_USER_ANSWER = 'REMOVE_USER_ANSWER'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'
export const REMOVE_USER_QUESTION = 'REMOVE_USER_QUESTION'
export const USERS_UPDATE = 'USERS_UPDATE'

export function saveUserQuestion (user, qid) {
  return {
    type: SAVE_USER_QUESTION,
    user,
    qid,
  }
}

export function removeUserQuestion (user, qid) {
  return {
    type: REMOVE_USER_QUESTION,
    user,
    qid,
  }
}

export function saveUserAnswer (user, qid, answer) {
  return {
    type: SAVE_USER_ANSWER,
    user,
    qid,
    answer
  }
}

export function removeUserAnswer (user, qid, answer) {
  return {
    type: REMOVE_USER_ANSWER,
    user,
    qid,
    answer
  }
}

/* update state after fetch */
export function updateUsers (users) {
  return {
    type: USERS_UPDATE,
    users,
  }
}

/* async call to fetch all users */
export function fetchUsers () {
  return (dispatch) => {
    return _getUsers().then((users) => {
      dispatch(updateUsers(users))
    })
  }
}
