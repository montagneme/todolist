import React from 'react';
import './ListItem.css'
import { message,Modal,Button } from 'antd';
import { CloseOutlined,CheckOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import VariableInput from '../VariableInput/VariableInput'
const { confirm } = Modal;
/*
    列表中的条目组件
*/
export default class ListItem extends React.Component{
    constructor(props){
      super(props);
      this.state={};
      //定义列表序号颜色
      this.todoListNumberConfig=['130,214,185','220,49,47','107,189,242','180,180,180']
    }
    todoTextActive(i,e){
      this.props.onTodoTextActive(i);
      //等节点重渲染完后再聚焦
      setTimeout(()=>{ 
        this.inputRef.focus();
      },0);
    }
    todoTextOk(i,e){
      this.props.onTodoTextOk(i); 
      e.stopPropagation();
    }
    todoTextNo(i,e){
      this.props.onTodoTextNo(i); 
      e.stopPropagation();
    }
    todoTextDel(i,e){
      this.deleteConfirm(()=>{
        this.props.onTodoTextDel(i);
      },()=>{
        message.info('已取消');
      });
      e.stopPropagation();
    }
    deleteConfirm(ok,no) {
      confirm({
        title: '删除待办事项',
        icon: <ExclamationCircleOutlined />,
        content: '你确定要删除此条待办事项吗？',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          ok();
        },
        onCancel() {
          no();
        },
      });
    }
    render(){
      return (
        <li key={this.props.info.id} onClick={this.todoTextActive.bind(this,this.props.index)} className={this.props.info.todoTextActive?'todolist-item-active':''}>
          {
            this.props.index<this.todoListNumberConfig.length-1
            ?<div className="todolist-number" style={{backgroundColor:`rgb(${this.todoListNumberConfig[this.props.index]})`,boxShadow:`0px 4px 8px -2px rgba(${this.todoListNumberConfig[this.props.index]},0.5)`}}>{this.props.index+1}</div>
            :<div className="todolist-number" style={{backgroundColor:`rgb(${this.todoListNumberConfig[3]})`,boxShadow:`0px 4px 8px -2px rgba(${this.todoListNumberConfig[3]},0.5)`}}>{this.props.index+1}</div>
          }
          <VariableInput
          info={this.props.info}
          index={this.props.index}
          onTodoTextChange={this.props.onTodoTextChange}
          ref={(ref)=>this.inputRef=ref}
          />
          {
            this.props.info.todoTextActive
            ?<div>
              <div className="todolist-button todolist-button-circle" style={{right:'60px'}}>
                <Button type="primary" shape="circle" size="small" danger icon={<CloseOutlined />} onClick={this.todoTextNo.bind(this,this.props.index)}/>
              </div>
              <div className="todolist-button todolist-button-circle">
                <Button type="primary" shape="circle" size="small" icon={<CheckOutlined />} onClick={this.todoTextOk.bind(this,this.props.index)}/>
              </div>
            </div>
            :<div className="todolist-button">
              <Button type="primary" danger size="small" onClick={this.todoTextDel.bind(this,this.props.index)}>删除</Button>
            </div>
          }
          
        </li>
      )
    }
  }