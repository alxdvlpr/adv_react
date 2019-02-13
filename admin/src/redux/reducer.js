import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer from '../ducks/auth'
import people from '../ducks/people'
import events from '../ducks/events'
import history from '../history'

export default combineReducers({
  people,
  events,
  auth: authReducer,
  router: connectRouter(history),
  form
})
