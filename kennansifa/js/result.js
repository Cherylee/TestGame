var vm = new Vue({
    el: '#app',
    data: {
        num: 0,
        thisType: '',
        resultText: '',
        imgSrc: '',
        TitleimgSrc:'',
        recommendImg:'',
        result: [],
        ClickFlag:false,
        thisBlog:true,
        ahref:'',
        waiahref:''
    },
    mounted: function () {
        var _this = this;
        _this.GetResult();//加载结果列表
    
    },
    methods: {
        GetResult: function () {
            var _this = this;
            Vue.prototype.$http = axios;
            _this.num = _this.GetQueryString("result");
            _this.GetResultType(_this.num)//得到的积分总和转换为类型type
            console.log(_this.num)
            console.log(_this.thisType);

            _this.$http({
                method: 'get',
                url: './data/result.json'
            })
                .then(function (response) {

                    var res = response.data;
                    _this.result = res.result

                    _this.result.forEach(function (value, index) {//循环找出对应的type类型的结果
                        if (value.type == _this.thisType) {
                            console.log(value.resultText);
                            _this.resultText = value.resultText
                            _this.TitleimgSrc = value.TitleimgSrc
                            _this.recommendImg=value.recommendImg
                            _this.imgSrc = value.imgSrc
                            _this.ahref=value.ahref
                            _this.waiahref=value.waiahref
                        }
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        GetQueryString: function (name) {//获取url参数
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        GetResultType: function (result) {//转换为类型type
            var _this = this;
            if (result >= 15 && result <= 20) {
                _this.thisType = 'A'
            } else if (result >= 21 && result <= 25) {
                _this.thisType = 'B'
            } else if (result >= 26 && result <= 30) {
                _this.thisType = 'C'
            } else if (result >= 31 && result <= 35) {
                _this.thisType = 'D'
            } else if (result >= 36 && result <= 40) {
                _this.thisType = 'E'
            } else if (result >= 41 && result <= 45) {
                _this.thisType = 'F'
            }
            return _this.thisType;
        }
    }
})