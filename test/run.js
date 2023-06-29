
var tape = require('tape');
var common = {};

var tests = [
  require('./client'),
  require('./configValidation')
  // other tests go here
];

tests.map(function(t) {
  t.all(tape, common);
});
