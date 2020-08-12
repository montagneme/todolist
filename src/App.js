import React from 'react';
import './App.css';
import { message,Button } from 'antd';
import { CopyOutlined,AppstoreAddOutlined } from '@ant-design/icons';
import ToDoList from './components/ToDoList/ToDoList';
import Undo from './func/undo'
import 'antd/dist/antd.css';
/*
    todoList总组件
*/
export default class App extends React.Component{
  constructor(props){
    super(props);
    //定义撤销、恢复实例
    this.undo=new Undo({
      add:(option)=>{
        this.selectMode(0);
        setTimeout(()=>{
          let list=this.state.list;
          list.splice(option.i,0,option.o);
          this.setState({
            list:list
          });
          this.setStorage(list);
        },0)
      },
      del:(option)=>{
        this.selectMode(0);
        setTimeout(()=>{
          let list=this.state.list;
          list.splice(option.i,1);
          this.setState({
            list:list
          });
          this.setStorage(list);
        },0)
      },
      upd:(option)=>{
        this.selectMode(0);
        setTimeout(()=>{
          let list=this.state.list;
          list[option.i].txt=option.ov;
          this.setState({
            list:list
          });
          this.setStorage(list);
        },0)
      },
      fin:(option)=>{
        this.selectMode(0);
        setTimeout(()=>{
          let list=this.state.list;
          list[option.i].isFinish=option.s;
          this.setState({
            list:list
          });
          this.setStorage(list);
        },0)
      }
    });
    this.state={
      selectMode:0,
      list:[], //todoList列表
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
      if(list[i].rowTxt===''){
        this.undo.push({
          n:'ADD',
          i:i,
          o:list[i]
        })
      }else{
        this.undo.push({
          n:'UPD',
          i:i,
          ov:list[i].rowTxt,
          nv:list[i].txt
        })
      }
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
    let o=list.splice(i,1)[0];
    this.setState({
      list:list
    })
    message.success('删除成功');
    this.undo.push({
      n:'DEL',
      i:i,
      o:o
    })
    this.setStorage(list);
  }
  //添加数据
  todoTextAdd(){
    this.selectMode(0);
    setTimeout(()=>{
      let list=this.state.list;
      const i=list.length===0?0:list[list.length-1].id+1;
      const o={
        id:i,
        txt:'',
        isFinish:false,
        todoTextActive:true,
        rowTxt:''
      }
      list.push(o);
      this.setState({
        list:list,
      })
    },0)
  }
  todoTextFinish(i){
    let list=this.state.list;
    list[i].isFinish=true;
    this.setState({
      list:list
    })
    this.setStorage(list);
    this.undo.push({
      n:'FIN',
      i:i,
      s:false
    })
    setTimeout(()=>{
      this.selectMode(this.state.selectMode,true);
    },0);
  }
  todoTextCancelFinish(i){
    let list=this.state.list;
    list[i].isFinish=false;
    this.setState({
      list:list
    })
    this.setStorage(list);
    this.undo.push({
      n:'FIN',
      i:i,
      s:true
    })
    setTimeout(()=>{
      this.selectMode(this.state.selectMode,true);
    },0);
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
          isFinish:false,
        },
        {
          id:1,
          txt:'熟悉React生态圈',
          isFinish:true,
        },
        {
          id:2,
          txt:'搭建第一个React项目',
          isFinish:false,
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
  selectMode(i,u=false){
    let list=this.state.list;
    if(this.state.selectMode===i&&!u){
      return;
    }
    if(this.state.selectMode===0){
      this.rowList=list;
    }
    switch(i){
      case 0:
        list=this.rowList;
        break;
      case 1:
        list=this.rowList.filter(o=>o.isFinish)
        break;
      case 2:
        list=this.rowList.filter(o=>!o.isFinish)
        break;
      default:
        break;
    }
    this.setState({
      selectMode:i,
      list:list
    })
  }
  render(){
    return (
      <div className="card">
        <div className="todolist-add-button">
          <Button type="primary" icon={<AppstoreAddOutlined />}  onClick={this.todoTextAdd.bind(this)}>添加</Button>
        </div>
        <h3 className="card-title">
          <CopyOutlined /> 
          &nbsp;待办事项列表
          <div className={`todolist-select-button ${this.state.selectMode===0?'todolist-select-button-active':''}`} onClick={this.selectMode.bind(this,0)}>所有</div>
          <div className={`todolist-select-button ${this.state.selectMode===1?'todolist-select-button-active':''}`} onClick={this.selectMode.bind(this,1)}>已完成</div>
          <div className={`todolist-select-button ${this.state.selectMode===2?'todolist-select-button-active':''}`} onClick={this.selectMode.bind(this,2)}>未完成</div>
        </h3>
        <ToDoList 
        list={this.state.list} 
        onTodoTextChange={this.todoTextChange.bind(this)}
        onTodoTextActive={this.todoTextActive.bind(this)}
        onTodoTextOk={this.todoTextOk.bind(this)}
        onTodoTextNo={this.todoTextNo.bind(this)}
        onTodoTextDel={this.todoTextDel.bind(this)}
        onTodoTextFinish={this.todoTextFinish.bind(this)}
        onTodoTextCancelFinish={this.todoTextCancelFinish.bind(this)}
        />
        <div className="todolist-undo">
          <div className={`todolist-undo-button `} style={{marginLeft:'0'}} onClick={this.undo.undo}>撤销</div>
          <div className={`todolist-undo-button `} onClick={this.undo.redo}>恢复</div>
        </div>
        <p className="card-notice">注：点击列表可进行修改，新增后必须输入文字否则会被直接删除</p>
      </div>
    );
  }
  
}

