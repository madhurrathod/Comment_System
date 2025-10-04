require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const auth = require("./authentication");
const controllers = require("./controllers");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.LOCAL_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials:true
}));

app.post("/auth/signup",auth.signup);
app.post("/auth/login",auth.login);

app.post("/comments", auth.authMiddleware, controllers.post_comment);
app.get("/comments", controllers.get_comments);
app.post("/comments/:id/like" , auth.authMiddleware, controllers.comment_like);
app.post("/comments/:id/reply", auth.authMiddleware, controllers.comment_reply);



app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`);
})


