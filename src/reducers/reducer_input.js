import {
  ADD_TODO,
  COMPLETE_TODO,
  REMOVE_TODOS,
  REMOVE_TODO,
  GET_TODO_SIZE
} from '../actions/type';
import {Map,List} from 'immutable';
import uniqid from 'uniqid';


const INITIAL_STATE = {
  list:List(),
  size:0
}


export default (state = INITIAL_STATE,action) => {
  switch(action.type){
    case GET_TODO_SIZE:
    return {...state, size:state.list.size}
    case ADD_TODO:
    return {
      ...state,
      list:state.list.push(Map({
        id:uniqid(),
        text:action.payload,
        isCompleted:false
      }))
    }
    case COMPLETE_TODO:
    return {...state, list:state.list.map(todo => {
      if(todo.get('id') === action.payload){
        return todo.update('isCompleted', value => !value)
      }else{
        return todo;
      }
    })}
    case REMOVE_TODOS:
    return {...state, list:state.list.clear()};
    case REMOVE_TODO:
    return {...state, list:state.list.filter(todo => todo.get('id') !== action.payload)}
    default:
    return state;
  }
}
