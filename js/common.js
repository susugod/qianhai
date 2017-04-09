if(!$.ibo) $.ibo = {};

$(document).ready(function () {
    $.ibo.userSelect = $.ibo.getStyleName("user-select");
});

// 判断浏览器是否支持css属性user-select
if (!$.ibo.getStyleName) {
    $.ibo.getStyleName = function (css, el) {
        var prefixes = ['', '-ms-', '-moz-', '-webkit-', '-khtml-', '-o-'], reg_cap = /-([a-z])/g;
        el = el || document.documentElement;
        var style = el.style, test;
        for (var i = 0, l = prefixes.length; i < l; i++) {
            var test = (prefixes[i] + css).replace(reg_cap, function ($0, $1) { return $1.toUpperCase(); });
            if (test in style) {
                return test;
            }
        }
        return null;
    };
}

// 设置文本不可选
if (!$.ibo.setUnSelectText) {
    $.ibo.setUnSelectText = function (obj) {
        obj = obj ? obj : document.documentElement;
        if (typeof ($.ibo.userSelect) == "string") {
            obj.style[$.ibo.userSelect] = "none";
        }
        else {
            obj.unselectable = "on";
            obj.onselectstart = function () { return false; }
        }
    };
}

// 设置文本可选
if (!$.ibo.setSelectText) {
    $.ibo.setSelectText = function (obj) {
        obj = obj ? obj : document.documentElement;
        if (typeof (userSelect) == "string") {
            obj.style[$.ibo.userSelect] = "text";
        }
        else {
            obj.unselectable = "off";
            obj.onselectstart = null;
        }
    };
}

// 若Array不存在indexOf方法则设置indexOf方法
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

// 数组添加remove方法
Array.prototype.remove = function (obj) {
    var index = this.indexOf(obj);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// 数组添加insert方法
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

// 数组添加contain方法
Array.prototype.contain = function (obj) {
    var index = this.indexOf(obj);
    return index > -1;
};


// 获取WCF服务所需日期格式 2015-01-02 12:00:00这种格式的
$.ibo.GetDateNewJson = function (str) {
    if (str != undefined && str != "") {
        return "\/Date(" + (new Date(str) - new Date("1970-01-01")) + "+0800)\/";
    } else {
        return null;
    }

};


// html转码
function HtmlEncode(text) {
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

$.ibo.minWidth = 1200;
$.ibo.minHeight = 540;

// 设置页面布局 minWidth：页面最小宽度  minHeight：页面最小宽度
$.ibo.setDocSize = function (para) {
    // 默认页面最小大小 1200x540
    var minWidth = $.ibo.minWidth;
    var minHeight = $.ibo.minHeight;

    // 获取当前窗口页面大小
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    // 判断页面最小大小
    if (para && para.minWidth && typeof (para.minWidth) == "number") minWidth += para.minWidth;
    if (para && para.minHeight && typeof (para.minHeight) == "number") minHeight += para.minHeight;

    // 判断页面应设置大小
	//	winWidth = winWidth < minWidth ? minWidth : winWidth;
	//s	winHeight = winHeight < minHeight ? minHeight : winHeight;
	
		
    // 判断页面比例
    var widthPer = winWidth / minWidth;
    var heightPer = winHeight / minHeight;

    // 设置document.body的大小
    var bodyEle = document.body;
   // if (winWidth > minWidth) bodyEle.style.width = "100%";
   bodyEle.style.width = "100%";
   // else bodyEle.style.width = winWidth.toString() + "px";
    bodyEle.style.height = winHeight.toString() + "px";
};

// 当前最大z-index序号
$.ibo.maxZIndex = 1000000;
$.ibo.getMaxZIndex = function () {
    return $.ibo.maxZIndex++;
};

// 打开新页内窗口 width:窗口宽度 height:窗口高度 hasTitle:是否需要标题栏 title:标题内容 url:新窗口打开指向页面url
// callBackFun: 关闭窗口后的回调方法 modal:是否模式窗口 draggable:是否可拖动 resizable:是否可拉伸大小
// position:窗口出现位置 dialogClass:窗体样式
$.ibo.openNewWin = function (para) {
    // 创建iframe
    var ifr = $("<iframe>", window.top.document);
    ifr.attr("frameborder", "no");
    // 窗口默认打开页面路径
    var defaultUrl = "about:blank";

    // 默认页内窗口大小 300x200
    var defaultWidth = 300;
    var defaultHeight = 200;
    // 判断打开页面大小
    var winWidth = (para && para.width) ? para.width : defaultWidth;
    var winHeight = (para && para.height) ? para.height : defaultHeight;

    // 判断窗口打开页面路径
    var url = (para && para.url && typeof (para.url) == "string") ? para.url : defaultUrl;
    ifr.attr("src", url);
    var pageType = (para && para.pageType && typeof (para.pageType) == "string") ? para.pageType : "";
    ifr.attr("pageType", pageType);
    // 页面加载完毕编写Window.closeWin方法 
    ifr.on("load", function () {
        // 异域页面无法读取contentWindow 不做处理
        try {
            // 编写Window.closeWin方法 isCallBack:是否需要回调 callBackPara:回调函数传入参数
            ifr.get(0).contentWindow.closeWin = function (isCallBack, callBackPara) {
                ifr.dialog("close");
                // 判断是否需要回调 且回调函数是否存在
                if (isCallBack && para && para.callBackFun && typeof (para.callBackFun) == "function") {
                    para.callBackFun(callBackPara);
                }
            };
        }
        catch (e) { }
    });

    // 判断窗口标题内容
    var defaultTitle = "";
    var title = (para && para.title && typeof (para.title) == "string") ? para.title : defaultTitle;

    // 判断是否模式窗口
    var modal = true;
    if (para && para.modal == false) modal = false;

    // 判断是否可拖动
    var draggable = false;
    if (para && para.draggable) draggable = para.draggable;

    // 判断是否可拉伸大小
    var resizable = para && para.resizable ? true : false;

    // 判断页面打开位置
    var position = {
        using: function (pos) {
            var top = para.top;
            var left = para.left;
			var right=para.right;
			var bottom=para.bottom;

            if (!top) {
                var wHeight = $(window.top).height();
                var mHeight = $(this).height();
                top = mHeight > wHeight ? "0px" : ((wHeight - mHeight) / 2 - 5).toString() + "px";
            }

            if (!left) {
                var wWidth = $(window.top).width();
                var mWidth = $(this).width();
                left = mWidth > wWidth ? "0px" : ((wWidth - mWidth) / 2).toString() + "px";
            }
            $(this).css({ top: top, left: left });
			
        }
    }

    // 加载窗体独特样式
    var dialogClass = (para && para.dialogClass) ? para.dialogClass + " " : "";

    // 创建显示窗口
    ifr.dialog({
        dialogClass: dialogClass + "dropopen",
        autoOpen: false,
        title: title,
        width: winWidth,
        height: winHeight + 40,
        modal: modal,
        draggable: draggable,
        resizable: resizable,
        position: position,
        beforeClose: function (e, b) {
            // 判断是否需要回调 且回调函数是否存在
            if (para && para.CloseCallBackFun && typeof (para.CloseCallBackFun) == "function") {
                para.CloseCallBackFun();
            }
            GObj = null;
            ifr.dialog("option", { dialogClass: dialogClass + "dropclose" });
            ifr.dialog("destroy");
            ifr.remove();
            return false;
        }
    });
    ifr.dialog("open");
    ifr.css({ border: "0 none", width: "100%", height: winHeight + "px" });
    ifr.dialog("option", { dialogClass: dialogClass + "dropshow-1" });
    window.setTimeout(function () { ifr.dialog("option", { dialogClass: dialogClass + "dropshow-2" }); }, 1);
    window.setTimeout(function () { ifr.dialog("option", { dialogClass: dialogClass }); }, 501);

    GObj = ifr;

    return ifr;
};

// 判断是否为空
$.ibo.checkNotNull = function (v) {
    if (v) return $.trim(v).length > 0;
    return false;
};

// 判断是否为邮箱
$.ibo.regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
$.ibo.checkEmail = function (v) {
    return $.ibo.regEmail.test(v);
};

//判断手机号码
$.ibo.regPhone = /^1[3|4|5|7|8]\d{9}$/;
$.ibo.checkPhone = function (v) {
    return $.ibo.regPhone.test(v);
};

// 判断是否为全角字符
$.ibo.regFullChar = /[^\x00-\xff]/;
$.ibo.checkFullChar = function (v) { return $.ibo.regFullChar.test(v); };

// 判断是否为中文字符
$.ibo.regCNChar = /[\u4e00-\u9fa5]/;
$.ibo.checkCNChar = function (v) { return $.ibo.regCNChar.test(v); };

// 按钮类型
$.ibo.btnTypeCss = {
    // 默认
    Default: "ibo-ImgBtn-Query",
    // 查询
    Query: "ibo-ImgBtn-Query",
    // 新增
    Add: "ibo-ImgBtn-Add",
    // 修改
    Edit: "ibo-ImgBtn-Edit",
    // 删除
    Delete: "ibo-ImgBtn-Delete",
    // 确定
    OK: "ibo-ImgBtn-Ok",
    // 取消
    Cancel: "ibo-ImgBtn-Cancel",
    // 保存
    Save: "ibo-ImgBtn-Save",
    // 上传
    Upload: "btnimg_upload",
    // 下载
    Download: "btnimg_download",
    // 打印
    Print: "btnimg_print",
    // Excel
    Excel: "btnimg_excel",
    // 消息
    Message: "btnimg_message",
};

// 获取WCF服务所需日期格式 2015-01-02T12:00:00这种格式的,不加0800，转出来的时间比默认的少8个小时
$.ibo.GetDataJson = function (str) {
    str = str.replace("T", " ");
	str = str.replace(/-/g, "/");
    return "\/Date(" + (new Date(str) - new Date("1970/01/01")) + ")\/";
};
// 获取WCF服务所需日期格式 2015-10-10
$.ibo.GetDateJson = function (str) {
	str = str.replace("T"," ");
	str = str.replace(/-/g, "/");
    return "\/Date(" + (new Date(str) - new Date("1970/01/01")) + ")\/";
};

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 创建图标按钮 text:按钮文本 id:按钮id disabled:按钮是否可以 click:按钮点击触发事件 pObj:按钮放置的父元素 imgType:按钮图标css样式
$.ibo.createBtn = function (para) {
    // 创建按钮div
    var btnDiv = $("<div>");
    // 添加按钮样式
    btnDiv.addClass("ibo-ImgBtn-Small");
    // 获取按钮文本
    var text = (para && para.text && para.text.length > 0) ? para.text : "按钮";
    btnDiv.text(text);
    // 设置按钮id
    if (para && para.id && typeof para.id == "string") {
        btnDiv.attr("id", para.id);
    }
    // 设置按钮图标样式
    if (para && para.imgType && typeof para.imgType == "string") {
        btnDiv.addClass(para.imgType);
        btnDiv.on("mouseout", function () {
            btnDiv.addClass(para.imgType);
            btnDiv.removeClass(para.imgType + "-hover");
        });
    }

    // 判断按钮是否可用
    if (para && para.disabled) {
        btnDiv.addClass("ibo-ImgBtn-Disable");
        btnDiv.attr("dis", "1");
    }
    else {
        btnDiv.removeClass("ibo-ImgBtn-Disable");
        btnDiv.attr("dis", "0");
    }

    // 设置按钮点击事件
    if (para && para.click && typeof para.click == "function") {
        btnDiv.on("click", function (e) {
            if (btnDiv.attr("dis") == "0") {
                para.click(e);
            }
        });
    }
    // 将按钮放置于父元素中
    var pObj = (para && para.pObj) ? para.pObj : document.body;
    btnDiv.appendTo(pObj);
};

// 创建图标按钮 text:按钮文本 id:按钮id disabled:按钮是否可以 click:按钮点击触发事件 pObj:按钮放置的父元素 imgType:按钮图标css样式
$.ibo.createToolBtn = function (para) {
    // 创建按钮div
    var btnDiv = $("<div>");
    // 添加按钮样式
    btnDiv.addClass("ibo-ImgBtn");
    // 获取按钮文本
    var text = (para && para.text && para.text.length > 0) ? para.text : "按钮";
    btnDiv.text(text);
    // 设置按钮id
    if (para && para.id && typeof para.id == "string") {
        btnDiv.attr("id", para.id);
    }
    // 设置按钮图标样式
    if (para && para.imgType && typeof para.imgType == "string") {
        btnDiv.addClass(para.imgType);
    }

    // 判断按钮是否可用
    if (para && para.disabled) {
        btnDiv.addClass("ibo-ImgBtn-Disable");
        btnDiv.attr("dis", "1");
    }
    else {
        btnDiv.removeClass("ibo-ImgBtn-Disable");
        btnDiv.attr("dis", "0");
    }

    // 设置按钮点击事件
    if (para && para.click && typeof para.click == "function") {
        btnDiv.on("click", function (e) {
            if (btnDiv.attr("dis") == "0") {
                para.click(e);
            }
        });
    }
    // 将按钮放置于父元素中
    var pObj = (para && para.pObj) ? para.pObj : document.body;
    btnDiv.appendTo(pObj);
};

// 设置图标按钮可用 禁用
$.ibo.setBtnDisabled = function (id, disabled) {
    var btn = $("#" + id);
    if (disabled) {
        btn.attr("dis", "1")
        btn.addClass("ibo-ImgBtn-Disable");
    }
    else {
        btn.attr("dis", "0")
        btn.removeClass("ibo-ImgBtn-Disable");
    }
};

$.ibo.userSelect = null;

// 判断浏览器是否支持css属性user-select
$.ibo.getStyleName = function (css, el) {
    var prefixes = ['', '-ms-', '-moz-', '-webkit-', '-khtml-', '-o-'], reg_cap = /-([a-z])/g;
    el = el || document.documentElement;
    var style = el.style, test;
    for (var i = 0, l = prefixes.length; i < l; i++) {
        var test = (prefixes[i] + css).replace(reg_cap, function ($0, $1) { return $1.toUpperCase(); });
        if (test in style) {
            return test;
        }
    }
    return null;
};

// 设置文本不可选
$.ibo.setUnSelectText = function (obj) {
    obj = obj ? obj : document.documentElement;
    if (typeof ($.ibo.userSelect) == "string") {
        obj.style[$.ibo.userSelect] = "none";
    }
    else {
        obj.unselectable = "on";
        obj.onselectstart = function () { return false; }
    }
};

// 设置文本可选
$.ibo.setSelectText = function (obj) {
    obj = obj ? obj : document.documentElement;
    if (typeof (userSelect) == "string") {
        obj.style[$.ibo.userSelect] = "text";
    }
    else {
        obj.unselectable = "off";
        obj.onselectstart = null;
    }
};

// 创建分页控件 pObj:容纳分页控件的父级容器 getlist:加载列表方法 pgsize:每页信息数
$.ibo.webPager = function (para) {
    // 主容器span
    this.mSpan = $("<span>");
    this.mSpan.addClass("pagedataspan");
    this.mSpan.append("<span>第</span>");

    // 当前页索引span
    this.nowInSpan = $("<span>");
    this.mSpan.append(this.nowInSpan);

    this.mSpan.append("<span>/</span>");

    // 最大页索引span
    this.maxInSpan = $("<span>");
    this.mSpan.append(this.maxInSpan);

    this.mSpan.append("<span>页</span>&nbsp;<span>总</span>");

    // 总条数span
    this.countSpan = $("<span>");
    this.mSpan.append(this.countSpan);

    this.mSpan.append("<span>条</span>&nbsp;");

    // 跳转到第一页span
    this.firstSpan = $("<span>");
    this.firstSpan.text("第一页");
    this.mSpan.append(this.firstSpan);

    this.mSpan.append("&nbsp;");

    // 跳转到上一页span
    this.pgUpSpan = $("<span>");
    this.pgUpSpan.text("上一页");
    this.mSpan.append(this.pgUpSpan);

    this.mSpan.append("&nbsp;");

    // 跳转到下一页span
    this.pgDownSpan = $("<span>");
    this.pgDownSpan.text("下一页");
    this.mSpan.append(this.pgDownSpan);

    this.mSpan.append("&nbsp;");

    // 跳转到最后一页span
    this.lastSpan = $("<span>");
    this.lastSpan.text("最后页");
    this.mSpan.append(this.lastSpan);

    this.mSpan.append("&nbsp;<span>跳转</span>");

    // 跳转到指定页text
    this.jumpText = $("<input>");
    this.jumpText.attr("type", "text");
    this.jumpText.attr("size", 1);
    this.jumpText.attr("maxlength", 8);
    this.jumpText.addClass("pgI");
    this.jumpText.on("keyup", function () { this.value = this.value.replace(/[^\d]/g, ""); });
    this.jumpText.on("beforepaste", function () {
        clipboardData.setData('text', clipboardData.getData('text').replace(/[^\d]/g, ""));
    });
    this.mSpan.append(this.jumpText);

    this.mSpan.append("&nbsp;");

    // 跳转到指定页button
    this.jumpBtn = $("<input>");
    this.jumpBtn.attr("type", "button");
    this.jumpBtn.addClass("pgB");
    this.jumpBtn.val("Go");
    this.mSpan.append(this.jumpBtn);

    // 当前页索引
    this.PageIndex = 0;
    // 每页大小
    this.PageSize = (para && para.pgsize) ? para.pgsize : 10;
    // 最大页索引
    this.MaxPageIndex = 0;
    // 总数据量
    this.TotalCount = 0;
    // 获取数据函数
    var getlist = (para && para.getlist) ? para.getlist : false;

    var webPager = this;

    // 绑定跳转至第一页事件
    this.GoToFirst = function () {
        if (getlist) {
            // 调用列表加载方法 加载第一页数据
            this.load(1);
        }
        return false;
    };
    this.firstSpan.on("click", function () {
        // 当前页面已经在第一页不需要再跳转
        if (webPager.PageIndex < 2) return false;
        return webPager.GoToFirst();
    });

    // 绑定跳转至上一页事件
    this.GoToPre = function () {
        if (getlist) {
            // 当前页索引 减1
            var pgindex = this.PageIndex - 1;
            pgindex = pgindex < 1 ? 1 : pgindex;
            // 调用列表加载方法 加载第pgindex页数据
            this.load(pgindex);
        }
        return false;
    };
    this.pgUpSpan.on("click", function () {
        // 当前页面已经在第一页不需要再跳转
        if (webPager.PageIndex < 2) return false;
        return webPager.GoToPre();
    });

    // 绑定跳转至下一页事件
    this.GoToNext = function () {
        if (getlist) {
            // 当前页索引 加1
            var pgindex = this.PageIndex + 1;
            // 调用列表加载方法 加载第pgindex页数据
            this.load(pgindex);
        }
        return false;
    };
    this.pgDownSpan.on("click", function () {
        // 当前页面已经是最后一页不需要再跳转
        if (webPager.PageIndex == webPager.MaxPageIndex) return false;
        return webPager.GoToNext();
    });

    // 绑定跳转至最后页事件
    this.GoToLast = function () {
        if (getlist) {
            // 当前页索引 加1乘10
            var pgindex = (this.MaxPageIndex + 1) * 10;
            // 调用列表加载方法 加载第pgindex页数据
            this.load(pgindex);
        }
        return false;
    };
    this.lastSpan.on("click", function () {
        // 当前页面已经是最后一页不需要再跳转
        if (webPager.PageIndex == webPager.MaxPageIndex) return false;
        return webPager.GoToLast();
    });

    // 绑定跳转指定页事件
    this.jumpBtn.on("click", function () {
        if (getlist) {
            // 获取指定页数值
            var pgindex = webPager.jumpText.val();
            webPager.jumpText.val("");
            pgindex = parseInt(pgindex);
            // 判断数值是否合法
            if (isNaN(pgindex)) return false;
            // 调用列表加载方法 加载第pgindex页数据
            webPager.load(pgindex);
        }
        return false;
    });

    // 加载数据 pageindex:加载数据页索引
    this.load = function (pageindex) {
        if (getlist) {
            if (!pageindex) pageindex = 1;
            getlist(pageindex, this.PageSize);
        }
    };

    // 更新分页信息
    this.setPageDataInfo = function (pgInfo) {

        this.PageIndex = pgInfo.PageIndex;
        this.MaxPageIndex = pgInfo.MaxIndex;
        this.TotalCount = pgInfo.TotalCount;

        // 当前页索引
        this.nowInSpan.text(pgInfo.PageIndex);
        // 最大页索引
        this.maxInSpan.text(pgInfo.MaxIndex);
        // 数据总条数
        this.countSpan.text(pgInfo.TotalCount);

        // 当前页小于2  不可点击第一页和上一页
        if (pgInfo.PageIndex < 2) {
            this.firstSpan.removeClass();
            this.firstSpan.addClass("pgD");

            this.pgUpSpan.removeClass();
            this.pgUpSpan.addClass("pgD");
        }
        else {
            this.firstSpan.removeClass();
            this.firstSpan.addClass("pgE");

            this.pgUpSpan.removeClass();
            this.pgUpSpan.addClass("pgE");
        }

        // 当前页等于最大页  不可点击最后页和下一页
        if (pgInfo.PageIndex == pgInfo.MaxIndex) {
            this.lastSpan.removeClass();
            this.lastSpan.addClass("pgD");

            this.pgDownSpan.removeClass();
            this.pgDownSpan.addClass("pgD");
        }
        else {
            this.lastSpan.removeClass();
            this.lastSpan.addClass("pgE");

            this.pgDownSpan.removeClass();
            this.pgDownSpan.addClass("pgE");
        }
    };

    if (para && para.pObj) this.mSpan.appendTo(para.pObj);

    $.ibo.setUnSelectText(this.mSpan.get(0));
};

$.ibo.QSArray;
// 获取页面参数
$.ibo.QueryString = function (key) {
    if (!$.ibo.QSArray) {
        $.ibo.QSArray = [];
        var searchArr = window.location.search;
        if (searchArr.length > 0) searchArr = searchArr.substr(1);
        searchArr = searchArr.split("&");
        var length = searchArr.length;
        for (var i = 0; i < length; i++) {
            var tmpArr = searchArr[i].split("=");
            $.ibo.QSArray[tmpArr[0].toLowerCase()] = tmpArr[1];
        }
    }
    return $.ibo.QSArray[key.toLowerCase()];
};

$.ibo.isWaiting = Math.random().toString();
// 显示等待窗口 等待时msg显示字样
$.ibo.startWaiting = function (msg) {
};
// 结束等待窗口
$.ibo.endWaiting = function () {
};
$.ibo.IPAddress = "";
$(function () {
    //获取当前客户端IP
    //$.getJSON("http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=" + Math.random(), function (data) {
    //    $.ibo.IPAddress = data.Ip;
    //});

    //上传图片功能 参数para设置上传图片后台url、maxCount允许上传文件最大数，acceptType接收的文件类型，上传成功后执行回调函数callBackFun（参数为图片地址，如有多个以数组返回）
    $.fn.InitUpload = function (para) {
        var objthis = $(this);
        var inputFileId = 'inputfile' + Math.random().toString().slice(2);
        var maxCount = (para && para.maxCount && typeof (para.maxCount) == "number") ? para.maxCount : 0;//默认为0，不限制上传数量
        var acceptType = (para && para.acceptType && typeof (para.acceptType) == "string") ? para.acceptType : "image/*";//默认上传的是图片文件,application/vnd.ms-excel为excel
        var isMultiple = maxCount == 1 ? "" : "multiple";//是否允许上传多个文件
        var fromHtml = [
    '<form',
    '    enctype="multipart/form-data"',
    '    method="post">',
    '    <input id="' + inputFileId + '" type="file" ' + isMultiple + ' accept="' + acceptType + '">',
    '</form>'
        ].join('');

        var $container = $('<div style="display:none;"></div>');
        $container.html(fromHtml);
        var $body = $('body');
        $body.append($container);
        var uploadImgUrl = (para && para.url && typeof (para.url) == "string") ? para.url : $.ibo.ApplicationSrvUrl + "/UploadHandler.ashx";
        var $inputFlie = $('#' + inputFileId);
        var imgSrc = "";
        //var maxCount = (para && para.maxCount && typeof (para.maxCount) == "number") ? para.maxCount : 0;//默认为0，不限制上传数量
        $inputFlie.on("change", function () {
            var files = $(this)[0].files || [];
            if (files.length == 0) {
                return;
            }
            else {
                if (maxCount != 0 && files.length > maxCount) {
                    if (para && para.maxCountCallBackFun && typeof (para.maxCountCallBackFun) == "function") {
                        para.maxCountCallBackFun("最多只能上传" + maxCount + "个文件!");
                        return;
                    }
                } else {
                    var arr = [];
                    var oldFileName = [];//原始文件的名字
                    for (var i = 0; i < files.length; i++) {
                        oldFileName.push(files[i].name);
                        var type= oldFileName[i].substring(oldFileName[i].lastIndexOf('.') + 1, oldFileName[i].length).toLowerCase();
                        if (para.checkType==true&&type != "jpg" && type != "jpeg" && type != "bmp" && type != "gif"&&type!="png")
                        {
                            alert("选择的文件类型不正确：" + oldFileName);
                            return;
                        }
                        if (para.checkSize&&files[i].size> (5 * 1024*1024))
                        {
                            alert("所选文件超出大小");
                            return;
                        }
                        (function () {
                            var xhr = new XMLHttpRequest();
                            var formData = new FormData();
                            xhr.onloadend = function (evt) {
                                var resultSrc = xhr.responseText;
                                arr.push(resultSrc);
                                //var resultSrc = evt.target.responseText;
                                if (arr.length == files.length && para && para.callBackFun && typeof (para.callBackFun) == "function") {
                                    var fileszie = $inputFlie[0].files[0].size;
                                    $inputFlie.val("");
                                    para.callBackFun(arr, oldFileName, fileszie);
                                }
                            };
                            xhr.onerror = function (e) {
                                alert(e.target.responseText);
                            };
                            var file = files[i];
                            xhr.open("POST", uploadImgUrl, true);
                            formData.append('ImgFile' + i, file);
                            xhr.send(formData);
                        })();
                    }
                }
            }

        });
        objthis.click(function () {
            $inputFlie.click();
        });
    }
});
// 写日志
$.ibo.writeLog = function (OpType, ModelName, IP, Message, CallFun) {
    var data = $.toJSON({ type: "add", LogID: 0, OpType: OpType, ModelName: ModelName, IP: IP, Message: Message });
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "LogEdit",
        data: data,
        success: function (obj) {
            //alert("Success");
            if (typeof (CallFun) == "function") {
                CallFun();
            }
            //if ($.ibo.ResFlag.Success == obj.ResFlag) {
            //    alert("添加成功！");
            //}
            //else if ($.ibo.ResFlag.Error == obj.ResFlag) {
            //    alert("添加失败！");
            //}
            //else if ($.ibo.ResFlag.Failed == obj.ResFlag) {
            //    alert("添加失败！");
            //}
            //else if ($.ibo.ResFlag.NoRight == obj.ResFlag) {
            //    alert("抱歉，您没有此权限！");
            //}
        }
    });
};
//判断是否选中列表数据
$.ibo.IsSelectData = function () {
    var Is = false;
    var check = $('input:radio:checked').val();
    if (check != null && check != undefined) {
        Is = true;
    }
    return Is;
};

//显示错误信息的函数
$.ibo.ShowErrorMsg = function (obj) {
    if (obj && obj.ResObj)
        alert(obj.ResObj);
    else
        alert(obj);

    $.ibo.endWaiting();
};


// 显示是否选择弹窗
$.ibo.ShowYesOrNoDialog = function (msg) {

    return confirm(msg);
};


// 显示当行输入弹窗  title:弹出标题   defaultTxt:默认输入值
$.ibo.ShowOneLineDialog = function (title, defaultTxt) {
    return prompt(title, defaultTxt);
};



//屏蔽系统里的backspace键
$(document).on("keydown", function (e) {
    if (e.keyCode == 8) {
        if (document.activeElement.type == "text" || document.activeElement.type == "textarea" || document.activeElement.type == "password") {
            if (document.activeElement.readOnly == false)
                return true;
        }
        else if ($(document.activeElement).attr("contenteditable") === "true" || $(document.activeElement).hasClass("ibo-textboxclass")) {        //前一种情况发生在页面制作，编辑“文本标签”控件里的内容时发生,后面这种情况是发生在制作页面时编辑相关信息项
            return true;
        }
        return false;
    }
});

//离开当前页面（比如页面跳转）所触发的事件函数
window.onbeforeunload = function (e) {
    try {
        if ((GObj == null && $(window.top.document).find('.ui-dialog').length < 1) ||
            $(window.top.document).find("iframe").contents().find(".LoginPage").length > 0)
            return;
        return "";
    } catch (ex) { }
};

//该事件函数紧跟在onbeforeunload后面执行(当然是要在onbeforeunload有返回值的情况下才执行，否则不执行)
$(window).unload(function () {
    try {
        if (GObj !== null && GObj.length > 0 && $(window.top.document).find('.ui-dialog').length > 0) {
            GObj.dialog("close");
            GObj = null;
        }
    } catch (ex) { }
});

//设置一个全局变量存储模态对话框，以便后续如果点击浏览器的后退键时获取对话框对象进行处理
var GObj = null;


// 设置只可输入数字  是否可输入小数   是否可输入负数
$.ibo.setNumOnly = function (obj, decimal, negative, dotlength) {

    // 未加载事件则 加载事件
    if (!obj.attr("data-Decimal")) {

        // keypress阻止非法字符录入
        obj.on("keypress", function (e) {
            var keyCode = e.keyCode;

            // 是否输入数字
            var b = keyCode < 48 || keyCode > 57;

            // 输入小数则判断是否输入小数点  46 小数点
            if ($(this).attr("data-Decimal") == "1") b = b && keyCode != 46;

            // 输入负数则判断是否输入负号  45 负号
            if ($(this).attr("data-Negative") == "1") b = b && keyCode != 45;

            if (b) {
                return false;
            }
        });

        // input propertychange阻止非法字符录入
        obj.on("input propertychange", function () {

            var v = $(this).val();

            // 正则表达式  筛选非0-9的数字
            var regStr = "[^0-9";

            var isDecimal = $(this).attr("data-Decimal") == "1";
            var isNegative = $(this).attr("data-Negative") == "1";

            // 可输入小数  添加规则筛选小数点 .
            if (isDecimal) regStr += "\.";

            // 可输入负数  添加规则筛选负号 -
            if (isNegative) regStr += "\-";

            regStr += "]";

            var reg = new RegExp(regStr, "g");

            // 正则判断
            if (reg.test(v)) {
                // 移除所有非数字 小数点 符号
                v = v.replace(reg, "");
                $(this).val(v);
            }


            // 可输入小数  且输入中有小数点
            if (isDecimal && v.indexOf(".") > -1) {
                var decArr = v.split(".");
                // 判断小数点是否多余1个  多余则只保留左侧第一个
                if (decArr.length > 2) {
                    v = decArr[0] + ".";
                    for (var i = 1; i < decArr.length; i++) {
                        v += decArr[i];
                    }
                    $(this).val(v);
                }
            }

            // 可输入负数  且输入中有负号  判断负号是否多余1个 且是否位于左侧第一位  多余则只保留左侧第一个
            if (isNegative && v.indexOf("-") > -1) {
                var negArr = v.split("-");
                var bv = v;
                // 若数组第一项不为空 则表示负号之前有其它字符 置空
                if (negArr[0].length > 0) {
                    negArr[0] = "";
                }
                v = "-" + negArr[0];
                for (var i = 1; i < negArr.length; i++) {
                    v += negArr[i];
                }
                if (v != bv) $(this).val(v);
            }


        });

        // blur设置数据格式
        obj.on("blur", function () {
            // 当前输入框值
            var v = $(this).val();

            // 取出左侧多余0   去除无意义小数点
            if (v.length > 0) {

                // 设置小数位
                if ($(this).attr("data-Decimal") == "1") {
                    var dot = $(this).attr("data-dotlength");

                    var arr = v.split(".");
                    v = parseInt(arr[0]);
                    if (arr.length > 1 && arr[1].length > 0) {
                        if (arr[1].length > dot) arr[1] = arr[1].substr(0, dot);
                        v += "." + arr[1];
                    }
                }
                    // 整数转换成整数
                else v = parseInt(v);

                if (isNaN(v)) $(this).val("");
                else $(this).val(v);

            }
        });

    }

    // 设置事件属性
    obj.attr("data-Decimal", decimal ? "1" : "0");
    obj.attr("data-Negative", negative ? "1" : "0");
    obj.attr("data-dotlength", dotlength ? dotlength : "0");

};


// 上传附件  para:{ "file":"文件信息", "complete":"上传成功函数(evt:上传后路径)", "failed":"上传失败函数" }
$.ibo.Upload = function (para) {

    // FormData  HTML5新增js类  用于表单提交
    var fd = new FormData();
    fd.append("fileToUpload", para.file);

    // 创建XMLHttpRequest对象  用于ajax提交
    var xhr = new XMLHttpRequest();
    if (xhr.addEventListener) {
        xhr.addEventListener("load", para.complete, false);
        xhr.addEventListener("error", uploadFailed, false);
    }
    else {
        xhr.attachEvent("load", para.complete);
        xhr.attachEvent("error", uploadFailed);
    }

    // 上传失败
    function uploadFailed(evt) {
        // alert返回http文本
        alert(evt.target.responseText);
    }

    // 图片存储到AppService底下
    xhr.open("POST", $.ibo.ApplicationSrvUrl + "/UploadHandler.ashx?ComID=" + $.ibo.ComID);
    xhr.send(fd);

};
//下载
$.ibo.downLoad = function (url) {
    var id = 'f' + new Date().getTime();
    var ifString = '<div style="display:none"><iframe id="' + id + '" name="' + id + '" frameborder="no" src="' + url + '"></iframe></div>';
    $('body', window.parent.document).append(ifString);
}




// 根据数组组成下拉框  arr：数据数组  text：显示文本属性名  value：保存值属性名  hasNullOption:是否需要默认"请选择"空选择项
$.ibo.GetSltFromArr = function (arr, text, value, hasNullOption) {

    var slt = $("<select>");
    var option;

    // 判断是否需要默认"请选择"空选择项
    if (hasNullOption) {
        option = $("<option>");
        option.val("");
        option.text("请选择");
        slt.append(option);
    }

    $.each(arr, function (i, n) {
        option = $("<option>");
        option.val(n[value]);
        option.text(n[text]);
        slt.append(option);
    });

    return slt;
};



// 字段类型信息
$.ibo.FieldTypeArr = null;
// 异步获取字段类型
$.ibo.getFieldTypeAjax = function () {
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "Field_GetFieldTypeEnumInfo",
        data: null,
        success: function (res) {
            $.ibo.FieldTypeArr = res;
        }
    });
};
//点击所有的取消以及右上角的x
var selProvincesText="";//保存地址省份
var selCityText="";//保存地址市
$(".closeToggle").click(function(){
    $(".toggleAddr").hide(200);
    $(".toggleAddrBack").css("display","none");
    $(".toggleBackground").css("display","none");
    $(".toggleTextSet").hide(200);
    $(".toggleRemove").hide(200);
    //点击时，判断修改账户管理页面的数据，
    var spAddressText=$("#spAddress").text();//保存地址文本
    var spEmailText=$("#spEmail").text();//保存邮箱信息
    var spPhoneText=$("#spPhone").text();//保存手机信息
    var txtPhoneText=$("#txtPhone").val();//保存手机号码
    var txtMPhoneText=$("#txtMPhone").val();//保存密码手机号码
    $("#txtMPhone").val(spPhoneText);
    $("#txtPhone").val(spPhoneText);
    $("#txtEmail").val(spEmailText);
    $("#txtAddress").val(spAddressText);
    $("#selProvinces").val(selProvincesText);
    $("#selCity").val(selCityText);
    $(".NoXiuG").val("");
    $("#spEmail").removeClass("hide");
    $("#spPhone").removeClass("hide");
    $("#spWord").removeClass("hide");
})

//导航显示
function DisplayLabel(labelText) {
    var text = labelText;
    var parentSpan = $(window.parent.document).find("#spfirstnavbar span");
    if (parentSpan.length <= 3) {
        var spans = "<span>><span><span id=\"splastnavbar\" class=\"lastnavbar\">" + text + "</span>";
        if (parentSpan.length > 0) {
            $(parentSpan[parentSpan.length - 1]).append(spans);
        }
    } else {
        $(parentSpan[parentSpan.length - 1]).text(text);
    }
}


	//提示框样式  前一个是提示语,第二个为确定执行函数, 第三个为加载后加载的函数   //使用前要用css/backpage/yx/UnifiedStyle.css配套使用
	function Prompt()
	{	
		var flag=true;
		var text;
		var funOK;
		var funStr;
		try {
				 obj= eval(arguments[0]);
				 text= obj.text? obj.text.ResObj?obj.text.ResObj:obj.text: "错误警告";
				 funOK = obj.funOK ? obj.funOK : function(){};
				 funStr = obj.funStr ? obj.funStr : function(){};
			}
			catch(exception) 
			{
				flag=false;
			}
			
			if(!flag)
			{
				 text = arguments[0] ? arguments[0].ResObj?arguments[0].ResObj:arguments[0] : "错误警告";
				 funOK = arguments[1] ? arguments[1] : function(){};
				 funStr = arguments[2] ? arguments[2] : function(){};
			}
		
		$("#Unified_Prompt").remove();
		var div=$("<div>").addClass("BombBox").attr("id","Unified_Prompt");
		var div1=$("<div>").addClass("BoxContent").html("<center>"+text+"</center>");
		var div11=$("<div>").addClass("marginTopTAB center");
		var span1=$("<span>").addClass("ButtonS1").text("确定").click(function(){funOK();$("#Unified_Prompt").remove();});div11.append(span1);
		div1.append(div11);
		var divbg=$("<div>").addClass("BombBoxBG");
		div.append(divbg);
		var divconbg=$("<div>").addClass("divconbg");divconbg.append(div1);
		div.append(divconbg);
		$("body").append(div);
		$("#Unified_Prompt").css("display","block");
		funStr();
		
	}
	//确认框  前一个是提示语,第二个为确定执行函数,第三个为加载后加载的函数
	function Confirmation()
	{
		var flag=true;
		var text;
		var funOK;
		var funStr;
		try {
				 obj= eval(arguments[0]);
				 text= obj.text? obj.text.ResObj?obj.text.ResObj:obj.text: "错误警告";
				 funOK = obj.funOK ? obj.funOK : function(){};
				 funStr = obj.funStr ? obj.funStr : function(){};
			}
			catch(exception) 
			{
				flag=false;
			}
			
			if(!flag)
			{
				 text = arguments[0] ? arguments[0].ResObj?arguments[0].ResObj:arguments[0] : "错误警告";
				 funOK = arguments[1] ? arguments[1] : function(){};
				 funStr = arguments[2] ? arguments[2] : function(){};
			}
		$("#Unified_Confirmation").remove();
		var div=$("<div>").addClass("BombBox").attr("id","Unified_Confirmation");
		var div1=$("<div>").addClass("BoxContent").html("<center>"+text+"</center>");
		var div11=$("<div>").addClass("marginTopTAB center");
		var span1=$("<span>").addClass("ButtonS1").text("确定").click(function(){ funOK();  $("#Unified_Confirmation").remove();});div11.append(span1);
		var span2=$("<span>").addClass("ButtonS2 bor").text("取消").click(function(){$("#Unified_Confirmation").remove();});div11.append(span2);
		div1.append(div11);
		var divbg=$("<div>").addClass("BombBoxBG");
		div.append(divbg);
		var divconbg=$("<div>").addClass("divconbg");divconbg.append(div1);
		div.append(divconbg);
		$("body").append(div);
		$("#Unified_Confirmation").css("display","block");
		funStr();
		
	}
	
	//参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
	function insert_flg(str,flg,sn){
		var newstr="";
		newstr=str.substring(0, sn);
		newstr+=flg;
        newstr+=str.substring(sn,str.length);
		return newstr;
	}
	
	
	//下载页面事件//必须引用FileSaver  和   jquery.wordexport；；；
	function downloadToword()
	{
			var but='<span  id="downloadToword" style="position:fixed;bottom:100px;right:30px;    display: inline-block; height: 30px;  line-height: 30px;  color: #fff; text-align: center;cursor: pointer;  background-color: #008cf0; width: 80px; border-radius: 6px;  margin-left: 10px;  margin-right: 10px;">下载页面</span>'
			$("html").append(but);
			$("#downloadToword").click(function(){
						var date=new Date();
				
						   var word ;
						   try{
								word = new ActiveXObject("Word.Application"); 
								var doc = word .Documents.Add("",0,1);//不打开模版直接加入内容
								var   Range=doc.Range();  
								var sel = document.body.createTextRange();
								sel.moveToElementText(body);//此处form是页面form的id
								sel.select();
								sel.execCommand("Copy");
								Range.Paste();
								word .Application.Visible = true;
								doc .saveAs("C://Users/Administrator/Desktop/ZF_IE"+date+".doc");   
							}catch(e){
								$("body").wordExport("ZF "+date);
								//alert("IE的安全级别过高!请在IE的菜单栏中:工具——INTERNET选项——安全---本地Intranet——自定义级别——对没有标记为安全的activeX控件...那句改为启用或提示!");
								
							}
						 // var doc = word .documents.open("c:/test.doc");     //此处为打开已有的模版
			});	
	}
	
	//判断手机类型
	$.ibo.ismobile = function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
			if(window.location.href.indexOf("?mobile") < 0) {
				try {
					if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
						return '0';
					} else {
						return '1';
					}
				} catch(e) {}
			}
		} else if(u.indexOf('iPad') > -1) {
			return '0';
		} else {
			return '1';
		}
	};
