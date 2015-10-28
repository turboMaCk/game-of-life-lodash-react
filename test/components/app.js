import React from 'react/addons';
import assert from 'assert';

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();

const TestUtils = React.addons.TestUtils;

import App from '../../src/components/app';

describe('AppComponent', () => {
  it('renders', () => {
    var app = TestUtils.renderIntoDocument(<App />);
    TestUtils.isCompositeComponent(app).should.be.true;
  });
});
