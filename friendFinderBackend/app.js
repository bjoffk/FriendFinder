const express = require('express');
const app = express();
const PORT = 3000;
const register = require("./facade/FriendFacade");
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Friend Finder Demo!')
})

app.post('/api/friends/register/:distance', function(req,res){
  
  register(req.body.userName, req.body.loc.coordinates, req.params.distance, function(err,docs){
    if(err){
      return console.log("ERROR",err)
    }
    console.log("DOCS",JSON.stringify(docs,null,"  "));
    res.send(JSON.stringify(docs,null,"  "));
  });
  
});

app.listen(PORT, function () {
  console.log(`Friend Finder App listening on port ${PORT}`);
})