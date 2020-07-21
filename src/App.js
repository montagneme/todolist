import React from 'react';
import './App.css';
import { message,Button } from 'antd';
import { CopyOutlined,AppstoreAddOutlined } from '@ant-design/icons';
import ToDoList from './components/ToDoList/ToDoList';
import 'antd/dist/antd.css';
/*
    todoList总组件
*/
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[] //todoList列表
    }
  }
  //输入框值改变后调用
  todoTextChange(i,v){
    console.log(i);
    let list=this.state.list;
    list[i].txt=v;
    this.setState({
      list:list
    })
  }
  //切换数据可编辑状态
  todoTextActive(i){
    let list=this.state.list;
    if(!list[i].todoTextActive){
      list[i].todoTextActive=true;
      list[i].rowTxt=list[i].txt;
      this.setState({
        list:list
      })
    }
  }
  //确认更改
  todoTextOk(i){
    let list=this.state.list;
    if(list[i].txt===''){
      this.todoTextDel(i);
    }else{
      list[i].todoTextActive=false;
      this.setState({
        list:list
      })
      message.success('更改成功');
    }
    console.log(this.state.list);
    this.setStorage(list);
  }
  //取消更改
  todoTextNo(i){
    let list=this.state.list;
    if(list[i].rowTxt===''){
      this.todoTextDel(i);
    }else{
      list[i].todoTextActive=false;
      list[i].txt=list[i].rowTxt;
      list[i].rowTxt='';
      this.setState({
        list:list
      })
    }
    console.log(this.state.list);
    this.setStorage(list);
  }
  //删除数据
  todoTextDel(i){
    let list=this.state.list;
    list.splice(i,1);
    this.setState({
      list:list
    })
    message.success('删除成功');
    this.setStorage(list);
  }
  //添加数据
  todoTextAdd(){
    let list=this.state.list;
    const i=list.length===0?0:list[list.length-1].id+1;
    list.push({
      id:i,
      txt:'',
      todoTextActive:true,
      rowTxt:''
    })
    this.setState({
      list:list
    })
  }
  //本地存储
  setStorage(list){
    localStorage.setItem('todoList',JSON.stringify(list))
  }
  //初始化
  init(){
    let list=JSON.parse(localStorage.getItem('todoList'));
    console.log(list);
    if(list==null){
      //初始化数据
      list=[
        {
          id:0,
          txt:'学习React核心功能',
        },
        {
          id:1,
          txt:'熟悉React生态圈',
        },
        {
          id:2,
          txt:'搭建第一个React项目',
        }
      ]
      localStorage.setItem('todoList',JSON.stringify(list))
    }
    //前端为每条数据添加交互可控属性
    list.forEach(o=>{
      o.todoTextActive=false;
      o.rowTxt=''
    })
    this.setState({
      list:list
    })
  }
  componentDidMount(){
    this.init();
  }
  render(){
    return (
      <div className="card">
        <div className="todolist-add-button">
          <Button type="primary" icon={<AppstoreAddOutlined />} onClick={this.todoTextAdd.bind(this)}>添加</Button>
        </div>
        <h3 className="card-title"><CopyOutlined /> 待办事项列表</h3>
        <ToDoList 
        list={this.state.list} 
        onTodoTextChange={this.todoTextChange.bind(this)}
        onTodoTextActive={this.todoTextActive.bind(this)}
        onTodoTextOk={this.todoTextOk.bind(this)}
        onTodoTextNo={this.todoTextNo.bind(this)}
        onTodoTextDel={this.todoTextDel.bind(this)}
        />
        <p className="card-notice">注：点击列表可进行修改，新增后必须输入文字否则会被直接删除</p>
      </div>
    );
  }
  
}

