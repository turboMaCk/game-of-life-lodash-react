import React from 'react/addons';
import assert from 'assert';

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();

const TestUtils = React.addons.TestUtils;


function render(component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(component);

  return renderer.getRenderOutput();
}

import App from '../../src/components/app';

describe('AppComponent', () => {
  it('renders', () => {
    var app = TestUtils.renderIntoDocument(<App message="Hello" />);
    TestUtils.isCompositeComponent(app).should.be.true;
  });

  it('should have state', () => {
    var app = TestUtils.renderIntoDocument(<App message="Hello" />);
    (app.props).should.have.all.keys('message');
  });
});
