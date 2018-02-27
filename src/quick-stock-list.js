import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';
import stocksList from './config.json';


class QuickStockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: stocksList.stocks
        };
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
        /*this.updateStocks = this.updateStocks.bind(this);*/
    }

    /*componentDidMount(){setInterval(this.updateStocks,60000);}*/

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
           	
           </div>
        );
    }
    addStock(newStock) {
        this.setState({
            stocks: [...this.state.stocks, newStock]
        });
    }
    /*updateStocks(stockNames){
    	const stockListing = this.state.stocks;
    	axios.get('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=' + stocksList.stocks + '&apikey=' + stocksList.apiKey)
            .then(function(response) {
            	console.log(stockNames);
                console.log(response);
            });
    }*/
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