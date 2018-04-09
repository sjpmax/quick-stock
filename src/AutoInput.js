import React, {
    Component
} from 'react';
import ReactAutocomplete from 'react-autocomplete';
import availStocks from './nasdaqList.json';
class AutoInput extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
    }
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
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={value => this.setState({ value })}
      />
    )
  }
}

export default AutoInput;