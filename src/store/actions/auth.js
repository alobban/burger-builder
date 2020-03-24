import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrUK0YFupI-3yHDK_66DeZG9vV3UUEY74';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrUK0YFupI-3yHDK_66DeZG9vV3UUEY74';
    }
    axios.post(url,
      authData
    )
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err));
    })
  };
};
