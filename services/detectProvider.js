const { URL } = require('url');
const coolblueDomains = require('../data/coolblueDomains')

module.exports = function (urlString) {
  if (!urlString) {
    return
  }
  
  const urlObject = new URL(urlString)
  const host = urlObject.host
    
  if (host.indexOf('amazon.com') > -1) {
    return 'amazon'
  }
  
  for (const coolblueDomain of coolblueDomains) {
    if (host.indexOf(coolblueDomain) > -1) {
      return 'coolblue'
    }
  }
}
