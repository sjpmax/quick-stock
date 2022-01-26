import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';
import SortStock from './sort-stock';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "jquery-ui/ui/widgets/sortable.js";
import ReactGA from 'react-ga';
import { Tracker } from 'react-tracker';
const tracker = new Tracker();

ReactGA.initialize('UA-133201130-1');
require('dotenv').config()
const newAPI = 'https://cloud.iexapis.com/v1/stock/market/batch?symbols=';
let stocksList = JSON.parse(localStorage.getItem("stockList"));
let sortOrder = localStorage.getItem("sortOrder");


class QuickStockList extends Component {
    constructor(props) {

        if (stocksList == null) {
            stocksList = ["ATVI", "SPWR", "TEAM"];
            localStorage.setItem("stockList", JSON.stringify(stocksList));
        }
        if (sortOrder == null) {
            sortOrder = "symbola";
            localStorage.setItem("sortOrder", sortOrder);
        }
        
        super(props);
        this.state = {
            stocks: stocksList,
            stockData: [],
            isLoading: false,
            errorMessage: null,
            time: '',
            doStateChange: true
        };
        this.addStock = this.addStock.bind(this);
        this.sortStocksfn = this.sortStocksfn.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }
    componentDidMount(){

        this.fetchData();       
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
        div className = "QuickStockList rounded" >
        <div className="topSplitter"> <
        AddStock addStock = {
            this.addStock
        }
        /> 
        <SortStock  sortStock stocks = {
            this.state.stocks
        } 
        sortStocksfn = {this.sortStocksfn}/>
        </div>

        <table className="table table-striped table-dark">
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
        </div>
        );
  }

  fetchData(){
   const completeURL = newAPI + stocksList + '&types=quote&range=1m&last=5&token=pk_e5274c5939e44b2788e6492c316d519d';
   this.setState({ isLoading: true });
   fetch(completeURL)
   .then(response => response.json())
   .then(data => this.setState({ stockData: Object.entries(data), isLoading: false,doStateChange: false }))
   .catch(error => this.setState({ errorMessage: error, isLoading: 'blocked' }));

    ReactGA.event({
      category: 'User',
      action: 'Stocks Fetched'
    });
} 

sortStocksfn(sortStatus,stateChange)
{
    var sortedStocks = [];
    var sortStyle = "symbol";
    if(localStorage.getItem("sortOrder").length > 0)
        sortStyle = localStorage.getItem("sortOrder");
    if(sortStatus instanceof Array === false && sortStatus !== undefined){
        sortStyle = sortStatus.target.value.toString();         
        localStorage.setItem("sortOrder", sortStyle);
    }
    switch(sortStyle){
        case("changea"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            return a[1]["quote"].change - b[1]["quote"].change;
        })
        break;
        case("changed"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            return b[1]["quote"].change - a[1]["quote"].change;
        })
        break;
        case("symbola"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            if(a[0] < b[0]) { return -1; }
            if(a[0] > b[0]) { return 1; }
            return 0;
        })
        break;
        case("symbold"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            if(a[0] < b[0]) { return 1; }
            if(a[0] > b[0]) { return -1; }
            return 0;
        })
        break;
        case("changePercenta"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            return a[1]["quote"].changePercent - b[1]["quote"].changePercent;
        })
        break;
        case("changePercentd"):
        sortedStocks = this.state.stockData.sort(function(a, b) {
            return b[1]["quote"].changePercent - a[1]["quote"].changePercent;
        })
        break;
        
        default: 
        sortedStocks = this.state.stockData.sort(function(a, b) {
            if(a[0] < b[0]) { return -1; }
            if(a[0] > b[0]) { return 1; }
            return 0;
        });
    }

      ReactGA.event({
        category: 'Stocks',
        action: 'Stocks Sorted'
      });

      if(stateChange === true)
      {
this.setState({ stockData: sortedStocks})
      }
    localStorage.setItem("sortOrder", sortStyle);
    return sortedStocks;
}

addStock(newStock) {
    if (!this.state.stocks.includes(newStock.toUpperCase())) {
        fetch(newAPI + newStock.toUpperCase() + '&types=quote&range=1m&last=5&token=pk_e5274c5939e44b2788e6492c316d519d')
        .then(response => response.json())
        .then(data => {
            var tempDataHolder = Object.entries(data).concat(this.state.stockData);
            this.setState({
                stockData: tempDataHolder,
                isLoading: false,
                stocks: [...this.state.stocks, newStock.toUpperCase()]
            })
        })
        .catch((error) => {
            console.error(error);
        });

          ReactGA.event({
              category: 'Stocks',
              action: 'Stocks Added',
              value: newStock.toUpperCase()
            });

    } else {
        console.log('hey dont do that');
    }
}
removeStock(removeStock) {
 let filteredStocks = this.state.stockData.filter(word => word[0]!== removeStock[0]);
 let permList = this.state.stocks.filter(name => {
    return name !== removeStock[0];
});
 ReactGA.event({
              category: 'Stocks',
              action: 'Stocks Removed'
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
       var sortedStocks = this.sortStocksfn(stockObj);
            return sortedStocks.map(symbol =>
             ( <
                QuickStock key = {
                    symbol
                }
                stockData = {
                    symbol
                }
                removeStock = {
                    this.removeStock
                }
                />
                ) 
             )

        }
    }
}


export default QuickStockList;