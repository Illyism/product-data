var helper = require('./helper');
var crawlProduct = require('../services/crawlProduct')
var detectProvider = require('../services/detectProvider')
var crawlCoolblue = require('../services/crawlCoolblue')
var crawlAmazon = require('../services/crawlAmazon')

/**
 * Crawl a product page
 * @param {String} url
 */
exports.product = async function (req, res, next) {
  try {
    helper.startTimer('crawl_product')
    var body = req.query
    
    if (!body.url) throw new Error('Please enter a webshop URL')
    let result = {}
    
    const provider = detectProvider(body.url)
    console.log(provider)
    switch (provider) {
      case 'amazon':
        result = await crawlAmazon(body)
        break
      case 'coolblue':
        result = await crawlCoolblue(body)
        break
      default:
        result = await crawlProduct(body)
        break
    }
    
    res.send({
      status: 'OK',
      elapsed: helper.endTimer('crawl_product'),
      data: result
    })
  } catch(e) {
    next(e)
  }
};
