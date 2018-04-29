import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';

const API = 'https://api.robinhood.com/quotes/?symbols=';
let stocksList = JSON.parse(localStorage.getItem("stockList"));


class QuickStockList extends Component {
    constructor(props) {
        
        if (stocksList == null) {
            stocksList = ["ATVI", "SPWR", "TEAM"];
            localStorage.setItem("stockList", JSON.stringify(stocksList));
        }
        
        super(props);
        this.state = {
            stocks: stocksList,
            stockData: [],
            isLoading: false,
             error: null,
            time: ''
        };
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }
    componentDidMount(){
    	 this.setState({ isLoading: true });
    	 fetch(API + stocksList)
      .then(response => response.json())
      .then(data => this.setState({ stockData: data.results, isLoading: false }));

    }
    componentDidUpdate() {
        localStorage.setItem("stockList", JSON.stringify(this.state.stocks));
    }
    render() {
    	const { isLoading } = this.state;
	   if (isLoading) {
      return <div className = "QuickStockList">Loading, please be patient</div>;
    }
        return ( <
                div className = "QuickStockList" >
                <
                AddStock addStock = {
                    this.addStock
                }
                /> 
<table className="table table-striped table-sm">
  <thead>
    <tr><th scope="col">Symbol</th>
      <th scope="col">Price</th>
      <th scope="col">Change</th>
      <th scope="col">Remove</th></tr>
    </thead><tbody>
                {
                this.renderStocks()
            }
            </tbody>
</table>
            <
            /div>
    );
}
addStock(newStock) {
    if (!this.state.stocks.includes(newStock.toUpperCase())) {
        fetch(API + newStock.toUpperCase())
            .then(response => response.json())
            .then(data => {
                var tempDataHolder = this.state.stockData.slice();
                tempDataHolder.push(data.results[0]);
                this.setState({
                    stockData: tempDataHolder,
                    isLoading: false,
                    stocks: [...this.state.stocks, newStock.toUpperCase()]
                })
            })
            .catch((error) => {
                console.error(error);
            });

    } else {
        console.log('hey dont do that');
    }
}
removeStock(removeStock) {
    
    let filteredStocks = this.state.stockData.filter(function(item){
   return item.symbol !==removeStock;
});
   let permList = this.state.stocks.filter(name => {
        return name !== removeStock;
    });
    this.setState({
        stockData: filteredStocks,
        stocks: permList
    });

}


renderStocks() {
    return this.state.stockData.map(symbol => ( <
        QuickStock key = {
            symbol.symbol
        }
        stockData = {
            symbol
        }
        removeStock = {
            this.removeStock
        }
        
        />
    ));
}
}


export default QuickStockList;