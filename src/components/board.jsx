import React, { Component } from 'react';
import Cell from './cell';
import _ from 'lodash';

export default class Board extends Component {
  constructor() {
    super();

    this.toggleCell = this.toggleCell.bind(this);
    this.nextGeneration = this.nextGeneration.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleForecast = this.toggleForecast.bind(this);

    this.defaultProps = {
      rows: 50,
      cols: 50
    };

    this.cache = {};

    // default state
    this.player = false;
  }

  componentWillMount(props) {
    props = _.isEmpty(this.props) ? this.defaultProps : this.props;
    const boardState = _.times(props.rows, () => {
      return _.times(props.cols, () => {
        return false;
      });
    });

    this.state = {
      boardState: boardState,
      generationNumber: 0,
      forecast: false
    };
  }

  getNeighbors(x, y) {
    const state = this.state.boardState;

    const helper = [-1,0,1];

    const neighbors = helper.map((offsetX) => {
      const newX = x+offsetX;

      if (!state[newX]) { return; }

      return helper.map((offsetY) => {
        const newY = y + offsetY;
        return (offsetY === 0 && offsetX === 0) ? undefined : state[newX][newY];
      });
    });

    return _.filter(_.flatten(neighbors, true), (item) => {
      return typeof item !== 'undefined';
    });
  }

  aliveNeighborCount(x, y) {
    return this.getNeighbors(x, y).filter((cell) => { return cell; }).length;
  }

  cellWillDie(x, y) {
    const aliveNeighborCount = this.aliveNeighborCount(x, y);
    return (aliveNeighborCount < 2 || aliveNeighborCount > 3);
  }

  cellWillBeBorn(x, y) {
    const aliveNeighborCount = this.aliveNeighborCount(x, y);
    return aliveNeighborCount === 3;
  }

  toggleCell(x, y) {
    const state = this.state.boardState;
    let newState = _.clone(state);

    newState[x][y] = !newState[x][y];

    this.setState({ boardState: newState});
  }

  nextGeneration() {
    const currentGeneration = _.clone(this.state.boardState);
    const nextGeneration = currentGeneration.map((row, x) => {
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

  toggleForecast() {
    this.setState({ forecast: !this.state.forecast });
  }

  render() {
    const action = this.toggleCell;

    const board = this.state.boardState.map((col, x) => {
      const cels = col.map((alive, y) => {
        let willDie, willBeBorn;
        if (this.state.forecast) {
          willDie = this.cellWillDie(x, y);
          willBeBorn = this.cellWillBeBorn(x, y);
        } else {
          willDie = false;
          willBeBorn = false;
        }

        return <Cell alive={alive} x={x} y={y} action={action} willDie={willDie} willBeBorn={willBeBorn} />;
      });

      return <div className="board-row">{cels}</div>;
    });

    return <div>
      <button onClick={this.nextGeneration}>Next generation</button>
      <button onClick={this.togglePlay}>play/stop</button>
      <button onClick={this.toggleForecast}>Forecast on/off</button><br />
      Generation number: {this.state.generationNumber}<br />
      <div className="board">{board}</div>
    </div>;
  }
};
