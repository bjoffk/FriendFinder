//import MapView from 'react-native-maps';

var mongoose = require("mongoose");

var EXPIRES = 60 * 30 * 1000;
var LocationSchema = new mongoose.Schema({
  userName: {type :String, unique: true},
  created: { type: Date, expires: EXPIRES, default: Date.now() },
  loc: {
    'type': { type: String, enum: "Point", default: "Point" },
     coordinates: { type: [Number] }
  } 
})

//This did NOT work for me, set the index directly on DB as explained in exercise
//LocationSchema.index({ loc: "2dsphere" });

//Replace with URL to your own mongolab-db
const MONGO_DB = 'mongodb://mlabjs:Mlabjs01@ds245715.mlab.com:45715/ff';
//const MONGO_DB = 'mongodb://mlabjs:Mlabjs01@ds151554.mlab.com:51554/dbcloud';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB, { useMongoClient: true });

var Location = mongoose.model("location", LocationSchema);

