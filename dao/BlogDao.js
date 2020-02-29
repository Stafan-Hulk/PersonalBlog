let dbutil = require("./dbutil");

function insertBlog(title, content, views, tags, ctime, utime, success) {
    let insertSql = "insert into blog (title,content,views, tags,ctime,utime) values (?,?,?,?,?,?) ;";
    let params = [title, content, views, tags, ctime, utime];
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

function queryBlogByPage(page, pageSize, success) {
    let querySql = "select * from blog order by id desc limit ?,? ;";
    let params = [page * pageSize, pageSize];
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
function queryBlogCount(success) {
    let querySql = "select count(1) from blog ;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryBlogById(id, success) {
    let querySql, params;
    if (!Array.isArray(id)) {
        querySql = "select * from blog where id = ? ;";
        params = [id];
    } else {
        let query = id.map(i => "id = " + i).join(" or ");
        querySql = `select * from blog where ${query} ;`;
        params = [];
    }
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

function queryAllBlog(success) {
    let querySql = "select * from blog order by ctime desc;";
    let connection = dbutil.createConnection();
    let params = [];
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

function addViews(id, success) {
    let updateSql = "update blog set views = views + 1 where id =?;";
    let connection = dbutil.createConnection();
    let params = [id];
    connection.connect();
    connection.query(updateSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

function queryHotBlog(size, success) {
    let querySql = "select * from blog order by views desc limit ?;";
    let connection = dbutil.createConnection();
    let params = [size];
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
    insertBlog,
    queryBlogByPage,
    queryBlogCount,
    queryBlogById,
    queryAllBlog,
    addViews,
    queryHotBlog
}