var timers = {};
var precision = 3; // 3 decimal places

exports.startTimer = function (key) {
  timers[key] = process.hrtime();
};

exports.endTimer = function (key) {
  var elapsed = process.hrtime(timers[key])[1] / 1000000;
  var elapsed_ms = ((process.hrtime(timers[key])[0] * 1000) + elapsed).toFixed(precision);
  timers[key] = process.hrtime();
  return parseFloat(elapsed_ms);
};
