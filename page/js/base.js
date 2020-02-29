let rendomTags = new Vue({
    el: "#random_tag",
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function () {
                let red = Math.random() * 255 + 50;
                let green = Math.random() * 255 + 50;
                let blue = Math.random() * 255 + 50;
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize() {
            return function () {
                return Math.random() * 20 + 12 + "px";
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(resp => {
            let data = resp.data.data;
            let list = [];
            for (let i = 0; i < data.length; i++) {
                list.push(data[i].tag);

            }
            this.tags = list;
        }).catch(err => {

        })
    }
})

let newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created() {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(resp => {
            let data = resp.data.data;
            let result = [];
            for (let i = 0; i < data.length; i++) {
                let temp = {};
                temp.title = data[i].title;
                temp.views = data[i].views;
                temp.link = "/blog_detail.html?bid=" + data[i].id;

                result.push(temp);
            }
            this.titleList = result;
        }).catch(err => {
            console.log(err);
        })
    }
})

let newComment = new Vue({
    el: "#new_comment",
    data: {
        commentList: []
    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(resp => {
            let data = resp.data.data;
            let result = [];
            for (let i = 0; i < data.length; i++) {
                let temp = {};
                temp.name = data[i]["user_name"];
                temp.date = data[i].ctime;
                temp.comment = data[i].comment;
                result.push(temp);
            }
            this.commentList = result;
        }).catch(err => {
            console.log(err);
        })
    }
})