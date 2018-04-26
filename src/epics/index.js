import { combineEpics } from 'redux-observable';
import {Observable} from 'rxjs'
import {
  FETCH_DATA,
  FETCH_FIRST_SUCCESS,
  FETCH_FIRST_LOADING_START,
  FETCH_SECOND_LOADING_START,
  FETCH_SECOND_SUCCESS,
  FETCH_FUFILLED,
  FETCH_MERGE_CALL,
  CONCATMAP_CALL
} from '../actions/type';

import {
  fetchFufilled,
  fetchFailed,
  mergeFetchCallFufilled,
  concatMapFufuilled,
  concatMap2Fufilled
} from '../actions'


const fetchCall = async url => {
  try{
    const res = await fetch(url);
    return await res.json();
  }
  catch(err){
    return undefined;
  }
}

const sleep = n => new Promise(resolve => setTimeout(() => {
  resolve();
},n));


const multipleObservableHelper = observer => async (loadingType,url,type,errorMessage) => {
  try{
    //start loading
    observer.next(loadingType)
    await sleep(2000);
    //start fetching
    const firstCall = await fetchCall(url);
    //fetch success
    observer.next(type);
    await sleep(2000);
  }
  catch(err){
    console.log('error inside of helper called')
    throw new Error(errorMessage)
  }
}

const MultipleObservable = Observable.create(async observer => {
    try{
      const helper = multipleObservableHelper(observer);
      await helper(
          {type:FETCH_FIRST_LOADING_START},
          'https://jsonplaceholder.typicode.com/users',
          {type:FETCH_FIRST_SUCCESS},
          "first fetch failed"
        )

        await helper(
          {type:FETCH_SECOND_LOADING_START},
          'https://jsonplaceholder.typicode.com/users',
          {type:FETCH_SECOND_SUCCESS},
          "second fetch failed"
          )

      observer.next({type: FETCH_FUFILLED});
      observer.complete();
    }
    catch(err){
      console.log('error is called')
      observer.error(err);
    }
})


const fetchCallEpic = action$ =>
action$.ofType(FETCH_DATA)
.debounceTime(3000)
.switchMapTo(MultipleObservable)
.map(x => fetchFufilled(x))
.catch(err => fetchFailed(err))


const mergeFetchCallEpic = action$ =>
action$.ofType(FETCH_MERGE_CALL)
.mergeMap(() =>
  Observable.forkJoin(
    Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/users')),
    Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/posts'))
  ),
  (a,res) => {
    return mergeFetchCallFufilled(res)
  }
)




const concatMapFetchEpic = action$ =>
action$.ofType(CONCATMAP_CALL)
.mergeMap(
  () => Observable.fromPromise(fetchCall('https://jsonplaceholder.typicode.com/users')),
  (a,res) => res.concatMapFufuilled(res)
)








// const ajaxCallfromBeer = async (beerName) => {
//   try{
//     const URL = 'https://api.punkapi.com/v2/beers/'
//     let response = await fetch(`${URL}?beer_name=${beerName}`)
//     let result = await response.json();
//     if(result.statusCode === 404){
//       return Promise.reject(result.message)
//     }
//     return result;
//   }
//   catch(err){
//     return err.message;
//   }
// }
//
// const loadEpic = action$ => {
//   return action$.ofType(CLICK)
//   .switchMap(() => Observable.of(clearClick()).delay(2000))
// }
//
// const ajaxEpic = action$ => {
//   return action$.ofType(FETCH_USER)
//   .switchMap(() => Observable.fromPromise(ajaxUser()))
//   .map(user => fetchUserFufilled(user))
// }
//
// const hackerNewsEpic = action$ => {
//   return action$.ofType(FETCH_HACKER_NEWS)
//   .switchMap(() => Observable.fromPromise(ajaxHackerNews()))
//   .map(ids => ids.slice(0,5))
//   .map(ids => ids.map(id =>Observable.fromPromise(ajaxHackerNewsIndividual(id))))
//   .switchMap(ids => Observable.forkJoin(ids))
//   .map(news => fetchHackerNewsFufilled(news))
// }
//
// const searchBeerEpic = action$ => {
//   return action$.ofType(SEARCH_BEER)
//   .takeUntil(action$.ofType(CANCEL_SEARCH_BEER))
//   .distinctUntilChanged()
//   .debounceTime(500)
//   .switchMap(({payload}) =>{
//     return  Observable.fromPromise(ajaxCallfromBeer(payload)).delay(500)
//   })
//   .map(beer => searchBeerFufilled(beer))
//   .catch(err => Observable.of(serchBeerError(err)))
// }


const rootEpic = combineEpics(
  fetchCallEpic,
  mergeFetchCallEpic,
  concatMapFetchEpic
);



export default rootEpic;
