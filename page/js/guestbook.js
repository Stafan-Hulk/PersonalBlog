let blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {

    },
    created() {
        this.getData();
    },
    methods: {
        reply(commentId, userName) {
            document.getElementById("comment_reply").value = commentId;
            document.getElementById("comment_reply_name").value = userName;

        },
        getData(){
            let bid = -2;
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
                this.comments = list;
    
            }).catch(err => {
                console.log(err);
            })
        }
    }
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
            let bid = -2;

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

            document.getElementById("comment_reply_name").value = "";
            document.getElementById("comment_reply").valu = "";
            document.getElementById("comment_name").value = "";
            document.getElementById("comment_email").value = "";
            document.getElementById("comment_content").value = "";
            document.getElementById("comment_code").value = "";
            this.changeCode();
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

