var request = require('superagent')
var cheerio = require('cheerio')
require('superagent-cache')(request)
var { URL } = require('url')
var convertCurrency = require('../data/convertCurrency')

module.exports = async function (body) {
  var { url } = body
  
  const response = await request.get(url)
  const $ = cheerio.load(response.text)
  
  const product = {
    name: getText($, '#title'),
    price: getPrice($, '#priceblock_ourprice'),
    currency: getCurrency($, '#priceblock_ourprice'),
    link: getAttribute($, 'link[rel="canonical"]', 'href'),
    image: getAttribute($, '#landingImage', 'data-old-hires')
  }
  
  return product
}

function getText ($, className) {
  return $(className).text().trim()
}

function getPrice ($, className) {
  return parseFloat($(className).text().replace(',', '.').replace(/[^0-9\.]+/g, ''))
}

function getCurrency ($, className) {
  return convertCurrency($(className).text().substr(0, 1))
}

function getAttribute ($, className, key) {
  return $(className).attr(key).trim()
}
