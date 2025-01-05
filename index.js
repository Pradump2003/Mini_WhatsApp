import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Chat from "./module/chat.js";

const PORT = 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))

main()
  .then(() => console.log("Connection is Successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, (req, res) => {
  console.log("Server is listening on port 8080");
});
