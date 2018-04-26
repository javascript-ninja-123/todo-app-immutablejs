import {
  FETCH_DATA,
  FETCH_FIRST_SUCCESS,
  FETCH_SECOND_SUCCESS,
  FETCH_FUFILLED,
  FETCH_FAILED,
  FETCH_FIRST_LOADING_START,
  FETCH_MERGE_CALL_FUFILLED,
  FETCH_SECOND_LOADING_START,
  CONCATMAP_CALL_FUFILLED,
  CONCATMAP_CALL_FUFILLED2
} from '../actions/type';

const INTIAL_STATE = {
  firstCheck:false,
  secondCheck:false,
  allSuccess:false,
  firstLoader:false,
  secondLoader:false
}


export default (state = INTIAL_STATE,action) => {
  switch(action.type){
    case FETCH_FIRST_LOADING_START:
    return {...state, firstLoader:true};
    case FETCH_SECOND_LOADING_START:
    return {...state, secondLoader:true};
    case FETCH_FIRST_SUCCESS:
    console.log('it is called the first one')
    return {...state,firstCheck:true, firstLoader:false };
    case FETCH_SECOND_SUCCESS:
    console.log('second is, it is called')
    return {...state,secondCheck:true, secondLoader:false };
    case FETCH_FUFILLED:
    console.log('fetch complete');
    return {...state, allSuccess:true};
    case FETCH_FAILED:
    return console.log('fetch failed')
    case FETCH_MERGE_CALL_FUFILLED:
    console.log(action.payload)
    return state
    case CONCATMAP_CALL_FUFILLED:
        console.log(action.payload)
        console.log('concat1 is called')
    return state;
    case  CONCATMAP_CALL_FUFILLED2:
    console.log(action.payload)
    console.log('concat2 is called')
    return state
    default:
    return state;
  }
}
