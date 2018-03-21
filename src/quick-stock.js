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
            openPrice: 0,
            stockStyle: "neutralBlack"
        };
        this.removeStock = this.removeStock.bind(this);
        this.updateStocks = this.updateStocks.bind(this);
    }

    componentDidMount() {
        this.updateStocks();
        setInterval(this.updateStocks, 60000);
        $(function() {
            $('[data-toggle="popover"]').popover()
        })
    }

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
                var thisStyle = '';
                curPrice = firstOne["4. close"];
                console.log("price " + curPrice + " at " + thisTime);
                if (curPrice !== undefined) {
                    if (curPrice >= firstOne["1. open"])
                        thisStyle = "goodGreen";
                    else
                        thisStyle = "badRed";
                    currentComponent.setState({
                        stockPrice: curPrice,
                        time: "Last refresh: " + thisTime,
                        openPrice: "Opened at $" + firstOne["1. open"],
                        stockStyle: thisStyle
                    });
                }

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
            div className = "QuickStock" > {
                this.props.name
            }: < a data-toggle = "popover"
            data-trigger = "hover"
            title = {
                "this is neat : " + this.props.name
            }
            data-content = {
                this.state.time
            } >
            <
            span className = {
                this.state.stockStyle
            } > {
                this.state.stockPrice
            } < /span></a > !
            <
            button type = "button"
            aria-label = "Close"
            className = "close"
            onClick = {
                this.removeStock
            } > X < /button> <
            /
            div >
        )
    };
}

export default QuickStock;