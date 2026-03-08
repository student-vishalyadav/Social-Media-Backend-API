const mongoose = require("mongoose");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/noderewise");
}
main().then(() => {
  console.log("Now your DB is Connected");
});

module.exports = mongoose;
