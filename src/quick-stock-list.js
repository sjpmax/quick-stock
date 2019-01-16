import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js';     

const API = 'https://api.robinhood.com/quotes/?symbols=';
const newAPI = 'https://api.iextrading.com/1.0/stock/market/batch?symbols=';
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
            errorMessage: null,
            time: ''
        };
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }
    componentDidMount(){
        //const completeURL = 'https://cors-anywhere.herokuapp.com/' + API + stocksList;
        const completeURL = newAPI + stocksList + '&types=quote&range=1m&last=5';
        this.setState({ isLoading: true });
        fetch(completeURL)
    	 /*fetch(completeURL,{
        headers: {
            origin: "https://api.robinhood.com"
        }})*/

        .then(response => response.json())

        .then(data => this.setState({ stockData: data, isLoading: false }))
        .catch(error => this.setState({ errorMessage: error, isLoading: 'blocked' }));

    }
    componentDidUpdate() {
        localStorage.setItem("stockList", JSON.stringify(this.state.stocks));
    }
    render() {
    	const { isLoading } = this.state;
        if (isLoading) {
          return <div className = "QuickStockList">Loading, please be patient</div>;
      }
      if (isLoading === 'blocked')
      {
          return <div className = "QuickStockList">Call failed. Please reload.</div>; 
      }
      return ( <
        div className = "QuickStockList" >
        <
        AddStock addStock = {
            this.addStock
        }
        /> 
    }

    {stocksList}
    <table className="table table-striped">
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
    let filteredStocks = this.state.stocks.filter(function(item){
        console.log(item)
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
    if(this.state.stockData.length > 0  || JSON.stringify(this.state.stockData).length > 2 ){
        var stockObj= JSON.stringify(this.state.stockData); 
        stockObj = JSON.parse(stockObj);
        return Object.keys(stockObj).map((key, index) =>
           ( <
                QuickStock key = {
                    stockObj[key]["quote"]
                }
                stockData = {
                    stockObj[key]
                }
                removeStock = {
                    this.removeStock
                }
                />
                ) 
        )

        /*if(stockObj != null){
            return stockObj.map(symbol => ( <
                QuickStock key = {
                    stockObj[key]["quote"]
                }
                stockData = {
                    stockObj[key]
                }
                removeStock = {
                    this.removeStock
                }
                />
                )
            );
        }*/
    }
}
}


export default QuickStockList;