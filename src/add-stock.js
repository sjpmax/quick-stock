import React, { Component } from 'react';
import './add-stock.css';

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.state = { stockName: '' };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addStock = this.addStock.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  handleUpdate(event) {
    this.setState({ stockName: event.target.value });
  }
  addStock() {
  this.props.addStock(this.state.stockName);
  this.setState({ stockName: '' });
}
keyPress(e){
      if(e.keyCode === 13){
        //why isn't this.addStock working? it just passes by the code.
        this.props.addStock(this.state.stockName);
        this.setState({ stockName: '' });
      }
   }
  render() {
    return (
      <div className="AddStock">      
        <input type="text" onChange={this.handleUpdate} value={this.state.stockName} onKeyDown={this.keyPress}/>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-info" onClick={this.addStock}>Add</button>
      </div>
    );
  }
}

export default AddStock;