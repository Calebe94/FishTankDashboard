var path = require("path");
var express = require("express");

var backend = require("./FishTankService/index");

var DIST_DIR = path.join(__dirname, "./");

var PORT = 1337;
var server = express();

server.use(backend);
//Serving the files on the dist folder
server.use(express.static(DIST_DIR));

//Send index.html when the user access the web
server.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

server.listen(PORT);

console.log("> Server(frontend) running on port: http://localhost:"+PORT);