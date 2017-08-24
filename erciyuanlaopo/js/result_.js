var vm = new Vue({
    el: '#app',
    data: {
        type: '',
        TitleimgSrc:'',
        recommendImg:'',
        resultText: '',
        result: [],
        imgSrc:'',
        ClickFlag:false,
        thisBlog:true,
        ahref:'',
        waiahref:''
    },
    mounted: function () {
        var _this = this;
        _this.GetResult();
    },
    methods: {
        GetResult: function () {
            var _this = this;
            Vue.prototype.$http = axios;
            _this.type = _this.GetQueryString("result")
            console.log(_this.type)

            _this.$http({
                method: 'get',
                url: './data/result_.json'
            })
                .then(function (response) {

                    var res = response.data;
                    _this.result = res.result
                    
                    _this.result.forEach(function (value, index) {
                        if (value.type == _this.type) {
                            console.log(value.waiahref);
                            _this.resultText = value.resultText
                            _this.TitleimgSrc = value.TitleimgSrc
                            _this.recommendImg=value.recommendImg
                            _this.imgSrc=value.imgSrc
                            _this.ahref=value.ahref
                            _this.waiahref=value.waiahref
                        }
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    }
})