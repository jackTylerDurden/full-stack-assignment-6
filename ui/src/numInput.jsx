/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import { FormControl } from 'react-bootstrap';

function format(num) {
  return num != null ? num.toString() : '';
}

function unformat(str) {
  const val = parseInt(str, 10);
  return Number.isNaN(val) ? null : val;
}

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const { value } = this.state;    
    return (      
      <React.Fragment>
        <FormControl name={this.props.name} onChange={this.onChange} onBlur={this.onBlur} type="text" value={value} placeholder="text"/>
      </React.Fragment>
    );
  }
}