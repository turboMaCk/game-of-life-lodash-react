import React, { Component } from 'react';
import Cell from './cell';
import _ from 'lodash';

export default class Board extends Component {
  constructor() {
    super();

    this.toggleCell = this.toggleCell.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.togglePlay = this.togglePlay.bind(this);

    // deafult props
    this.props = {
      rows: 50,
      cols: 50
    }

    // default state
    var boardState = _.times(this.props.rows, () => {
      return _.times(this.props.cols, () => {
        return false;
      });
    });

    this.state = {
      boardState: boardState,
      generationNumber: 0
    };

    this.player = false;
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

  cellWillDie(x, y) {
    var aliveNeighborCount = this.aliveNeighborCount(x, y);
    return (aliveNeighborCount < 2 || aliveNeighborCount > 3);
  }

  cellWillBeBorn(x,y) {
    var aliveNeighborCount = this.aliveNeighborCount(x, y);
    return aliveNeighborCount === 3;
  }

  toggleCell(x, y) {
    var state = this.state.boardState;
    var newState = _.clone(state);

    newState[x][y] = !newState[x][y];

    this.setState({ boardState: newState});
  }

  nextGeneration() {
    var currentGeneration = _.clone(this.state.boardState);
    var nextGeneration = currentGeneration.map((row, x) => {
      return row.map((alive, y) => {
        if (alive) {
          return !this.cellWillDie(x, y);
        } else {
          return this.cellWillBeBorn(x, y);
        }
      });
    });

    this.setState({
      boardState: nextGeneration,
      generationNumber: this.state.generationNumber + 1
    });
  }

  togglePlay() {
    if (this.player) {
      window.clearInterval(this.player);
      this.player = false;
    } else {
      this.player = window.setInterval(this.nextGeneration.bind(this), 1);
    }
  }

  render() {
    var action = this.toggleCell;

    var board = this.state.boardState.map((col, x) => {
      var cels = col.map((alive, y) => {
        var willDie = this.cellWillDie(x, y);
        var willBeBorn = this.cellWillBeBorn(x, y);

        return <Cell alive={alive} x={x} y={y} action={action} willDie={willDie} willBeBorn={willBeBorn} />;
      });

      return <div className="board-row">{cels}</div>;
    });

    return <div>
      <button onClick={this.nextGeneration}>Next generation</button>
      <button onClick={this.togglePlay}>play/stop</button>
      Generation number: {this.state.generationNumber}<br />
      <div className="board">{board}</div>
    </div>;
  }
};
