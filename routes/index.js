module.exports = function Route(app, server){
  // this gets the socket.io module
  var io = require('socket.io').listen(server)
  // root route to render the index.ejs view
  app.get('/', function(req, res) {
    res.render("index");
  })
  //listen to connection even from the client side
  var count = 0
  io.sockets.on('connection', function (socket){
    //server listens to "posting_form" event
    socket.on("button_clicked", function (data){
       count = count + 1
      //will emit the data to the client
      socket.emit('updated_message', {response: count});
    })

    socket.on("reset_clicked", function (data){
      count = 0;
      socket.emit("reset", {response: count});
    })
  })
};
