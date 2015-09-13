import React, { Component } from 'react';
import Cell from './cell';
import _ from 'lodash';

export default class Board extends Component {
  constructor() {
    super();

    this.toggleCell = this.toggleCell.bind(this);

    // deafult props
    this.props = {
      rows: 20,
      cols: 20
    }

    // default state
    var boardState = _.times(this.props.rows, () => {
      return _.times(this.props.cols, () => {
        return false;
      });
    });

    this.state = {
      boardState: boardState
    };
  }

  getNeighbors(x, y) {
    var state = this.state.boardState;

    var helper = [-1,0,1];

    var neighbors = helper.map((offsetX) => {
      var newX = x+offsetX;

      if (!state[newX]) { return };

      return helper.map((offsetY) => {
        var newY = y + offsetY;
        return (offsetY === 0 && offsetX === 0) ? undefined : state[newX][newY];
      });
    });

    return _.filter(_.flatten(neighbors, true), (item) => {
      return typeof item !== 'undefined'
    });
  }

  aliveNeighborCount(x, y) {
    return this.getNeighbors(x, y).filter((cell) => { return cell; }).length;
  }

  toggleCell(x, y) {
    var state = this.state.boardState;
    var newState = _.clone(state);

    newState[x][y] = !newState[x][y];

    this.setState({ boardState: newState});
    console.log(this.getNeighbors(x, y));
    console.log(this.aliveNeighborCount(x, y));
  }

  render() {
    var action = this.toggleCell;

    var board = this.state.boardState.map((col, x) => {
      var cels = col.map((alive, y) => {

        return <Cell alive={alive} x={x} y={y} action={action} />;
      });

      return <div className="board-row">{cels}</div>;
    });

    return <div className="board">{board}</div>;
  }
};
