
var vm = new Vue({
    el: '#app',
    data: {
        Qnum: 0,
        mySwiper: "",
        Anwsers: [],
        ClickFlag: true,
        questions: [],
        totle: 0,
        result: 0
    },
    mounted: function () {
        var _this = this
        _this.$nextTick(function () {
            _this.GetQuestionsList();//加载问题列表

        })
    },
    methods: {
        finished: function (result) {//答完题目的时候调用
            var _this = this
            console.log('答完');
            location.href = "./result.html?result=" + result
        },
        GetQuestionsList: function () {//请求问题列表，渲染列表
            var _this = this;

            Vue.prototype.$http = axios;
            _this.$http({
                method: 'get',
                url: './data/questions.json'
            })
                .then(function (response) {

                    var res = response.data;
                    _this.questions = res.result
                    _this.Qnum = res.result.length

                    _this.$nextTick(function () {
                        _this.mySwiper = new Swiper('.swiper-container', {//定义swipe插件
                            pagination: '.swiper-pagination',
                            paginationClickable: false,
                            // spaceBetween: 30,
                            grabCursor: true, //鼠标变手型
                            noSwiping: true,
                            noSwipingClass: 'stop-swiping',
                            parallax: true,
                            shortSwipes: false, //进行快速短距离的拖动无法触发Swiper
                            paginationBulletRender: function (index, className) {
                                return '<span class="' + className + '" v-bind:class="{pagination-checkyet:index==' + index + '}">' + (index + 1) + '</span>';
                            }
                        });
                    })

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        PaginationChange: function (index) {//给答过的题目加上高亮显示状态
            var obj = document.getElementById("swiper-pagination").childNodes;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].innerHTML == index) {
                    obj[i].classList.add("pagination-checkyet");
                }
            }

            // obj.forEach(function (value, i) {
            //     if (value.innerHTML == index) {
            //         value.classList.add("pagination-checkyet");
            //     }
            // });
        },
        labelClick: function (index, index_swipe, score, ev) { // 点击选择答案函数
            var _this = this;

            _this.activeClass = index //当前点击的答案index
            _this.ClickFlag = true;  //点击对象设置为true
            _this.Anwsers.length = _this.Qnum//指定数组长度

            _this.Anwsers.splice(index_swipe, 1, index);//答案数组保存当前题目的答案 index_swipe表示当前是第几题
            _this.PaginationChange(index_swipe + 1);//调用PaginationChange改变--当前点击的答案的高亮显示
            _this.totle += score//计算总分数
            console.log(_this.totle);
            ev.currentTarget.disabled = 'disabled'
            setTimeout(function () {
                //等待500ms，确保label绑定的事件执行
                _this.activeIndex = _this.mySwiper.activeIndex + 1;


                if (_this.ClickFlag) {//点击对象为true

                    _this.ClickFlag = false;//点击对象设置为false 本题已答
                    _this.mySwiper.slideTo(index_swipe + 1, 1000, false);
                    if (index_swipe + 1 == _this.Qnum) {//判断是否 还有题目 该情况下，所有题目都已经答完
                        //_this.mySwiper.slideNext();
                        //全部答完
                        _this.finished(_this.totle);
                    }
                }
            }, 1000);

        }
    }
});


