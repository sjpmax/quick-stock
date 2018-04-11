import React, {
} from 'react';
import ReactAutocomplete from 'react-autocomplete';
import availStocks from './nasdaqList.json';
class AutoInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
       stockName: ''
    }
        this.onChangeEx = this.onChangeEx.bind(this);   

  }
  onChangeEx(e){
    if(e.target){
    this.setState({ value: e.target.value, stockName:e.target.value  })
    this.props.handleUpdate(e.target.value )}
    else
      { this.setState({ value: e, stockName:e  })
    this.props.handleUpdate(e)}
  }

 render() {
    return (
      <ReactAutocomplete
        items = {availStocks}
        shouldItemRender={(item, value) => item.secName.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.Symbol}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
          >
            {item.secName}            
          </div>
          
        }
        value={this.state.value}
        onChange={e => this.onChangeEx(e)}
        onSelect={value => this.onChangeEx(value)}  
      />


    )
  }
}

export default AutoInput;