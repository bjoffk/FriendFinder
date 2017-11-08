require("../models/Locations");
const mongoose = require("mongoose");
Location = mongoose.model("location");
   
function register(userName, coordinates, distance, callback) {
  const distInKM = distance * 1000;
  Location.findOneAndUpdate(
    { userName: userName },
    { $set: { loc: { coordinates: coordinates, type: "Point" }, created: new Date() } },
    { upsert: true, returnNewDocument: true,new: true },
    function (err, user) {
      if (err) {
        return callback(error);
      }
      _findFriends(user, distInKM, callback);
    });
}

function _findFriends(user, dist, callback){
  let query = Location.find({
    userName: { $ne: user.userName },
    loc:
    {
      $near:{
        $geometry: {
          type: "Point",
          coordinates: user.loc.coordinates
        },
        $maxDistance: dist
      }
    }
  }, { _id: 0, created: 0, __v: 0 })
  query.exec(function (err, docs) {
    callback(err,docs);
  })
}

module.exports = register;