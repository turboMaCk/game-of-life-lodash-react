import React, { Component } from 'react';

export default class Cell extends Component {
  constructor() {
    super();

    this.toggleLife = this.toggleLife.bind(this);
  }

  toggleLife(e) {
    e.preventDefault();

    this.props.action(this.props.x, this.props.y);
  }

  cellClassName() {
    if (this.props.alive) {
      return this.props.willDie ? 'cell alive willdie' : 'cell alive survive';
    } else {
      return this.props.willBeBorn ? 'cell dead willborn' : 'cell dead willnotborn';
    }
  }

  render() {
    var className = this.cellClassName();
    return <div className={className} onClick={this.toggleLife}></div>;
  }
};
