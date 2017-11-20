var express = require('express')
var server = express()

require('./config/default').call(server)
require('./router').call(server)
require('./controllers/errorHandler').call(server)

module.exports = server
