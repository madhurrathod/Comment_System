const {PrismaClient} = require("../generated/prisma")
const prisma = new PrismaClient();

exports.post_comment = async(req,res)=>{   
    const author = req.user.name; 
    const {text,parentId} = req.body;
    if(!author || !text){
        return res.status(400).json({error:"author and text are required"})
    }
    try{
        const newComment = await prisma.Comment.create({
            data:{
                text:text,
                author:author,
                parentId: parentId || null
            }
        })
        res.status(201).json(newComment);
    }catch{
        return res.status(500).json({error:"Failed to create comment"})
    }
}

async function Nested_Parent_Replies(parentId = null){
    const comments = await prisma.Comment.findMany({
        where: {parentId:parentId},
        orderBy: {timestamp : "asc"}
    })

    const nested = [];
    for(const comment of comments){
        const children = await Nested_Parent_Replies(comment.id);
        nested.push({...comment,children})
    }
    return nested;
}

exports.get_comments = async(req,res)=>{
    try{
        const tree = await Nested_Parent_Replies();
        res.json(tree);
    }catch{
        res.status(500).send("Failed to retrieve comments")
    }
}

exports.comment_like = async(req,res)=>{
    const {id} = req.params;
    try {
        const updated_comment = await prisma.Comment.update({
            where:{
                id:id
            },
            data:{
                likes: {increment: 1}
            }
        })
        res.json(updated_comment)
    }catch{
        res.status(500).send("Failed to increase like count")
    }
}

exports.comment_reply = async (req,res)=> {
    const {id} = req.params;
    const {text} = req.body;
    const author = req.user.name;
    if(!text){
        return res.status(400).json({error:"text required"})
    }
    try {
        const reply = await prisma.Comment.create({
            data:{
                parentId:id,
                author:author,
                text:text
            }
        })
        res.status(201).json(reply);
    }
    catch{
        res.status(500).send("Error creating a reply")
    }
}