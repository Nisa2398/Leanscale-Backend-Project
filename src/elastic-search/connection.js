var elasticsearch=require('elasticsearch');

const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200',
requestTimeout: 60000 ,
log: 'trace',
  // requestTimeout: Infinity, // Tested
  keepAlive: true // Tested
})
client.ping({
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.log(error)
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

module.exports = client;  