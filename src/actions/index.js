import {
  FETCH_DATA,
  FETCH_FUFILLED,
  FETCH_FAILED,
  FETCH_MERGE_CALL,
  FETCH_MERGE_CALL_FUFILLED,
  CONCATMAP_CALL,
  CONCATMAP_CALL_FUFILLED,
  CONCATMAP_CALL_FUFILLED2,
  ADD_TODO,
  COMPLETE_TODO,
  REMOVE_TODOS,
  REMOVE_TODO,
  GET_TODO_SIZE
} from './type';


export const fetchCall = () => (
  {
    type:FETCH_DATA
  }
)

export const fetchFufilled = (x) => x

export const fetchFailed = err => (
  {
    type:FETCH_FAILED,
    payload:err
  }
)

export const mergeFetchCall = () => (
  {
    type:FETCH_MERGE_CALL
  }
)

export const mergeFetchCallFufilled = (res) => (
  {
    type:FETCH_MERGE_CALL_FUFILLED,
    payload:res
  }
)


export const concatMapFetch = () =>(
  {
    type:CONCATMAP_CALL
  }
)


export const concatMapFufuilled = (res) => (
  {
    type:CONCATMAP_CALL_FUFILLED,
    payload:res
  }
)

export const concatMap2Fufilled = res => (
  {
    type:CONCATMAP_CALL_FUFILLED2,
    payload:res
  }
)



export const addTodo = input => (
  {
    type:ADD_TODO,
    payload:input
  }
)


export const completeTodo = id => ({
  type:COMPLETE_TODO,
  payload:id
})


export const removeTodos = () => ({type:REMOVE_TODOS})


export const deleteTodo = id => ({
  type:REMOVE_TODO,
  payload:id
})

export const getTodoSize = () => ({
  type:GET_TODO_SIZE
})
