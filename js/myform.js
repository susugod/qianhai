var ViewLogo = "";
if (!$.ibo) $.ibo = {};

$(document).ready(function () {
    // 表单编辑初始化
    $.ibo.formEditor.Init();
});



/*
    表单编辑类
    构造参数
    para:{
        // 页面信息
        View:{
                  ViewID: 0, // 页面ID
                  ViewName: "", // 页面名称
                  ViewType: 0, // 页面类型
                  background:"#ffffff", // 页面背景
                  height:100,  // 页面高度百分比
                  LineHeight:30,  //  页面行高(px)
                  LineDistance:3,  //  页面行间距(px)
                  IsShowsizeline: true,  //  页面是否显示刻度
                  sizelineColor:"#000000",  //  页面刻度颜色
                  TbName:"",  //  绑定数据源物理表名
                  TbNameRmk:"", // 绑定数据源表中文说明
                  TbColumnList:""  //  绑定数据源物理表列信息
              },
        id:"",  // 控件父级容器id
        PropertiesDivID: "",  // 属性窗口div id
        CurViewType:""// 当前编辑页面类型  1：普通页面   2：表单页面   3：审批页面
    }
*/
$.ibo.formEditor = function (para) {

    var formEditor = this;

    if (!para) para = {};

    // 当前编辑页面类型  1：普通页面   2：表单页面   3：审批页面
    this.CurViewType = para.CurViewType;
   
    this.MinControlWidth = para && para.MinControlWidth ? para.MinControlWidth : $.ibo.formEditor.MinControlWidth;

    // 属性窗口div id
    this.PropertiesDivID = para && para.PropertiesDivID ? para.PropertiesDivID : "dialogProperties";

    // 父容器JQ对象
    this.container = null;
    // 判断参数是否提交父容器
    if (para && typeof para.id == "string") {
        this.container = $("#" + para.id);
        if (!this.container[0]) this.container = $(document.body);
    }
        // 默认document.body
    else this.container = $(document.body);

    this.container.append("<span id=\"" + para.id + "_lodingTxt\">页面内容加载中...</span>");

    // 当前层级
    this.zIndex = -1;
    // 获取当前层级
    this.getZIndex = function () {
        // 层级每次加3 1层给控件 1层给控件表面覆盖div 1层给控件四周选中示意动态边框
        this.zIndex = this.zIndex + 2;
        return this.zIndex;
    };
    // 编辑器控件数组
    this.controls = new Array();
    // 编辑器当前选中控件数组
    this.sltControls = new Array();

    // 实例化编辑器的页面
    this.View = new $.ibo.formEditor.View(this);

    this.View.htmlObj.css({ "position": "relative", "outline": "none" });

    // 设置页面编号
    if (para.View) {
        for (var i in para.View) {
            if (this.View.hasOwnProperty(i)) {
                this.View[i] = para.View[i];
            }
        }
    }

    // 设置页面行高
    this.View.setLineHeight(para && para.View && para.View.LineHeight);
    // 设置页面的行间距
    this.View.setLineDistance(para && para.View && para.View.LineDistance);
    // 设置页面背景
    this.View.setBackground(para && para.View && para.View.background);


    if (this.View.SizeType == 1) {
        // 主容器的宽和高
        this.height = $.ibo.formEditor.PCHeight;
        this.width = $.ibo.formEditor.PCWidth;
        this.container.parent().removeClass("mobileViewType");
        this.container.parent().addClass("pcViewType");

    }
    else if (this.View.SizeType == 2) {
        // 主容器的宽和高
        this.height = $.ibo.formEditor.MobileHeight;
        this.width = $.ibo.formEditor.MobileWidth;
        this.container.parent().addClass("mobileViewType");
        this.container.parent().removeClass("pcViewType");
    }
    this.container.css({ "overflow-x": "hidden", "overflow-y": "hidden", width: (this.width + 15) + "px", height: (this.height + 13) + "px" });

    this.View.htmlObj.css({ "width": this.width + "px" });

    // 去除浏览器默认右键菜单
    this.View.htmlObj.bind("contextmenu", function (e) {
        return false;
    });



    /*********************************************************控件拉伸 START*******************************************************/

    // 标志 是否正在拖拽中或拉伸中
    this.resizingOrDraging = false;


    this.resizing = false;
    // 控件拉伸开始
    this.resizeStart = function (e, ui) {
        this.resizingOrDraging = true;
        var ctrlObj = this.sltControls[0];
        // 移除拉伸小黑点
        ctrlObj.divObj.resizable("disable");

        var eventObj = $(e.originalEvent.target);
        var cusCss = "";

        if (eventObj.hasClass("ui-resizable-s")) {
            cusCss = "s-resize";
        }
        else if (eventObj.hasClass("ui-resizable-e")) {
            cusCss = "e-resize";
        }
        else if (eventObj.hasClass("ui-resizable-w")) {
            cusCss = "w-resize";
        }

        // 设置所有覆盖div鼠标样式
        this.View.htmlObj.find(".ctrl").css({ "cursor": cusCss });
    };

    // 控件拉伸中
    this.resize = function (e, ui) {
        var ctrlObj = this.sltControls[0];

        // 拖拽div高度
        var height = ui.size.height;
        // 当前控件高度
        var ctrlHeight = ctrlObj.Size().height;
        var diff = height - ctrlHeight;
        // 高度不同 当前为纵向拖拽
        if (diff != 0) {
            // 去拖拽距离绝对值
            var diffValue = diff < 0 ? diff * -1 : diff;
            // 拖拽距离大于一行则控件高度发生变化
            if (diffValue >= (this.View.LineHeight + this.View.LineDistance) / 2) {
                // 计算拖拽后的高度符合行倍数高度
                var afterCtrlHeight = parseInt((height + this.View.LineDistance) / (this.View.LineHeight + this.View.LineDistance)) * (this.View.LineHeight + this.View.LineDistance) - this.View.LineDistance;
                if ((height + this.View.LineDistance) % (this.View.LineHeight + this.View.LineDistance) >= (this.View.LineHeight + this.View.LineDistance) / 2)
                    afterCtrlHeight += this.View.LineHeight + this.View.LineDistance;

                // 控件最小高度为一行  若有标题 最小高度为两行
                var minHeight = this.View.CountLineHeight(1);
                if (ctrlObj.cssList["hasTitle"] == "true") {
                    minHeight = this.View.CountLineHeight(2);
                }

                afterCtrlHeight = afterCtrlHeight < minHeight ? minHeight : afterCtrlHeight;
                diff = afterCtrlHeight - ctrlHeight;

                if (diff != 0) {
                    // 控件高度
                    var ctrlTop = ui.position.top;
                    var length = this.controls.length;
                    var ParentCtrl;
                    // 遍历控件 所有位于拖拽控件下方的控件纵向移动
                    for (var i = 0; i < length; i++) {
                        var tmpCtrlObj = this.controls[i];
                        var tmpTop = tmpCtrlObj.Position().top;
                        // 只移动相同父容器下的控件
                        if (tmpTop > ctrlTop && tmpCtrlObj.attrList["ParentID"] == ctrlObj.attrList["ParentID"]) {
                            tmpCtrlObj.Position({ "t": (tmpTop + diff) + "px" });
                        }
                        if (tmpCtrlObj.HtmlID == ctrlObj.attrList["ParentID"]) ParentCtrl = tmpCtrlObj;
                    }
                    ctrlObj.Size({ "h": afterCtrlHeight + "px" });

                    // 存在父级容器  修正父级容器的高度
                    if (ParentCtrl) ParentCtrl.setHeight();
                }
            }
        }

        // 设置页面滚动条
        this.setViewScroll();

        // 重绘边框线
        ctrlObj.showSelectedLine();
        // 重置宽、高值
        ctrlObj.showSizePrototype();
    };


    // 控件拉伸结束
    this.resizeStop = function (e, ui) {
        var ctrlObj = this.sltControls[0];
        var height = ctrlObj.Size().height;
        ctrlObj.divObj.resizable("enable");
        ctrlObj.divObj.css({ "cursor": "move", "height": height + "px" });

        // 还原所有覆盖div鼠标样式
        var length = this.controls.length;
        for (var i = 0; i < length; i++) {
            var tmpCtrlObj = this.controls[i];
            if (tmpCtrlObj.HtmlID != ctrlObj.HtmlID) {
                tmpCtrlObj.divObj.css({ "cursor": "pointer" });
            }
        }

        this.resizingOrDraging = false;
    };


    /*********************************************************控件拉伸 END*********************************************************/





    /***********************************************************拖拽 START*************************************************************/


    // 获取鼠标相对位置
    this.getMousePosition = function (e, ui) {
        // hidden的元素取不到offset位置信息  所以需要临时显示再隐藏
        var isHidden = ui.helper.is(":hidden");
        if (isHidden) ui.helper.show();
        var offset = ui.helper.offset();
        if (isHidden) ui.helper.hide();

        var y = ui.position.top + e.clientY - offset.top;

        // 纵坐标不小于0
        if (y < 0) y = 0;

        var x = ui.position.left + e.clientX - offset.left;
        // 横坐标不小于0
        if (x < 0) x = 0;
            // 横坐标不大于页面宽度
        else if (x > this.width) x = this.width;

        return { "x": x, "y": y };
    };


    // 拖拽开始
    this.dragStart = function (e, ui) {
        this.resizingOrDraging = true;
        var ctrlObj = this.sltControls[0];
        ctrlObj.hide();
        ctrlObj.hideSelectedLine();
    };


    // 根据纵坐标值查询控件 t:纵坐标值  ParentID:父容器HTMLID
    this.getCtrlByTop = function (t, ParentID) {
        var length = this.controls.length;
        for (var i = 0; i < length; i++) {
            var ctrlObj = this.controls[i];
            // 只查询相同父容器下的控件
            if (ParentID == ctrlObj.attrList["ParentID"]) {
                // 计算控件行的顶部坐标
                var top = ctrlObj.Position().top - this.View.LineDistance;
                // 计算控件行的底部坐标
                var bottom = top + this.View.LineDistance + ctrlObj.Size().height;
                // 判断纵坐标值是否在此行中  在则返回控件
                if (top <= t && t <= bottom) return ctrlObj;
            }
        }
        return null;
    };


    // 拖拽中
    this.drag = function (e, ui) {
        // 当前选中控件
        var ctrlObj = this.sltControls[0];
        // 计算当前鼠标相对位置
        var middleValue = this.getMousePosition(e, ui).y;

        var top = ui.position.top;
        var bottom = ui.position.top + ui.helper.height();

        // 查询当前鼠标指向控件
        var rowCtrlObj = this.getCtrlByTop(middleValue, ctrlObj.attrList["ParentID"]);

        // 当前鼠标没有指向任何控件或当前指向控件与选中控件相同 则无需操作
        if (rowCtrlObj != null && ctrlObj.HtmlID != rowCtrlObj.HtmlID) {

            var ctrlTop = ctrlObj.Position().top - this.View.LineDistance;

            // 否则判断拖拽情况
            var rowCtrlTop = rowCtrlObj.Position().top - this.View.LineDistance;
            var rowCtrlHeight = rowCtrlObj.Size().height;
            var rowCtrlBottom = rowCtrlTop + this.View.LineDistance + rowCtrlHeight;

            // 拖拽副本上边线指向控件中线上方  且拖拽控件位于指向控件下方  则拖拽控件与指向控件互换
            if ((top < (rowCtrlTop + rowCtrlBottom) / 2 && ctrlTop > rowCtrlTop)
                // 拖拽副本下边线位于指向控件中线下方  且拖拽控件位于指向控件上方  则拖拽控件与指向控件互换
            || (bottom >= (rowCtrlTop + rowCtrlBottom) / 2 && ctrlTop < rowCtrlTop)) {
                var ctrlHeight = ctrlObj.Size().height;
                var ctrlBottom = ctrlTop + this.View.LineDistance + ctrlHeight;

                var upCtrl, downCtrl, upCtrlTop, upCtrlHeight, downCtrlBottom;

                // 拖拽控件位于指向控件下方
                if (ctrlTop > rowCtrlTop) {
                    upCtrl = rowCtrlObj;
                    upCtrlHeight = rowCtrlHeight;
                    upCtrlTop = rowCtrlTop;
                    downCtrl = ctrlObj;
                    downCtrlBottom = ctrlBottom;
                }
                else {
                    upCtrl = ctrlObj;
                    upCtrlHeight = ctrlHeight;
                    upCtrlTop = ctrlTop;
                    downCtrl = rowCtrlObj;
                    downCtrlBottom = rowCtrlBottom;
                }

                // 上方控件根据下方控件的底部坐标 - 自己的高度 计算自己的顶部坐标
                upCtrl.Position({ "t": (downCtrlBottom - upCtrlHeight) + "px" });
                // 下方控件移动到上方控件的位置
                downCtrl.Position({ "t": (upCtrlTop + this.View.LineDistance) + "px" });
            }
        }
    };


    // 拖拽结束
    this.dragStop = function (e, ui) {
        var ctrlObj = this.sltControls[0];
        ctrlObj.show();
        ctrlObj.showSelectedLine();

        this.resizingOrDraging = false;
    };


    /***********************************************************拖拽 END***************************************************************/



    this.container.attr("tabindex", 0);
    this.container.css("outline", "none");
    // 点击页面  显示页面属性  取消选中所有控件
    this.container.on("mouseup", function (e) {
        var id = e.target.id;
        var b = e.target.id == formEditor.container.attr("id") || e.target.id == formEditor.View.id;
        b = b && !formEditor.resizingOrDraging;
        // 当前点击的是页面 且不是拉伸状态中
        if (b) {
            // 设置所有控件未选中
            formEditor.unSelect();
            // 设置边框和拉伸
            formEditor.showPrototype(e);
        }
    });



    // 设置所有控件未选中
    this.unSelect = function () {
        var length = this.sltControls.length;
        if (length > 0) {
            while (this.sltControls.length > 0) {
                this.sltControls.pop().unSelect();
            }
        }
    };

    // 获取父控件
    this.getParentCtrl = function (pid) {
        var length = this.controls.length;
        var pCtrl;
        // 遍历所有控件  对比HTMLID查找父控件
        for (var i = 0; i < length; i++) {
            var ctrl = this.controls[i];
            if (ctrl.HtmlID == pid) {
                pCtrl = ctrl;
                break;
            }
        }
        return pCtrl;
    };

    // 设置新增控件位置
    this.setNewControlPosition = function (ctrlObj) {
        // 控件修正后顶部位置
        var top;

        // 父控件
        var parentCtrl;

        // 行间距
        var lineDis = this.View.LineDistance;

        var length = this.controls.length;
        // 当前未选中控件  在页面最底部插入控件
        if (this.sltControls.length == 0) {
            // 查询现有控件最底部坐标
            top = 0;
            for (var i = 0; i < length; i++) {
                var tmpCtrl = this.controls[i];
                // 只查询非子控件
                if ($.trim(tmpCtrl.attrList["ParentID"]).length == 0
                    // 排除新增控件自己
                    && tmpCtrl.HtmlID != ctrlObj.HtmlID) {
                    var tmpTop = tmpCtrl.Position().top;
                    var tmpHeight = tmpCtrl.Size().height;
                    var tmpBottom = tmpTop + tmpHeight;
                    top = tmpBottom > top ? tmpBottom : top;
                }
            }
            // 与上方控件底部保持一个行间距
            top += lineDis;
        }
        else {
            // 当前选中控件
            var sltCtrlObj = this.sltControls[0];
            var ParentID = ctrlObj.attrList["ParentID"];

            // 当前选中控件位置   当前选中控件下方
            var sltTop = sltCtrlObj.Position().top;
            var sltHeight = sltCtrlObj.Size().height;

            // 新增非子控件
            if ($.trim(ParentID).length == 0) {

                // 选中控件为子控件  则插入到选中控件父容器的下方   否则在当前选中控件下方
                if ($.trim(sltCtrlObj.attrList["ParentID"]).length > 0) {
                    sltTop = parseInt($("#" + sltCtrlObj.attrList["ParentID"] + "_div").css("top").replace("px", ""));
                    sltHeight = parseInt($("#" + sltCtrlObj.attrList["ParentID"] + "_div").css("height").replace("px", ""));
                }
                top = sltTop + sltHeight + lineDis;
            }
                // 新增子控件
            else {
                // 第一个控件top要加lineDis
                var topD = 0;
                // 选择控件不为子控件  新增控件放置于父容器最底部
                if ($.trim(sltCtrlObj.attrList["ParentID"]).length == 0) {
                    top = 0;
                    // 查询父容器最底部
                    for (var i = 0; i < length; i++) {
                        tmpCtrl = this.controls[i];
                        // 只查询相同父容器下的子控件
                        if (tmpCtrl.attrList["ParentID"] == ParentID
                            // 排除新增控件自己
                            && tmpCtrl.HtmlID != ctrlObj.HtmlID) {
                            top = tmpCtrl.Position().top;
                            height = tmpCtrl.Size().height;
                            bottom = top + height;
                            top = bottom > top ? bottom : top;
                        }
                    }
                    if (top == 0) topD = lineDis;
                    top += lineDis
                }
                    // 否则在当前选中控件下方
                else top = sltTop + sltHeight + lineDis;
                // 查询父控件
                parentCtrl = this.getParentCtrl(ParentID);

                // 父控件有标题
                if (parentCtrl.attrList["Title_HasTitle"] == "true") {
                    // 若父控件有标题   则最小子控件高度为一个行高
                    var minTop = this.View.LineHeight + lineDis;
                    if (top < minTop) top = minTop;
                }
                top += topD;
            }
        }
        // 设置新增控件位置
        ctrlObj.Position({ "t": top + "px" });
        // 计算高度行数
        var line = (ctrlObj.Size().height + lineDis) / (this.View.LineHeight + lineDis)

        // 设置其他控件纵向偏移
        ctrlObj.setOtherControlPosition(line);

        // 存在父控件 设置父控件高度
        if (parentCtrl) parentCtrl.setHeight();

        return top;
    };

    // 设置页面滚动情况
    this.setViewScroll = function () {
        var bottom = 0;
        // 查询所有非子控件的最底部坐标
        var length = this.controls.length;
        for (var i = 0; i < length; i++) {
            var ctrl = this.controls[i];
            if ($.trim(ctrl.attrList["ParentID"]).length == 0) {
                var tmpTop = ctrl.Position().top;
                var tmpHeight = ctrl.Size().height;
                var tmpBottom = tmpTop + tmpHeight;
                if (tmpBottom > bottom) bottom = tmpBottom;
            }
        }

        // 最底部坐标大于当前高度 设置滚动条
        if (bottom > this.height) {
            this.container.css({
                "width": (this.width + 32) + "px",
                "overflow-y": "auto"
            });
            this.View.htmlObj.css({
                "height": bottom + 10 + "px"
            });
        }
        else {
            this.container.css({
                "width": (this.width + 15) + "px",
                "overflow-y": "hidden"
            });
            this.View.htmlObj.css({
                "height": this.height + "px"
            });
        }
    };
    this.setViewScroll();



    this.isAdding = false;
    // 创建新控件
    this.addControls = function (para) {

        if (this.isAdding) return;
        this.isAdding = true;

        // 初始化参数  若为null则设置{}  预防后续处理异常
        if (!para) para = {};
        if (!para.attrList) para.attrList = {};
        if (!para.cssList) para.cssList = {};


        // 控件参数不包含id参数 新增控件   且没有传递ParentID参数   且当前有选中控件
        if (typeof para.ControlID == "undefined" && typeof para.attrList["ParentID"] == "undefined" && this.sltControls.length > 0) {
            var sltCtrlObj = this.sltControls[0];
            // 判断是否控件不能成为子控件
            if (!$.ibo.formEditor.NoChildControl.contain(para.ControlType)) {
                // 选中的控件为面板控件  则新增的为选中面板的子控件
                if (sltCtrlObj.ControlType == "panel") para.attrList["ParentID"] = sltCtrlObj.HtmlID;
                    // 选中的控件为子控件  则新增的为选中控件的同级控件
                else if ($.trim(sltCtrlObj.attrList["ParentID"]).length > 0) para.attrList["ParentID"] = sltCtrlObj.attrList["ParentID"];
            }
        }
        // 创建新控件
        var ctrlObj = $.ibo.formEditor.createControls(this, para);
        // 参数不合法  未创建成功return
        if (ctrlObj == null) {
            this.isAdding = false;
            return;
        }

        var length, top, height;

        // 控件添加到当前表单编辑器中
        this.controls.push(ctrlObj);


        // 控件参数不包含id参数 新增控件
        if (typeof para.ControlID == "undefined") {
            top = this.setNewControlPosition(ctrlObj);
        }
        else top = ctrlObj.Position().top;

        // 当前页面不只一页
        if (this.View.height > 100) {
            height = ctrlObj.Size().height;
            // 当前滚动条高度
            var scrTop = this.container.scrollTop();

            // 若控件为子控件  则顶部坐标要加上父控件的顶部坐标才为相对于页面的坐标
            var ParentID = ctrlObj.attrList["ParentID"];
            if ($.trim(ParentID).length > 0 && $("#" + ParentID).length > 0) {
                top += parseInt($("#" + ParentID).css("top").replace("px", ""));
            }

            // 当前控件位置位于滚动位置之上
            if (top < scrTop
                // 当前控件位置位于滚动位置之下
                || top + height > scrTop + (this.View.htmlObj.height() / this.View.height * 100))
                // 设置滚动到当前控件的上一行位置
                this.container.scrollTop(top - this.View.LineHeight - this.View.LineDistance);
        }

        // 取消其它控件选中
        this.unSelect();
        // 选中当前控件
        ctrlObj.select();

        // 显示控件属性
        this.showPrototype();

        // 设置页面滚动条
        this.setViewScroll();

        // 添加控件结束
        this.isAdding = false;

        return ctrlObj;
    };

    // 显示属性
    this.showPrototype = function () {
        // 当前没选中控件
        if (this.sltControls.length == 0) {
            // 隐藏控件属性
            this.hideControlProp();
            // 显示页面属性
            this.propertiesWin.show();
            // 显示控件菜单未选择
            $.ibo.showselectmenu("");
        }
            // 当前选中一个控件
        else {
            // 隐藏页面属性
            this.propertiesWin.hide();
            // 显示控件属性
            var ctrlObj = this.sltControls[0];
            ctrlObj.showPrototype();
        }
    };

    // 隐藏控件属性
    this.hideControlProp = function () {
        // 显示属性主面板
        $("#" + this.PropertiesDivID).hide();
        // 隐藏动画选择div
        $("#" + this.PropertiesDivID + " .ibo-animateclass").hide();
        // 隐藏所有属性项
        $("#" + this.PropertiesDivID + " .list-group-item").hide();
        // 隐藏动画选择tab页头
        $("#spAnimate").hide();
        // 隐藏下拉框"数据项"设置面板
        $("#Property_Options_SetDiv").hide();
    };



    // 右键弹出菜单
    this.rightMenu = $("<div>");
    this.rightMenu.attr("id", this.View.id + "_rightMenu");
    this.rightMenu.addClass("formRightMenuM");
    this.rightMenu.css({ display: "none", "z-index": 999999 });
    // 删除控件菜单
    var rmdiv = $("<div>");
    rmdiv.addClass("formRightMenuD");
    rmdiv.text("删除控件");
    rmdiv.on("mousedown", function (e) { e.stopPropagation(); if (e.which == 1) { formEditor.deleteCtrl(); formEditor.rightMenu.hide(); } });
    this.rightMenu.append(rmdiv);


    // 创建页面属性窗口
    this.propertiesWin = $("#winProperties");

    $(document.body).append(this.rightMenu);
    // 去除浏览器默认右键菜单
    this.rightMenu.bind("contextmenu", function (e) {
        return false;
    });



    // 删除控件
    this.deleteCtrl = function () {
        // 当前未选中任何控件 不做处理
        if (this.sltControls.length == 0) return;
        // 单次只可选中一个控件
        this.sltControls[0].remove();
        this.setViewScroll();
        this.showPrototype();
    };


    // 清空控件
    this.empty = function () {
        // 移除之前的页面控件
        var length = formEditor.controls.length;
        while (length > 0) {
            formEditor.controls.pop().remove();
            length--;
        }
        formEditor.sltControls.length = 0;
        this.setViewScroll();
    };

    // 销毁编辑器
    this.destroy = function () {
        // 设置所有控件非选中  隐藏动画窗体和 控件属性窗体
        this.unSelect();
        this.showPrototype();
        // 遍历当前选中控件 逐个删除
        while (this.controls.length > 0 > 0) {
            var ctrlObj = this.controls.pop();
            ctrlObj.remove();
            this.controls.remove(ctrlObj);
        }
        // 销毁页面载体
        this.View.htmlObj.remove();
        this.container.html("");
    };


    // 表单信息验证
    this.DoValid = function () {

        // 判断是否输入页面名称
        if ($.trim(this.View.ViewName).length == 0) {
            $.ibo.ShowErrorMsg("请输入页面名称！");
            this.unSelect();
            this.showPrototype();
            $.ibo.formEditor.Name_Txt.focus();
            return false;

        }

        // 非普通页面  且不是控件生成数据表  则判断页面是否选择数据源
        if (this.CurViewType != "1" && this.View.GenerateType != "2" && $.trim(this.View.TbName).length == 0) {

            // 是否所有控件自己拥有数据源属性  且  数据源不是子表
            var allHasDataAndNotSub = true;

            var length = this.controls.length;
            // 不存在任何控件
            if (length == 0) allHasDataAndNotSub = false;
            else {
                for (var i = 0; i < length; i++) {
                    var ctrl = this.controls[i];
                    // 不存在DataSource_TbName属性  判断不通过
                    if (typeof ctrl.attrList["DataSource_TbName"] == "undefined" && ctrl.attrList["ParentID"] == "" && ctrl.ControlType!="button") {
                        allHasDataAndNotSub = false;
                        break;
                    }
                    // 是子表数据源  判断不通过
                    if (ctrl.attrList["DataSource_IsSub"] == "true") {
                        allHasDataAndNotSub = false;
                        break;
                    }
                }
            }

            if (!allHasDataAndNotSub) {
                $.ibo.ShowErrorMsg("请给页面选择数据源！");
                this.unSelect();
                this.showPrototype();
                return false;
            }
        }

        return true;
    };

    // 转换成提交到后台的数据格式
    this.getToSubmitData = function () {
        var viewID = 0;

        // 表单信息验证
        if (!this.DoValid()) return false;

        // 表单信息
        var jsonOjb = {
            ViewID: this.View.ViewID,                           // 页面编号
            ViewType: this.View.ViewType,                       // 页面类型 1：普通页面  2：表单页面
            SizeType: this.View.SizeType,                       // 页面尺寸类型 1：PC  2：Mobile
            height: this.View.height,                           // 页面高度 百分比
            background: this.View.background,                   // 页面背景
            LineHeight: this.View.LineHeight,                   // 页面行高
            LineDistance: this.View.LineDistance,               // 页面行间距
            IsShowsizeline: this.View.IsShowsizeline,           // 是否显示刻度
            sizelineColor: this.View.color,                     // 刻度颜色
            ViewName: this.View.ViewName,                       // 页面名称
            TbName: this.View.TbName,                           // 数据物理表名
            IsFlow: this.View.IsFlow,                           // 是否流程表单
            ViewSort:0 ,                                         // 页面种类 (现默认为0，原this.View.ViewSort)1：普通页面  2：从表页面  3：明细页面  4：数据选择页面
            AppID: this.View.AppID,                             // 所属案例的AppID
            ViewLogo:ViewLogo,
            GenerateType: this.View.GenerateType                // 页面生成方式   1：根据数据表生成控件    2：根据控件生成数据表
        };

        // 控件信息
        var FormControlList = [];
        var length = this.controls.length;
        for (var i = 0; i < length; i++) {
            // 控件基础信息
            var ctrlObj = this.controls[i];

            // 控件验证
            if (!ctrlObj.DoValid()) return false;

            var WF_FormControl = {
                ControlID: ctrlObj.ControlID,
                HtmlID: ctrlObj.HtmlID,
                ControlName: ctrlObj.name,
                ControlTypeText: ctrlObj.ControlType
            };

            // 控件属性
            WF_FormControl.FormCtlAttrList = [];
            for (var j in ctrlObj.attrList) {
                WF_FormControl.FormCtlAttrList.push({
                    AttrName: j,
                    AttrValue: ctrlObj.attrList[j]
                });
            }
            // 控件样式
            WF_FormControl.FormCtlCssList = [];
            for (var j in ctrlObj.cssList) {
                WF_FormControl.FormCtlCssList.push({
                    CssName: j,
                    CssValue: ctrlObj.cssList[j]
                });
            }
            FormControlList.push(WF_FormControl);

        }
        jsonOjb.FormControlList = FormControlList;

        return jsonOjb;
    };



    // 设置"页面制作方式"
    this.SetGenerateType = function (gt) {
        // 给出提示
        if ($.ibo.ShowYesOrNoDialog("此操作会将页面清空，是否确认执行此操作？")) {
            // 清空控件
            formEditor.empty();

            // 赋值制作方式
            this.View.GenerateType = gt;

            // 清空页面绑定数据源信息
            this.View.TbColumnList = [];
            // 清空绑定表名
            this.View.TbName = "";
            // 清空绑定表名输入框
            $.ibo.formEditor.DataSource_Txt.val("");

            // 清空子表数据源物理表列信息数组
            this.View.subTbColumnListArr = [];

            // 清空审批页面绑定流程信息
            this.FlowModelInfoList = [];

            // 数据表生成控件  可选择数据源
            if (gt == "1") $.ibo.formEditor.DataSource_Btn.show();
                // 控件生成数据表  不可选择数据源
            else $.ibo.formEditor.DataSource_Btn.hide();
        }
            // 用户选择取消
        else {
            // 还原制作方式下拉框值
            $.ibo.formEditor.GenerateType_Slt.val(this.View.GenerateType);
        }
    };

    // 设置"数据源"
    this.SetDataSource = function () {
        // 打开数据表选择窗口
        $.ibo.openNewWin({
            width: 700,
            height: 470,
            hasTitle: true,
            title: "选择数据源",
            url: "../../select/selectTbName(1).html?TimeStamp=201604011320",
            callBackFun: function (obj) {

                // 提示更改"数据源"会清空页面重新生成
                if (formEditor.controls.length > 0) {
                    if (!$.ibo.ShowYesOrNoDialog("当前操作会清除页面上原有的控件，是否确认执行此操作？")) return;
                }

                // 清空控件
                formEditor.empty();

                // 设置数据表名输入框
                $.ibo.formEditor.DataSource_Txt.val(obj.TbNameRmk);
                // 设置绑定表名
                formEditor.View.TbName = obj.TbName;
                // 设置绑定表字段信息
                formEditor.View.TbColumnList = obj.TbColumnList;



                // 生成主表控件   selectFields:勾选框选中需要自动生成控件的字段数组
                if (obj.selectFields) {
                    $.each(obj.selectFields, function (i, n) {
                        formEditor.CreateControlByFieldInfo(n);
                    });
                }

                // 子表信息
                formEditor.View.subTbColumnListArr = [];

                // 增加子控件
                if (obj.ChildTable.length > 0) {
                    // 遍历子表信息
                    $.each(obj.ChildTable, function (i, n) {
                        // 增加面板控件
                        var parent = formEditor.addControls({ "ControlType": "panel", "name": n.Decription });

                        parent.attrList["DataSource_TbName"] = n.TbName;

                        parent.attrList["DataSource_IsSub"] = "true";

                        // 设置子表字段信息
                        formEditor.View.subTbColumnListArr.push({ "TbName": n.TbName, "ParentID": parent.HtmlID, "TbColumnList": n.TbFields, "TbNameRmk": n.Decription });

                        // 生成子表控件
                        $.each(n.TbFields, function (j, m) {
                            formEditor.CreateControlByFieldInfo(m);
                        });
                    });
                }
            }
        });
    };

    // 设置"页面风格"
    this.SetViewSize = function (s) {
        // 保存页面风格
        $.ibo.formEditor.Instance.View.SizeType = s;
        // PC页面
        if (s == "1") {
            // 主容器的宽和高
            this.height = $.ibo.formEditor.PCHeight;
            this.width = $.ibo.formEditor.PCWidth;
            this.container.parent().removeClass("mobileViewType");
            this.container.parent().addClass("pcViewType");
        }
            // Moblie页面
        else if (s == "2") {
            // 主容器的宽和高
            this.height = $.ibo.formEditor.MobileHeight;
            this.width = $.ibo.formEditor.MobileWidth;
            this.container.parent().removeClass("pcViewType");
            this.container.parent().addClass("mobileViewType");
        }
        // 更改主容器高度和宽度
        this.container.css({ "height": this.height + "px", "width": this.width + "px" })
    };

    this.bgType = "1";
    // 背景为纯色
    if (this.View.background[0] == "#") { this.bgType = "1"; }
        // 背景为图片
    else { this.bgType = "2"; }

    // 设置"背景类型"
    this.SetBackGroundType = function (t) {
        if (typeof t != "undefined") {
            this.bgType = t;
        }

        // 背景为纯色
        if (this.bgType == "1") {
            $.ibo.formEditor.Background_Color_Li.show();
            $.ibo.formEditor.Background_Img_Li.hide();
        }
            // 背景为图片
        else if (this.bgType == "2") {
            $.ibo.formEditor.Background_Color_Li.hide();
            $.ibo.formEditor.Background_Img_Li.show();
        }

        // 设置背景种类下拉框值
        $.ibo.formEditor.Background_Type_Slt.val(this.bgType);
    };


    // 根据数据表字段类型生成控件
    this.GetControlTypeByFieldType = function (FieldType) {
        var ControlType;

        switch (FieldType) {

            // 整数
            case "1":
                ControlType = "number";
                break;
                // 小数            
            case "2":
                ControlType = "decimal";
                break;
                // 日期            
            case "3":
                ControlType = "date";
                break;
                // 时间            
            case "4":
                ControlType = "time";
                break;
                // 字符            
            case "6":
                ControlType = "text";
                break;
                // 图片            
            case "7":
                ControlType = "image";
                break;
                // 文件            
            case "8":
                ControlType = "upload";
                break;
                // 姓名            
            case "9":
                ControlType = "employeename";
                break;
                // 部门            
            case "10":
                ControlType = "depart";
                break;
                // 地址            
            case "11":
                ControlType = "address";
                break;
                // 手机            
            case "12":
                ControlType = "telephone";
                break;
                // 电子邮箱
            case "13":
                ControlType = "email";
                break;
                // 地理位置
            case "14":
                ControlType = "location";
                break;
                // 文本编辑器
            case "15":
                ControlType = "articleedit";
                break;
            default: break;
        }
        return ControlType;
    };

    // 根据数据表字段类型生成控件
    this.CreateControlByFieldInfo = function (fieldInfo) {
        var para = { "ControlType": "", "ControlName": fieldInfo.Rmk, "attrList": { "Input_FieldID": fieldInfo.FieldID, "Input_IsAdvice": fieldInfo.IsAdvice ? "true" : "false" } };
        para.ControlType = this.GetControlTypeByFieldType(fieldInfo.FieldType);
        this.addControls(para);
    };


    // 修改流程信息行
    this.EidtFlowInfoRow = function (flowInfo) {
        // 当前选中radio
        var chk = $.ibo.formEditor.Flow_Table.find("input[type=radio]:checked");

        // chk.parent()=当前选中radio所在td   .parent()=当前选中radio所在tr   .find("td")=当行所有td
        var td = chk.parent().parent().find("td");
        // 第二列流程名
        td.eq(1).text(decodeURIComponent(flowInfo.Description));
        // 第三列流程类型
        var t = "";
        if (flowInfo.FlowType == 1) t = "非条件流程";
        else if (flowInfo.FlowType == 2) t = "条件流程";
        else if (flowInfo.FlowType == 3) t = "自定义流程";
        td.eq(2).text(t);
    };


    // 创建流程信息行
    this.CreateFlowInfoRow = function (flowInfo) {
        // 创建行
        var tr = $("<tr>", { "class": "View_Flow_Tr" });
        // 首列radio
        var td = $("<td>");
        var chk = $("<input>", { "type": "radio", "name": "View_Flow_Chk", "value": flowInfo.FlowModelID, "data-FlowType": flowInfo.FlowType, "data-FlowStatus": flowInfo.Status });
        chk.on("click", function () {
           
            if (this.checked) {
                if ($(this).attr("data-FlowStatus") == "1") {
                    $(".ibo-singleimgbtn.ibo-singleimgbtn-status").attr("title","禁用");
                }
                else {
                    $(".ibo-singleimgbtn.ibo-singleimgbtn-status").attr("title","启用");
                }
            }

            
        });
        td.append(chk);
        tr.append(td);

        // 第二列流程名
        td = $("<td>");
        td.text(decodeURIComponent(flowInfo.Description));
        tr.append(td);

        // 第三列流程类型
        td = $("<td>");
        var t = "";
        if (flowInfo.FlowType == 1) t = "非条件流程";
        else if (flowInfo.FlowType == 2) t = "条件流程";
        else if (flowInfo.FlowType == 3) t = "自定义流程";
        td.text(t);
        tr.append(td);

        $.ibo.formEditor.Flow_Table.append(tr);
    };


    // 初始化页面属性控件值
    this.InitProp = function () {

        // "页面制作方式"下拉框
        $.ibo.formEditor.GenerateType_Slt.val(this.View.GenerateType);

        // 数据表生成控件  可选择数据源
        if (this.View.GenerateType!=null&&this.View.GenerateType.toString() == "1") $.ibo.formEditor.DataSource_Btn.show();
            // 控件生成数据表  不可选择数据源
        else $.ibo.formEditor.DataSource_Btn.hide();

        // "数据源"表名输入框
        $.ibo.formEditor.DataSource_Txt.val(this.View.TbNameRmk);

        // 普通页面不选择数据源
        if (this.CurViewType == "1") {
            $.ibo.formEditor.DataSource_Li.hide();
        }
        else {
            $.ibo.formEditor.DataSource_Li.show();
        }

        // "页面名称"输入框
        $.ibo.formEditor.Name_Txt.val(this.View.ViewName);

        // 图标
        $.ibo.formEditor.ViewImg_Li.Property_View_ViewImg_File.attr("src", this.View.ViewLogo);
        // "页面风格"下拉框
        $.ibo.formEditor.Size_Slt.val(this.View.SizeType);
        // "页面种类"下拉框
        $.ibo.formEditor.Sort_Slt.val(this.View.ViewSort);

        // 表单页面才可以设置页面种类
        if (this.CurViewType == "2") {
            $.ibo.formEditor.Sort_Li.show();
        }
        else {
            $.ibo.formEditor.Sort_Li.hide();
        }

        // "背景类型"下拉框
        this.SetBackGroundType();

        // 审批页面才可以设置绑定流程
        if (this.CurViewType == "3") {

            // 清除原有流程信息
            $.ibo.formEditor.Flow_Table.find(".View_Flow_Tr").remove();

            // 创建流程信息行
            if (this.View.FlowModelInfoList && this.View.FlowModelInfoList.length > 0) {
                $.each(this.View.FlowModelInfoList, function (i, n) {
                    formEditor.CreateFlowInfoRow(n);
                });
            }

            //$.ibo.formEditor.Flow_Li.show();
        }
        else {
            $.ibo.formEditor.Flow_Li.hide();
        }
    };
    this.InitProp();


    // 添加到表单编辑器的父容器中
    this.container.find("#" + para.id + "_lodingTxt").remove();
    this.container.append(this.View.htmlObj);


    $.ibo.formEditor.Instance = this;
};

// 不可作为子控件的控件
$.ibo.formEditor.NoChildControl = ["panel", "button"];

// 表单编辑器初始化
$.ibo.formEditor.Init = function () {

    // "页面制作方式"Li
    $.ibo.formEditor.GenerateType_Li = $("#Property_View_GenerateType_Li");
    // "页面制作方式"下拉框
    $.ibo.formEditor.GenerateType_Slt = $("#Property_View_GenerateType_Slt");
    // 绑定"页面制作方式"下拉框设置
    $.ibo.formEditor.GenerateType_Slt.on("input propertychange", function () {
        $.ibo.formEditor.Instance.SetGenerateType($(this).val());
    });

    // "数据源"Li
    $.ibo.formEditor.DataSource_Li = $("#Property_View_DataSource_Li");
    // "数据源"表名输入框
    $.ibo.formEditor.DataSource_Txt = $("#Property_View_DataSource_Txt");
    // "数据源"表名选择按钮
    $.ibo.formEditor.DataSource_Btn = $("#Property_View_DataSource_Btn");
    // 绑定"数据源"表名选择按钮点击
    $.ibo.formEditor.DataSource_Btn.on("click", function () {
        $.ibo.formEditor.Instance.SetDataSource();
    });

    // "页面名称"Li
    $.ibo.formEditor.Name_Li = $("#Property_View_Name_Li");
    // "页面图片"Li
    $.ibo.formEditor.ViewImg_Li = $("#Property_View_ViewImg_Li");
    $.ibo.formEditor.ViewImg_Li.Property_View_ViewImg_File = $("#Property_View_ViewImg_File");
    $.ibo.formEditor.ViewImg_Li.Property_View_ViewImg_File.InitUpload({
            url: "",
            callBackFun: function (src) {
                if (src != null && src.length > 0) {
                    ViewLogo = src[0];
                    $.ibo.formEditor.ViewImg_Li.Property_View_ViewImg_File.attr("src",ViewLogo);
                }
            }
        });

    // "页面名称"输入框
    $.ibo.formEditor.Name_Txt = $("#Property_View_Name_Txt");
    // 绑定"页面名称"输入框设置
    $.ibo.formEditor.Name_Txt.on("input propertychange", function () {
        // 保存页面名称
        $.ibo.formEditor.Instance.View.ViewName = $(this).val();
    });

    // "页面风格"Li
    $.ibo.formEditor.Size_Li = $("#Property_View_Size_Li");
    // "页面风格"下拉框
    $.ibo.formEditor.Size_Slt = $("#Property_View_Size_Slt");
    // 绑定"页面风格"下拉框设置
    $.ibo.formEditor.Size_Slt.on("input propertychange", function () {
        $.ibo.formEditor.Instance.SetViewSize($(this).val());
    });

    // "页面种类"Li
    $.ibo.formEditor.Sort_Li = $("#Property_View_Sort_Li");
    // "页面种类"下拉框
    $.ibo.formEditor.Sort_Slt = $("#Property_View_Sort_Slt");
    // 绑定"页面种类"下拉框设置
    $.ibo.formEditor.Sort_Slt.on("input propertychange", function () {
        $.ibo.formEditor.Instance.View.ViewSort = $(this).val();
    });

    // "背景类型"Li
    $.ibo.formEditor.Background_Type_Li = $("#Property_View_Background_Type_Li");
    // "背景类型"下拉框
    $.ibo.formEditor.Background_Type_Slt = $("#Property_View_Background_Type_Slt");
    // 绑定"背景类型"下拉框设置
    $.ibo.formEditor.Background_Type_Slt.on("input propertychange", function () {
        $.ibo.formEditor.Instance.SetBackGroundType($(this).val());
    });

    // "选择颜色"Li
    $.ibo.formEditor.Background_Color_Li = $("#Property_View_Background_Color_Li");
    // "选择颜色"color输入框
    $.ibo.formEditor.Background_Color_Clr = $("#Property_View_Background_Color_Clr");
    // 绑定"选择颜色"color输入框设置
    $.ibo.formEditor.Background_Color_Clr.on("input propertychange", function () {
        $.ibo.formEditor.Instance.View.setBackground($(this).val());
    });

    // "选择图片"Li
    $.ibo.formEditor.Background_Img_Li = $("#Property_View_Background_Img_Li");
    // "选择图片"按钮
    $.ibo.formEditor.Background_Img_Btn = $("#Property_View_Background_Img_Btn");
    // "选择图片"file输入框
    $.ibo.formEditor.Background_Img_File = $("#Property_View_Background_Img_File");
    // 绑定"选择图片"file输入框设置
    $.ibo.formEditor.Background_Img_File.on("change", function () {

        // 禁用"背景类型"下拉框
        $.ibo.formEditor.Background_Type_Slt.prop("disabled", true);

        // 禁用"选择图片"file输入框
        $.ibo.formEditor.Background_Img_File.prop("disabled", true);

        // 更改"选择图片"按钮文字
        $.ibo.formEditor.Background_Img_Btn.val("图片上传中...");

        // 上传附件
        $.ibo.Upload({
            "file": this.files[0],
            complete: function (evt) {
                // 文件路径只存AppService根目录之后的路径
                var url = "url('" + evt.target.responseText + "')";
                $.ibo.formEditor.Instance.View.setBackground(url);

                // 启用"背景类型"下拉框
                $.ibo.formEditor.Background_Type_Slt.prop("disabled", false);

                // 启用"选择图片"file输入框
                $.ibo.formEditor.Background_Img_File.prop("disabled", false);

                // 还原"选择图片"按钮文字
                $.ibo.formEditor.Background_Img_Btn.val("点击选择");

                $.ibo.formEditor.Instance.View.setBackground(url);
            }
        });
    });

    // "绑定流程"Li
    $.ibo.formEditor.Flow_Li = $("#Property_View_Flow_Li");
    // "绑定流程"新增按钮
    $.ibo.formEditor.Flow_New = $("#Property_View_Flow_New");
    // 绑定绑定流程"新增按钮设置
    $.ibo.formEditor.Flow_New.on("click", function (e) {
        if ($.ibo.formEditor.Instance.View.ViewID == 0) {
            $.ibo.ShowErrorMsg("请先保存表单信息！");
            return;
        }

        var position = $(this).position();
        $.ibo.formEditor.Flow_NewMenuDiv.css({ "left": position.left + 5 + "px", "top": position.top + 5 + "px", "display": "block" });
        e.stopPropagation();
    });

    // "绑定流程"新增选择流程类型菜单div
    $.ibo.formEditor.Flow_NewMenuDiv = $("#Property_View_Flow_NewMenuDiv");
    // 设置点击隐藏流程类型菜单div
    $(document).on("click", function () { $.ibo.formEditor.Flow_NewMenuDiv.hide(); });

    // "绑定流程"新增非条件流程菜单
    $.ibo.formEditor.Flow_NoCondtionMenu = $("#Property_View_Flow_NoCondtionMenu");
    // 设置"绑定流程"新增非条件流程菜单
    $.ibo.formEditor.Flow_NoCondtionMenu.on("click", function () {
        $.ibo.openNewWin({
            width: $(window.top.document.body).width() - 6,
            height: 718,
            dialogClass: "win1",
            hasTitle: true,
            title: "新增非条件流程",
            // type=add&FlowID=0新增流程   ParentID=1默认建在顶级部门公司下   FlowType=1非条件流程
            url: "../AppManage/flow/edit.html?TimeStamp=201604011320&type=add&FlowID=0&ParentID=1&FlowType=1&ViewID=" + formEditor.View.ViewID + "&ViewName=" + encodeURI(formEditor.View.ViewName),
            callBackFun: function (data) {
                $.ibo.formEditor.Instance.CreateFlowInfoRow(data);
            }
        });
    });

    // "绑定流程"新增条件流程菜单
    $.ibo.formEditor.Flow_CondtionMenu = $("#Property_View_Flow_CondtionMenu");
    // 设置"绑定流程"新增条件流程菜单
    $.ibo.formEditor.Flow_CondtionMenu.on("click", function () {
        $.ibo.openNewWin({
            width: $(window.top.document.body).width() - 6,
            height: 718,
            dialogClass: "win1",
            hasTitle: true,
            title: "新增条件流程",
            // type=add&FlowID=0新增流程   ParentID=1默认建在顶级部门公司下   FlowType=2条件流程
            url: "../../flow/edit.html?TimeStamp=201604011320&type=add&FlowID=0&ParentID=1&FlowType=2&ViewID=" + formEditor.View.ViewID + "&ViewName=" + encodeURI(formEditor.View.ViewName),
            callBackFun: function (data) {
                $.ibo.formEditor.Instance.CreateFlowInfoRow(data);
            }
        });
    });

    // "绑定流程"新增自定义流程菜单
    $.ibo.formEditor.Flow_SingleMenu = $("#Property_View_Flow_SingleMenu");
    // 设置"绑定流程"新增自定义流程菜单
    $.ibo.formEditor.Flow_SingleMenu.on("click", function () {
        $.ibo.openNewWin({
            width: 425,
            height: 520,
            dialogClass: "win1",
            hasTitle: true,
            title: "新增自定义流程",
            url: "../../flow/editforsingle.html?TimeStamp=201604011320&ViewID=" + formEditor.View.ViewID + "&ViewName=" + encodeURIComponent(formEditor.View.ViewName),
            callBackFun: function (data) {
                $.ibo.formEditor.Instance.CreateFlowInfoRow(data);
            }
        });
    });

    // "绑定流程"修改按钮
    $.ibo.formEditor.Flow_Edit = $("#Property_View_Flow_Edit");
    // 绑定"绑定流程"修改按钮设置
    $.ibo.formEditor.Flow_Edit.on("click", function () {
        // 当前选中radio
        var chk = $.ibo.formEditor.Flow_Table.find("input[type=radio]:checked");
        // 没有选中任何项   不做操作
        if (chk.length == 0) return;
        // 流程模型id
        var FlowModelID = chk.val();
        // 流程模型类别
        var FlowType = chk.attr("data-FlowType");
        var FlowStatus = chk.attr("data-flowstatus");
        if (FlowStatus == "1") {//启用不能修改
            alert("该流程已启用，不能修改！");
            return;
        }
        // 窗口大小
        var height, width;
        // 窗口地址
        var url;

        // 自定义流程 单独一个页面
        if (FlowType == "3") {
            width = 425;
            height = 520;

            url = "../../flow/editforsingle.html?TimeStamp=201604011320&";
        }
            // 非定义流程  共用一个页面
        else {
            width = $(window.top.document.body).width() - 6,
            height = 718;

            url = "../../flow/edit.html?TimeStamp=201604011320&type=edit&ParentID=1&";
        }

        url += "FlowID=" + FlowModelID + "&ViewID=" + formEditor.View.ViewID + "&ViewName=" + encodeURI(formEditor.View.ViewName);

        $.ibo.openNewWin({
            width: width,
            height: height,
            dialogClass: "win1",
            hasTitle: true,
            title: "修改流程",
            url: url,
            callBackFun: function (data) {
                var data = $.toJSON({ viewID: formEditor.View.ViewID });
                $.ibo.crossOrgin({                      //获得案例模板列表
                    url: $.ibo.FormFlowSrvUrl,
                    funcName: "FlowModelInfoListByViewID",
                    data: data,
                    success: function (obj) {
                        if (obj.ResFlag === $.ibo.ResFlag.Success) {
                            if (obj.ResObj && obj.ResObj) {
                                formEditor.View.FlowModelInfoList = obj.ResObj;
                                $(".View_Flow_Tr").remove();

                                // 创建流程信息行
                                if (formEditor.View.FlowModelInfoList && formEditor.View.FlowModelInfoList.length > 0) {
                                    $.each(formEditor.View.FlowModelInfoList, function (i, n) {
                                        formEditor.CreateFlowInfoRow(n);
                                    });
                                }

                            }
                        }
                    }
                });
              //  $.ibo.formEditor.Instance.EidtFlowInfoRow(data);
            }
        });
    });

    // "绑定流程"删除按钮
    $.ibo.formEditor.Flow_Delete = $("#Property_View_Flow_Delete");
    // 绑定"绑定流程"删除按钮设置
    $.ibo.formEditor.Flow_Delete.on("click", function () {

        // 当前选中radio
        var chk = $.ibo.formEditor.Flow_Table.find("input[type=radio]:checked");
        // 没有选中任何项   不做操作
        if (chk.length == 0) return;

        if ($.ibo.ShowYesOrNoDialog("确定删除？")) {
            // 流程模型id
            var FlowModelID = chk.val();
            var data = $.toJSON({ ID: FlowModelID });

            $.ibo.crossOrgin({
                url: $.ibo.FormFlowSrvUrl,
                funcName: "WF_FlowModel_Delete",
                data: data,
                success: function (obj) {
                    if ($.ibo.ResFlag.Success == obj.ResFlag) {
                        $.ibo.ShowErrorMsg("删除成功！");
                        chk.parent().parent().remove();
                    }
                    else {
                        $.ibo.ShowErrorMsg(obj);
                    }
                }
            });
        }
    });


    // "绑定流程"删除按钮
    $.ibo.formEditor.Flow_Status = $("#Property_View_Flow_Status");
    // 绑定"绑定流程"删除按钮设置
    $.ibo.formEditor.Flow_Status.on("click", function () {
        var hint_t = $(".ibo-singleimgbtn.ibo-singleimgbtn-status").get(0).title;
        // 当前选中radio
        var chk = $.ibo.formEditor.Flow_Table.find("input[type=radio]:checked");
        // 没有选中任何项   不做操作
        if (chk.length == 0) return;

        if ($.ibo.ShowYesOrNoDialog("确定" + hint_t + "？")) {
            // 流程模型id
            var FlowModelID = chk.val();
            var data = $.toJSON({ FlowModelID: FlowModelID });

            $.ibo.crossOrgin({
                url: $.ibo.FormFlowSrvUrl,
                funcName: "WFFlowModelEnableDisable",
                data: data,
                success: function (obj) {
                    if ($.ibo.ResFlag.Success == obj.ResFlag) {
                        $.ibo.ShowErrorMsg(hint_t + "成功！");
                        var stitle = hint_t == "启用" ? "禁用" : "启用";
                        var status = hint_t == "启用" ? "1" : "0";
                        $(".ibo-singleimgbtn.ibo-singleimgbtn-status").attr("title", stitle);
                        $.ibo.formEditor.Flow_Table.find("input[type=radio]:checked").attr("data-FlowStatus", status);
                        //chk.parent().parent().remove();
                    }
                    else {
                        $.ibo.ShowErrorMsg(obj);
                    }
                }
            });
        }
    });

    // "绑定流程"流程信息table
    $.ibo.formEditor.Flow_Table = $("#Property_View_Flow_Table");
};


// 电脑页面宽度
$.ibo.formEditor.PCWidth = 840;
// 电脑页面高度
$.ibo.formEditor.PCHeight = 525;


// 移动端页面宽度
$.ibo.formEditor.MobileWidth = 320;
// 移动端页面高度
$.ibo.formEditor.MobileHeight = 432;


// 最小控件宽度
$.ibo.formEditor.MinControlWidth = 50;


// 页面默认行高30px
$.ibo.formEditor.minLineHeight = 30;
// 页面默认行间距6px
$.ibo.formEditor.minLineDistance = 6;


// 表单编辑类实例
$.ibo.formEditor.Instance;



// 更改选中示意线的位置
$.ibo.formEditor.setSelectedLine = function (id, pNode) {
    // 左边线
    var lLineID = id + "_lLine";
    pNode.append($(lLineID));

    // 右边线
    var rLineID = id + "_rLine";
    pNode.append($(rLineID));

    // 上边线
    var tLineID = id + "_tLine";
    pNode.append($(tLineID));

    // 下边线
    var bLineID = id + "_bLine";
    pNode.append($(bLineID));
};
// 创建控件四周选中示意虚线 id:虚线附属元素id  pNode:虚线所属父级容器
$.ibo.formEditor.createSelectedLine = function (id, pNode) {
    // 左边线
    var lLineID = id + "_lLine";
    lLine = $("<div>");
    lLine.attr("id", lLineID).css("display", "none");
    lLine.css("transform", "rotate(180deg)");
    lLine.css("-o-transform", "rotate(180deg)");
    lLine.css("-moz-transform", "rotate(180deg)");
    lLine.css("-ms-transform", "rotate(180deg)");
    lLine.css("-webkit-transform", "rotate(180deg)");
    lLine.addClass("sizelineY");
    pNode.append(lLine);

    // 右边线
    var rLineID = id + "_rLine";
    rLine = $("<div>");
    rLine.attr("id", rLineID).css("display", "none");
    rLine.addClass("sizelineY");
    pNode.append(rLine);

    // 上边线
    var tLineID = id + "_tLine";
    var tLine = $("#" + tLineID).css("display", "none");
    tLine = $("<div>");
    tLine.attr("id", tLineID);
    tLine.addClass("sizelineX").css("display", "none");
    pNode.append(tLine);

    // 下边线
    var bLineID = id + "_bLine";
    bLine = $("<div>");
    bLine.attr("id", bLineID).css("display", "none");
    bLine.css("transform", "rotate(180deg)");
    bLine.css("-o-transform", "rotate(180deg)");
    bLine.css("-moz-transform", "rotate(180deg)");
    bLine.css("-ms-transform", "rotate(180deg)");
    bLine.css("-webkit-transform", "rotate(180deg)");
    bLine.addClass("sizelineX");
    pNode.append(bLine);
};
// 显示四周虚线 id:虚线附属元素id  zIndex:虚线层级  top:虚线围绕区域top  left:虚线围绕区域left  width:虚线围绕区域宽度  height:虚线围绕区域高度
$.ibo.formEditor.showSelectedLine = function (id, zIndex, top, left, width, height) {
    zIndex = parseInt(zIndex);
    top = parseInt(top);
    left = parseInt(left);
    width = parseInt(width);
    height = parseInt(height);
    // 左边线
    $("#" + id + "_lLine").css({
        left: left + "px",
        top: top + "px",
        height: height + "px",
        display: "block",
        "z-index": zIndex + 1
    });

    // 右边线
    $("#" + id + "_rLine").css({
        left: (left + width - 1) + "px",
        top: top + "px",
        height: height + "px",
        display: "block",
        "z-index": zIndex + 1
    });

    // 上边线
    $("#" + id + "_tLine").css({
        left: left + "px",
        top: top + "px",
        width: width + "px",
        display: "block",
        "z-index": zIndex + 1
    });

    // 下边线
    $("#" + id + "_bLine").css({
        left: left + "px",
        top: (top + height - 1) + "px",
        width: width + "px",
        display: "block",
        "z-index": zIndex + 1
    });
};
// 隐藏四周虚线 id:虚线附属元素id
$.ibo.formEditor.hideSelectedLine = function (id) {
    // 左边线
    $("#" + id + "_lLine").css({ display: "none" });
    // 右边线
    $("#" + id + "_rLine").css({ display: "none" });
    // 上边线
    $("#" + id + "_tLine").css({ display: "none" });
    // 下边线
    var bLineID = id + "";
    $("#" + id + "_bLine").css({ display: "none" });
};
// 隐藏四周虚线 id:虚线附属元素id
$.ibo.formEditor.deleteSelectedLine = function (id) {
    // 左边线
    $("#" + id + "_lLine").remove();
    // 右边线
    $("#" + id + "_rLine").remove();
    // 上边线
    $("#" + id + "_tLine").remove();
    // 下边线
    var bLineID = id + "";
    $("#" + id + "_bLine").remove();
};
// 生成随机数
$.ibo.formEditor.getRandomNum = function () {
    var str = Math.round(Math.random() * 1000000000);
    while (str.length < 10) {
        str = "0" + str;
    }
    return str;
};


// 页面
$.ibo.formEditor.View = function (formEditor) {

    // 页面所属编辑器
    this.formEditor = formEditor;

    this.ViewLogo = "";

    // 页面编号
    this.ViewID = 0;

    //页面生成方式    1：根据数据表生成控件    2：根据控件生成数据表
    this.GenerateType = 1;

    // 页面类型 1：普通视图  2：表单视图
    this.ViewType = 2;

    // 尺寸类型 1：PC  2：Mobile
    this.SizeType = 2;

    // 数据源物理表名
    this.TbName = "";

    // 数据源表中文说明
    this.TbNameRmk = "";

    // 数据源字段信息列表
    this.TbColumnList = [];

    // 页面名称
    this.ViewName = "新建页面";

    // 页面种类 1：普通页面  2：从表页面  3：明细页面  4：数据选择页面
    this.ViewSort = "1";

    // 是否流程页面
    this.IsFlow = false;

    // 页面Htmlid
    this.id = "view" + $.ibo.formEditor.getRandomNum();

    // 页面高度 与父容器高度的百分比
    this.height = 100;

    // 页面行高
    this.LineHeight = $.ibo.formEditor.minLineHeight;

    // 页面行间距
    this.LineDistance = $.ibo.formEditor.minLineDistance;

    // 页面背景
    this.background = "#ffffff";

    // 所属案例的AppID
    this.AppID = 0;




    // 子表数据源物理表列信息数组
    this.subTbColumnListArr = [];

    // 树形控件叶节点数据源物理表列信息数组
    this.subTbColumnListArr2 = [];

    // 审批页面绑定流程信息
    this.FlowModelInfoList = [];


    // 页面对应html元素
    this.htmlObj = $("<div>");
    this.htmlObj.attr("id", this.id);

    // 设置html元素的尺寸
    this.htmlObj.css({
        "height": formEditor.height + "px",
        "overflow": "visible",
        top: "0px",
        left: "7px"
    });
    $.ibo.setUnSelectText(this.htmlObj[0]);

    // 设置页面类型
    this.setViewType = function (t) {
        this.ViewType = t;
    };

    // 设置页面背景 bg:颜色值#000000 或者 图片路径url('')
    this.setBackground = function (bg) {
        if (!bg) return;
        this.background = bg;
        // 颜色
        if (this.background[0] == "#") {
            this.htmlObj.css({ "background-image": "" });
            this.htmlObj.css({ "background-color": this.background });
        }
        else {
            this.htmlObj.css({ "background-color": "" });
            this.htmlObj.css({ "background-image": bg, "background-size": "100% 100%", "background-repeat": "no-repeat" });
        }
    };

    // 创建第一页边界线
    this.createsizeline = function () {

        var LineHeight = this.LineHeight + this.LineDistance;
        var length = 0;

        var viewheight = this.SizeType == 1 ? $.ibo.formEditor.PCHeight : $.ibo.formEditor.MobileHeight;

        // 边界线绿色横线
        var div = $("<div>")
        div.css({
            display: "block",
            height: "0",
            "font-size": 0,
            width: "100%",
            position: "absolute",
            left: "6px",
            "border-top-style": "dashed",
            "border-top-width": "1px",
            "border-top-color": "#00AAAA",
            top: viewheight + "px",
            "z-index": 100
        });
        div.addClass("viewpageline");
        this.formEditor.container.append(div);

        // 边界线绿色Page1字样
        div = $("<div>");
        div.css({
            "text-align": "center",
            "display": "block",
            "height": "19px",
            "line-height": "19px",
            "width": "100%",
            "position": "absolute",
            "color": "#00AAAA",
            "left": (this.formEditor.width / 2 - 24) + "px",
            "top": (viewheight - 9) + "px",
            "z-index": 100
        });
        div.addClass("viewpageline");
        div.text("Page1");
        this.formEditor.container.append(div);

    };

    // 设置页面行高 h:页面行高px值
    this.setLineHeight = function (h) {
        h = parseInt(h);
        if (isNaN(h) || h < $.ibo.formEditor.minLineHeight) h = $.ibo.formEditor.minLineHeight;
        this.LineHeight = h;
        // 重新生成刻度线
        this.createsizeline();
        return h;
    };

    // 设置页面行间距 h:页面行间距px值
    this.setLineDistance = function (h) {
        h = parseInt(h);
        if (isNaN(h) || h < $.ibo.formEditor.minLineDistance) h = $.ibo.formEditor.minLineDistance;
        this.LineDistance = h;
        return h;
    };

    // 计算行高px值  row：行数
    this.CountLineHeight = function (row) {
        // 行高为 (行间距+行高)*行数 - 行间距      每个控件保持与上方距离一个行间距  下方行间距从下方控件高度中扣除  所以要减去一个行间距
        return (this.LineHeight + this.LineDistance) * row - this.LineDistance;
    };

};


/*
    表单控件基类$.ibo.formEditor.View
    构造参数
    formEditor  // 控件所属表单编辑器
    para:{
        HtmlID: "",  // 控件html id
        ControlType: "",  // 控件类别
        cssList: {},  // 控件样式集合
        attrList: {},  // 控件属性集合
        refList:{},  // 关联控件信息
        dataSource:{},  // 数据源信息
    }
*/
$.ibo.formEditor.control = function (formEditor, para) {

    var ctrlObj = this;

    if (!para) para = {};
    if (!para.attrList) para.attrList = {};
    if (!para.cssList) para.cssList = {};

    // 所属表单编辑器
    this.formEditor = formEditor;
    // 控件HtmlID
    this.HtmlID = (para && para.HtmlID) ? para.HtmlID : "ctrl" + $.ibo.formEditor.getRandomNum();
    // 控件类别
    this.ControlType = (para && para.ControlType) ? para.ControlType : "div";
    // 控件名称
    this.name = (para && para.ControlName) ? para.ControlName : "";



    // 添加显示属性方法
    this.AddShowPrototypeFn = function (fn) {
        this.showPrototypeArr.push(fn);
    };
    // 显示属性执行数组
    this.showPrototypeArr = [];
    // 显示高、宽属性
    this.showSizePrototype = function () {
        var sizeInfo = this.Size();
        // 设置宽度txt值
        $.ibo.formEditor.control.WidthSlt.val(this.setWidthPxToPer(sizeInfo.width));
        // 高度不显示px值   显示行倍数
        var height_v = parseInt((sizeInfo.height + this.formEditor.View.LineDistance) / (this.formEditor.View.LineHeight + this.formEditor.View.LineDistance));
        // 设置高度txt值
        $.ibo.formEditor.control.HeightTxt.val(height_v);
        // 显示高、宽属性
        $.ibo.formEditor.control.SizeLi.show();

    };
    // 显示打印属性
    this.showIsPrintPrototype = function () {
        // 设置是否打印checkbox
        $.ibo.formEditor.control.IsPrint.prop("checked", this.attrList["IsPrint"] == "true");
        // 显示是否打印Li
        $.ibo.formEditor.control.IsPrint_Li.show();
    };
    // 显示对齐方式属性
    this.showAlignPrototype = function () {

        // 设置"对齐方式"下拉框
        $.ibo.formEditor.control.Align_Slt.val(this.attrList["Align"]);

        // 显示"对齐方式"设置Li
        $.ibo.formEditor.control.Align_Li.show();
    };
    // 默认显示属性执行方法
    this.defaultShowPrototype = function () {

        // 显示属性面板
        $("#spProperties").click();

        // 隐藏所有控件属性相关div
        this.formEditor.hideControlProp();

        // 显示属性主面板
        $("#" + this.formEditor.PropertiesDivID).show();

        // 右侧控件类别div显示当前选中div
        $.ibo.showselectmenu(this.ControlType);

        // 显示高、宽属性
        this.showSizePrototype();
        // 显示是否打印属性
        this.showIsPrintPrototype();
        // 显示对齐方式属性
        this.showAlignPrototype();
    };
    // 显示属性
    this.showPrototype = function () {
        this.defaultShowPrototype();
        // 遍历数组  依次执行方法
        var length = this.showPrototypeArr.length;
        for (var i = 0; i < length; i++) {
            var fn = this.showPrototypeArr[i];
            if (typeof fn == "function") { fn.call(this); }
        }
    };



    // 添加移除方法
    this.AddRemoveFn = function (fn) {
        this.removeFnArr.push(fn);
    };
    // 移除方法执行数组
    this.removeFnArr = [];
    // 默认移除方法
    this.defaultRemoveFn = function () {
        // 从当前编辑器的选中控件集中移除
        if (this.formEditor.sltControls.contain(this)) this.formEditor.sltControls.remove(this);
        // 从当前编辑器的控件集中移除
        if (this.formEditor.controls.contain(this)) this.formEditor.controls.remove(this);

        var top, height, ctrlObj, ParentID;
        // 获取当前控件的位置和高度
        top = this.Position().top;
        height = this.Size().height;
        // 当前控件的父控件HTMLID
        ParentID = this.attrList["ParentID"];

        // 移除位置div
        this.htmlObj_Position.remove();
        //// 移除尺寸div
        //this.htmlObj_Size.remove();
        // 移除表层覆盖div
        this.divObj.remove();
        //// 移除控件
        //this.htmlObj.remove();
        // 移除边框
        this.deleteSelectedLine();

        // 当前控件的父控件
        var parentObj = null;

        // 遍历剩余控件
        var length = this.formEditor.controls.length;
        for (var i = 0; i < length; i++) {
            ctrlObj = this.formEditor.controls[i];
            var tmpTop = ctrlObj.Position().top;;
            var tmpParentID = ctrlObj.attrList["ParentID"];
            // 所有与控件ParentID相等且位于控件下方的控件需要上移填补空白
            if (tmpParentID == ParentID && tmpTop > top) {
                ctrlObj.Position({ "t": (tmpTop - height - this.formEditor.View.LineDistance) + "px" });
            }
            // 查找父控件
            if (ParentID == ctrlObj.HtmlID) parentObj = ctrlObj;
        }

        // 存在父控件  为子控件  删除子控件需要修正父控件高度
        if ($.trim(ParentID).length > 0 && parentObj) {
            parentObj.setHeight();
        }
    };
    // 移除控件
    this.remove = function () {
        // 执行默认删除
        this.defaultRemoveFn();
        // 遍历数组  依次执行方法
        var length = this.removeFnArr.length;
        for (var i = 0; i < length; i++) {
            var fn = this.removeFnArr[i];
            if (typeof fn == "function") { fn.call(this); }
        }
    };



    // 设置宽度px为百分比
    this.setWidthPxToPer = function (px) {
        var per = 0;
        per = parseInt(px / this.formEditor.width * 100);
        return per;
    };
    // 设置宽度百分比为px
    this.setWidthPerToPx = function (per) {
        var px = 0;
        px = this.formEditor.width * per / 100;
        return px;
    };

    // 设置高度、宽度
    // para.h：高度，不设置传false、null、undefined
    // para.w：宽度，不设置传false、null、undefined
    this.Size = function (para) {
        // 判断是否设置高度
        if (para && para.h) {
            // 记录高度值到样式集合
            this.css({ "height": para.h });
            // 设置html对象高度
            this.htmlObj_Size.css({ "height": para.h });
            // 设置表面覆盖div高度
            this.divObj.css({ "height": para.h });
        }

        // 判断是否设置宽度
        if (para && para.w) {
            // 记录宽度值到样式集合
            this.css({ "width": para.w });

            // 设置html对象宽度
            this.htmlObj_Size.css({ "width": para.w });
        }

        var h = parseInt(this.cssList["height"].replace("px", ""));
        var w = parseInt(this.cssList["width"].replace("px", ""));

        return { "width": w, "height": h };
    };
    // 设置默认宽高 w:宽度(0-100的数值 页面宽度百分比)   h:高度(数字 行数)
    this.setDefaultSize = function (para, w, h) {
        // 若传递参数没有设置宽高  则设置默认宽高
        var cssList = para && para.cssList ? para.cssList : false;
        if (!cssList || !cssList["height"] || !cssList["width"]) {
            var h, w;
            // 默认高度为h行
            if (!cssList || !cssList["height"]) h = formEditor.View.CountLineHeight(h) + "px";
            // 默认宽度为页面宽度
            if (!cssList || !cssList["width"]) {

                w = this.setWidthPerToPx(w) + "px";
            }
        }
        else {
            w = cssList["width"];
            h = cssList["height"];
        }

        this.Size({ "h": h, "w": w });
    };


    // 设置悬浮层级
    this.ZIndex = function (zindex) {
        if (zindex) {
            // 记录左侧坐标值到样式集合
            this.css({ "z-index": zindex });
            // 设置html对象的悬浮层级
            this.htmlObj_Position.css({ "z-index": zindex });
            // 设置表名覆盖div的悬浮层级比html对象+1
            this.divObj.css({ "z-index": zindex + 1 });
        }

        zindex = parseInt(this.cssList["z-index"]);
        return zindex;
    };


    // 样式集合 控件基础样式
    this.cssList = {
        height: "0px", // 高度
        width: "0px", // 宽度
        top: "0px", // 顶部坐标
        left: "0px", // 左测坐标
        //position: "absolute"
        //background: "transparent", // 背景色
        //color: "#000000", // 文字颜色
        //"font-size": "14px", // 字体大小
        //"font-weight": "normal", // 字体粗细 normal普通 bold加粗
        //"font-style": "normal", // 字体倾斜 normal正常 italic倾斜
        //"text-decoration": "normal", // 字体下划线 none正常 underline下划线
        //"line-height": "30px", // 行高
        //"text-align": "left", // 文本对齐方式 left左对齐 center居中 right右对齐
        //left: "0px", // 左边界
        //top: "0px", //上边界
        //opacity: 1, // 不透明度
        //overflow: "hidden"
    };
    // 设置控件样式
    this.css = function (css) {
        // 更新cssList
        for (var c in css) {
            if (this.cssList.hasOwnProperty(c)) this.cssList[c] = css[c];
        }
    };
    // 设置参数传递css样式
    this.css(this.cssList);
    if (para && para.cssList) {
        this.css(para.cssList);
    }


    // 其他属性集合 { "属性名":"属性值" }
    this.attrList = {
        // 父容器HTMLID
        ParentID: "",
        // 是否打印   "true"  "false"
        IsPrint: "false",
        // 对其方式   "left":左对齐  "right":右对齐   "center":居中
        Align: "left"
    };
    // 设置控件属性
    this.attr = function (attr) {
        // 更新attrList
        for (var a in attr) {
            if (this.attrList.hasOwnProperty(a)) this.attrList[a] = attr[a];
        }
    };
    if (para && para.attrList) {
        this.attr(para.attrList);
    }



    // html控件
    this.htmlObj = this.createHtmlObject().css({ "width": "100%", "height": "100%", "background-color": "#ffffff" });
    // html控件外部包容div  用于显示高宽
    this.htmlObj_Size = $("<div>").css({ "display": "inline-block" });

    // ParentID不为空  子控件 尺寸div左右留间距2%  处理子控件与面板边框重叠问题
    if ($.trim(this.attrList["ParentID"]).length > 0) {
        this.htmlObj_Size.css({ "box-sizing": "border-box", "padding-left": "2%", "padding-right": "2%" });
    }

    this.htmlObj_Size.append(this.htmlObj);
    // html控件外部包容div 用于显示纵向位置
    this.htmlObj_Position = $("<div>").css({ "position": "absolute", "text-align": this.attrList["Align"], "width": "100%" });
    this.htmlObj_Position.append(this.htmlObj_Size);
    // 控件表面覆盖div 用于解决部分控件无法被拖拽问题
    this.divObj = $("<div>");
    this.divObj.attr("id", this.HtmlID + "_div");
    this.divObj.css({
        "position": "absolute",
        "width": "100%",
        "cursor": "pointer",
        "background-color": "transparent",
        "outline": "none",
        "overflow": "visible"
    });
    this.divObj.addClass("ctrl");
    // 控件父容器
    this.container;
    // 判断是否为子控件  子控件添加到父容器中
    if (para && para.attrList && $.trim(para.attrList["ParentID"])) {
        var fn = function () {
            var pObj = $("#" + para.attrList["ParentID"] + "_div");
            if (pObj.length == 0) {
                window.setTimeout(fn, 100);
            }
            else {
                pObj.append(ctrlObj.htmlObj_Position);
                pObj.append(ctrlObj.divObj);
                // 创建选中示意四周动态边框
                $.ibo.formEditor.createSelectedLine(ctrlObj.HtmlID, pObj);
            }
            ctrlObj.container = pObj;
        };
        fn();
    }
        // 不是子控件 添加到页面里
    else {
        this.formEditor.View.htmlObj.append(this.htmlObj_Position);
        this.formEditor.View.htmlObj.append(this.divObj);
        // 创建选中示意四周动态边框
        $.ibo.formEditor.createSelectedLine(this.HtmlID, formEditor.View.htmlObj);
    }

    // 设置表层div鼠标按下事件
    this.divObj.on("mousedown", function (e) {
        // 鼠标左键按下
        if (e.which == 1) {
            // 2016-01-12 无法多选
            formEditor.rightMenu.hide();
            // 其它控件设置为未选中
            formEditor.unSelect();
            // 选中当前控件
            ctrlObj.select();
            // 设置边框和拉伸点
            formEditor.showPrototype();
            formEditor.rightMenu.hide();
        }
            // 鼠标右键按下
        else if (e.which == 3) {
            // 其它控件设置为未选中
            formEditor.unSelect();
            // 选中当前控件
            ctrlObj.select();
            // 设置边框和拉伸点
            formEditor.showPrototype();
            // 显示右键菜单
            var mTop = e.pageY;
            var mLeft = e.pageX;
            formEditor.rightMenu.css({ top: (mTop - 3) + "px", left: (mLeft - 3) + "px", display: "block" });
        }
        e.preventDefault();
        e.stopPropagation();
    });
    this.divObj.attr("tabindex", 0);
    // 绑定快捷键删除
    this.divObj.on("keydown", function (e) {
        // 46：Delete键  8：←退格键
        if (e.keyCode == 46 || e.keyCode == 8) {
            formEditor.deleteCtrl();
        }
    });
    // 设置拖拽
    this.divObj.draggable({
        helper: function () {
            var div;
            div = $("<div>");
            div.css({ "height": ctrlObj.cssList["height"], "width": ctrlObj.cssList["width"], "background": "#ffffff", "overflow": "visible", "z-index": 10000 });
            div.append(ctrlObj.htmlObj_Position.clone().css({ "top": "0px", "left": "0px" }));
            // 若当前控件是面板控件  则覆盖div也要复制
            if (ctrlObj.ControlType == "panel") {
                div.append(ctrlObj.divObj.clone().css({ "top": "0px", "left": "0px" }));
            }
            div.append($("#" + ctrlObj.HtmlID + "_lLine").clone().css({ "left": "-4px", "top": "-4px" }));
            div.append($("#" + ctrlObj.HtmlID + "_rLine").clone().css({ "left": (parseInt(ctrlObj.cssList["width"].replace("px", "")) + 4) + "px", "top": "-4px" }));
            div.append($("#" + ctrlObj.HtmlID + "_tLine").clone().css({ "left": "-4px", "top": "-4px" }));
            div.append($("#" + ctrlObj.HtmlID + "_bLine").clone().css({ "left": "-4px", "top": (parseInt(ctrlObj.cssList["height"].replace("px", "")) + 4) + "px" }));
            return div;
        },
        // 只能在页面容器中拖拽
        containment: ctrlObj.container,
        axis: "y",
        // 拖拽开始时
        start: function (e, ui) {
            formEditor.dragStart(e, ui);
        },
        // 拖拽中
        drag: function (e, ui) {
            formEditor.drag(e, ui);
        },
        stop: function (e, ui) {
            formEditor.dragStop(e, ui);
        }
    });



    // 设置位置
    // para.l：左侧坐标，不设置传false、null、undefined
    // para.t：顶部坐标，不设置传false、null、undefined
    this.Position = function (para) {
        // 判断是否设置左侧坐标
        if (para && para.l) {
            // 记录左侧坐标值到样式集合
            this.css({ "left": para.l });
            // 设置html对象左侧坐标
            this.htmlObj_Position.css({ "left": para.l });
            // 设置表面覆盖div左侧坐标
            this.divObj.css({ "left": para.l });
        }

        // 判断是否设置顶部坐标
        if (para && para.t) {
            // 记录顶部坐标值到样式集合
            this.css({ "top": para.t });
            // 设置html对象顶部坐标
            this.htmlObj_Position.css({ "top": para.t });
            // 设置表面覆盖div顶部坐标
            this.divObj.css({ "top": para.t });
        }

        var l = parseInt(this.cssList["left"].replace("px", ""));
        var t = parseInt(this.cssList["top"].replace("px", ""));

        return { "left": l, "top": t };
    };
    this.Position({ "t": this.cssList["top"] });



    // 显示当前控件
    this.show = function () {
        this.htmlObj_Position.show();
        this.divObj.show();
    };
    // 隐藏当前控件
    this.hide = function () {
        this.htmlObj_Position.hide();
        this.divObj.hide();
    };



    // 设置控件对其方式
    this.setAligin = function (algin) {
        if (typeof algin != "undefined") {
            this.attrList["Align"] = algin;
        }
        this.htmlObj_Position.css({ "text-align": this.attrList["Align"] });
    };



    // 设置其他控件纵向偏移  line:行数
    this.setOtherControlPosition = function (line) {

        var offset = (this.formEditor.View.LineDistance + this.formEditor.View.LineHeight) * line;
        // 获取本身的top
        var top = this.Position().top;
        // 遍历所有控件
        var length = this.formEditor.controls.length;
        for (var i = 0; i < length; i++) {
            var ctrl = this.formEditor.controls[i];
            // 排除控件自己   且只影响与自己同级的控件
            if (ctrl.HtmlID != this.HtmlID && ctrl.attrList["ParentID"] == this.attrList["ParentID"]) {
                var tmpTop = ctrl.Position().top;
                // 所有位于当前控件下方的控件位移
                if (tmpTop >= top) {
                    ctrl.Position({ "t": tmpTop + offset + "px" });
                }
            }
        }
    };




    // 设置悬浮层级
    this.ZIndex(this.formEditor.getZIndex());


    // 设置控件被选中
    this.select = function () {
        // 显示选中示意边框
        this.showSelectedLine();
        // 添加到选中控件队列中
        if (!this.formEditor.sltControls.contain(this)) this.formEditor.sltControls.push(this);
        this.divObj.focus();
        this.divObj.css({ "cursor": "move" });

        if (this.resizable) this.divObj.resizable("enable");
    };
    // 设置控件未选中
    this.unSelect = function () {
        // 隐藏选中示意边框
        this.hideSelectedLine();
        // 从选中控件队列中移除
        if (this.formEditor.sltControls.contain(this)) this.formEditor.sltControls.remove(this);
        // 隐藏单个控件拉伸点
        if (this.resizable) this.divObj.resizable("disable");
        this.divObj.css({ "cursor": "pointer" });

        if (this.events && this.events["unSelect"] && typeof this.events["unSelect"] == "function") {
            this.events["unSelect"](null, this);
        }
    };


    // 设置控件被唯一选中
    this.selectOnly = function () {
        this.formEditor.unSelect();
        this.select();
        this.formEditor.showPrototype();
    };


    // 显示选中示意四周动态边框
    this.showSelectedLine = function () {

        var position = this.Position();
        var left = position.left - 4;
        var top = position.top - 4;

        var size = this.Size();
        var width = this.formEditor.width + 8;
        var height = size.height + 8;
        var zIndex = this.ZIndex();

        $.ibo.formEditor.showSelectedLine(this.HtmlID, zIndex, top, left, width, height);
    };
    this.deleteSelectedLine = function () {
        $.ibo.formEditor.deleteSelectedLine(this.HtmlID);
    };

    // 隐藏选中示意四周动态边框
    this.hideSelectedLine = function () {
        $.ibo.formEditor.hideSelectedLine(this.HtmlID);
    };
    this.deleteSelectedLine = function () {
        $.ibo.formEditor.deleteSelectedLine(this.HtmlID);
    };

    // 添加覆盖div自定义事件
    if (this.events) {
        var events = this.events;
        for (var i in events) {
            if (i != "unSelect") {
                this.divObj.on(i, function () { var f = events[i]; var c = ctrlObj; return function (e) { f(e, c); }; }());
            }
        }
    }

    // 添加html元素自定义事件
    if (this.objEvents) {
        var objEvents = this.objEvents;
        for (var i in objEvents) {
            this.htmlObj.on(i, function () { var f = objEvents[i]; var c = ctrlObj; return function (e) { f(e, c); }; }());
        }
    }


    // 控件验证方法数组
    this.DoValidArr = [];
    // 添加控件验证事件
    this.AddDoValidFn = function (fn) {
        this.DoValidArr.push(fn);
    };
    // 验证控件  默认无需验证
    this.DoValid = function () {
        var res = true;
        var length = this.DoValidArr.length;
        for (var i = 0; i < length; i++) {
            var fn = this.DoValidArr[i];
            res = fn.call(this);
            // 有一项验证不通过则停止
            if (!res) break;
        }
        // 若验证不通过   则选择当前不通过控件
        if (!res) this.selectOnly()
        return res;
    };

};
// 控件初始化
$.ibo.formEditor.control.Init = function () {

    // 控件宽度、高度属性LI
    $.ibo.formEditor.control.SizeLi = $("#Property_Size_Li");
    // "宽度"下拉框
    $.ibo.formEditor.control.WidthSlt = $("#Property_Size_Width_Slt");
    // "高度"文本框
    $.ibo.formEditor.control.HeightTxt = $("#Property_Size_Height_Txt");
    // "是否打印"设置Li
    $.ibo.formEditor.control.IsPrint_Li = $("#Property_IsPrint_Li");
    // "是否打印"checkbox
    $.ibo.formEditor.control.IsPrint = $("#Property_IsPrint_Chk");
    // "对齐方式"设置Li
    $.ibo.formEditor.control.Align_Li = $("#Property_Align_Li");
    // "对齐方式"下拉框
    $.ibo.formEditor.control.Align_Slt = $("#Property_Align_Slt");



    // 绑定"宽度"文本框更改内容同时更改选中控件属性
    $.ibo.formEditor.control.WidthSlt.on("input propertychange", function () {

        // 当前选中控件
        var ctrlObj = $.ibo.formEditor.Instance.sltControls[0];
        // 获取当前输入值 转化为数字
        var w = parseInt($(this).val());

        // 若宽度为50%设置"对齐方式"才有意义  否则不允许设置
        if (w == 100) {
            $.ibo.formEditor.control.Align_Slt.prop("disabled", true);
        }
        else {
            $.ibo.formEditor.control.Align_Slt.prop("disabled", false);
        }
        w = ctrlObj.setWidthPerToPx(w);
        // 设置控件宽度
        ctrlObj.Size({ "w": w + "px" });
        // 重新描绘边框
        ctrlObj.showSelectedLine();
    });


    // 设置"高度"文本框只可输入数字
    $.ibo.setNumOnly($.ibo.formEditor.control.HeightTxt);
    // 绑定"高度"文本框更改内容同时更改选中控件属性
    $.ibo.formEditor.control.HeightTxt.on("input propertychange", function () {

        // 当前选中控件
        var ctrlObj = $.ibo.formEditor.Instance.sltControls[0];
        // 获取当前输入值 转化为数字
        var h = parseInt($(this).val());

        var minH;
        // 有标题最低高度2行
        if (ctrlObj.attrList["hasTitle"] == "true") {
            minH = 2;
        }
            // 无标题最低高度1行
        else {
            minH = 1;
        }

        // 当前输入值不为数字或者小于最小值设为最小值
        if (isNaN(h) || h < minH) { h = minH; }


        var height = ctrlObj.Size().height;
        var newHeight = $.ibo.formEditor.Instance.View.CountLineHeight(h)

        // 设置控件高度
        ctrlObj.Size({ "h": newHeight + "px" });

        // 设置下方控件纵向偏移
        var line = (newHeight - height) / ($.ibo.formEditor.Instance.View.LineHeight + $.ibo.formEditor.Instance.View.LineDistance);
        ctrlObj.setOtherControlPosition(line);

        // 设置页面滚动条
        $.ibo.formEditor.Instance.setViewScroll();

        // 重新描绘边框
        ctrlObj.showSelectedLine();
    });
    // 设置"高度"文本框输入最小值
    $.ibo.formEditor.control.HeightTxt.on("blur", function () {

        // 当前选中控件
        var ctrlObj = $.ibo.formEditor.Instance.sltControls[0];
        // 获取当前输入值 转化为数字
        var h = parseInt($(this).val());
        // 有标题最低高度2行
        if (ctrlObj.attrList["hasTitle"] == "true") {
            minH = 2;
        }
            // 无标题最低高度1行
        else {
            minH = 1;
        }
        // 当前输入值不为数字或者小于最小值设为最小值
        if (isNaN(h) || h < minH) $(this).val(minH);
    });


    // 绑定"对齐方式"下拉框
    $.ibo.formEditor.control.Align_Slt.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.setAligin($(this).val());
    });

    // 绑定"是否打印"点击事件
    $.ibo.formEditor.control.IsPrint.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        if ($(this).prop("checked"))
            ctrl.attrList["IsPrint"] = "true";
        else
            ctrl.attrList["IsPrint"] = "false";
    });

};
