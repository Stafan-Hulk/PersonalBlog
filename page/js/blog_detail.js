let blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: 1,
        tags: "",
        views: ""
    },
    computed: {

    },
    created() {
        let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams === "") {
            return;
        }
        let bid = -1;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] === "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);

                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(resp => {
            this.title = resp.data.data[0].title;
            this.content = resp.data.data[0].content;
            this.ctime = resp.data.data[0].ctime;
            this.tags = resp.data.data[0].tags;
            this.views = resp.data.data[0].views;
        }).catch(err => {
            console.log("个人博客请求失败");
        })
    },
})


let sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {

    },
    methods: {
        sendComment() {
            let code = document.getElementById("comment_code").value;
            if (code !== this.rightCode) {
                alert("验证码有误");
                this.changeCode();
                return;
            }
            let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            if (searchUrlParams === "") {
                return;
            }
            let bid = -1;
            for (let i = 0; i < searchUrlParams.length; i++) {
                if (searchUrlParams[i].split("=")[0] === "bid") {
                    try {
                        bid = parseInt(searchUrlParams[i].split("=")[1]);

                    } catch (e) {
                        console.log(e)
                    }
                }
            }

            let replyName = document.getElementById("comment_reply_name").value;
            let reply = document.getElementById("comment_reply").value;
            let name = document.getElementById("comment_name").value;
            let email = document.getElementById("comment_email").value;
            let content = document.getElementById("comment_content").value;
            axios({
                method: "get",
                url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&replyName=" + replyName
            }).then(resp => {
                console.log(resp);
            })

        },
        changeCode() {
            axios({
                method: "get",
                url: "/queryRandomCode"
            }).then(resp => {
                this.vcode = resp.data.data.data;
                this.rightCode = resp.data.data.text;

            }).catch(err => {
                console.log("err", err)
            })
        }
    },
    created() {
        this.changeCode();
    }
})

let blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {

    },
    created() {
        let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if (searchUrlParams === "") {
            return;
        }
        let bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] === "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);

                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(result => {
            let resp = result.data.data;
            this.total = resp.length;
            this.comments = resp;
            let list = [];
            for (let i = 0; i < resp.length; i++) {
                let obj = {
                    id: resp[i].id,
                    name: resp[i]["user_name"],
                    ctime: resp[i].ctime,
                    comment: resp[i].comment
                }
                if (resp[i].parent > -1) {
                    obj.options = "回复@" + resp[i].parent_name;
                }
                list.push(obj);

            }
            console.log(resp);
            this.comments = list;

        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        reply(commentId, userName) {
            document.getElementById("comment_reply").value = commentId;
            document.getElementById("comment_reply_name").value = userName;

        }
    }
})
