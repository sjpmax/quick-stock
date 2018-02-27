import React, { Component } from 'react';
import './add-stock.css';

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.state = { stockName: '' };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addStock = this.addStock.bind(this);
  }
  handleUpdate(event) {
    this.setState({ stockName: event.target.value });
  }
  addStock() {
  this.props.addStock(this.state.stockName);
  this.setState({ stockName: '' });
}
  render() {
    return (
      <div className="AddStock">      
        <input type="text" onChange={this.handleUpdate} value={this.state.stockName}/>
        &nbsp;&nbsp;
        <button onClick={this.addStock}>Add</button>
      </div>
    );
  }
}

export default AddStock;