import React,{Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component{
  state={
    label:''
  }
  addNewItem=(label)=>{
    this.props.onAddItem(label);
  }

  onLabelChange=(event)=>{
    this.setState({label:event.target.value})
  }
  onSubmit=(event)=>{
    event.preventDefault();
    this.addNewItem(this.state.label);
    this.setState({label:''})
  }

  render(){
    return (
    <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
    <input type="text"
    className="form-control"
    onChange={this.onLabelChange}
    value={this.state.label}
    placeholder="What needs to be done?" />
      <button
      className="btn btn-success"
      >Add item</button>
    </form>
    );
  }
}
