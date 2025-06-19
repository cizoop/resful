const express = require("express");
const app = express();
const path=require("path");
const port=3002;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let chats=[
  {
    id:uuidv4(),
    user:"Chippy",
    image:"https://wildlifeinformer.com/wp-content/uploads/2020/07/chipmunk.webp",
    conversation:"A hooman gave me an almond this morning..."
  },
  {
    id:uuidv4(),
    user:"Weasel",
    image:"https://wildlifeinformer.com/wp-content/uploads/2021/08/weasel.webp",
    conversation:"Weasels are small, short-legged carnivorous mammals of the genus Mustela. They are related to, and similar in shape to, polecats, stoats, ferrets, and minks. All members of this genus are highly active and ferocious predators. Read on to learn about the weasel."
  },
  {
    id:uuidv4(),
    user:"Pocket Gopher",
    image:"https://wildlifeinformer.com/wp-content/uploads/2021/08/pocket-gopher.webp",
    conversation:"Pocket Gophers live in woodlands and grass prairies across North and Central America. They are known for their tunnels that include various burrowing chambers with specific functions. Sometimes they even share their tunnels with other animals",
  },
  { 
    id:uuidv4(),
    user:"Skunk",
    image:"https://wildlifeinformer.com/wp-content/uploads/2021/05/eastern-spotted-skunk.webp",
    conversation:"The spotted skunk is a small species of skunk native to the eastern US and can also be found in small areas of Mexico and Canada. Spotted skunks may either dig their own burrows or use burrows that have been abandoned by other animals. In fact, they have even been documented using gopher tortoise burrows. Spotted skunks typically spend the cooler months in these burrows and mothers will raise their litters in burrows."
  }
];



app.get("/chats",(req,res)=>{
   res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
  let {user,image,conversation} = req.body;
  let id=uuidv4();
  chats.push({id,user,image,conversation});
  res.redirect("/chats");
});

//show path
app.get("/chats/:id",(req,res)=>{
  let {id} = req.params;
  let chat = chats.find((p)=> id===p.id);
  res.render("show.ejs",{chat});
});

//get the form
app.get("/chats/:id/edit",(req,res)=>{
    let {id} = req.params;
    let chat = chats.find((p)=> id===p.id);
    res.render("edit.ejs",{chat});
});

//now edit it with backend info
app.patch("/chats/:id",(req,res)=>{
    let {id} = req.params;
    let chat = chats.find((p)=> id===p.id); 
    let newConversation = req.body.conversation;
    chat.conversation=newConversation;
    console.log(chat);
    res.redirect("/chats");
});

app.delete("/chats/:id",(req,res)=>{
  let {id} = req.params;
  chats = chats.filter((p)=> id!== p.id);
  res.redirect("/chats"); 
});

app.listen(port,()=>{
  console.log(`${port} listening !`);
});