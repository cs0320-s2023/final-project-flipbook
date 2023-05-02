const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/users");

async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@flipbookbe.zh51nq0.mongodb.net/test"
  );

  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);
  const fluffy = new Kitten({ name: "fluffy" });
  console.log(fluffy)
  // fluffy.speak(); // "Meow name is fluffy"
  await fluffy.save(); 
  // fluffy.speak();
  // await Kitten.find({ name: /^fluff/ });
}

main()


