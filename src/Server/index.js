
const mongoose = require("mongoose");
const userModel = require("./models/users")
const express = require('express')
const app = express();


// async function appGet(){
//   app.get("/getUsers", async (req: any, res: { json: (arg0: any) => void; }) => {
//     console.log(req)
//     try {
//         const data = await userModel.aggregate([{
//             $match: {
//             pid: {$exists: true},
//             }
//         },{
//             $group: {
//             _id: {name: "$name"},
  
//             age: {$sum: "$age"},
//             }
//         },
//         {
//             $limit: 0 || 10
//         }])
//         if (!data) {
//             res.json(data)
//         } else {
//             res.json(data)
//         }
//     }
//     catch (error){
//         console.log(error);
//     }
//   })
// }


async function main() {
  await mongoose.connect(
    "mongodb+srv://admin:admin@flipbookbe.zh51nq0.mongodb.net/test"
  );


  const mockUser = new userModel({ title: "mock1" , pid : "abcdef" , frameData : {}})
  console.log(mockUser)
  await mockUser.save(); 
  // fluffy.speak();
  // await Kitten.find({ name: /^fluff/ });
}

main()


