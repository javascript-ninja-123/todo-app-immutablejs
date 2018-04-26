import React,{Component} from 'react';
import Input from './input/input'
import List from './list/list'

 class Todo extends Component {

    render() {
        return (
            <div className="class-name">
                <Input/>
                <List/>
            </div>
        );
    }
}

export default Todo
