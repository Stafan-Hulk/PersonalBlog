let dbutil = require("./dbutil");

function insertComment(blogId, parent, userName, email, comments, ctime, utime, parentName, success) {
    let insertSql = "insert into comments (blog_id, parent, user_name, email, comment, ctime, utime, parent_name) values (?,?,?,?,?,?,?,?) ;";
    let params = [blogId, parent, userName, email, comments, ctime, utime, parentName];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();

}

function queryCommentsByBlogId(blogId, success) {
    let querySql = "select * from comments where blog_id = ?;";
    let params = [blogId];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();

}

function queryNewComments(size, success) {
    let querySql = "select * from comments order by ctime desc limit ?;";
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();

}

module.exports = {
    insertComment,
    queryCommentsByBlogId,
    queryNewComments
}