import React,{Component} from 'react';
import styles from './app.scss';
import {connect} from 'react-redux';
import {fetchCall,mergeFetchCall,concatMapFetch} from '../../actions'
import {inc, dec, lensPath, over} from 'ramda'
import Todo from '../todo/todo'


const countLens = lensPath(['innerState','count']);
const increaseCount = over(countLens,inc)
const decreaseCount = over(countLens,dec)

class App extends Component {

    state = {
      innerState:{
        count:0
      }
    }
    onClick = () => {
      console.log('button is clicked')
      this.props.fetchCall()
    }
    mergeMapClick = () => {
      console.log('merge map clicked')
      this.props.mergeFetchCall();
    }

    concatMapClick = () => {
      console.log('concat map clicked');
      this.props.concatMapFetch();
    }

    switchMapClick = () => {
      console.log('switchMap clicked')
    }

    inc = () => {
        this.setState(increaseCount)
    }

    dec = () => {
        this.setState(decreaseCount)
    }

    render() {
        return (
            <div className={styles.app}>
                <button onClick={this.onClick}>click to fetch</button>
                <button onClick={this.mergeMapClick}>Click to forkJoin</button>
                <button onClick={this.concatMapClick}>ConcatMap</button>
                <button onClick={this.switchMapClick}>switchMap</button>
                <button onClick={this.inc}>Increase number</button>
                <button onClick={this.dec}>Decrease Number</button>
                <div>
                    <p>first loader: {this.props.firstLoader ? "true" : "false"}</p>
                  <p>{this.props.firstCheck ? "true" : "false"}</p>
                    <p>second Loader: {this.props.secondLoader ? "true" : "false"}</p>
                  <p>{this.props.secondCheck ? "true" : "false"}</p>
                  <p>{this.props.allSuccess ? "true" : "false"}</p>
                </div>


                <div>
                  {this.state.innerState.count}
                </div>

                <Todo/>
            </div>
        );
    }
}

function mapStateToProps({fetch}) {
  const {firstCheck,
  secondCheck,
  firstLoader,
  secondLoader,
  allSuccess} = fetch;
  return{firstCheck,secondCheck,allSuccess,firstLoader,secondLoader}
}

export default connect(mapStateToProps,{fetchCall,mergeFetchCall,concatMapFetch})(App);
