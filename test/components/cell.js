import React from 'react/addons';
import assert from 'assert';

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();

const TestUtils = React.addons.TestUtils;

import Cell from '../../src/components/cell';

describe('CellComponent', () => {
  it('renders', () => {
    var cell = TestUtils.renderIntoDocument(<Cell/>);
    TestUtils.isCompositeComponent(cell).should.be.true;
  });
});
