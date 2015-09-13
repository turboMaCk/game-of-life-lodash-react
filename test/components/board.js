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
    TestUtils.isCompositeComponent(board).should.be.true;
  });
});
