require("./Locations");
const mongoose = require("mongoose");
Location = mongoose.model("location");


//Observe the creation time for these users, to let them "survive" the TTL timeout

let testUsers = [
  { userName: "Swimmer1", loc: { type: "Point", coordinates: [12.487442, 55.773718] }, created: "2022-09-25T20:40:21.899Z" },
  { userName: "Swimmer2", loc: { type: "Point", coordinates: [12.604494, 55.766214] }, created: "2022-09-25T20:39:48.913Z" },
  { userName: "Runner1", loc: { type: "Point", coordinates: [12.502635, 55.719345] }, created: "2022-09-25T20:40:21.899Z" },
  { userName: "Runner11", loc: { type: "Point", coordinates: [12.515734, 55.646729] }, created: "2022-09-25T20:40:32.641Z" },
]

Location.insertMany(testUsers, function (err, d) {
  if (err) {
    console.log("UPPS: ", err);
  }
  console.log("Inserted :" + d);
  mongoose.connection.close();
})