import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Chat from "./module/chat.js";
import methodOverride from "method-override";

const PORT = 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connection is Successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats });
});

//new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("working");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );

  console.log(updateChat);
  res.redirect("/chats");
});

//Delete chat
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(PORT, (req, res) => {
  console.log("Server is listening on port 8080");
});
