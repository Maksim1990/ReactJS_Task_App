import React,{Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component{


  onFilterData=(event)=>{
    const {onFilter}=this.props;
    const val=event.target.value.trim();
    onFilter(val);
  }

  render(){
    return (
      <input type="text"
                onChange={this.onFilterData}
                className="form-control search-input"
                placeholder="type to search" />
    )
  }
}
