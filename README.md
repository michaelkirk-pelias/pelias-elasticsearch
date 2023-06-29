>This repository is part of the [Pelias](https://github.com/pelias/pelias)
>project. Pelias is an open-source, open-data geocoder originally sponsored by
>[Mapzen](https://www.mapzen.com/). Our official user documentation is
>[here](https://github.com/pelias/documentation).

# Pelias Elasticsearch database client

This module provides
an [Elasticsearch](https://www.elastic.co/products/elasticsearch) client integrated with [`pelias-logger`](https://github.com/pelias/logger).

[![Greenkeeper badge](https://badges.greenkeeper.io/pelias/pelias-elasticsearch.svg)](https://greenkeeper.io/)

## Install Dependencies


```bash
$ npm install
```

## Usage

```javascript
'use strict';

const buildClient = require('pelias-elasticsearch');
const config = require('pelias-config').generate();
const esclient = buildClient(config);

esclient.indices.exists({ index: config.schema.indexName }, (err, { body }) => {
  console.log(`index ${config.schema.indexName} exists?: ${body}`)
});
```

## Contributing

Please fork and pull request against upstream master on a feature branch.

Pretty please; provide unit tests and script fixtures in the `test` directory.

### Running Unit Tests

```bash
$ npm test
```

### Continuous Integration

CI tests every release against all currently supported Node.js versions.
