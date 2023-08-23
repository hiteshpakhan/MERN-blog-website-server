const express = require('express');
const cors = require("cors");
const {connectDB} = require("./connection");
const BlogPost = require("./models/BlogPost");

const app = express();
const port = 5000

// connect database
connectDB();

// middleware 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

// route for posting the block to the database
app.post("/post-blog", async (req, res) => {
    let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
    });

    await blog.save();
    res.json({message: "blog saved successfully", blog});
})

// route for getting all the blocks
app.get("/get-blocks", async (req, res) => {
    let blocks = await BlogPost.find();
    if (!blocks) {
        res.status(404).json({message: "no blogs are found"});
    } else {
        res.json({blocks});
    }
})

//route for delete a block fron the database
app.delete("/delete-blog/:id", async (req,res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
        res.status(404).json({message: "no blogs are found"});        
    } else {
        res.status(200).json({message: "blog has been deleted successfully"});
    }
})

//route for update the blog from the database
app.put("/update-blog/:id", async (req, res) => {

    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    
    if (!blog) {
        res.status(404).json({message: "no blog found"});
    } else {
        if (!req.body.title && !req.body.description) {
            res.json({message: "please title or description"});
        } else if (!req.body.title) {
            blog.description = req.body.description;
        } else if (!req.body.description) {
            blog.title = req.body.title;
        } else {
            blog.title = req.body.title;
            blog.description = req.body.description;
        }
    }

    await blog.save();
    res.status(200).json({message: "data updated successfullly", blog})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));