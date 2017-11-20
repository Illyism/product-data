module.exports = function convertCurrency (symbol) {
  switch (symbol) {
    case '$': return 'USD'
    case '€': return 'EUR'
  }
  
  return symbol
}
