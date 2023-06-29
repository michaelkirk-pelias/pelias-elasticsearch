'use strict';

const Joi = require('@hapi/joi');
const elasticsearch = require('@elastic/elasticsearch');

// Schema Configuration
// dbclient.statFrequency: populated by defaults if not overridden
// esclient: object, validation performed by elasticsearch module
const schema = Joi.object().keys({
  esclient: Joi.object().required().keys({
    nodes: Joi.array().items(Joi.string()).min(1),
    node: Joi.string(),
    requestTimeout: Joi.number().integer().min(0)
  }).xor('node', 'nodes').unknown(true),
  schema: Joi.object().required().keys({
    indexName: Joi.string().required()
  })
}).unknown(true);

module.exports = {
  validate: function validate(config) {
    const validate = schema.validate(config);
    if (validate.error) {
      throw new Error(validate.error.details[0].message);
    }
  }
};
