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
         key={item => item.id + item.Symbol}    
        menuStyle={{
borderRadius: '3px',
boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
background: 'rgba(255, 255, 255, 1)',
padding: '2px 0 0 7px',
fontSize: '90%',
position: 'fixed',
overflow: 'auto',
maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
zIndex: '998',
  textAlign: 'left',
}}
        renderItem={(item, highlighted) =>
          <div key={item.Symbol}
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