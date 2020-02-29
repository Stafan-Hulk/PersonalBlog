let blogDao = require("../dao/BlogDao");
let tagsDao = require("../dao/TagsDao");
let TagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");

let mapPath = new Map();

function queryByTags(){
    let params = url.parse(request.url, true).query;

}

function queryBlogById(request, response) {
    let params = url.parse(request.url, true).query;

    blogDao.queryBlogById(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
    blogDao.addViews(params.bid, function (result) { })

}

mapPath.set("/queryBlogById", queryBlogById);

function queryAllBlog(request, response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
mapPath.set("/queryAllBlog", queryAllBlog);


function queryHotBlog(request, response) {
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

mapPath.set("/queryHotBlog", queryHotBlog);


function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (count) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", count));
        response.end();
    })
}
mapPath.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (let i = 0; i < result.length; i++) {
            result[i].content = result[i].content.replace(/<[\W\w]+?>/g, "");
        }

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
mapPath.set("/queryBlogByPage", queryBlogByPage);


function editBlog(request, response) {
    let params = url.parse(request.url, true).query;
    let tags = params.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
            let blogId = result.insertId;
            let tagList = tags.split(",");
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}

mapPath.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            TagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            })
        }
    })
}


function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    TagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    });
}

module.exports.path = mapPath