import React, { Component } from 'react';

export default class Cell extends Component {
  constructor() {
    super();

    this.toggleLife = this.toggleLife.bind(this);
  }

  toggleLife(e) {
    e.preventDefault();

    console.log(this.props.x, this.props.y, this.props.alive);
    this.props.action(this.props.x, this.props.y);
  }

  cellClassName() {
    return this.props.alive ? "cell alive" : "cell dead";
  }

  render() {
    var className = this.cellClassName();
    return <div className={className} onClick={this.toggleLife}></div>;
  }
};
