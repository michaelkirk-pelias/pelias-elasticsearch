'use strict';
const buildClient = require('../src/client');
const intercept = require('intercept-stdout');

module.exports.tests = {};

module.exports.tests.build = function(test) {
  test('building a new client should not error', function(t) {
    const client = buildClient();
    t.ok(client);
    t.end()
  });
};

module.exports.tests.logging = function(test) {
  test('output is logged to pelias logger', async function(t) {
    const client = buildClient({ node: "http://non-existant-host:1234" } );

    let stdoutBuffer = '';
    let stderrBuffer = '';

    const unhook_intercept = intercept(
      (stdout) => { stdoutBuffer += stdout; return '' },
      (stderr) => { stderrBuffer += stderr; return '' }
    );

    try {
      let result = await client.search({ index: 'non-existant-index' });
      t.fail("should have failed");
    } catch (err) {
      t.ok(err);
    } finally {
      unhook_intercept();
    }

    t.match(stderrBuffer, /responseError=/);

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
};
