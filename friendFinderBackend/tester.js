const register = require("./facade/FriendFacade");

register("Mister Tester", [12.502635, 55.719345], 90, function(err,docs){
  if(err){
    return console.log("ERROR",err)
  }
  console.log("DOCS",JSON.stringify(docs,null,"  "));
});