import { combineReducers } from 'redux';
import FetchReducer from './reducer_fetch';
import InputReducer from './reducer_input';

const rootReducer = combineReducers({
  fetch:FetchReducer,
  input:InputReducer
});

export default rootReducer;
