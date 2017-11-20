module.exports = function () {
  
  // catch 404 and forward to error handler
  this.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // will print stacktrace
  this.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      status: 'error',
      message: err.message,
      error: err,
      stack: err.stacktrace
    })
  })
}
