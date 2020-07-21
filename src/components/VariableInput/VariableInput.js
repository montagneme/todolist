import React from 'react';
import './VariableInput.css';
/*
    可改变编辑状态的表单组件
*/
export default class VariableInput extends React.Component{
    constructor(props){
      super(props);
      this.state={};
    }
    todoTextChange(i,e){
      this.props.onTodoTextChange(i,e.target.value);
    }
    focus(){
      this.inputRef.focus();
    }
    render(){
      return(
        <input 
        placeholder="请输入文字"
        disabled={!this.props.info.todoTextActive} 
        type="text" 
        className={`todolist-text ${this.props.info.todoTextActive?'todolist-text-active':''}`} 
        onChange={this.todoTextChange.bind(this,this.props.index)}
        value={this.props.info.txt}
        ref={(ref)=>this.inputRef=ref}
        />
      )
    }
  }