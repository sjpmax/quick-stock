import React, {
    Component
} from 'react';
import './quick-stock.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import stocksList from './config.json';
import $ from 'jquery'; 



class QuickStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockPrice: "loading",
             time: '',
             openPrice: 0
        };
        this.removeStock = this.removeStock.bind(this);
        this.updateStocks = this.updateStocks.bind(this);
    }
    componentDidMount(){
      this.updateStocks();
      setInterval(this.updateStocks,60000);
    $(function () {
  $('[data-toggle="popover"]').popover()
})}
    updateStocks() {
        //const stockListing = this.state.stocks;
        let currentComponent = this;
          var stockName = currentComponent.props.name;        
        axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + stockName + '&interval=1min&apikey=' + stocksList.apiKey)
            .then(function(response) {
                console.log(stockName);

                var stockInfo = response.data["Time Series (1min)"]
                for (var key in stockInfo) {
                    var firstOne = stockInfo[key];
                    var thisTime = key.substring(key.length - 8);
                    break;
                }
                var curPrice = '';
                curPrice = firstOne["4. close"];
                console.log("price " + curPrice + " at " + thisTime);
                if (curPrice !== undefined)
                    currentComponent.setState({
                        stockPrice: curPrice,
                        time : "Last refresh: " +thisTime,
                        openPrice : "Opened at $" +firstOne["1. open"]
                    });

            })
            .catch(function(error) {
                console.log(error);
            });
    }
    removeStock() {
        this.props.removeStock(this.props.name);
    }
    render() {
        return ( <
            div className = "QuickStock" > {this.props.name}: <a data-toggle="popover" data-trigger="hover" title= {this.props.name} data-content={this.state.time}>{
                this.state.stockPrice
            }</a>!
            <button type="button" className="btn btn-danger" onClick = {this.removeStock}>X</button>
           < /
            div >
        )
    };
}

export default QuickStock;