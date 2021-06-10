var client = require('./connection.js');

const result =  client.search({
  index: 'my-index',
  body: {
    query: {
      match: { hello: 'world' }
    }
  }
})

// callback API
client.search({
  index: 'my-index',
  body: {
    query: {
      match: { hello: 'world' }
    }
  }
}, (err, result) => {
  if (err) console.log(err)
})