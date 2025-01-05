import mongoose from "mongoose";
import Chat from "./module/chat.js";

main()
  .then(() => console.log("Connection is Successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

let allChats = [
  {
    from: "Pradum",
    to: "Vivek",
    msg: "send me your today shedule",
    created_at: new Date(),
  },
  {
    from: "Pradum",
    to: "Manish",
    msg: "teach me js callback",
    created_at: new Date(),
  },
  {
    from: "Lalit",
    to: "Govind",
    msg: "send me your location",
    created_at: new Date(),
  },
  {
    from: "Rohit",
    to: "Mohit",
    msg: "Tell about your self",
    created_at: new Date(),
  },
  {
    from: "Tony",
    to: "Peter",
    msg: "love you 3000",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
