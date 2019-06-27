/*
 * Authed User Middleware
 *
 * Keeps the authedUser logged in even after browser refresh
 * by utilizing a cookie to remember the authed user name.
 * Why? I got tired of "logging in" whenever the app is refreshed.
 */

import {
  SET_AUTHED_USER,
  GET_AUTHED_USER_FROM_COOKIE,
  LOGOUT_AUTHED_USER } from '../actions/authedUser'

const COOKIE_NAME = 'authedUser'
const COOKIE_DURATION = 1

const authedUser = (store) => (next) => (action) => {
  switch (action.type) {

    case SET_AUTHED_USER :
      setCookie(COOKIE_NAME, action.id, COOKIE_DURATION)
      return next(action)

    case GET_AUTHED_USER_FROM_COOKIE :
      const authedUser = getCookie(COOKIE_NAME)
      action.id = authedUser ? authedUser : null
      return next(action)

    case LOGOUT_AUTHED_USER :
      setCookie(COOKIE_NAME, action.id, -1)
      action.id = null
      return next(action)

    default :
      return next(action)
  }
}

/*
 * setCookie and getCookie functions obtained from w3schools at:
 * https://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default authedUser
