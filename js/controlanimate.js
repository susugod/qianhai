/* 动画函数 */
(function () {
    $.fn.iboAnimate = function (objAnimate, objTime, objDelayTime, isCycle) {
        if (objTime == "" || objTime == undefined || objTime == 0) {
            objTime = 1000;
        }
        else {
            objTime = parseFloat(objTime) * 1000;
        }
        if (objDelayTime == "" || objDelayTime == undefined || objDelayTime == 0) {
            objDelayTime = 0;
        }
        else {
            objDelayTime = parseFloat(objDelayTime) * 1000;
        }
        switch (objAnimate) {
            case "fadeIn"://淡入
                var objthis = $(this);
                var fun = function () {
                    objthis.hide();
                    objthis.fadeIn(objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                };
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "fadeOut"://淡出
                var objthis = $(this);
                var fun = function () {
                    objthis.hide();
                    objthis.fadeOut(objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                };
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "slideLeft"://左侧滑入
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var left = objthis.css("left");
                    left = parseFloat(left, 10);
                    if (isNaN(left)) {
                        left = 0;
                    }
                    objthis.css("left", left - 3000);
                    objthis.animate({ "left": left }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "slideRight"://右侧滑入
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var left = objthis.css("left");
                    left = parseFloat(left, 10);
                    if (isNaN(left)) {
                        left = 0;
                    }
                    objthis.css("left", left + 3000);
                    objthis.animate({ "left": left }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "slideNorth"://上侧滑入
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var top = objthis.css("top");
                    top = parseFloat(top, 10);
                    if (isNaN(top)) {
                        top = 0;
                    }
                    objthis.css("top", top - 3000);
                    objthis.animate({ "top": top }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "slideSouth"://下侧滑入
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var top = objthis.css("top");
                    top = parseFloat(top, 10);
                    if (isNaN(top)) {
                        top = 0;
                    }
                    objthis.css("top", top + 3000);
                    objthis.animate({ "top": top }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "flicker"://闪烁
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    objthis.animate({ "opacity": '0.1' }, objTime / 8).animate({ "opacity": '1' }, objTime / 8).animate({ "opacity": '0.1' }, objTime / 8).animate({ "opacity": '1' }, objTime / 8).animate({ "opacity": '0.1' }, objTime / 8).animate({ "opacity": '0.1' }, objTime / 8).animate({ "opacity": '0.1' }, objTime / 8).animate({ "opacity": '1' }, objTime / 8, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "bigger"://由小变大
                //var objthis = $(this);
                //var fun = function () {
                //    objthis.show();
                //    if (objthis.is("img")) {
                //        var wid = objthis.width();
                //        var hei = objthis.height();
                //        objthis.css("width", wid * 0.5);
                //        objthis.css("height", hei * 0.5);
                //        objthis.animate({ "width": wid, "height": hei }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                //    }
                //    else {
                //        objthis.css("-webkit-transform", "scale(0.5)");
                //        objthis.animate({ "display": "block" }, objTime, function () {
                //            objthis.css("-webkit-transform", "scale(1)");
                //            objthis.css("-webkit-transition", (objTime/2) + "ms");
                //            objthis.css("transition", (objTime/2) + "ms");
                //            if (isCycle == "true") { setTimeout(fun, 300) }
                //        })
                //    }
                //}
                //objthis.hide();
                //setTimeout(fun, objDelayTime);
                objTime = objTime / 1000;
                objDelayTime = objDelayTime / 1000;
                $(this).removeClass("animate_bigger");
                $(this).addClass("animate_bigger");
                $(this).css("-webkit-animation-duration", objTime + "s");
                $(this).css("-webkit-animation-delay", objDelayTime + "s");
                $(this).css("-moz-animation-duration", objTime + "s");
                $(this).css("-moz-animation-delay", objDelayTime + "s");
                if (isCycle == "true") {
                    $(this).css("-webkit-animation-iteration-count", "infinite");
                    $(this).css("-moz-animation-iteration-count", "infinite");
                }
                else {
                    $(this).css("-webkit-animation-iteration-count", "2");
                    $(this).css("-moz-animation-iteration-count", "2");
                }
                break;
            case "smaller"://由大变小
                //var objthis = $(this);
                //var fun = function () {
                //    objthis.show();
                //    if (objthis.is("img")) {
                //        var wid = objthis.width();
                //        var hei = objthis.height();
                //        objthis.css("width", wid * 1.5);
                //        objthis.css("height", hei * 1.5);
                //        objthis.animate({ "width": wid, "height": hei }, objTime, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                //    }
                //    else {
                //        var size = objthis.css("font-size");
                //        size = parseFloat(size, 10);
                //        objthis.css("font-size", size + 20);
                //        objthis.css("display", "none");
                //        objthis.animate({ "font-size": size + 20 }, 10, function () { objthis.css("display", "block"); }).animate({ "font-size": size }, objTime - 10, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                //    }
                //}
                //objthis.hide();
                //setTimeout(fun, objDelayTime);
                objTime = objTime / 1000;
                objDelayTime = objDelayTime / 1000;
                $(this).removeClass("animate_smaller");
                $(this).addClass("animate_smaller");
                $(this).css("-webkit-animation-duration", objTime + "s");
                $(this).css("-webkit-animation-delay", objDelayTime + "s");
                $(this).css("-moz-animation-duration", objTime + "s");
                $(this).css("-moz-animation-delay", objDelayTime + "s");
                if (isCycle == "true") {
                    $(this).css("-webkit-animation-iteration-count", "infinite");
                    $(this).css("-moz-animation-iteration-count", "infinite");
                }
                else {
                    $(this).css("-webkit-animation-iteration-count", "2");
                    $(this).css("-moz-animation-iteration-count", "2");
                }
                break;
            case "shake"://抖动
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var left = objthis.css("left");
                    left = parseFloat(left, 10);
                    if (isNaN(left)) {
                        left = 0;
                    }
                    objthis.animate({ "left": left - 10 }, objTime / 8).animate({ "left": left + 10 }, objTime / 8).animate({ "left": left - 10 }, objTime / 8).animate({ "left": left + 10 }, objTime / 8).animate({ "left": left - 10 }, objTime / 8).animate({ "left": left + 10 }, objTime / 8).animate({ "left": left - 10 }, objTime / 8).animate({ "left": left }, objTime / 8, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "jump"://跳动
                var objthis = $(this);
                var fun = function () {
                    objthis.show();
                    var top = objthis.css("top");
                    top = parseFloat(top, 10);
                    if (isNaN(top)) {
                        top = 0;
                    }
                    objthis.animate({ "top": top - 10 }, objTime / 8).animate({ "top": top + 10 }, objTime / 8).animate({ "top": top - 10 }, objTime / 8).animate({ "top": top + 10 }, objTime / 8).animate({ "top": top - 10 }, objTime / 8).animate({ "top": top + 10 }, objTime / 8).animate({ "top": top - 10 }, objTime / 8).animate({ "top": top }, objTime / 8, function () { if (isCycle == "true") { setTimeout(fun, 300) } });
                }
                objthis.hide();
                setTimeout(fun, objDelayTime);
                break;
            case "rotate"://旋转
                //var objthis = $(this);
                //var fun = function () {
                //    objthis.show();
                //    objthis.rotate({ duration: objTime, angle: 0, animateTo: 720, callback: function () { if (isCycle == "true") { fun() } } });
                //};
                //objthis.hide();
                //setTimeout(fun, objDelayTime);
                objTime = objTime / 1000;
                objDelayTime = objDelayTime / 1000;
                $(this).removeClass("animate_rotate");
                $(this).addClass("animate_rotate");
                $(this).css("-webkit-animation-duration", objTime + "s");
                $(this).css("-webkit-animation-delay", objDelayTime + "s");
                $(this).css("-moz-animation-duration", objTime + "s");
                $(this).css("-moz-animation-delay", objDelayTime + "s");
                if (isCycle == "true") {
                    $(this).css("-webkit-animation-iteration-count", "infinite");
                    $(this).css("-moz-animation-iteration-count", "infinite");
                }
                else {
                    $(this).css("-webkit-animation-iteration-count", "2");
                    $(this).css("-moz-animation-iteration-count", "2");
                }
                break;
            case "rotate3D"://旋转3D
                objTime = objTime / 1000;
                objDelayTime = objDelayTime / 1000;
                $(this).removeClass("animate_3d");
                $(this).addClass("animate_3d");
                $(this).css("-webkit-animation-duration", objTime + "s");
                $(this).css("-webkit-animation-delay", objDelayTime + "s");
                $(this).css("-moz-animation-duration", objTime + "s");
                $(this).css("-moz-animation-delay", objDelayTime + "s");
                if (isCycle == "true") {
                    $(this).css("-webkit-animation-iteration-count", "infinite");
                    $(this).css("-moz-animation-iteration-count", "infinite");
                }
                else {
                    $(this).css("-webkit-animation-iteration-count", "2");
                    $(this).css("-moz-animation-iteration-count", "2");
                }
                break;
            default: break;
        }
    }
})();

//添加动画  obj
function CreateAnimate(objAnimateType) {
    var obj = formEditor.sltControls[0];
    if (obj == "" || obj == undefined) {
        alert("请选中一个控件");
        var links = $("#dialogProperties .ibo-animateclass").find("a");
        links.removeClass("active");
        return;
    }
    var htmlobj = obj.htmlObj;
    var animate = formEditor.sltControls[0].attrList.animate;
    htmlobj.removeClass(animate);
    switch (objAnimateType) {
        case 0:
            formEditor.sltControls[0].attrList.animate = "";
            iboMousePositionAlert("无动画");
            break;
        case 1:
            formEditor.sltControls[0].attrList.animate = "slideLeft";
            htmlobj.addClass("slideLeft");
            iboMousePositionAlert("已选中从左飞入");
            break;
        case 2:
            formEditor.sltControls[0].attrList.animate = "slideSouth";
            htmlobj.addClass("slideSouth");
            iboMousePositionAlert("已选中从下飞入");
            break;
        case 3:
            formEditor.sltControls[0].attrList.animate = "slideRight";
            htmlobj.addClass("slideRight");
            iboMousePositionAlert("已选中从右飞入");
            break;
        case 4:
            formEditor.sltControls[0].attrList.animate = "slideNorth";
            htmlobj.addClass("slideNorth");
            iboMousePositionAlert("已选中从上飞入");
            break;
        case 5:
            formEditor.sltControls[0].attrList.animate = "fadeIn";
            htmlobj.addClass("fadeIn");
            iboMousePositionAlert("已选中淡入");
            break;
        case 6:
            formEditor.sltControls[0].attrList.animate = "flicker";
            htmlobj.addClass("flicker");
            iboMousePositionAlert("已选中闪烁");
            break;
        case 7:
            formEditor.sltControls[0].attrList.animate = "smaller";
            htmlobj.addClass("smaller");
            iboMousePositionAlert("已选中从大到小");
            break;
        case 8:
            formEditor.sltControls[0].attrList.animate = "bigger";
            htmlobj.addClass("bigger");
            iboMousePositionAlert("已选中从小到大");
            break;
        case 9:
            formEditor.sltControls[0].attrList.animate = "shake";
            htmlobj.addClass("shake");
            iboMousePositionAlert("已选中抖动");
            break;
        case 10:
            formEditor.sltControls[0].attrList.animate = "jump";
            htmlobj.addClass("jump");
            iboMousePositionAlert("已选中跳动");
            break;
        case 11:
            formEditor.sltControls[0].attrList.animate = "rotate";
            htmlobj.addClass("rotate");
            iboMousePositionAlert("已选中旋转");
            break;
        case 12:
            formEditor.sltControls[0].attrList.animate = "rotate3D";
            htmlobj.addClass("rotate3D");
            iboMousePositionAlert("已选中旋转3D");
            break;
    }
}

//设置动画时间
function SetAnimateTime() {
    var obj = formEditor.sltControls[0];
    if (obj == "" || obj == undefined) {
        $("#ctrlanimatetime").val("");
        alert("请选中一个控件");
        return;
    }
    var htmlobj = obj.htmlObj;
    var time = $("#ctrlanimatetime").val();
    formEditor.sltControls[0].attrList.animatetime = time;
    htmlobj.attr("animatetime", time);
}

//设置动画延迟时间
function SetAnimateDelayTime() {
    var obj = formEditor.sltControls[0];
    if (obj == "" || obj == undefined) {
        $("#ctrlanimatedelaytime").val("");
        alert("请选中一个控件");
        return;
    }
    var htmlobj = obj.htmlObj;
    var time = $("#ctrlanimatedelaytime").val();
    formEditor.sltControls[0].attrList.animatedelaytime = time;
    htmlobj.attr("animatedelaytime", time);
}

//设置循环开关
function SetAnimateCycle() {
    var obj = formEditor.sltControls[0];
    if (obj == "" || obj == undefined) {
        $("#ctrlcycle").val("");
        alert("请选中一个控件");
        return;
    }
    var htmlobj = obj.htmlObj;
    if ($("#ctrlcycle").get(0).checked) {
        formEditor.sltControls[0].attrList.isCycle = "true";
        htmlobj.attr("isCycle", "true");
    }
    else {
        formEditor.sltControls[0].attrList.isCycle = "false";
        htmlobj.attr("isCycle", "false");
    }
}
