# Game of Life LoDash + React
Hobby implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

[Demo](//turbomack.github.io/game-of-life-lodash-react/)

This is algoritmic [**naive**](#warmingup) implementation based on exact rules. Where whole matrix is recalculated.
It illustrate usage of some functional principles in a side-effected (state based) GOL algorithm.o

Use it as you want.

## Dependencies
* nodejs 0.12.x + nvm
* gulp.js

## Install
* `git clone git@github.com:turboMaCk/game-of-life-lodash-react.git`
* `npm install`
* `gulp`
* `open index.html`

<h2 id="warmingup">Warming uo</h2>
This is just a naive implementation. Whole matrix is recalculated on each generation cycle.
More performance effective solution will be to calculate only areas around living cels.
Also there is no need fot holding state of all cells. Rather much better implementation will
be storing only living cels which will allow "infinite" board size.

## License
WTFPL v2
