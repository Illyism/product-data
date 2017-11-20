var request = require('superagent')
var cheerio = require('cheerio')
require('superagent-cache')(request)
var { URL } = require('url')

module.exports = async function (body) {
  var { url } = body
  
  const response = await request.get(url)
  const $ = cheerio.load(response.text)
  
  const product = {
    name: getAttribute($, 'meta[property="og:title"]', 'content'),
    description: getAttribute($, 'meta[property="og:description"]', 'content'),
    price: parseFloat(getAttribute($, '*[itemprop="price"]', 'content')),
    currency: getAttribute($, '*[itemprop="priceCurrency"]', 'content'),
    link: getAttribute($, 'meta[property="og:url"]', 'content'),
    image: getAttribute($, 'meta[property="og:image"]', 'content'),
  }
  
  // <meta property="og:price:currency" content="USD">
  // <meta property="og:price:standard_amount" content="11">
  // <meta property="og:price:amount" content="6.97">
  
  return product
}

function getAttribute ($, className, key) {
  const content = $(className).attr(key)
  if (content && typeof content === 'string') {
    return content.trim()
  }
  return content
}
