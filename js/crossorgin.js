if (!$.ibo) $.ibo = {};
// 默认目录服务器根地址
$.ibo.IndexSrvUrl = "http://192.168.10.51:5006";
// 目录服务器根地址
//$.ibo.IndexSrvUrl = "http://localhost/Opservice";

// 默认表单流程服务器根地址
$.ibo.FormFlowSrvUrl = "http://192.168.10.51:5002";
//$.ibo.FormFlowSrvUrl = localStorage.getItem("$.ibo.FormFlowSrvUrl");
// 默认表单流程服务器根地址
//$.ibo.ApplicationSrvUrl = "http://192.168.10.223/appservice";
//$.ibo.ApplicationSrvUrl = localStorage.getItem("$.ibo.ApplicationSrvUrl");
// 公司编号
//$.ibo.ComID = "00001";
$.ibo.ComID = localStorage.getItem("$.ibo.ComID");
$.ibo.ApplicationSrvUrl = "http://192.168.10.51:5004";

// 企业后台管理服务地址
//$.ibo.FormFlowSrvUrl = "http://192.168.10.223/formflow";
//$.ibo.FormFlowSrvUrl = localStorage.getItem("$.ibo.FormFlowSrvUrl");

// 企业应用服务地址
//$.ibo.ApplicationSrvUrl = "http://192.168.10.223/AppService";
//$.ibo.ApplicationSrvUrl = localStorage.getItem("$.ibo.ApplicationSrvUrl");

// 登陆页面地址
var loginViewUrl = "http://localhost/index.html";
//var loginViewUrl = "http://localhost:20580/Views/platform/login.html";
// 跳转到首页
function linkToHomePage() {
    window.top.location = loginViewUrl;
};

$.ibo.ResFlag = {
    // 成功
    "Success": 0,
    // 失败
    "Failed": 1,
    // 登陆超时
    "LoginOut": 2,
    // 没有权限
    "NoRight": 3,
    // 程序异常
    "Error": 4
};

// 回调函数字典
$.ibo.postCallBackArray = new Array();
// iframe字典
$.ibo.postIframeArray = new Array();

//url:跨越请求地址 funcName:请求方法名 data:请求参数 success:成功回调函数 pageName:提交页面名(默认CrossOrgin.html)
$.ibo.crossOrgin = function (para) {
    // 创建iframe
    var iframe = $("<iframe>");
    // 设置iframe不可见
    iframe.css("display", "none");
    var url = "";
    // 判断是否存在url
    if (!para || !para.url) {
        linkToHomePage();
        return;
    }
    url = para.url;
    // 提交页面名
    if (!para || !para.pageName) {
        url = url + "/CrossOrgin.html?t=" + Math.random();
    }
    iframe.attr("src", url);
    var callBackID = $.ibo.GetCallBackID();
    // 传递参数json串
    iframe.on("load", function () {
        try {
            $.ibo.postMessage(para, this, callBackID);
        }
        catch (e) {
            linkToHomePage();
        }
    });
    // 将iframe放置到document
    $(document.body).append(iframe);
};

// 当前回调id
$.ibo.CurentCallBackID = 0;
// 当前已回调id
$.ibo.CurentExcCallBackID = 0;
// 获取当前回调id
$.ibo.GetCallBackID = function () {
    return $.ibo.CurentCallBackID++;
};

// para:调用参数 iframe:中间页面iframe
$.ibo.postMessage = function (para, iframe, callBackID) {
    // 存在回调函数,存储到全局变量中
    if (para && para.success && typeof (para.success) == "function") {
        $.ibo.postCallBackArray[callBackID] = para.success;
    } 
    else $.ibo.postCallBackArray[callBackID] = null;
    $.ibo.postIframeArray[callBackID] = iframe;
    // 跨域发送消息至目标页面
    var iserr= iframe.contentWindow.postMessage($.toJSON({
        jsonStr: para.data,
        funcName: para.funcName,
        callBackID: callBackID
    }), "*");
};

// 执行回调函数   fn回调函数   para回调参数   callBackID回调id
$.ibo.ExcCallBack = function (fn, para, callBackID) {
    // 判断回调id是否与已执行回调id一致
    if (callBackID == $.ibo.CurentExcCallBackID) {
        // 已回调id自增长
        $.ibo.CurentExcCallBackID++;
        // 执行回调
        fn(para);
    }
    else {
        // 否则延迟执行回调   直到回调id与已执行回调id一致   保持异步调用回调函数执行顺序
        setTimeout(function () { $.ibo.ExcCallBack(fn, para, callBackID) }, 100);
    }
};

// 监听消息
$(window).on("message", function (e) {
    var e = e.originalEvent;
    // 消息内容
    var data = e.data;

    // 转换成json对象
    var jsonObj = $.parseJSON(data);
    // 请求传递参数
    var jsonStr = jsonObj.jsonStr;
    var resObj = $.parseJSON(jsonStr);
    // 回调函数id
    var callBackID = jsonObj.callBackID;

    if (resObj && resObj.ResFlag == $.ibo.ResFlag.LoginOut) {
        linkToHomePage();
        return;
    }

    // 存在回调函数id
    if (callBackID != undefined && callBackID != null) {
        // 根据id获取回调函数
        var callBackFun = $.ibo.postCallBackArray[callBackID];
        if (callBackFun != null) {
            $.ibo.ExcCallBack(callBackFun, resObj, callBackID);
        }
        // 移除回调函数
        delete $.ibo.postCallBackArray[callBackID];
    }
    $.ibo.postIframeArray[callBackID].remove();
    delete $.ibo.postIframeArray[callBackID];
});

// 获取回调函数凭证 生成长度为16的随机字符串
$.ibo.getCallBackFunNum = function () {
    len = 16;
    var $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var maxPos = $chars.length;
    var num = "";
    for (i = 0; i < len; i++) {
        num += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return num;
};

// 检查登陆
$.ibo.CheckLogin = function () {
    $(document.body).css("visibility", "hidden");
    if ($.ibo.FormFlowSrvUrl && $.ibo.FormFlowSrvUrl.length > 0) {
        $.ibo.crossOrgin({
            url: $.ibo.FormFlowSrvUrl,
            funcName: "CheckLogin",
            data: null,
            success: function (obj) {
                $(document.body).css("visibility", "visible");
                $.ibo.IsComFlag = obj.ResObj;//保存是否是临时用户
                if ($.ibo.IsComFlag == 0)//临时用户禁用掉某些按钮(禁用掉自定义属性IsComFlag=0的按钮)
                {
                    $("input[IsComFlag='0'],button[IsComFlag='0'],select[IsComFlag='0']").attr("disabled", "disabled");//禁用这些按钮
                    $("a[IsComFlag='0']").hide();
                 
                }
            }
        });
    }
    else {
        linkToHomePage();
    }
};


$(document).ready(function () {
    $.ibo.userSelect = $.ibo.getStyleName("user-select");
    // 检查登陆
    if (!$.ibo.isNotCheckLogin) $.ibo.CheckLogin();
});