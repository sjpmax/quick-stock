import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';
import axios from 'axios';
const API = 'https://api.robinhood.com/quotes/?symbols=';


class QuickStockList extends Component {
    constructor(props) {
        let stocksList = JSON.parse(localStorage.getItem("stockList"));
        if (stocksList == null) {
            stocksList = ["ATVI", "SPWR", "TEAM"];
            localStorage.setItem("stockList", JSON.stringify(stocksList));
        }
        axios.get('https://api.robinhood.com/quotes/?symbols='+stocksList)
            .then(function(response) {
                console.log(response);});

        super(props);
        this.state = {
            stocks: stocksList,
            time: ''
        };
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }
    componentDidUpdate() {
        localStorage.setItem("stockList", JSON.stringify(this.state.stocks));
    }
    render() {
        return ( <
                div className = "QuickStockList" >
                <
                AddStock addStock = {
                    this.addStock
                }
                /> {
                this.renderStocks()
            }

            <
            /div>
    );
}
addStock(newStock) {
	if (!this.state.stocks.includes(newStock.toUpperCase())){
    this.setState({
        stocks: [...this.state.stocks, newStock.toUpperCase()]
    });
}
else
{
	console.log('hey dont do that');
}
}
removeStock(removeStock) {
    const filteredStocks = this.state.stocks.filter(name => {
        return name !== removeStock;
    });
    this.setState({
        stocks: filteredStocks
    });

}


renderStocks() {
    return this.state.stocks.map(name => ( <
        QuickStock key = {
            name
        }
        name = {
            name
        }
        removeStock = {
            this.removeStock
        }
        />
    ));
}
}


export default QuickStockList;