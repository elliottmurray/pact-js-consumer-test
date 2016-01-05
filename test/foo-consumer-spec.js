var path = require('path');
var ProviderClient = require('../src/foo-consumer');

describe("Client", function() {
  var client, helloProvider;

  beforeEach(function() {

    //ProviderClient is the class you have written to make the HTTP calls to the provider
    client = new ProviderClient('http://localhost:1234');
    helloProvider = Pact.mockService({
      consumer: 'Hello Consumer',
      provider: 'Hello Provider',
      port: 1234,
      done: function (error) {
        expect(error).toBe(null);
      }
    });
  });

  it("should say hello", function(done) {
    helloProvider
      .given("Foo_Consumer")
      .uponReceiving("a request for Foos")
      .withRequest("GET", "/foos", {
        "Accept": "application/json"
      }).willRespondWith(200, {
        "Content-Type": "application/json"
      }, [{ "value": 45},{"value":90}]

      );

    helloProvider.run(done, function(runComplete) {
      client.fetchAlligatorByName("Mary", function() {
        expect(client.getName()).toContain({"value": 45});
        runComplete();

      }.bind(client));

    });
  });
});
