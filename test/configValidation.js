'use strict';
const { validate } = require('../src/configValidation');
const proxyquire = require('proxyquire').noCallThru();

module.exports.tests = {};

module.exports.tests.build = function(test) {
  test('valid `nodes` config', function(t) {
    let config = {
      esclient: {
        nodes: ["http://my-host:123"]
      },
      schema: {
        indexName: "example_index"
      }
    };

    t.doesNotThrow(() => {
      proxyquire('../src/configValidation', {
        '@elastic/elasticsearch': {
          Client: function() {
            return { indices: { exists: (indexName, cb) => { cb(false, { body: true }); } } };
          }
        }
      }).validate(config);
    }, 'no error should have been thrown');

    t.end()
  });

  test('valid `node` config', function(t) {
    let config = {
      esclient: {
        node: "http://my-host:123"
      },
      schema: {
        indexName: "example_index"
      }
    };

    t.doesNotThrow(() => {
      proxyquire('../src/configValidation', {
        '@elastic/elasticsearch': {
          Client: function() {
            return { indices: { exists: (indexName, cb) => { cb(false, { body: true }); } } };
          }
        }
      }).validate(config);
    }, 'no error should have been thrown');

    t.end()
  });

  test('cannot specify both `node` and `nodes`', function(t) {
    let config = {
      esclient: {
        node: "http://my-host:123",
        nodes: ["http://my-host:666"]
      },
      schema: {
        indexName: "example_index"
      }
    };

    t.throws(() => {
      proxyquire('../src/configValidation', {
        '@elastic/elasticsearch': {
          Client: function() {
            return { indices: { exists: (indexName, cb) => { cb(false, { body: true }); } } };
          }
        }
      }).validate(config);
    }, /exclusive.*node.*nodes/);

    t.end()
  });

  test('empty nodes', function(t) {
    let config = {
      esclient: {
        nodes: []
      },
      schema: {
        indexName: "example_index"
      }
    };

    t.throws(() => {
      proxyquire('../src/configValidation', {
        '@elastic/elasticsearch': {
          Client: function() {
            return { indices: { exists: (indexName, cb) => { cb(false, { body: true }); } } };
          }
        }
      }).validate(config);
    }, /nodes.*must contain at least 1/);

    t.end()
  });

};

module.exports.all = function (tape, common) {

  function test(name, testFunction) {
    return tape('index: ' + name, testFunction);
  }

  for( var testCase in module.exports.tests ){
    module.exports.tests[testCase](test, common);
  }
}
