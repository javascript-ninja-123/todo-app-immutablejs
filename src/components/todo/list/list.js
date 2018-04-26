import React,{Component} from 'react';
import {connect} from 'react-redux';
import {completeTodo,removeTodos,deleteTodo,getTodoSize} from '../../../actions'


class List extends Component {


    componentDidMount() {
      this.props.getTodoSize()
    }

    onClick = id => {
      this.props.completeTodo(id);
    }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.list !== this.props.list){
      this.props.getTodoSize()
    }
  }


    onClickDelete = id => this.props.deleteTodo(id)

    onClickRemove = () => this.props.removeTodos()

    renderTodo = () => {
      return this.props.list.map(value => {
        return (
          <li key={value.get('id')}>
            <p>{value.get('text')}</p>
            <button onClick={() => this.onClickDelete(value.get('id'))}>Delete it</button>
            <button onClick={() => this.onClick(value.get('id'))}>I completed it</button>
            <h4>{value.get('isCompleted') ? 'completed' : "inCompleted"}</h4>
          </li>
        )
      })
    }

    render() {
        return (
            <div className="class-name">
                <h2>Todo List number : {this.props.size}</h2>
                <button onClick={this.onClickRemove}>Remove all list</button>
                <ul>
                  {this.renderTodo()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({input}) {
  const {list,size} = input
  return{list,size}
}


export default connect(mapStateToProps,{getTodoSize,completeTodo,removeTodos,deleteTodo})(List)
