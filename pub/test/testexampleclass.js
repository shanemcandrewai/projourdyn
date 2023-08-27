import MyClass from '../js/exampleclass.js';
import log from '../js/libs/loglevel.js';

log.enableAll();
const { assert } = chai;

describe('MyClass tests', () => {
  describe('The class', () => {
    it('can be instantiated', () => {
      assert.isObject(new MyClass());
    });
    it('a = 1', () => {
      const c = new MyClass();
      chai.expect(c.a).to.eql(1);
    });
  });
});
