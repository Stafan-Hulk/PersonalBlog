let blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {

    },
    created() {
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then(resp => {
            let data = resp.data.data
            this.blogList = data;
            for (let i = 0; i < data.length; i++) {
                data[i].link = "/blog_detail.html?bid=" + data[i].id;

            }
        }).catch(err => {

        })
    }
})