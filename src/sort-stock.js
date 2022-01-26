import React, {
	Component
} from 'react';
import './sort-stock.css';

class SortStock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: "",
			newArray: []
		};

        this.sortMe = this.sortMe.bind(this);
	}	

	sortMe(e){

		this.setState({doStateChange: true});
		this.props.sortStocksfn(e,true);
	}

	_handleKeyPress(e) {
			

		if (e.key === 'Enter') {
			var currentStocks = this.props.stocks;
			var newList = [];
			var errorMessageSt = "";
			e.target.value.endsWith(',') ? newList = e.target.value.slice(0, -1).split(',') : newList = e.target.value.split(',');
			const re = /[^A-Za-z,.-]+/;
			if (re.test(e.target.value))		            
				errorMessageSt =  "A-Z and characters \"',.\" only.";
			 		    	 
			if(!newList.every( e => currentStocks.includes(e)) && !currentStocks.every( e => newList.includes(e)))
				errorMessageSt = errorMessageSt + " Please do not add or remove stocks.";
			if(errorMessageSt.length>0)
				this.setState({errorMessage: errorMessageSt});
			else{
				//localStorage.setItem("stockList", JSON.stringify(newList));
				this.setState({errorMessage: "",});
				this.props.sortStocksfn(newList);
			}
		}

	}
	componentDidUpdate() {
	}

	render() {
	return (
			<div id='sortStocks'>
			Sort by: <select onChange={e =>this.sortMe(e)} defaultValue={localStorage.getItem("sortOrder")}> 
    <option value="symbola">Symbol asc</option>
    <option value="symbold">Symbol dsc</option>
    <option value="changea">Amount asc</option>
    <option value="changed">Amount dsc</option>
    <option value="changePercenta">Percentage asc</option>  
    <option value="changePercentd">Percentage dsc</option>  
    </select>
			
			</div>	

			);	

	}
}



export default SortStock;

/*<a href="#" onClick=""> Sort < /a>
			<div id="sortText">
			<span>I'm trying to figure out how to do a barebones drag and drop sort. In the meantime, just reorder the list in the box below.</span>
			<br /><span><b>ex</b>: a,b,c <b>wrong</b>: ,a,b,c, <b>Bad</b>: don't add new stocks </span>
			<div id="errorMSG"><span id="message" />{this.state.errorMessage}</div>
			<input id="sortList"
			onKeyPress={(event) => this._handleKeyPress(event)}
			type="text" defaultValue={stocksValue.toString()}	/>
			</div>*/