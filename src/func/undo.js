// import React from 'react';
export default class Undo{
    constructor(func){
        this.undoList=[];
        this.redoList=[];
        this.func=func;
    }
    push=(option)=>{
        //每次push清空redolist
        this.redoList=[];
        console.log(111);
        switch(option.n){
            case 'ADD':
                this.undoList.push({
                    n:'DEL',
                    i:option.i,
                    o:option.o
                })
                break;
            case 'DEL':
                this.undoList.push({
                    n:'ADD',
                    i:option.i,
                    o:option.o
                })
                break;
            case 'UPD':
                this.undoList.push({
                    n:'UPD',
                    i:option.i,
                    ov:option.ov,
                    nv:option.nv
                })
                break;
            case 'FIN':
                this.undoList.push({
                    n:'FIN',
                    i:option.i,
                    s:option.s
                })
                break;
            default:
                break;
        }
    }
    undo=()=>{
        //undo之后向redolist添加
        if(this.undoList.length===0){
            return;
        }
        const option=this.undoList.pop();
        console.log(option);
        switch(option.n){
            case 'ADD':
                this.redoList.push({
                    n:'DEL',
                    i:option.i,
                    o:option.o
                })
                this.func.add(option);
                break;
            case 'DEL':
                this.redoList.push({
                    n:'ADD',
                    i:option.i,
                    o:option.o
                })
                this.func.del(option);
                break;
            case 'UPD':
                this.redoList.push({
                    n:'UPD',
                    i:option.i,
                    ov:option.nv,
                    nv:option.ov
                })
                this.func.upd(option);
                break;
            case 'FIN':
                this.redoList.push({
                    n:'FIN',
                    i:option.i,
                    s:!option.s
                })
                this.func.fin(option);
                break;
            default:
                break;
        }
        console.log(this);
    }
    redo=()=>{
        if(this.redoList.length===0){
            return;
        }
        const option=this.redoList.pop();
        switch(option.n){
            case 'ADD':
                this.undoList.push({
                    n:'DEL',
                    i:option.i,
                    o:option.o
                })
                this.func.add(option);
                break;
            case 'DEL':
                this.undoList.push({
                    n:'ADD',
                    i:option.i,
                    o:option.o
                })
                this.func.del(option);
                break;
            case 'UPD':
                this.undoList.push({
                    n:'UPD',
                    i:option.i,
                    ov:option.nv,
                    nv:option.ov
                })
                this.func.upd(option);
                break;
            case 'FIN':
                this.undoList.push({
                    n:'FIN',
                    i:option.i,
                    s:!option.s
                })
                this.func.fin(option);
                break;
            default:
                break;
        }
    }
}