let express = require("express");
let globalConfig = require("./config");
let loader = require("./loader");

let app = new express();

app.use(express.static(__dirname + "/page/"));   

app.post("/editEveryDay",loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));
app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.get("/addComment",loader.get("/addComment"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));
app.get("/queryAllBlog",loader.get("/queryAllBlog"));
app.get("/queryRandomTags",loader.get("/queryRandomTags"));
app.get("/queryHotBlog",loader.get("/queryHotBlog"));
app.get("/queryNewComments",loader.get("/queryNewComments"));
app.get("/queryByTag",loader.get("/queryByTag"));
// app.get("/queryByTagCount",loader.get("/queryByTagCount"));


app.listen(globalConfig.port, function () {
    console.log("服务器已启动");
}); 