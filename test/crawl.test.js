var request = require('supertest');
var assert = require('assert');
var server = require('../server');

//  ab http://localhost:8085/service/product/crawl\?url\=https://www.laptopshop.be/product/782893/category-179254/apple-macbook-air-13-2017-mqd32fn-a-azerty.html

describe('Crawl', function() {
  describe('Product', function () {
    this.timeout(10000)
    it('returns errors', function (done) {
      request(server).get('/service/product/crawl')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.statusCode, 500, 'Returns Error statusCode');
          done();
        });
    });
    
    it('Can return current data', function (done) {
      request(server).get('/service/product/crawl')
        .query({
          url: 'https://www.coolblue.be/nl/product/738650/apple-watch-series-2-42mm-spacegrijs-aluminium-zwarte-sportband.html'
        })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.data.name, 'Apple Watch Series 2 42mm Spacegrijs Aluminium/Zwarte Sportband')
          assert.equal(res.body.data.price, 299)
          assert.equal(res.body.data.link, 'https://www.smartwatchshop.be/product/738650/apple-watch-series-2-42mm-spacegrijs-aluminium-zwarte-sportband.html')
          assert.equal(res.body.data.image, 'https://image.coolblue.io/products/568341')
          done();
        });
    });
    
    it('Can return current data', function (done) {
      request(server).get('/service/product/crawl')
        .query({
          url: 'https://www.laptopshop.be/product/782893/category-179254/apple-macbook-air-13-2017-mqd32fn-a-azerty.html'
        })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body.data.name, 'Apple MacBook Air 13" (2017) MQD32FN/A Azerty')
          assert.equal(res.body.data.price, 979)
          assert.equal(res.body.data.link, 'https://www.laptopshop.be/product/782893/apple-macbook-air-13-2017-mqd32fn-a-azerty.html')
          assert.equal(res.body.data.image, 'https://image.coolblue.io/products/799649')
          done();
        });
    });
    
    it('can return amazon data', function (done) {
      request(server).get('/service/product/crawl')
        .query({
          url: 'https://www.amazon.com/dp/B00F0W1RIW/ref=s9_acss_bw_cg_E171302A_md1_w?ref=E17SL4&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-6&pf_rd_r=ZXQ2Z4E77KR1JSFMSC6E&pf_rd_t=101&pf_rd_p=db0869b2-648a-4aa4-99b5-7f294bb40572&pf_rd_i=15450566011'
        })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          console.log(res.body)
          done();
        });
    })
    
    it('can scrape open graph', function (done) {
      request(server).get('/service/product/crawl')
        .query({
          url: 'https://www.otto.de/p/call-of-duty-wwii-playstation-4-603252921/#variationId=603252922'
        })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          console.log(res.body)
          done();
        });
    })
    
    it('can scrape open graph', function (done) {
      request(server).get('/service/product/crawl')
        .query({
          url: 'https://www.zalando.be/doughnut-macaroon-rugzak-navymustard-d0e54o004-k12.html'
        })
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          console.log(res.body)
          done();
        });
    })
  });
});
