import React from 'react/addons';
import assert from 'assert';

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();

const TestUtils = React.addons.TestUtils;

import Board from '../../src/components/board';

describe('BoardComponent', () => {
  it('renders', () => {
    const board = TestUtils.renderIntoDocument(<Board/>);
    assert.equal(TestUtils.isCompositeComponent(board), true);
  });

  it('reflect given value of rows and cols', () => {
    const board = TestUtils.renderIntoDocument(<Board rows="5" cols="5" />);
    const tds = TestUtils.scryRenderedDOMComponentsWithClass(board, 'cell');

    assert.equal(tds.length, 25);
  });

  it('should be 50x50 by default', () => {
    const board = TestUtils.renderIntoDocument(<Board />);
    const tds = TestUtils.scryRenderedDOMComponentsWithClass(board, 'cell');

    assert.equal(tds.length, 50*50);
  });
});
