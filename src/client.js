const elasticsearch = require('@elastic/elasticsearch');
const peliasSettings = require('pelias-config').generate();
const peliasLogger = require('pelias-logger');

/**
 * 
 * @param {elasticsearch.Client} client
 */
function configureLogging(client) {
  const logger = peliasLogger.get('es-client');
  client.on('serialization', (err, meta) => {
    if (err) {
      logger.error('serializationError=', err.toString());
    } else {
      logger.debug('serialization OK');
    }
  });
  client.on('request', (err, meta) => {
    if (err) {
      logger.error('requestError=', err.toString());
    } else {
      logger.debug('request OK');
    }
  });
  client.on('deserialization', (err, meta) => {
    if (err) {
      logger.error('deserializationError=', err.toString());
    } else {
      logger.debug('deserialization OK');
    }
  });
  client.on('response', (err, meta) => {
    if (err) {
      logger.error('responseError=', err.toString());
    } else {
      logger.debug('response OK');
    }
  });
  client.on('sniff', (err, meta) => {
    if (err) {
      logger.error('sniffError=', err.toString());
    } else {
      logger.debug('sniff OK');
    }
  });
  client.on('resurrect', (err, meta) => {
    if (err) {
      logger.error('resurrectError=', err.toString());
    } else {
      logger.debug('resurrect OK');
    }
  });
}

/**
 * 
 * @param {elasticsearch.ClientOptions} [clientOptions]
 * @return {elasticsearch.Client}
 */
module.exports = function(clientOptions){
  const client = new elasticsearch.Client( clientOptions || peliasSettings.esclient || {} );
  configureLogging(client);
  return client;
};

