/*************************************************************

You should implement your request handler function in this file.


requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

/*
OUTPUTS: What is create server expecting
  > HandleRequests Method
    > What create server expects

INPUTS:
  > Request / response from Node's HTTP modules

COMPLEXITY/CONSTRAINTS:
  > No express
  > Client/server on same machine
  > Two days!
  > Routing to different paths (rooms, etc)

EDGECASES and EXAMPLES:
  >  OPTION requests - these are automatically sent whenever there's a cross-domain request
  tl;dr: You'll need to make sure you're handling options requests in your router, and sending back appropriate headers
  > Ex: Get -  url: app.server,
                type: 'GET',
                data: { order: '-createdAt' },
                contentType: 'application/json',
                success: function(data)

        Post-  url: app.server,
                type: 'POST',
                data: message,
*/
  // request: function(url, method, postdata) {
  //   this.url = url;
  //   this.method = method;
  //   this._postData = postdata;
  //   this.setEncoding = function() { /* noop */ };

  //   this.addListener = this.on = function(type, callback) {
  //     if (type === 'data') {
  //       callback(JSON.stringify(this._postData));
  //     }

  //     if (type === 'end') {

  //       callback();
  //     }

  //   }.bind(this);
  // }
var http = require('http');

var requestHandler = function(request, response) {

  var statusCode = 200;
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };
  var headers = defaultCorsHeaders;

  var actions = {
    // conditional based on request.method to call
    //method of "actions" object - return completed response, options object, and code
    POST: function(request, response) {
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      var body = [];
      request.on('data', function (chunk) {
        console.log('chunk:' + chunk);
        body.push(chunk);
      }).on('end', function() {
        body = Buffer.concat(body).toString();
        // Body is returning:
        // username=danya&text=Testing%2C+1+2+3&roomname=lobby
        // at this point, 'body' has the entire request body stored in it as a
        // string
      });
      response.end(function () {
        console.log('body:' + request.data + 'Serving request type ' + request.method + ' for url ' + request.url);
      });
    },

    GET: function(request, response) {
      var url = request.url;
      var requestUrl = (url === './') ? './index.html' : '.' + url;
      if (requestUrl === './index.html') {
        headers['Content-Type'] = 'text/html';
      } else {
        headers['Content-Type'] = 'application/json';
      }
      response.writeHead(statusCode, headers);
      //   this._ended = false;
      //   this._responseCode = null;
      //   this._headers = null;
      //   this._data = null;

      //   this.writeHead = function(responseCode, headers) {
      //     this._responseCode = responseCode;
      //     this._headers = headers;
      //   }.bind(this);

      //   this.end = function(data) {
      //     this._ended = true;
      //     this._data = data;
      //   }.bind(this);
      // }
      //200
      response.end(function () {
        console.log('Serving request type ' + request.method + ' for url ' + request.url);
      });
    },

    OPTIONS: function(request, response) {
      headers['Content-Type'] = 'text/plain';
      response.statusCode = 200;
      // request.on('error', function(err) {
      //   response.statusCode = 500;
      //   console.error(err);
      // });
      response.writeHead(statusCode, headers);
      headers['Allow'] = 'GET,POST,OPTIONS';
      response.write('OK');
      response.end(function () {
        console.log('Serving request type ' + request.method + ' for url ' + request.url);
      });
    }
  };

  var router = function () {
    var method = request.method;

    if (method = 'POST') {
      return actions.POST(request, response);
    }

    if (method = 'GET') {
      return actions.GET(request, response);
    }

    if (method = 'OPTIONS') {
      return actions.OPTIONS(request, response);
    }
  };

  return router();
};

module.exports = requestHandler;
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.


  // The outgoing status.

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// here you are returning the equivalent of {handleRequest: requestHandler},


//

// >> Server response to GET request:
// {"results":[{"objectId":"PjQDCHluSA","username":"danya","roomname":"__newRoom","text":"testing __newRoom","createdAt":"2017-02-28T05:18:30.744Z","updatedAt":"2017-02-28T05:18:30.744Z"}]


// >> Server response to POST request:
// {"objectId":"DH393HmFF6","createdAt":"2017-02-28T13:48:27.885Z"}

// >>Server response to OPTIONS request:
// OK
