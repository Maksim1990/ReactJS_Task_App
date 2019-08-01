import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId=100;
  state ={
    filteredData:[],
    useFilter:false,
    todoData : [
      this.createTodoItem('Wake up 7:30am'),
      this.createTodoItem('Morning jogging'),
      this.createTodoItem('Take a breakfast')
    ],
    buttons:[
      this.createButtonItem('All','all'),
      this.createButtonItem('Active','active'),
      this.createButtonItem('Done','done')
    ],
    currentButtonType:'',
    strFilterValue:''
  }

  //Create button items for intial data
  createButtonItem(label,type){
    return {
      classNameButton:type!=='all'?"btn-outline-secondary":"btn-info",
      label:label,
      type:type,
      id: this.maxId++,
    };
  }

  //Create TODO items for intial data
  createTodoItem(label){
    return{
      label:label,
      important:false,
      id: this.maxId++
    }
  }

  deleteItem=(id)=>{
    this.setState(({todoData,filteredData,useFilter})=>{
      return {
        todoData: this.deleteItemFromArray(id,[...todoData]),
        filteredData: useFilter?this.deleteItemFromArray(id,[...filteredData]):[],
      }
    });
  }

  //Delete item from initial or filtered data
  deleteItemFromArray=(id,arr)=>{
    const idx=arr.findIndex((el)=>el.id===id);
    const before =arr.slice(0,idx);
    const after =arr.slice(idx+1);
    const newArray=[...before, ...after];
    return newArray;
  }

  addItem=(text)=>{
    this.setState(({todoData})=>{
      let arrCurrentData=todoData;
      arrCurrentData.push(
        this.createTodoItem(text)
      );
      return {
        todoData:arrCurrentData
        }
      });
  }

  //Toggle 'important' or 'done' properties on arrays
  toggleStateProperty=(id,arr,propertyName,buttonType='all')=>{
      const idx=arr.findIndex((el)=>el.id===id);
      const oldItem=arr[idx];
      const newItem={...oldItem, [propertyName]:!oldItem[propertyName]};
      if(propertyName==='done' && (buttonType==='active' || buttonType==='done')){
        return [...arr.slice(0,idx), ...arr.slice(idx+1)];
      }else{
        return [...arr.slice(0,idx),newItem, ...arr.slice(idx+1)];
      }
  }

  //Listen click event on important
  onToggleImportant=(id)=>{
    this.setState(({todoData,filteredData})=>{
      return {
        filteredData:filteredData.length>0?this.toggleStateProperty(id,filteredData,'important'):[],
        todoData:this.toggleStateProperty(id,todoData,'important')
      };
    });
  }

  //Listen click event on done
  onToggleDone=(id)=>{
    this.setState(({todoData,filteredData,currentButtonType})=>{
      return {
        filteredData:filteredData.length>0?this.toggleStateProperty(id,filteredData,'done',currentButtonType):[],
        todoData:this.toggleStateProperty(id,todoData,'done')
      };
    });
  }

  //Listen event on changing filter input
  onFilter=(value)=>{
    this.setState(({todoData,filteredData,useFilter,currentButtonType})=>{
      let arrToFilter=useFilter?
      this.getFilteredDataAfterButtonClick(todoData,currentButtonType,value)
      :[...todoData];
      if(currentButtonType==='' || currentButtonType==='all'){
        arrToFilter=[...todoData];
        useFilter=value !==''?true:false;
      }else{
        useFilter=true;
      }
      const arrFiltered=arrToFilter.filter((item)=>{
        return item.label.toLowerCase().includes(value);
      });
      return {
        filteredData:arrFiltered,
        useFilter:useFilter,
        strFilterValue:value
      };
    });
  }

  //Listen changing of filter button types
  toggelFilterType=(buttonId)=>{
    this.untoggleFilterButton();
    this.setState(({buttons,todoData,strFilterValue})=>{
      const idx=buttons.findIndex((el)=>el.id===buttonId);
      const buttonType=buttons[idx].type;
      const arrFiltered=this.getFilteredDataAfterButtonClick(todoData,buttonType,strFilterValue);
      const useFilter=(buttonType.toLowerCase() !=='all')?true:(strFilterValue!==''?true:false);
      const oldItem=buttons[idx];
      const newItem={...oldItem, classNameButton:"btn-info"};
      return {
        buttons:[...buttons.slice(0,idx),newItem, ...buttons.slice(idx+1)],
        filteredData:arrFiltered,
        useFilter:useFilter,
        currentButtonType:buttonType.toLowerCase()
        };
    });
  }

  //Return todo list based on current filter button type
  getFilteredDataAfterButtonClick=(todoData,buttonType,strFilterValue)=>{
    let arrFiltered=[];
    switch(buttonType.toLowerCase()) {
        case "active":
        arrFiltered=todoData.filter((item)=>{
          if(strFilterValue===''){
            return !item.done;
          }else{
            return !item.done && item.label.toLowerCase().includes(strFilterValue);
          }
        });
          break;
        case "done":
        arrFiltered=todoData.filter((item)=>{
          if(strFilterValue===''){
            return item.done;
          }else{
            return item.done && item.label.toLowerCase().includes(strFilterValue);
          }
        });
          break;
        default:
        if(strFilterValue===''){
          arrFiltered=[...todoData];
        }else{
          arrFiltered=todoData.filter((item)=>{
              return item.label.toLowerCase().includes(strFilterValue);
            });
        }
      }
    return arrFiltered;
  }

  changeButtonClass=(buttons,classFrom, classTo)=>{
    const idx=buttons.findIndex((el)=>el.classNameButton===classFrom);
    const oldItem=buttons[idx];
    const newItem={...oldItem, classNameButton:classTo};
    return [...buttons.slice(0,idx),newItem, ...buttons.slice(idx+1)];
  }

  untoggleFilterButton=()=>{
    this.setState(({buttons})=>{
    return {
      buttons:this.changeButtonClass(buttons,"btn-info","btn-outline-secondary")
      };
    });
  }

  render(){
    const {todoData,filteredData,useFilter, buttons}=this.state;
    const doneCount=todoData.filter((item)=>{
      return item.done;
    }).length;
    const todoCount=todoData.length-doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel  onFilter={this.onFilter}/>
          <ItemStatusFilter
          buttons={buttons}
          toggelFilterType={this.toggelFilterType}
          />
        </div>

        <TodoList todos={useFilter?filteredData:todoData}
        onDeletedMain={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone}
        />
        <ItemAddForm  onAddItem={this.addItem}/>
      </div>
    );
  }

}
