import React from 'react';
import './ToDoList.css'
import { CSSTransition,TransitionGroup } from "react-transition-group";
import ListItem from '../ListItem/ListItem'
/*
    列表组件
*/
export default class ToDoList extends React.Component{
    constructor(props){
      super(props);
      this.state={};
    }
    render(){
      return (
        <ul className="todolist">
          <TransitionGroup>
            {
              this.props.list.map((o,i)=>
                <CSSTransition
                key={o.id}
                timeout={500}
                classNames="todolist-ani">
                  <ListItem
                  info={o}
                  index={i}
                  onTodoTextChange={this.props.onTodoTextChange}
                  onTodoTextActive={this.props.onTodoTextActive}
                  onTodoTextOk={this.props.onTodoTextOk}
                  onTodoTextNo={this.props.onTodoTextNo}
                  onTodoTextDel={this.props.onTodoTextDel}
                  />
                </CSSTransition>
              )
            }
          </TransitionGroup>
        </ul>
      );
    }
  }