var utils = {
    //getCss:获取元素的样式
    getCss: function (curEle, attr) {
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/, val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                var temp = curEle.currentStyle["filter"], tempReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = tempReg.test(temp) ? tempReg.exec(temp)[1] : "1";
                val = parseFloat(val) / 100;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        return reg.test(val) ? parseFloat(val) : val;
    },
    //setCss:设置元素的样式
    setCss: function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    },
    //setGroupCss:批量设置元素的样式
    setGroupCss: function (curEle, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.setCss(curEle, key, options[key]);
            }
        }
    }
};

(function () {

    var banner = document.getElementById("banner"),
        bannerImg = document.getElementById("bannerImg"),
        bannerTip = document.getElementById("bannerTip");
    var bannerTipList = bannerTip.getElementsByTagName("li");


    var bannerH = 388;
    var totalH = 6 * bannerH;
    var count = 6;
    utils.setGroupCss(bannerImg, {height: totalH, top: -bannerH});

//实现焦点对齐
    var setTip = function (index) {
        index < 0 ? index = bannerTipList.length : null;
        index >= bannerTipList.length ? index = 0 : null;
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].className = i === index ? "select" : null;
        }
    };
    var step = 1;
    var move = function (dir) {
        if (typeof dir === "undefined" || dir === "right") {
            step++;
            if (step >= count) {
                utils.setCss(bannerImg, "top", -1 * bannerH);
                step = 2;
            }
        } else if (dir === "top") {
            step--;
            if (step < 0) {
                utils.setCss(bannerImg, "top", -(count - 2) * bannerH);
                step = 3;
            }
        } else if (dir === "tip") {
            step = this.index + 1;
        }
        animate(bannerImg, {top: -step * bannerH}, 0, 1);
        setTip(step - 1);
    };


//实现自动轮播
    bannerImg.autoTimer = window.setInterval(move, 5000);


//实现焦点点击切换
    for (var i = 0; i < bannerTipList.length; i++) {
        bannerTipList[i].index = i;
        bannerTipList[i].onclick = function () {
            move.call(this, "tip");
        };
    }
})();


