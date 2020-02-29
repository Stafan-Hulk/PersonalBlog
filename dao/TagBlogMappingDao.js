let dbutil = require("./dbutil");

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    let insertSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?,?,?,?) ;";
    let params = [tagId, blogId, ctime, utime];
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

function queryByTag(tagId, success) {
    let insertSql = "select * from tag_blog_mapping where tag_id = ? ;";
    let params = [tagId];
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

module.exports = {
    insertTagBlogMapping,
    queryByTag
}