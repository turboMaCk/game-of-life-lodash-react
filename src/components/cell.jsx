import React, { Component } from 'react';

export default class Cell extends Component {
  constructor() {
    super();

    this.toggleActive = this.toggleActive.bind(this);

    this.state = {
      active: false
    };
  }
  toggleActive(e) {
    e.preventDefault();
    console.log(this.state.active);
    this.setState({ active: !this.state.active });
  }
  render() {
    var active = this.state.active;
    return <div class="cell" onClick={this.toggleActive}>{active.toString()}</div>;
  }
};
