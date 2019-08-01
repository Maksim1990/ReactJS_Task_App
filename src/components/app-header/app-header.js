import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header ">
      <div><h2>ReactJS TODO List APP</h2></div>
      <h3>{toDo} more to do, {done} done</h3>
    </div>
  );
};

export default AppHeader;
