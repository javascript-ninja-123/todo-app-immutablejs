import React,{Component} from 'react';
import {lensProp, set} from 'ramda';
import {connect} from 'react-redux';
import {addTodo} from '../../../actions';

const stateLens = lensProp('input')
const setInput = set(stateLens)


class Input extends Component {

    state ={
      input:''
    }


    onChange = (e) => {
      const changeInput = setInput(e.target.value)
      this.setState(changeInput)
    }

    onClick = () => {
      this.props.addTodo(this.state.input)
      const changeInput = setInput('')
      this.setState(changeInput)
    }

    render() {
        return (
            <div className="Input">
                <input type='text' onChange={this.onChange} value={this.state.input}/>
                <button onClick={this.onClick}>Add</button>
            </div>
        );
    }
}


export default connect(null,{addTodo})(Input)
