import React, {Component} from 'react';
import ButtonStatusItem from '../button-status-item';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

  render(){
    const {toggelFilterType}=this.props;
    const buttonItems= this.props.buttons.map((item)=>{
      const {id,...itemProps}=item;
      return (
         <ButtonStatusItem
         key={id}
        {...itemProps}
        onToggleFilter={()=>toggelFilterType(id)}
          />
     );
    });

  return (
    <div className="btn-group">
        {buttonItems}
      </div>
  );
  }
}
