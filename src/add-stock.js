import React, {
    Component
} from 'react';
import './add-stock.css';

import AutoInput from './AutoInput';

class AddStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName: ''
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.addStock = this.addStock.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.textInput = null;

        this.setTextInputRef = element => {
          this.textInput = element;
        };
        this.clearTextInput = () => {
          // Clears text box.
          if (this.textInput) this.textInput.setState({ value: '', stockName: '' })
        };
    }
    
    handleUpdate(selectStockName) {
        this.setState({
            stockName: selectStockName
        });
    }
    addStock() {
        this.props.addStock(this.state.stockName);
        this.setState({
            stockName: ''
        });
    }
    
    keyPress(e) {
        if (e.keyCode === 13) {
            //why isn't this.addStock working? it just passes by the code.
            this.props.addStock(this.state.stockName);
            this.setState({
                stockName: ''
            });
        }
    }
    render() {
        return ( <
            div className = "AddStock" >
           <AutoInput autoInput = {
                    this.autoInput
                }
            handleUpdate = {this.handleUpdate}
stockName  = {
                this.state.stockName
            }
             ref={this.setTextInputRef}
                />
             &nbsp; &nbsp; <
            button type = "button"
            className = "btn"
            onClick={()=>{this.addStock();this.clearTextInput();}}
             > Add < /button> 
            <br />
             
            </div>
        );
    }
}

export default AddStock;