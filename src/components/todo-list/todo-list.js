import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList =({todos,onDeletedMain,onToggleImportant,onToggleDone})=>{

  const elements= todos.map((item)=>{
    const {id, ...itemProps}=item;
    return (
     <li key={id} className="list-group-item">
       <TodoListItem {...itemProps}
       onDeleted={()=>onDeletedMain(id)}
       onToggleImportant={()=>onToggleImportant(id)}
       onToggleDone={()=>onToggleDone(id)}
         />
     </li>
   );
  });

  return (
    <ul className="list-group todo-list">
      { elements.length? elements:"No items found" }
    </ul>
  );
};

export default TodoList;
