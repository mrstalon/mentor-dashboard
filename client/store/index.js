import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import mentors from './reducers/mentors';
import choosedMentor from './reducers/choosed-mentor';
import isUserAuthed from './reducers/authorized-status';

const middlewares = [thunk, logger];
const reducer = combineReducers({
  mentors,
  choosedMentor,
  isUserAuthed
})
const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;