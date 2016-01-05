'strict mode'
var http = require('http');
var request = require('request');

function ProviderClient(url) {
  this.results = []
  this.url = url;
  this.options = {
    host: url,
    path: '/foos'
  }
}


ProviderClient.prototype.fetchAlligatorByName = function(name, callback) {
  var headers = {'Accept' : '*/*'};

  request.get({url: this.url + '/foos', headers: headers}, function(err, response, body) {
    this.results = JSON.parse(response.body);
    callback();
    return;

  }.bind(this));
};

ProviderClient.prototype.getName = function() {
  return this.results;
};

module.exports = ProviderClient;
