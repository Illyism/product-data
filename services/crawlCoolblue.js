var request = require('superagent')
var cheerio = require('cheerio')
require('superagent-cache')(request)
var { URL } = require('url')

module.exports = async function (body) {
  var { url } = body
  
  const response = await request.get(url)
  const $ = cheerio.load(response.text)
  
  const product = {
    name: getText($, '.js-product-name'),
    price: getPrice($, '.sales-price--current'),
    currency: 'EUR',
    link: getAttribute($, 'link[rel="canonical"]', 'href'),
    image: getCoolblueImage($, '.js-media-gallery--current-media-wrapper img', 'src')
  }
  
  return product
}

function getText ($, className) {
  return $(className).text().trim()
}

function getPrice ($, className) {
  return parseFloat($(className).text().trim().replace('.', '').replace(',-', '').replace(',', '.'))
}

function getAttribute ($, className, key) {
  return $(className).attr(key).trim()
}

function getCoolblueImage ($, className, key) {
  const imgURLString = getAttribute($, className, key)
  const imgURL = new URL(imgURLString)
  imgURL.search = ''
  return imgURL.href
}
