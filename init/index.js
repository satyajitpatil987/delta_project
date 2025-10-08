const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Fix: extract only image.url from image object
  const listingsWithImageUrl = initData.data.map((listing) => ({
    ...listing,
    image: listing.image.url,
  }));
  initData.data= initData.data.map((obj) => ({ ...obj, owner: "688a6256d35c6d0521b5f899"}));
  await Listing.insertMany(listingsWithImageUrl);
  console.log("data was initialized");
};

initDB();