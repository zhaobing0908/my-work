var col = document.getElementById("column1");
var coll = document.getElementById("column");
var list = document.getElementById("list");
var Left = document.getElementById("left");


var total = 0, totalPage = 0, pageNum = 12, curPage = 1;

u.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);


    bindData(curPage, data);
    left.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;

        if (tar.tagName.toLowerCase() === "a") {
            var page = 0;
            curPage = page;
            if (tar.id === "a1") {
                curPage = 1;
            } else if (tar.id === "a2") {
                curPage = 2;
            } else if (tar.id === "a3") {
                curPage = 3;
            } else if (tar.id === "a4") {
                curPage = 4;
            } else if (tar.id === "a5") {
                curPage = 5;
            } else if (tar.id === "a6") {
                curPage = 6;

            }
        }
        bindData(curPage, data);

    };
});
//1页 0-11 2页 12-23  3页 24-35  n也  n*pageNum-12-n*pageNum-1
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, eIndex = page * pageNum - 1;
    var str = "";
    for (var i = sIndex; i <= eIndex; i++) {
        var cur = data[i];
        if (cur) {
            str += "<li>";
            str += "<div>";
            str += "<a href='##'><img src='" + cur.img + "'/></a>";
            str += '<p class="p1"><a href="">' + cur.p1 + '</a></p>';
            str += '<p class="p2"><span>' + cur.p2 + '</span><em>|</em>' + cur.p3 + '</p>';
            str += '<p class="p3"><span>' + cur.p4 + '</span></p>';
            str += "</div>";
            str += "</li>"
        }
    }
    col.innerHTML = str;

}
