import React,{Component} from 'react';
import './button-status-item.css';

export default class ButtonStatusItem extends Component {
  render(){
    let {classNameButton}=this.props;
    const {label,onToggleFilter}=this.props;
    classNameButton+=" btn";
    return (
      <button
      type="button"
      className={classNameButton}
      onClick={onToggleFilter}
      >{label}</button>
    );
  }
};
