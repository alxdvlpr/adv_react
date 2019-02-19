import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, List, OrderedSet } from 'immutable'
import { createSelector } from 'reselect'
import { fbToEntities } from '../services/util'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const TOGGLE_SELECTION = `${prefix}/TOGGLE_SELECTION`
export const ADD_PERSON_TO_EVENT = `${prefix}/ADD_PERSON_TO_EVENT`
export const ADD_PERSON_TO_EVENT_SUCCESS = `${prefix}/ADD_PERSON_TO_EVENT_SUCCESS`

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new List([])
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
  participants: new List([])
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case TOGGLE_SELECTION:
      return state.update('selected', (selected) =>
        selected.has(payload.id)
          ? selected.remove(payload.id)
          : selected.add(payload.id)
      )

    case FETCH_LAZY_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))
        .set('loaded', Object.keys(payload).length < 10)

    case ADD_PERSON_TO_EVENT_SUCCESS:
      return state.updateIn(['entities'], (entities) => {
        return entities.updateIn(
          [payload.eventIndex, 'participants'],
          (participants) => {
            console.log(participants.push(payload.personId))
            return participants.push(payload.personId)
          }
        )
      })

    default:
      return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(
  entitiesSelector,
  (entities) => entities.toArray()
)

export const selectionSelector = createSelector(
  stateSelector,
  (state) => state.selected.toArray()
)

export const selectedEventsSelector = createSelector(
  selectionSelector,
  entitiesSelector,
  (selection, entities) =>
    selection
      .map((id) => entities.find((event) => event.id === id))
      .map((event) => ({
        ...event.toJS(),
        participants: event.toJS().participants
      }))
)

/**
 * Action Creators
 * */
export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function toggleSelection(id) {
  return {
    type: TOGGLE_SELECTION,
    payload: { id }
  }
}

export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  }
}

export function addPersonToEvent(personId, eventId) {
  return {
    type: ADD_PERSON_TO_EVENT,
    payload: { personId, eventId }
  }
}

/**
 * Sagas
 * */
export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAllEvents)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export const fetchLazySaga = function*() {
  const state = yield select(stateSelector)

  if (state.loading || state.loaded) return

  yield put({
    type: FETCH_LAZY_START
  })

  const lastEvent = state.entities.last()

  const data = yield call(api.fetchLazyEvents, lastEvent && lastEvent.title)

  yield put({
    type: FETCH_LAZY_SUCCESS,
    payload: data
  })
}

export function* addPersonToEventSaga({ payload: { personId, eventId } }) {
  const state = yield select(stateSelector)
  const eventIndex = state
    .get('entities')
    .findIndex((event) => event.id == eventId)

  yield put({
    type: ADD_PERSON_TO_EVENT_SUCCESS,
    payload: { personId, eventIndex }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_LAZY_REQUEST, fetchLazySaga),
    takeEvery(ADD_PERSON_TO_EVENT, addPersonToEventSaga)
  ])
}
