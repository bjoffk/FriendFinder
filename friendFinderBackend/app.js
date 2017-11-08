const express = require('express');
const app = express();
const PORT = 3000;
var bodyParser = require('body-parser')

//app.use(bodyParser.urlencoded({extended: false}));

//Custom middleware. Middleware characterised by and declared via 'app.use'

 /* app.use("/api/calculator/:operation/:n1/:n2", function(req,res,next){
    var calculatorRequest = {
      operation: req.params.operation,
      n1: Number(req.params.n1),
      n2: Number(req.params.n2)
    }
    req.calc = calculatorRequest;
  next();
})
*/
app.get('/', function (req, res) {
  res.send('Friend Finder Demo!')
})

app.post('/api/friends/register/:distance', function(req,res){
  
  

  res.redirect('/');

});

app.listen(PORT, function () {
  console.log(`Friend Finder App listening on port ${PORT}`);
})