import { put, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.signIn(payload.username, payload.password)
}

function* authSigninCognitoRequest(req) {
  try {
    const data = yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninCognitoSuccess({ data, nextRoute: 'Root' }))
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_CONFIRMED'),
      }))
    } else if (error.code === 'UserNotFoundException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_FOUND'),
      }))
    } else if (error.code === 'NotAuthorizedException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_AUTHORIZED'),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'INVALID_PARAMETER'),
      }))
    } else {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_SIGNIN_COGNITO_REQUEST, authSigninCognitoRequest),
]