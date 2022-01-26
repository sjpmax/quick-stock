import React, {
    Component
} from 'react';
import './quick-stock.css';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;


//import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
const bootstrap = require('bootstrap');
class QuickStock extends Component {
    constructor(props) {
        super(props);
        var getTime = new Date(props.stockData[1]["quote"].iexLastUpdated);
        var hours = getTime.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + getTime.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + getTime.getSeconds();
         var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var thisStyle = '';
        if (props.stockData[1]["quote"].latestPrice >= props.stockData[1]["quote"].previousClose) 
            thisStyle = "goodGreen";
        else
            thisStyle = "badRed";
        var dayChange = props.stockData[1]["quote"].latestPrice-props.stockData[1]["quote"].previousClose;
        dayChange = dayChange.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var pChange = ((dayChange/props.stockData[1]["quote"].previousClose)*100).toFixed(2);
        this.state = {
            stockPrice: "loading",
            getTime: getTime,
            stockStyle: thisStyle,
            stockChange: dayChange,
            percentageChange: pChange
        };
        this.removeStock = this.removeStock.bind(this);
    }

    componentDidMount() {
        $(function() {
            $('[data-toggle="popover"]').popover()
        })
    }

    removeStock() {
        this.props.removeStock(this.props.stockData);
    }
    render() {
        const urlClick = 'https://www.google.com/search?q=' + this.props.stockData[1]["quote"].symbol;
        const rowID = "stock-" + this.props.stockData[1]["quote"].symbol;
        return (<tr id={rowID}>< th scope="row"> <a data-toggle = "popover"
            data-trigger = "hover"
            title = {
                this.props.stockData[1]["quote"].symbol
            }
            data-content = {
                "Last update at: " + this.state.getTime
            } href={urlClick} target="_blank" rel="noopener noreferrer"> {this.props.stockData[1]["quote"].symbol}:
            </a></th>
            <td> {
                this.props.stockData[1]["quote"].latestPrice
            } </td>
            <td> <span className={
                this.state.stockStyle
            }>  {
                this.state.stockChange
            }</span> ({this.state.percentageChange}%)</td><td> <
            button type = "button"
            aria-label = "Close"
            className = "close "
            onClick = {
                this.removeStock
            } > X </button></td></tr>
        )
    };
}

export default QuickStock;