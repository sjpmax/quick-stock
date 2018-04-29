import React, {
    Component
} from 'react';
import './quick-stock.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';



class QuickStock extends Component {
    constructor(props) {
        super(props);
        var getTime = new Date(Date.parse(props.stockData.updated_at));
        var thisStyle = '';
        if (props.stockData.last_trade_price >= props.stockData.previous_close)
            thisStyle = "goodGreen";
        else
            thisStyle = "badRed";
        var dayChange = props.stockData.last_trade_price-props.stockData.previous_close;
        dayChange = dayChange.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var pChange = ((dayChange/props.stockData.previous_close)*100).toFixed(2);
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
        this.props.removeStock(this.props.stockData.symbol);
    }
    render() {
        return (<tr>< th scope="row"> <a data-toggle = "popover"
            data-trigger = "hover"
            title = {
                this.props.stockData.symbol
            }
            data-content = {
                "Last update at: " + this.state.getTime
            } > {
                this.props.stockData.symbol
            }:
            </a></th>
            <td> {
                this.props.stockData.last_trade_price
            } </td>
            <td> <span className={
                this.state.stockStyle
            }>  {
                this.state.stockChange
            }</span> ({this.state.percentageChange}%)</td>
            
            <td> <
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