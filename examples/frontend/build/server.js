const express = require('express')
var requestProxy = require('express-request-proxy');
const path = require('path')
const port = process.env.PORT || 5000
const app = express()

// serve static assets normally
app.use(express.static(__dirname))


app.all('/users/*', requestProxy({
  url: 'http://52.221.191.134:3000/users/*',
  query: {
    apikey: 'xxx'
  }
}))
app.all('/login/*', requestProxy({
  url: 'http://52.221.191.134:3000/login/*',
  query: {
    apikey: 'xxx'
  }
}))
app.all('/register/*', requestProxy({
  url: 'http://52.221.191.134:3000/register/*',
  query: {
    apikey: 'xxx'
  }
}))
app.all('/selectroom/*', requestProxy({
  url: 'http://52.221.191.134:3000/selectroom/*',
  query: {
    apikey: 'xxx'
  }
}))
app.all('/chat/*', requestProxy({
  url: 'http://52.221.191.134:3000/chat/*',
  query: {
    apikey: 'xxx'
  }
}))


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
