let blogDao = require("../dao/BlogDao");
let tagsDao = require("../dao/TagsDao");
let TagBlogMappingDao = require("../dao/TagBlogMappingDao");
let respUtil = require("../util/RespUtil");
let url = require("url");
let mapPath = new Map();


function queryRandomTags(request, response) {
    tagsDao.queryAllTags(function (result) {
        result = result.sort(function () {
            return Math.random() - 0.5;
        })

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}

mapPath.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response) {
    let params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function (result) {

        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        } else {
            TagBlogMappingDao.queryByTag(result[0].id, function (result) {
                let list = [];
                result.forEach(tag => {
                    list.push(tag.blog_id)
                });
                blogDao.queryBlogById(list, function (res) {

                    response.writeHead(200);
                    response.write(respUtil.writeResult("success", "添加成功", res));
                    response.end();
                })



            })
        }

    })




}

mapPath.set("/queryByTag", queryByTag);


module.exports.path = mapPath