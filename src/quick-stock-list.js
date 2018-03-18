import React, {
    Component
} from 'react';
import './quick-stock-list.css';
import QuickStock from './quick-stock';
import AddStock from './add-stock';
import editJsonFile from 'edit-json-file';

class QuickStockList extends Component {
    constructor(props) {
 let stocksList = JSON.parse(localStorage.getItem("stockList"));
    	if(stocksList == null){
 stocksList =  ["ATVI","SPWR","TEAM"];
 localStorage.setItem("stockList", JSON.stringify(stocksList));	
}
        super(props);
        this.state = {
            stocks: stocksList,
            time: ''
        };
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
    }

    componentDidUpdate(){
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
           	
           </div>
        );
    }
    addStock(newStock) {
        this.setState({
            stocks: [...this.state.stocks, newStock]
        });
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