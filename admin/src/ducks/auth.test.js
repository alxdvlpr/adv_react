import { put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import {
  signInSaga,
  signUpSaga,
  SIGN_IN_SUCCESS,
  SIGN_UP_REQUEST
} from './auth'
import api from '../services/api'
import { generateId } from './utils'

describe('Auth', () => {
  it('should sign in', () => {
    const userData = {
      email: 'it4anna@gmail.com',
      password: '11111111'
    }
    const gen = signInSaga({ payload: { ...userData } })
    const user = call(api.signIn, userData.email, userData.password)

    // These cases are falling %-(
    expect(gen.next().value).toEqual(user)
    expect(gen.next().value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        user
      })
    )
    expect(gen.next().value).toEqual(put(reset('sign-in')))
    expect(gen.next().done).toBe(true)
  })

  it('should sign up', () => {
    const userData = {
      email: `${generateId()}@gmail.com`,
      password: '11111111'
    }
    const action = {
      type: SIGN_UP_REQUEST,
      payload: userData
    }
    const gen = signUpSaga(action)
    expect(gen.next().value).toEqual(
      expect.objectContaining({
        payload: expect.any(Object)
      })
    )
    gen.next() // How to test the put if we cant sign up with the same data twice
    expect(gen.next().value).toEqual(put(reset('sign-up')))
    expect(gen.next().done).toBe(true)
  })
})
