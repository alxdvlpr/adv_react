import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, put, call } from 'redux-saga/effects'
import api from '../services/api'
import { generateId, fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_ERROR = `${prefix}/FETCH_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  events: new List([])
})

const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_SUCCESS:
      return state.set('events', fbToEntities(payload.events, EventRecord))

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => {
  return state[moduleName]
}
export const eventSelector = createSelector(
  stateSelector,
  (state) => {
    return state.events.toArray()
  }
)

/**
 * Action Creators
 * */

export function fetchEvents() {
  return {
    type: FETCH_EVENTS_REQUEST
  }
}

/**
 *  Sagas
 */

export function* fetchEventsSaga() {
  try {
    const response = yield call(api.fetchEvents)
    const events = response.docs

    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: { events }
    })
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)
}
