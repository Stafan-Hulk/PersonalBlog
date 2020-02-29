let everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "sfdaklfhjkaf"
    },
    computed: {
        getContent() {
            return this.content;
        }
    },
    created() {
        // 请求数据，给content赋值
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then((resp) => {
            this.content = resp.data.data[0].content;
        }).catch((err) => {
            console.log(err, "请求失败")
        })
    }
});

let articleList = new Vue({
    el: "#article_list",
    data: {
        articleList: [{}],
        page: 1,
        pageSize: 1,
        count: 0
    },
    computed: {
        getPage() {
            return function (page, pageSize) {
                axios({
                    method: "get",
                    url: "/queryBlogCount"
                }).then(resp => {
                    this.count = resp.data.data[0]["count(1)"];
                }).catch(err => {
                    console.log("请求失败", err);
                });

                let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                let tag = "";
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] === "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1];

                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (!tag) {
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(resp => {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        this.articleList = list;

                    }).catch(err => {
                        console.log("请求失败", err);
                    })
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?tag=" + tag
                    }).then(resp => {
                        let result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content.replace(/<[\s\S]*?>/g, "");
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        this.count = list.length;
                        this.articleList = list.slice(this.page - 1 * this.pageSize, this.page - 1 * this.pageSize + this.pageSize);
                    }).catch(err => {
                        console.log("请求失败", err);
                    })
                }
            }
        },
        pageNumList() {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }

            result.push({ text: ">>", page: Math.ceil(totalCount / pageSize) });
            return result;
        }

    },
    methods: {
        jumpTo(page) {
            this.page = page;
            this.getPage(page, this.pageSize);
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    }
})