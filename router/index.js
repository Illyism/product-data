
var service = {
  crawl: require('../controllers/crawl')
};

module.exports = function () {
  this.get('/service/product/crawl', service.crawl.product)
}
