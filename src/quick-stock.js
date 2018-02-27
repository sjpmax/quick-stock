import React, { Component } from 'react';
import './quick-stock.css';

import axios from 'axios';
import stocksList from './config.json';

class QuickStock extends Component {
	constructor(props) {
	  super(props);
      this.state = { stockPrice: '0.00' };
      this.removeStock = this.removeStock.bind(this);
      this.updateStocks = this.updateStocks.bind(this);	
	}
	//componentDidMount(){setInterval(this.updateStocks,60000);}
	updateStocks(stockName){
    	//const stockListing = this.state.stocks;
    	axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&outputsize=compact&symbol=' + stockName + '&interval=1min&apikey=' + stocksList.apiKey)
            .then(function(response) {
            	console.log(stockName);
               
               var stockInfo = response.data["Time Series (1min)"]
				for(var key in stockInfo) {var firstone = stockInfo[key]; break; }

var curPrice = firstone["4. close"];
 console.log("price " + curPrice);
if (curPrice !== undefined)
this.setState({stockPrice: curPrice});

            });
    }
removeStock() {
  this.props.removeStock(this.props.name);
}
 	render() {
	   return (
	    <div className="QuickStock">
	      {this.props.name}: {this.state.stockPrice} !
	     {
            	this.updateStocks(this.props.name)
            }
      <button onClick={this.removeStock}>Remove Me!</button>
	    </div>
	  )
};
}

export default QuickStock;		