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
    var board = TestUtils.renderIntoDocument(<Board/>);
    assert.equal(TestUtils.isCompositeComponent(board), true);
  });

  it('reflect given value of rows and cols', () => {
    var board = TestUtils.renderIntoDocument(<Board rows="5" cols="5" />);
    var tds = TestUtils.scryRenderedDOMComponentsWithClass(board, 'cell');

    assert.equal(tds.length, 25);
  });
});
