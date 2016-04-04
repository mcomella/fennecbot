var chai = require('chai'),
    helpers = require('../../friends/helpers'),
    path = require('path');

var expect = chai.expect;
chai.use(require('chai-as-promised'));

var TEST_PATH = path.join(__dirname, 'assets');
    INVALID_CONFIG = path.join(TEST_PATH, 'invalidConfigPath'),
    CONFIG_1 = path.join(TEST_PATH, 'config1.json');

describe('helpers', () => {

  describe('#getRandom', () => {
    beforeEach(() => {
      helpers._clearCache();
    });

    it('when an invalid configPath is passed, should reject', () => {
      var p = helpers.getRandom(INVALID_CONFIG, 0)
      return expect(p).to.be.rejected;
    });

    describe('when a config with one item is opened,', () => {
      it('should return the item from disk on the first call', () => {
        var p = helpers.getRandom(CONFIG_1, 0);
        return expect(p).to.become("only_item");
      });

      it('should return the same item from cache on the second call', () => {
        return helpers.getRandom(CONFIG_1, 0).then((helperFromDisk) => {
          var p = helpers.getRandom(CONFIG_1, 0);
          return expect(p).to.become(helperFromDisk);
        });
      });

      it('should return the same item when different times are passed');
    });
  });

});
