import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { generateId } from './utils'

const peopleMock = [
  {
    id: 1550249873601,
    firstName: 'laksjdfh',
    lastName: 'asdkjlfh',
    email: 'asfd@asdf.com'
  },
  {
    id: 1550249882013,
    firstName: 'Roma',
    lastName: 'asdf',
    email: 'asfdg@asdf.com'
  },
  {
    id: 1550249933987,
    firstName: 'ASD',
    lastName: 'asdf',
    email: 'erty@sreg.com'
  }
]
/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List(peopleMock)
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )
    case DELETE_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.delete(payload.index)
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

const idSelector = (_, { id }) => id
export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.entities.find((person) => person.id === id)
)

/**
 * Action Creators
 * */

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  }
}

export function deletePerson(id) {
  return {
    type: DELETE_PERSON_REQUEST,
    payload: { id }
  }
}

/**
 *  Sagas
 */

export function* addPersonSaga(action) {
  const id = yield call(generateId)
  const person = { ...action.payload, id }

  yield put({
    type: ADD_PERSON,
    payload: { person }
  })

  yield put(reset('person'))
}

export function* deletePersonSaga({ payload: { id } }) {
  const { entities } = yield select(stateSelector)

  yield put({
    type: DELETE_PERSON_SUCCESS,
    payload: { index: entities.findIndex((event) => event.id == id) }
  })
}

export function* saga() {
  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
