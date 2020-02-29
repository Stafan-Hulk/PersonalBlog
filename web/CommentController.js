let commentDao = require("../dao/CommentDao");
let timeUtil = require("../util/TimeUtil");
let respUtil = require("../util/RespUtil");
let url = require("url");
let captcha = require("svg-captcha");

let mapPath = new Map();


function addComment(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent),
        params.userName, params.email, params.content,
        timeUtil.getNow(), timeUtil.getNow(), params.replyName, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end();
        })
}

mapPath.set("/addComment", addComment);

function queryRandomCode(request, response) {
    let img = captcha.create({ fontSize: 50, width: 100, height: 34 });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", img));
    response.end();

}
mapPath.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
mapPath.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryNewComments(request, response) {
    commentDao.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
mapPath.set("/queryNewComments", queryNewComments);

module.exports.path = mapPath;

