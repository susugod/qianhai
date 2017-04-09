// 初始化页面设计相关html元素
$(document).ready(function () {

    // 页面属性名根据数据库配置动态显示
    $.ibo.formEditor.SetControlAttrName();

    // 控件基础信息初始化
    $.ibo.formEditor.control.Init();

    // 初始化动画接口
    $.ibo.formEditor.IAnimate.Init();

    // 标题接口初始化
    $.ibo.formEditor.ITitle.Init();

    // 事件接口初始化
    $.ibo.formEditor.IEvent.Init();

    // 录入控件接口初始化
    $.ibo.formEditor.IInput.Init();

    // 提示文字接口初始化
    $.ibo.formEditor.ITips.Init();

    // 提示文字接口初始化
    $.ibo.formEditor.INumber.Init();

    // 边框接口初始化
    $.ibo.formEditor.IBorder.Init();

    // 设置数据源接口初始化
    $.ibo.formEditor.IDataSource.Init();

    // 设置树形控件数据源接口初始化
    $.ibo.formEditor.IDataSourceTV.Init();

    // 选择图片接口初始化
    $.ibo.formEditor.IImage.Init();

    // 图表初始化
    $.ibo.formEditor.charts.Init();

    // 下拉框初始化
    $.ibo.formEditor.select.Init();

    // 初始化小数输入框
    $.ibo.formEditor.decimal.Init();

    // 日期初始化
    $.ibo.formEditor.date.Init();

    // 单选多选框属性接口初始化
    $.ibo.formEditor.ICheckedGroup.Init();

    // 按钮初始化
    $.ibo.formEditor.button.Init();

    // 文本标签初始化
    $.ibo.formEditor.article.Init();

    // 地址初始化
    $.ibo.formEditor.address.Init();

    // 初始化时间
    $.ibo.formEditor.time.Init();

    // 部门初始化
    $.ibo.formEditor.depart.Init();

    // 人员初始化
    $.ibo.formEditor.employeename.Init();

    // 搜索初始化
    $.ibo.formEditor.search.Init();

    //表格初始化
    $.ibo.formEditor.table.Init();

    //树形控件初始化
    $.ibo.formEditor.treeview.Init();

    // 工具栏初始化
    $.ibo.formEditor.tools.Init();
});



// 设置控件属性名称
$.ibo.formEditor.SetControlAttrName = function () {
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "WF_FormView_GetControlAttrRmk",
        data: "",
        success: function (obj) {
            if (obj.ResFlag == $.ibo.ResFlag.Success) {
                // 字符串转换为对象
                obj = $.parseJSON(obj.ResObj);
                $.each(obj, function (i, n) {
                    $("#AttrName" + n.ID).text(n.Rmk_Cn);
                });
            }
            else {
                $.ibo.ShowErrorMsg(obj);
            }
        }
    });
};


// 设置数据源绑定字段（treeview控件）,selObj表示下拉列表，FieldList表示字段列表，selField表示选中的字段val
$.ibo.formEditor.SetBindField = function (selObj, FieldList, selField) {
    // 先清空下拉列表
    selObj.find("option").remove();
    // 再填充下拉列表
    if (FieldList.length > 0) {
        $.each(FieldList, function (i, n) {
            selObj.append("<option value='" + n.FieldID + "' fieldname='" + n.FieldName + "'>" + n.Rmk + "</option>");
        });

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        if (ctrl) {
            if ("Property_TVFieldID_Slt1" == selObj.attr("id")) {
                ctrl.attrList["DataSource_FieldID"] = selObj.find("option:first").val();
                ctrl.attrList["DataSource_FieldName1"] = selObj.find("option:first").attr("fieldname");
            }
            else if ("Property_TVFieldID_Slt2" == selObj.attr("id")) {
                ctrl.attrList["DataSource_FieldID2"] = selObj.find("option:first").val();
                ctrl.attrList["DataSource_FieldName2"] = selObj.find("option:first").attr("fieldname");
            }
        }

        // 最后再设置下拉列表选中的项
        if (selField && selField != "") {
            selObj.val(selField);
        }
    }
};

// 根据控件类别创建控件 initCtlPara:初始化控件参数
$.ibo.formEditor.createControls = function (formEditor, initCtlPara) {
    // 控件类别
    var ControlType = (initCtlPara && initCtlPara.ControlType) ? initCtlPara.ControlType : "div";

    // 动态创建控件类实例
    var ctrl=null;
    if (ControlType != "div") {
        ctrl = eval("new $.ibo.formEditor." + ControlType + "(formEditor, initCtlPara)");
    }
    if (ctrl==null||ctrl.htmlObj == null) ctrl = null;

    return ctrl;
};



/******************************  各类控件接口 ******************************/


// 动画接口
$.ibo.formEditor.IAnimate = function (para) {

    // 动画样式名
    this.attrList["Animate_Name"] = typeof para.attrList["Animate_Name"] == "undefined" ? "" : para.attrList["Animate_Name"];
    // 动画延迟执行时间
    this.attrList["Animate_DelayTime"] = typeof para.attrList["Animate_DelayTime"] == "undefined" ? "0" : para.attrList["Animate_DelayTime"];
    // 动画执行持续时间
    this.attrList["Animate_Time"] = typeof para.attrList["Animate_Time"] == "undefined" ? "0" : para.attrList["Animate_Time"];
    // 动画是否循环执行 "true"  "false"
    this.attrList["IsCycle"] = para.attrList["IsCycle"] == "true" ? "true" : "false";

    // 设置动画
    this.SetAnimate = function (Animate) {

        var Msg = "";

        switch (Animate) {
            case "":
                Msg = "无动画";
                break;
            case "slideLeft":
                Msg = "已选中从左飞入";
                break;
            case "slideSouth":
                Msg = "已选中从下飞入";
                break;
            case "slideRight":
                Msg = "已选中从右飞入";
                break;
            case "slideNorth":
                Msg = "已选中从上飞入";
                break;
            case "fadeOut":
                Msg = "已选中淡出";
                break;
            case "flicker":
                Msg = "已选中闪烁";
                break;
            case "smaller":
                Msg = "已选中从大到小";
                break;
            case "bigger":
                Msg = "已选中从小到大";
                break;
            case "shake":
                Msg = "已选中抖动";
                break;
            case "jump":
                Msg = "已选中跳动";
                break;
            case "rotate":
                Msg = "已选中旋转";
                break;
            case "rotate3D":
                Msg = "已选中旋转3D";
                break;
        }

        // 移除之前动画样式
        this.htmlObj.removeClass(this.attrList["Animate_Name"]);
        // 设置Animate值
        this.attrList["Animate_Name"] = Animate;
        // 设置html对象样式
        this.htmlObj.addClass(Animate);
        // 显示提示信息
        iboMousePositionAlert(Msg);
    };

    // 设置动画菜单样式
    this.SetAnimateMenu = function () {

        // 之前选中动画移除选中样式
        $("[data-Animate]").removeClass("active");
        $("[data-Animate='" + this.attrList["Animate_Name"] + "']").addClass("active");

    };

    // 添加属性显示方法  显示动画设置
    this.AddShowPrototypeFn(function () {

        // 显示动画选择tab页头
        $("#spAnimate").show();
        // 设置动画菜单样式
        this.SetAnimateMenu();

        // 设置动画执行时间输入框
        $.ibo.formEditor.IAnimate.Time_Txt.val(this.attrList["Animate_Time"]);

        // 设置动画延迟执行时间输入框
        $.ibo.formEditor.IAnimate.TimeDelay_Txt.val(this.attrList["Animate_DelayTime"]);

        // 设置动画延迟执行时间输入框
        $.ibo.formEditor.IAnimate.IsCycle_Chk.prop("checked", this.attrList["IsCycle"] == "true");

    });

};
// 初始化动画接口
$.ibo.formEditor.IAnimate.Init = function () {

    // 设置选中动画
    $.each($("[data-Animate]"), function (i, n) {
        $(n).on("click", function () {
            // 之前选中动画移除选中样式
            $("[data-Animate]").removeClass("active");
            // 当前动画添加选中样式
            $(this).addClass("active");
            // 设置控件属性
            var ctrl = $.ibo.formEditor.Instance.sltControls[0];
            if (ctrl.SetAnimate) ctrl.SetAnimate($(n).attr("data-Animate"));
        });
    });

    // 动画执行时间输入框
    $.ibo.formEditor.IAnimate.Time_Txt = $("#Property_Animate_Time_Txt");
    // 设置动画执行时间输入框只能输入数字
    $.ibo.setNumOnly($.ibo.formEditor.IAnimate.Time_Txt);
    // 设置动画执行时间录入设置属性
    $.ibo.formEditor.IAnimate.Time_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        var v = parseInt($(this).val());
        // 最小等于0
        if (isNaN(v) || v < 0) { v = 0; }
        ctrl.attrList["Animate_Time"] = v.toString();
    });
    $.ibo.formEditor.IAnimate.Time_Txt.on("blur", function () {
        var v = parseInt($(this).val());
        // 最小等于0
        if (isNaN(v) || v < 0) { $(this).val("0"); }
    });

    // 动画延迟执行时间输入框
    $.ibo.formEditor.IAnimate.TimeDelay_Txt = $("#Property_Animate_TimeDelay_Txt");
    // 设置动画延迟执行时间输入框只能输入数字
    $.ibo.setNumOnly($.ibo.formEditor.IAnimate.TimeDelay_Txt);
    // 设置动画延迟执行时间录入设置属性
    $.ibo.formEditor.IAnimate.TimeDelay_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        var v = parseInt($(this).val());
        // 最小等于0
        if (isNaN(v) || v < 0) { v = 0; }
        ctrl.attrList["Animate_DelayTime"] = v.toString();
    });
    $.ibo.formEditor.IAnimate.TimeDelay_Txt.on("blur", function () {
        var v = parseInt($(this).val());
        // 最小等于0
        if (isNaN(v) || v < 0) { $(this).val("0"); }
    });

    // 动画循环执行checkbox
    $.ibo.formEditor.IAnimate.IsCycle_Chk = $("#Property_Animate_IsCycle_Chk");
    // 设置动画循环执行checkbox设置属性
    $.ibo.formEditor.IAnimate.IsCycle_Chk.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["IsCycle"] = $(this).is(":checked") ? "true" : "false";
    });

};



// 标题接口   defalut：默认标题
$.ibo.formEditor.ITitle = function (para, defalut) {

    // 设置无传参默认标题值
    if (!defalut) defalut = "标题";

    // 设置标题默认值
    if (!para || typeof para.ControlName == "undefined") this.name = defalut;
    else this.name = para.ControlName;
    // 是否显示标题
    this.attrList["Title_HasTitle"] = para.attrList["Title_HasTitle"] == "false" ? "false" : "true";


    // 当前容器控件
    var pNode = this.htmlObj_Size;
    // 设置控件最小高度一行
    var minHeight = this.formEditor.View.CountLineHeight(1);
    // 有标题最小两行高度
    if (this.attrList["Title_HasTitle"] == "true") {
        minHeight = this.formEditor.View.CountLineHeight(2);
    }

    // 控件当前高度
    var height = this.Size().height;
    // 控件高度小于最小高度设为最小高度
    if (height < minHeight) {
        height = minHeight;
    }

    // 重新设置尺寸设置容器div高度
    this.htmlObj_Size.css({ "height": height + "px" });

    // 更改表层覆盖div高度
    this.divObj.css({ "height": height + "px" });

    // 记录高度值
    this.css({ "height": height + "px" });

    // 标题div
    var titleDiv = $("<div>");
    // 标题与控件的行间距放到标题上方去  为了使标题与控件更贴近  显示起来是一组控件
    titleDiv.css({
        "position": "relative",
        "margin-top": this.formEditor.View.LineDistance + "px",
        "height": this.formEditor.View.LineHeight + "px",
        "line-height": this.formEditor.View.LineHeight + "px",
        "width": "100%",
        "font-size": "14px",
        "font-weight": "bold",
        "white-space": "nowrap"
    });

    // 初始化判断是否有标题
    if (this.attrList["Title_HasTitle"] == "true") titleDiv.show();
    else titleDiv.hide();

    // 标题文本内容
    titleDiv.text(this.name);
    // 标题div插入到html对象之前
    this.htmlObj.before(titleDiv);

    // 保存当前标题div
    this.htmlObj_Title = titleDiv;

    // 重新描绘四周边框
    this.showSelectedLine();

    // 重写Size方法
    this.Size = function (para) {

        // 判断是否设置高度
        if (para && para.h) {
            // 设置控件最小高度一行
            var minHeight = this.formEditor.View.CountLineHeight(1);
            // 有标题最小两行高度
            if (this.attrList["Title_HasTitle"] == "true") {
                minHeight = this.formEditor.View.CountLineHeight(2);
            }

            var height = parseInt(para.h.replace("px"));
            // 控件高度小于最小高度设为最小高度
            if (height < minHeight) {
                height = minHeight;
            }

            // 有标题原html对象少占一行标题高度
            if (this.attrList["Title_HasTitle"] == "true") {
                this.htmlObj.css({
                    "height": (height - this.formEditor.View.LineDistance - this.formEditor.View.LineHeight) + "px"
                });
            }
            else {
                // 没有标题 原html对象占满整个高度
                this.htmlObj.css({
                    "height": height + "px"
                });
            }
            para.h = height + "px";

            // 记录高度值到样式集合
            this.css({ "height": para.h });
            // 设置容器div对象高度
            this.htmlObj_Size.css({ "height": para.h });
            // 设置表面覆盖div高度
            this.divObj.css({ "height": para.h });


        }

        // 判断是否设置宽度
        if (para && para.w) {
            // 记录宽度值到样式集合
            this.css({ "width": para.w });
            // 设置容器div对象宽度
            this.htmlObj_Size.css({ "width": para.w });
        }

        var h = parseInt(this.cssList["height"].replace("px", ""));
        var w = parseInt(this.cssList["width"].replace("px", ""));

        return { "width": w, "height": h };
    };


    // 设置当前控件是否有标题
    this.setHasTitle = function (flag) {
        var height = this.Size().height;
        // 有标题
        if (flag) {
            if (this.attrList["Title_HasTitle"] != "true") {
                this.attrList["Title_HasTitle"] = "true";
                // 显示标题
                this.htmlObj_Title.show();
                // 控件需要增加一行标题高度
                this.Size({ "h": height + this.formEditor.View.LineDistance + this.formEditor.View.LineHeight + "px" });
                this.setOtherControlPosition(1);
            }
        }
            // 无标题
        else {
            if (this.attrList["Title_HasTitle"] != "false") {
                this.attrList["Title_HasTitle"] = "false";
                // 隐藏标题
                this.htmlObj_Title.hide();
                // 控件需要减去一行标题高度
                this.Size({ "h": height - this.formEditor.View.LineDistance - this.formEditor.View.LineHeight + "px" });
                this.setOtherControlPosition(-1);
            }
        }
        this.showSelectedLine();
    };

    // 设置标题
    this.setTitle = function (title) {
        this.name = title;
        this.htmlObj_Title.text(title);
    };


    // 添加显示属性方法  显示标题相关属性设置
    this.AddShowPrototypeFn(function () {

        // 设置"标题"文本框
        $.ibo.formEditor.ITitle.Name_Txt.val(this.name);
        // 设置"是否显示"勾选框
        $.ibo.formEditor.ITitle.HasTitle_Chk.prop("checked", this.attrList["Title_HasTitle"] == "true");
        // 显示标题设置Li
        $.ibo.formEditor.ITitle.Name_Li.show();

    });


    // 添加移除方法  移除html对象的同时 移除容器div和标题div
    this.AddRemoveFn(function () {

        // 移除容器div
        this.htmlObj_Size.remove();
        // 移除标题div
        this.htmlObj_Title.remove();
    });

};
// 标题接口初始化
$.ibo.formEditor.ITitle.Init = function () {

    // 标题设置Li
    $.ibo.formEditor.ITitle.Name_Li = $("#Property_ITitle_Name_Li");
    // "标题"文本框
    $.ibo.formEditor.ITitle.Name_Txt = $("#Property_ITitle_Name_Txt");
    // "是否显示"勾选框
    $.ibo.formEditor.ITitle.HasTitle_Chk = $("#Property_ITitle_HasTitle_Chk");


    // 绑定"标题"文本框更改内容同时更改选中控件属性
    $.ibo.formEditor.ITitle.Name_Txt.on("input propertychange", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        if (ctrl.setTitle) {
            ctrl.setTitle($(this).val());
        }
    });


    // 绑定"是否显示"勾选框更改勾选同时更改选中控件属性
    $.ibo.formEditor.ITitle.HasTitle_Chk.on("click", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        if (ctrl.setHasTitle) {
            var checked = $(this).is(":checked");
            ctrl.setHasTitle(checked);
        }
    });

};


// 隐藏其他属性设置   只需要保存事件类型  不需要其余的设置
$.ibo.formEditor.HideOther = function () {
    // 隐藏其余属性
    this.IEvent_HideAttr();

};
// 打开新窗口
$.ibo.formEditor.OpenNewWinFn = function () {
    // 隐藏其余属性
    this.IEvent_HideAttr();

    // 设置"窗口标题"输入框
    $.ibo.formEditor.IEvent.LinkTitle_Txt.val(this.attrList["Event_LinkTitle"]);
    // 显示"窗口标题"设置Li
    $.ibo.formEditor.IEvent.LinkTitle_Li.show();

    // 设置"地址类别"下拉框
    $.ibo.formEditor.IEvent.UrlType_Slt.val(this.attrList["Event_UrlType"]);
    // 显示"地址类别"设置Li
    $.ibo.formEditor.IEvent.UrlType_Li.show();

    // 设置"窗口地址"输入框
    this.SetAddress(function (addr) {
        $.ibo.formEditor.IEvent.LinkUrl_Txt.val(addr);
    });

    // 显示"窗口地址"设置Li
    $.ibo.formEditor.IEvent.LinkUrl_Li.show();

    // 若当前为打开内部页面   则可以设置查询参数
    if (this.attrList["Event_UrlType"] == "0") {
        $.ibo.formEditor.IEvent.PageParams_Li.show();
    }

};

// 打开附近企业、附近企业客户窗口
$.ibo.formEditor.OpenCompAround = function () {

    // 隐藏其余属性
    this.IEvent_HideAttr();

    // 设置"附近位置"输入框
    $.ibo.formEditor.IEvent.AroudDIS_Txt.val(this.attrList["Event_AroudDIS"]);
    // 显示"附近位置"设置Li
    $.ibo.formEditor.IEvent.AroudDIS_Li.show();


};

// 打开内部页面新窗口
$.ibo.formEditor.OpenInnerWinFn = function () {

    // 隐藏其余属性
    this.IEvent_HideAttr();

    // 只能打开内部窗口
    this.attrList["Event_UrlType"] = "0";

    // 设置"窗口标题"输入框
    $.ibo.formEditor.IEvent.LinkTitle_Txt.val(this.attrList["Event_LinkTitle"]);
    // 显示"窗口标题"设置Li
    $.ibo.formEditor.IEvent.LinkTitle_Li.show();

    // 设置"窗口地址"输入框
    this.SetAddress(function (addr) {
        $.ibo.formEditor.IEvent.LinkUrl_Txt.val(addr);
    });

    // 显示"窗口地址"设置Li
    $.ibo.formEditor.IEvent.LinkUrl_Li.show();
};
// 打开数据选择窗口
$.ibo.formEditor.OpenSltDataWinFn = function () {

    // 隐藏其余属性
    this.IEvent_HideAttr();

    // 只能打开内部窗口
    this.attrList["Event_UrlType"] = "0";

    // 设置"窗口标题"输入框
    $.ibo.formEditor.IEvent.LinkTitle_Txt.val(this.attrList["Event_LinkTitle"]);
    // 显示"窗口标题"设置Li
    $.ibo.formEditor.IEvent.LinkTitle_Li.show();

    // 设置"窗口地址"输入框
    this.SetAddress(function (addr) {
        $.ibo.formEditor.IEvent.LinkUrl_Txt.val(addr);
    });
    // 显示"窗口地址"设置Li
    $.ibo.formEditor.IEvent.LinkUrl_Li.show();

    // 显示"页间参数设置"设置Li
    $.ibo.formEditor.IEvent.PageParams_Li.show();

    // 显示"页间传值设置"设置Li
    $.ibo.formEditor.IEvent.PageValues_Li.show();

};
// 点击触发事件类别
$.ibo.formEditor.EventType = {
    "NoJs": { "value": "", "text": "请选择事件", "fn": $.ibo.formEditor.HideOther },  // 请选择事件
    "Add": { "value": "1", "text": "新增", "fn": $.ibo.formEditor.HideOther },  // 新增
    "Save": { "value": "2", "text": "保存", "fn": $.ibo.formEditor.HideOther },  // 保存
    "Delete": { "value": "3", "text": "删除", "fn": $.ibo.formEditor.HideOther },  // 删除
    "PreInfo": { "value": "4", "text": "上一条", "fn": $.ibo.formEditor.HideOther },  // 上一条
    "NextInfo": { "value": "5", "text": "下一条", "fn": $.ibo.formEditor.HideOther },  // 下一条
    "ReturnData": { "value": "6", "text": "返回数据", "fn": $.ibo.formEditor.HideOther },  // 返回数据
    "CloseWin": { "value": "7", "text": "关闭窗口", "fn": $.ibo.formEditor.HideOther },  // 关闭窗口
    "OpenNewWin": { "value": "8", "text": "打开新窗口", "fn": $.ibo.formEditor.OpenNewWinFn },  // 打开新窗口
    "AddOpenWin": { "value": "9", "text": "新增(打开新窗口)", "fn": $.ibo.formEditor.OpenInnerWinFn },  // 新增(打开新窗口)
    "OpenSubWin": { "value": "10", "text": "打开从表窗口", "fn": $.ibo.formEditor.OpenInnerWinFn },  // 打开从表窗口
    "OpenDetailWinView": { "value": "11", "text": "打开明细窗口(查看)", "fn": $.ibo.formEditor.OpenInnerWinFn },  // 打开明细窗口(查看)
    "OpenDetailWinEdit": { "value": "12", "text": "打开明细窗口(编辑)", "fn": $.ibo.formEditor.OpenInnerWinFn },  // 打开明细窗口(编辑)
    "OpenSltDataWin": { "value": "13", "text": "打开数据选择窗口", "fn": $.ibo.formEditor.OpenSltDataWinFn },  // 打开数据选择窗口
    "OpenShareWin": { "value": "14", "text": "打开分享窗口", "fn": $.ibo.formEditor.HideOther },  // 打开分享窗口
    "OpenCompAround": { "value": "15", "text": "打开附近企业", "fn": $.ibo.formEditor.OpenCompAround },  // 打开附件企业
    "OpenCustAround": { "value": "16", "text": "打开附近客户", "fn": $.ibo.formEditor.OpenCompAround }  // 打开附件客户
};
// 事件接口  JsArr可绑定事件类型
$.ibo.formEditor.IEvent = function (para, JsArr) {

    // 点击触发事件类别   "15"：打开查询条件窗口   "1"：新增   "9"：新增(打开新窗口)   "2"：保存   "3"：删除
    // "4"：上一条   "5"：下一条   "10"：打开从表窗口   "11"：打开明细窗口(查看)   "12"：打开明细窗口(编辑)
    // "13"：打开数据选择窗口   "14"：打开分享窗口   "8"：打开新窗口   "6"：返回数据   "7"：关闭窗口
    this.attrList["Event_Type"] = typeof para.attrList["Event_Type"] == "undefined" ? "" : para.attrList["Event_Type"];

    // 简单事件  只需要设置事件类别  无其余扩展参数设置   无需保存其余扩展信息
    if (this.attrList["Event_Type"] == "1" || this.attrList["Event_Type"] == "2" || this.attrList["Event_Type"] == "3" || this.attrList["Event_Type"] == "4" || this.attrList["Event_Type"] == "5"
        || this.attrList["Event_Type"] == "6" || this.attrList["Event_Type"] == "7") {
    }
        // 打开窗口事件  可设置窗口地址类型、窗口地址、新窗口标题
    else if (this.attrList["Event_Type"] == "8" || this.attrList["Event_Type"] == "9" || this.attrList["Event_Type"] == "10" || this.attrList["Event_Type"] == "11" || this.attrList["Event_Type"] == "12"
        || this.attrList["Event_Type"] == "13") {
        // 新窗口地址类型 "0"：内部地址 "1"：外部地址
        this.attrList["Event_UrlType"] = para.attrList["Event_UrlType"] == "1" ? "1" : "0";
        // 窗口地址 urltype=0时为页面id  urltype=1时为http internet地址
        this.attrList["Event_LinkUrl"] = typeof para.attrList["Event_LinkUrl"] == "undefined" ? "" : para.attrList["Event_LinkUrl"];
        // 新窗口标题
        this.attrList["Event_LinkTitle"] = typeof para.attrList["Event_LinkTitle"] == "undefined" ? "" : para.attrList["Event_LinkTitle"];

        // 内部地址  可设置页面传递参数
        if (this.attrList["Event_UrlType"] == "0") {
            // 页面传递参数
            this.attrList["Event_PageParams"] = typeof para.attrList["Event_PageParams"] == "undefined" ? "[]" : para.attrList["Event_PageParams"];

        }

        // 数据选择页面  可设置选择返回数据
        if (this.attrList["Event_Type"] == "13") {
            // 选择数据页面选择返回数据
            this.attrList["Event_PageValues"] = typeof para.attrList["Event_PageValues"] == "undefined" ? "[]" : para.attrList["Event_PageValues"];
        }
    }
        // 打开附近企业、打开附近客户  可设置附近距离
    else if (this.attrList["Event_Type"] == "15" || this.attrList["Event_Type"] == "16") {
        // 设置周围距离
        this.attrList["Event_AroudDIS"] = typeof para.attrList["Event_AroudDIS"] == "undefined" ? "" : para.attrList["Event_AroudDIS"];
    }

    // 打开内部页面名称
    this.ViewName = null;
    // 设置页面显示地址
    this.SetAddress = function (fn) {
        // 内部地址  可设置页面传递参数
        if (this.attrList["Event_UrlType"] == "0") {
            // 当前有设置内部地址  显示地址为内部页面名称
            if ($.trim(this.attrList["Event_LinkUrl"]).length > 0) {
                if (this.ViewName != null) {
                    fn(this.ViewName);
                }
                    // 无内部页面名称  则需要去后台查询
                else {
                    this.GetViewNameById(this.attrList["Event_LinkUrl"], fn);
                }
            }
            else fn("");
        }
        else {
            // 若为外部页面   则显示地址即用户输入网址
            fn(this.attrList["Event_LinkUrl"]);
        }
    };

    // 根据页面id获取页面名称   ID:页面id   fn:回调函数
    this.GetViewNameById = function (ID, fn) {
        var self = this;
        $.ibo.crossOrgin({
            url: $.ibo.FormFlowSrvUrl,
            funcName: "WF_FormView_GetViewNameById",
            data: $.toJSON({ "ID": ID }),
            success: function (obj) {
                // 查询成功
                if ($.ibo.ResFlag.Success == obj.ResFlag && obj.ResObj) {
                    self.ViewName = obj.ResObj;
                    fn(self.ViewName);
                }
                else {
                    $.ibo.ShowErrorMsg(obj);
                }
            }
        });
    };


    // 获取所有输入控件   FieldType:筛选字段类型
    this.GetAllInputCtrl = function (FieldType) {
        var arr = [];
        // 遍历所有控件
        var length = this.formEditor.controls.length;
        for (var i = 0; i < length; i++) {
            var ctrl = this.formEditor.controls[i];
            // ctrl.attrList["ParentID"] == this.attrList["ParentID"]  只查询ParentID相等  即同级控件  因为同级控件共用数据源
            // typeof ctrl.attrList["Input_FieldID"] != "undefined"  存在Input_FieldID属性  即录入控件
            if (ctrl.attrList["ParentID"] == this.attrList["ParentID"]
                && typeof ctrl.attrList["Input_FieldID"] != "undefined") {
                // 判断控件对应字段类型与当前字段类型是否一致
                if (ctrl.GetFieldTypeByControlType() == FieldType) arr.push(ctrl);
            }
        }
        return arr;
    };

    // 打开页面数据源信息  [ { "TbName":"数据表名称", "FieldList": [ 字段信息数组 ] } ]
    this.OpenViewFieldInfo = null;


    // 设置参数列表信息   offset：面板出现位置
    this.SetPageParamsInfo = function (offset) {
        // 外部地址无法设置参数列表
        if (this.attrList["Event_UrlType"] == "1") return;

        // 获取打开页面内部数据源信息
        if (this.OpenViewFieldInfo == null) {
            // 获取应用下页面树形结构数据
            $.ibo.crossOrgin({
                url: $.ibo.FormFlowSrvUrl,
                funcName: "WF_FormView_GetDataSource",
                data: $.toJSON({ "ViewID": this.attrList["Event_LinkUrl"] }),
                success: function (obj) {
                    if ($.ibo.ResFlag.Success == obj.ResFlag) { }
                }
            });
        }

        // 移除原有Table数据
        $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata").remove();

        var ctrl = this;

        if (this.ViewFieldInfoList && this.ViewFieldInfoList.length > 0) {

            var params = $.parseJSON(this.attrList["Event_PageParams"]);
            // 设置标题
            $.ibo.formEditor.IEvent.Params_SetDivTitle.text("设置参数");

            // 遍历打开页面绑定数据表字段信息  生成设置行
            $.each(this.ViewFieldInfoList, function (i, n) {

                var paramsObj = null;
                if (params && params.length > 0) {
                    // 遍历已存储的参数设置信息
                    $.each(params, function (j, m) {
                        // 根据字段id匹配参数设置信息
                        if (m.FieldID == n.FieldID) {
                            paramsObj = m;
                            return false;
                        }
                    });
                }
                // 不存在参数设置信息  初始化默认参数设置信息
                if (paramsObj == null) {
                    paramsObj = {
                        // 参数类别  0:控件值   1:特殊值   2:固定值
                        "type": "",
                        // 参数值
                        "value": "",
                        // 筛选字段id
                        "FieldID": n.FieldID,
                        // 筛选字段类别
                        "FieldType": n.FieldType,
                        // 运算符
                        "OpType": "=",
                        // 参数值扩展信息
                        "exc": {}
                    };
                }

                // 创建参数设置行 添加到设置table中
                $.ibo.formEditor.IEvent.PageParams_Table.append(ctrl.createPageParamsRow(paramsObj, n));
            });
        }

        // 属性div底部坐标
        var dlgBottom = $("#dialogProperties").height() + $("#dialogProperties").offset().top;
        // 弹窗底部坐标
        var divBottom = $.ibo.formEditor.IEvent.Params_SetDiv.height() + offset.top;

        // 若弹窗底部坐标位于属性div底部坐标下方   则使弹窗出现在属性div底部
        if (divBottom > dlgBottom) {
            offset.top = dlgBottom - $.ibo.formEditor.IEvent.Params_SetDiv.height() - 10;
        }

        // 设置面板位置
        $.ibo.formEditor.IEvent.Params_SetDiv.css({ "left": offset.left + "px", "top": offset.top + "px" });

        // 显示面板
        $.ibo.formEditor.IEvent.Params_SetDiv.show();
    };



    // 根据参数设置信息创建页面参数设置行   paramsObj:参数设置信息   FieldInfo:字段信息
    this.createPageParamsRow = function (paramsObj, FieldInfo) {

        // 创建设置行
        var tr = $("<tr>", { "class": "listdata" });

        // 首列 页面筛选字段信息
        var td = this.createPageParamsRow_FirstTd(FieldInfo);
        tr.append(td);

        // 第二列 参数类别设置
        td = this.createPageParamsRow_SecondTd(paramsObj, FieldInfo);
        tr.append(td);

        // 第三列 运算符设置
        td = this.createPageParamsRow_ThirdTd(paramsObj, FieldInfo);
        tr.append(td);

        return tr;
    };


    // 创建参数设置信息行 第一列 筛选字段信息列   FieldInfo:字段信息
    this.createPageParamsRow_FirstTd = function (FieldInfo) {
        // 创建单元格
        var td = $("<td>");
        // 字段说明input  只读
        var txt = $("<input>", { "type": "text", "readonly": "readonly" });
        // 文字居中
        txt.css({ "text-align": "center" });
        // 显示字段中文备注说明
        txt.val(FieldInfo.Rmk);
        td.append(txt);

        // 隐藏input  存储字段id
        txt = $("<input>", { "type": "hidden", "id": "PageParam_FieldID" });
        txt.val(FieldInfo.FieldID);
        td.append(txt);

        return td;
    };

    // 创建参数设置信息行 第二列 参数类别设置列   paramsObj:参数设置信息   FieldInfo:字段信息
    this.createPageParamsRow_SecondTd = function (paramsObj, FieldInfo) {
        // 创建单元格
        var td = $("<td>");
        // 参数类别下拉框
        var slt = $("<select>").css({ "width": "80px", "id": "PageParam_Type" });
        var op = $("<option>").text("请选择").val("");
        slt.append(op);

        // 控件值 字段根据页面控件录入值筛选
        op = $("<option>").text("控件值").val("0");
        slt.append(op);

        // 特殊值 字段根据选定特殊值筛选
        // FieldType: 日期 = 3   姓名 = 9   部门 = 10   地理位置 = 14   此四种类型需要特殊值查询
        if (paramsObj.FieldType == "3" || paramsObj.FieldType == "9" || paramsObj.FieldType == "10" || paramsObj.FieldType == "14") {
            op = $("<option>").text("特殊值").val("1");
            slt.append(op);
        }

        var self = this;
        // 设置类别下拉框选项变化  运算符与值单元格内容一起变化
        slt.on("input propertychange", function () {
            // 默认新设置信息
            var changePara =
            {
                // 参数类别  0:控件值   1:特殊值   2:固定值
                "type": $(this).val(),
                // 参数值
                "value": "",
                // 筛选字段id
                "FieldID": FieldInfo.FieldID,
                // 筛选字段类别
                "FieldType": FieldInfo.FieldType,
                // 运算符
                "OpType": "="
            };
            // 获取当前行所有单元格对象
            var tds = td.parent().find("td");
            // 第三列
            var tTd = tds.eq(2);
            // 清空第三列
            tTd.empty();
            // 根据设置信息和字段信息重新生成第三列单元格 替换原单元格
            tTd.replaceWith(self.createPageParamsRow_ThirdTd(changePara, FieldInfo));
        });

        // 设置参数类别下拉框选中项
        slt.val(paramsObj.type);
        td.append(slt);

        return td;
    };

    // 创建参数设置信息行 第三列 参数值设置列   paramsObj:参数设置信息   FieldInfo:字段信息
    this.createPageParamsRow_ThirdTd = function (paramsObj, FieldInfo) {
        // 创建单元格
        var td = $("<td>");
        var valueSlt;

        // 控件值
        if (paramsObj.type == "0") {
            // 根据字段信息筛选所有字段相符的控件信息
            var ctrlArr = this.GetAllInputCtrl(FieldInfo.FieldType);

            // 根据控件信息创建控件选择下拉框
            if (ctrlArr.length > 0) {
                valueSlt = $.ibo.GetSltFromArr(ctrlArr, "name", "HtmlID", false).attr("id", "PageParams_Value");
            }
            else {
                // 未筛选出有效控件  显示无有效控件可选择
                valueSlt = $("<span>").text("无有效控件可选择").css({ "display": "inline-block", "width": "100%", "text-align": "center" });
            }
            td.append(valueSlt);
        }
            // 特殊值
        else if (paramsObj.type == "1") {

            // 创建特殊值选择下拉框
            valueSlt = $("<select>", { "id": "PageParams_Value" });

            // 日期字段   特殊值   上年、本年、上季度、本季度、上月、本月、上一日、本日、截止到当天
            if (FieldInfo.FieldType == "3") {
                // 添加特殊值选项
                valueSlt.append($("<option>").val("0").text("上年"));
                valueSlt.append($("<option>").val("1").text("本年"));
                valueSlt.append($("<option>").val("2").text("上季度"));
                valueSlt.append($("<option>").val("3").text("本季度"));
                valueSlt.append($("<option>").val("4").text("上月"));
                valueSlt.append($("<option>").val("5").text("本月"));
                valueSlt.append($("<option>").val("6").text("上一日"));
                valueSlt.append($("<option>").val("7").text("本日"));
                valueSlt.append($("<option>").val("8").text("截止到当天"));
            }
                //　人员字段   特殊值   登录用户
            else if (FieldInfo.FieldType == "9") {
                // 添加特殊值选项
                valueSlt.append($("<option>").val("0").text("登录用户"));
            }
                //　部门字段   特殊值   登录用户所在部门
            else if (FieldInfo.FieldType == "10") {
                // 添加特殊值选项
                valueSlt.append($("<option>").val("0").text("登录用户所在部门"));
            }
                //　地理位置字段   特殊值   当前位置+距离范围
            else if (FieldInfo.FieldType == "14") {
                // 添加特殊值 当前位置距离
                valueSlt = $("<input>", { "id": "PageParams_Value", "type": "tel" }).val("0");
            }
            td.append(valueSlt);
        }
            // 未选择参数类别前  无法选择运算符
        else td.append($("<span>").text("选择类别").css({ "display": "inline-block", "width": "100%", "text-align": "center" }));

        return td;
    }


    // 获取参数传值列表信息   flag: 1 参数设置   2 传值设置
    this.GetPageParamsInfo = function () {
        var arr = [];

        // 所有数据行
        var trs = $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata");
        if (trs.length > 0) {
            $.each(trs, function (i, n) {
                n = $(n);
                var HtmlID = n.find("select").val();
                // 若HtmlID为空  则未选择控件  数据无意义  不保存
                if ($.trim(HtmlID).length != 0) {
                    var FieldID = n.find("input[type=hidden]").val();
                    arr.push({ "HtmlID": HtmlID, "FieldID": FieldID });
                }
            });
        }

        this.attrList["Event_PageParams"] = $.toJSON(arr);
        // 隐藏面板
        $.ibo.formEditor.IEvent.Params_SetDiv.hide();
    };



    // 设置传值列表信息   offset：面板出现位置
    this.SetPageValuesInfo = function (offset) {
        // 移除原有Table数据
        $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata").remove();

        var ctrl = this;

        // 获取所有输入控件
        var arr = this.GetAllInputCtrl();

        if (arr.length > 0) {

            var params = $.parseJSON(this.attrList["Event_PageValues"]);
            // 设置标题
            $.ibo.formEditor.IEvent.Params_SetDivTitle.text("设置传值");

            // 遍历所有录入控件  生成设置行
            $.each(arr, function (i, n) {
                var tr = $("<tr>", { "class": "listdata" });
                // 首列 控件名
                var td = $("<td>");
                var txt = $("<input>", { "type": "text", "readonly": "readonly" });
                txt.css({ "text-align": "center" });
                txt.val(n.name);
                td.append(txt);

                txt = $("<input>", { "type": "hidden" });
                txt.val(n.HtmlID);
                td.append(txt);
                tr.append(td);

                // 第二列 字段名下拉框
                td = $("<td>");
                var slt = $.ibo.GetSltFromArr(ctrl.ViewFieldInfoList, "Rmk", "FieldID");
                td.append(slt);
                tr.append(td);

                if (params && params.length > 0) {
                    // 遍历已存储的参数设置信息
                    $.each(params, function (j, m) {
                        if (m.HtmlID == n.HtmlID) {
                            slt.val(m.FieldID);
                            return false;
                        }
                    });
                }

                $.ibo.formEditor.IEvent.PageParams_Table.append(tr);
            });
        }

        // 移除保存按钮原有保存事件
        $.ibo.formEditor.IEvent.SetDiv_Save.off("click");
        // 重新设置保存按钮保存事件
        $.ibo.formEditor.IEvent.SetDiv_Save.on("click", function () {
            ctrl.GetPageValuesInfo();
        });

        // 设置面板位置
        $.ibo.formEditor.IEvent.Params_SetDiv.css({ "left": offset.left + "px", "top": offset.top + "px" });
        // 显示面板
        $.ibo.formEditor.IEvent.Params_SetDiv.show();
    };

    // 获取参数传值列表信息
    this.GetPageValuesInfo = function () {

        var arr = [];

        // 所有数据行
        var trs = $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata");
        if (trs.length > 0) {
            $.each(trs, function (i, n) {
                n = $(n);
                var FieldID = n.find("select").val();
                // 若FieldID为空  则未选择字段  数据无意义  不保存
                if ($.trim(FieldID).length != 0) {
                    var HtmlID = n.find("input[type=hidden]").val();
                    arr.push({ "HtmlID": HtmlID, "FieldID": FieldID });
                }
            });
        }

        this.attrList["Event_PageValues"] = $.toJSON(arr);
        // 隐藏面板
        $.ibo.formEditor.IEvent.Params_SetDiv.hide();
    };

    // 重置事件接口相关属性值
    this.IEvent_ResetAttr = function () {
        // 简单事件  只需要设置事件类别  无其余扩展参数设置   无需保存其余扩展信息
        if (this.attrList["Event_Type"] == "1" || this.attrList["Event_Type"] == "2" || this.attrList["Event_Type"] == "3" || this.attrList["Event_Type"] == "4" || this.attrList["Event_Type"] == "5"
            || this.attrList["Event_Type"] == "6" || this.attrList["Event_Type"] == "7") {
            delete this.attrList["Event_UrlType"];
            delete this.attrList["Event_LinkUrl"];
            delete this.attrList["Event_LinkTitle"];
            delete this.attrList["Event_PageParams"];
            delete this.attrList["Event_PageValues"];
            delete this.attrList["Event_AroudDIS"];
        }
            // 打开窗口事件  可设置窗口地址类型、窗口地址、新窗口标题
        else if (this.attrList["Event_Type"] == "8" || this.attrList["Event_Type"] == "9" || this.attrList["Event_Type"] == "10" || this.attrList["Event_Type"] == "11" || this.attrList["Event_Type"] == "12"
            || this.attrList["Event_Type"] == "13") {

            // 新窗口地址类型 "0"：内部地址 "1"：外部地址  默认内部地址
            this.attrList["Event_UrlType"] = "0";
            // 窗口地址 urltype=0时为页面id  urltype=1时为http internet地址  默认空
            this.attrList["Event_LinkUrl"] = "";
            // 新窗口标题  默认空
            this.attrList["Event_LinkTitle"] = "";

            // 内部地址  可设置页面传递参数
            if (this.attrList["Event_UrlType"] == "0") {
                // 页面传递参数 默认空数组[]
                this.attrList["Event_PageParams"] = "[]";
            }
            else delete this.attrList["Event_PageParams"];

            // 数据选择页面  可设置选择返回数据
            if (this.attrList["Event_Type"] == "13") {
                // 选择数据页面选择返回数据 默认空数组[]
                this.attrList["Event_PageValues"] = "[]";
            }
            else delete this.attrList["Event_PageValues"];

            delete this.attrList["Event_AroudDIS"];
        }
            // 打开附近企业、打开附近客户  可设置附近距离
        else if (this.attrList["Event_Type"] == "15" || this.attrList["Event_Type"] == "16") {
            // 设置周围距离
            this.attrList["Event_AroudDIS"] = typeof para.attrList["Event_AroudDIS"] == "undefined" ? "" : para.attrList["Event_AroudDIS"];

            delete this.attrList["Event_UrlType"];
            delete this.attrList["Event_LinkUrl"];
            delete this.attrList["Event_LinkTitle"];
            delete this.attrList["Event_PageParams"];
            delete this.attrList["Event_PageValues"];
        }
        this.ViewName = null;
    };


    // 隐藏事件接口相关属性设置
    this.IEvent_HideAttr = function () {

        // 隐藏"窗口标题"设置Li
        $.ibo.formEditor.IEvent.LinkTitle_Li.hide();
        // 隐藏"地址类别"设置Li
        $.ibo.formEditor.IEvent.UrlType_Li.hide();
        // 隐藏"窗口地址"设置Li
        $.ibo.formEditor.IEvent.LinkUrl_Li.hide();
        // 隐藏"页间参数设置"设置Li
        $.ibo.formEditor.IEvent.PageParams_Li.hide();
        // 隐藏"页间传值设置"设置Li
        $.ibo.formEditor.IEvent.PageValues_Li.hide();

        //隐藏周围距离
        $.ibo.formEditor.IEvent.AroudDIS_Li.hide();
    };

    // 未传参数 默认可以绑定所有事件
    if (!JsArr) JsArr = $.ibo.formEditor.EventType;

    // 获取事件属性设置对象   默认为控件自己
    this.GetEventObj = function () { return this; };


    // 更改事件类型后处理函数
    this.afterChangeEventType = function () { };
    // 更改标题后处理函数
    this.afterChangeWinTitle = function () { };
    // 更改窗口类别后处理函数
    this.afterChangeWinType = function () { };
    // 调用控件更改窗口地址处理函数
    this.afterChangeWinUrl = function () { };


    // 添加属性显示方法  显示事件相关设置
    this.AddShowPrototypeFn(function () {
        // 清空绑定事件下拉框
        $.ibo.formEditor.IEvent.JsEvent_Slt.empty();
        // 根据参数重新设置下拉框选项
        for (var name in JsArr) {
            var info = JsArr[name];
            var option = $("<option>", { "name": name });
            option.val(info.value);
            option.text(info.text);
            $.ibo.formEditor.IEvent.JsEvent_Slt.append(option);
        }
        // 设置下拉框的值
        $.ibo.formEditor.IEvent.JsEvent_Slt.val(this.attrList["Event_Type"]);
        var sltOp = $.ibo.formEditor.IEvent.JsEvent_Slt.find("option:selected");
        // 获取事件类型名
        var name = sltOp.attr("name");
        // 根据事件类型执行方法
        $.ibo.formEditor.EventType[name].fn.call(this);

        // 显示"绑定事件"设置Li
        $.ibo.formEditor.IEvent.JsEvent_Li.show();
    });

};
// 事件接口初始化
$.ibo.formEditor.IEvent.Init = function () {

    // "绑定事件"设置Li
    $.ibo.formEditor.IEvent.JsEvent_Li = $("#Property_JsEvent_Li");
    // "绑定事件"下拉框
    $.ibo.formEditor.IEvent.JsEvent_Slt = $("#Property_JsEvent_Slt");
    // 绑定"绑定事件"下拉框更改选择事件
    $.ibo.formEditor.IEvent.JsEvent_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        // 获取下拉框中的选中项
        var sltOp = $(this).find("option:selected");
        // 设置EventJs为选中值
        setObj.attrList["Event_Type"] = sltOp.val();
        // 获取事件类型名
        var name = sltOp.attr("name");
        // 重置事件接口相关属性值
        setObj.IEvent_ResetAttr();
        // 根据事件类型执行方法
        $.ibo.formEditor.EventType[name].fn.call(setObj);

        // 调用控件更改事件类别处理函数
        ctrl.afterChangeEventType();
    });

    // "窗口标题"设置Li
    $.ibo.formEditor.IEvent.LinkTitle_Li = $("#Property_LinkTitle_Li");
    // "窗口标题"输入框
    $.ibo.formEditor.IEvent.LinkTitle_Txt = $("#Property_LinkTitle_Txt");
    // 绑定"窗口标题"输入框更改事件
    $.ibo.formEditor.IEvent.LinkTitle_Txt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        // 保存标题属性
        setObj.attrList["Event_LinkTitle"] = $(this).val();

        // 调用控件更改窗口标题处理函数
        ctrl.afterChangeWinTitle();
    });
    // "地址类别"设置Li
    $.ibo.formEditor.IEvent.UrlType_Li = $("#Property_UrlType_Li");
    // "地址类别"下拉框
    $.ibo.formEditor.IEvent.UrlType_Slt = $("#Property_UrlType_Slt");
    // 绑定"地址类别"下拉框更改事件
    $.ibo.formEditor.IEvent.UrlType_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        // 保存窗口类别属性
        setObj.attrList["Event_UrlType"] = $(this).val();

        // 内部窗口 显示页面查询参数设置
        if (setObj.attrList["Event_UrlType"] == "0") {
            $.ibo.formEditor.IEvent.PageParams_Li.show();
        }
            // 否则隐藏页面查询参数设置
        else {
            $.ibo.formEditor.IEvent.PageParams_Li.hide();
        }

        // 调用控件更改窗口类别处理函数
        ctrl.afterChangeWinType();
    });
    // "窗口地址"设置Li
    $.ibo.formEditor.IEvent.LinkUrl_Li = $("#Property_LinkUrl_Li");
    // "窗口地址"输入框
    $.ibo.formEditor.IEvent.LinkUrl_Txt = $("#Property_LinkUrl_Txt");
    // "窗口地址"按钮
    $.ibo.formEditor.IEvent.LinkUrl_Btn = $("#Property_LinkUrl_Btn");

    // 设置"窗口地址"按钮点击
    $.ibo.formEditor.IEvent.LinkUrl_Btn.on("click", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        var EventJs = setObj.attrList["Event_Type"];

        // 打开选择页面参数
        var querystring = "";

        //   "8"：打开新窗口   "14"：打开分享窗口
        if (EventJs == "8" || EventJs == "14") {
            // 新窗口地址类型   "0"：内部地址 "1"：外部地址
            var UrlType = setObj.attrList["Event_UrlType"];

            //   ViewSort=1(页面种类=普通页面(主页面))   SizeType=setObj.formEditor.View.SizeType(页面风格=当前页面风格)
            //   IsFlow=false(非流程页面)
            if (UrlType == "0") {
                querystring = "ViewSort=1&SizeType=" + setObj.formEditor.View.SizeType + "&IsFlow=false";
            }
            else if (UrlType == "1") {
                var url = $.ibo.GetUrl();
                // url = null  表示用户取消输入url
                if (url != null) {
                    // 保存页面地址
                    setObj.attrList["Event_LinkUrl"] = url;
                    // 设置窗口地址输入框
                    $.ibo.formEditor.IEvent.LinkUrl_Txt.val(url);
                }


                // 调用控件更改窗口地址处理函数
                ctrl.afterChangeWinUrl();

                // 外部地址不再打开选择内部窗口
                return;
            }
        }
            // "9"：新增(打开新窗口)   "11"：打开明细窗口(查看)   "12"：打开明细窗口(编辑)
        else if (EventJs == "9" || EventJs == "11" || EventJs == "12") {
            //   ViewSort=3(页面种类=明细页面)   SizeType=setObj.formEditor.View.SizeType(页面风格=当前页面风格)
            //   IsFlow=false(非流程页面)   TbName=setObj.formEditor.View.TbName(数据表=当前页面数据表)
            querystring = "ViewSort=3&SizeType=" + setObj.formEditor.View.SizeType + "&IsFlow=false&TbName=" + setObj.formEditor.View.TbName;
        }
            // "10"：打开从表窗口
        else if (EventJs == "10") {
            //   ViewSort=2(页面种类=从表页面)   SizeType=setObj.formEditor.View.SizeType(页面风格=当前页面风格)
            //   IsFlow=false(非流程页面)   TbName1=setObj.formEditor.View.TbName(数据主表=当前页面数据表)
            querystring = "ViewSort=2&SizeType=" + setObj.formEditor.View.SizeType + "&IsFlow=false&TbName1=" + setObj.formEditor.View.TbName;
        }
            // "13"：打开数据选择窗口
        else if (EventJs == "13") {
            //   ViewSort=4(页面种类=数据选择页面)   SizeType=setObj.formEditor.View.SizeType(页面风格=当前页面风格)
            //   IsFlow=false(非流程页面)
            querystring = "ViewSort=4&SizeType=" + setObj.formEditor.View.SizeType + "&IsFlow=false";
        }

        $.ibo.openNewWin({
            width: 832,
            height: 510,
            hasTitle: true,
            title: "选择窗口地址",
            url: "../../views/select/selectViews(1).html?TimeStamp=201604011320&IsMenu=1&" + querystring,
            callBackFun: function (obj) {
                // 保存选择页面
                setObj.attrList["Event_LinkUrl"] = obj.ViewID;
                $.ibo.formEditor.IEvent.LinkUrl_Txt.val(obj.ViewName);

                // 更新页面名称
                setObj.ViewName = obj.ViewName;

                // 调用控件更改窗口地址处理函数
                ctrl.afterChangeWinUrl();
            }
        });

    });

    // "页间参数设置"设置Li
    $.ibo.formEditor.IEvent.PageParams_Li = $("#Property_PageParams_Li");
    // "页间参数设置"设置面板
    $.ibo.formEditor.IEvent.Params_SetDiv = $("#Property_IEvent_Params_SetDiv");
    // "页间参数设置"设置面板标题
    $.ibo.formEditor.IEvent.Params_SetDivTitle = $("#Property_IEvent_Params_SetDivTitle");
    // "页间参数设置"设置Table
    $.ibo.formEditor.IEvent.PageParams_Table = $("#Property_IEvent_PageParams_Table");
    // "页间参数设置"设置按钮
    $.ibo.formEditor.IEvent.PageParams_Btn = $("#Property_PageParams_Btn");
    // "页间参数设置"设置按钮绑定弹出
    $.ibo.formEditor.IEvent.PageParams_Btn.on("click", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        if (setObj.attrList["Event_LinkUrl"] == "") {
            $.ibo.ShowErrorMsg("请先选择打开窗口地址！");
        }
        else {
            setObj.SetPageParamsInfo($(this).offset());
        }
    });

    // "页间参数设置"设置面板保存按钮
    $.ibo.formEditor.IEvent.SetDiv_Save = $("#Property_IEvent_PageParams_SetDiv_Save");
    // 设置保存按钮点击事件
    $.ibo.formEditor.IEvent.SetDiv_Save.on("click", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        setObj.GetPageParamsInfo();
    });
    // "页间参数设置"设置面板取消按钮
    $.ibo.formEditor.IEvent.SetDiv_Cancel = $("#Property_IEvent_PageParams_SetDiv_Cancel");
    // 绑定"页间参数设置"设置面板取消按钮
    $.ibo.formEditor.IEvent.SetDiv_Cancel.on("click", function () {
        $.ibo.formEditor.IEvent.Params_SetDiv.hide();
    });


    // "页间传值设置"设置Li
    $.ibo.formEditor.IEvent.PageValues_Li = $("#Property_PageValues_Li");
    // "页间传值设置"设置按钮
    $.ibo.formEditor.IEvent.PageValues_Btn = $("#Property_PageValues_Btn");
    // "页间传值设置"设置按钮绑定弹出
    $.ibo.formEditor.IEvent.PageValues_Btn.on("click", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();


        if (setObj.attrList["Event_LinkUrl"] == "") {
            $.ibo.ShowErrorMsg("请先选择打开窗口地址！");
        }
        else {
            setObj.SetPageValuesInfo($(this).offset());
        }
    });


    //周边距离设置
    $.ibo.formEditor.IEvent.AroudDIS_Li = $("#Property_AroudDIS_Li");
    $.ibo.formEditor.IEvent.AroudDIS_Txt = $("#Property_AroudDIS_Txt");
    $.ibo.formEditor.IEvent.AroudDIS_Txt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取控件设置事件属性对象
        var setObj = ctrl.GetEventObj();

        // 保存窗口类别属性
        setObj.attrList["Event_AroudDIS"] = $(this).val();

        // 调用控件更改窗口类别处理函数
        ctrl.afterChangeWinType();
    });

};


// 录入控件接口
$.ibo.formEditor.IInput = function (para) {

    // 是否必填   "true"  "false"
    this.attrList["Input_IsNotNull"] = para.attrList["Input_IsNotNull"] == "true" ? "true" : "false";
    // 绑定数据表字段
    this.attrList["Input_FieldID"] = typeof para.attrList["Input_FieldID"] == "undefined" ? "" : para.attrList["Input_FieldID"];
    // 是否意见字段
    this.attrList["Input_IsAdvice"] = para.attrList["Input_IsAdvice"] == "true" ? "true" : "false";


    // 是否必填 标题后红色星号处理
    this.setIsNotNullStar = function () {
        // 判断控件是否必填属性
        var Input_IsNotNull = this.attrList["Input_IsNotNull"] == "true";

        // 存在标题div  需要在标题中添加或去除红色星号
        if (this.htmlObj_Title) {
            // 必填  需要添加红色星号
            if (Input_IsNotNull) {
                this.htmlObj_Title.append("<span class=\"ibo-isnotnull\">*</span>");
            }
                // 不是必填  去掉红色星号
            else {
                this.htmlObj_Title.find(".ibo-isnotnull").remove();
            }
        }
    };
    this.setIsNotNullStar();


    // 添加属性显示方法  显示必填、打印、绑定字段信息的设置
    this.AddShowPrototypeFn(function () {
        // 设置是否必填checkbox
        $.ibo.formEditor.IInput.IsNotNull.prop("checked", this.attrList["Input_IsNotNull"] == "true");
        // 显示是否必填 Li
        $.ibo.formEditor.IInput.IsNotNull_Li.show();

        // 设置绑定字段下拉框选项
        this.SetFieldIDSelect();
        // 显示绑定字段Li
        $.ibo.formEditor.IInput.FieldID_Li.show();

        // 设置是否意见checkbox
        $.ibo.formEditor.IInput.IsAdvice.prop("checked", this.attrList["Input_IsAdvice"] == "true");
        // 显示是否意见 Li
        $.ibo.formEditor.IInput.IsAdvice_Li.hide();
    });


    // 根据控件类别获取控件绑定字段类别
    this.GetFieldTypeByControlType = function () {

        var fieldType = null;

        // 下拉框绑定字符串字段
        if (this instanceof $.ibo.formEditor.select) fieldType = "6";
            // 文本输入框绑定字符串字段
        else if (this instanceof $.ibo.formEditor.text) fieldType = "6";
            // 数字输入框绑定整数字段
        else if (this instanceof $.ibo.formEditor.number) fieldType = "1";
            // 小数输入框绑定小数字段
        else if (this instanceof $.ibo.formEditor.decimal) fieldType = "2";
            // 日期输入框绑定日期字段
        else if (this instanceof $.ibo.formEditor.date) fieldType = "3";
            // 多行文本输入框绑定字符串字段
        else if (this instanceof $.ibo.formEditor.textarea) fieldType = "6";
            // 图片绑定图片字段
        else if (this instanceof $.ibo.formEditor.image) fieldType = "7";
            // 复选框绑定字符串字段
        else if (this instanceof $.ibo.formEditor.checkbox) fieldType = "6";
            // 单选框绑定字符串字段
        else if (this instanceof $.ibo.formEditor.radio) fieldType = "6";
            // 上传控件绑定文件字段
        else if (this instanceof $.ibo.formEditor.upload) fieldType = "8";
            // 姓名绑定姓名字段
        else if (this instanceof $.ibo.formEditor.employeename) fieldType = "9";
            // 地址绑定地址字段
        else if (this instanceof $.ibo.formEditor.address) fieldType = "11";
            // 手机绑定地址字段
        else if (this instanceof $.ibo.formEditor.telephone) fieldType = "12";
            // 电子邮箱绑定电子邮箱字段
        else if (this instanceof $.ibo.formEditor.email) fieldType = "13";
            // 地理位置绑定地理位置字段
        else if (this instanceof $.ibo.formEditor.location) fieldType = "14";
            // 时间输入框绑定时间字段
        else if (this instanceof $.ibo.formEditor.time) fieldType = "4";
            // 部门输入框绑定部门字段
        else if (this instanceof $.ibo.formEditor.depart) fieldType = "10";
            // 文本编辑器绑定文本编辑器字段
        else if (this instanceof $.ibo.formEditor.articleedit) fieldType = "15";

        return fieldType;
    };


    // 设置绑定字段下拉框可选项
    this.SetFieldIDSelect = function () {

        // 根据控件类别获取控件绑定字段类别
        var fieldType = this.GetFieldTypeByControlType();

        // 清空绑定字段下拉框
        $.ibo.formEditor.IInput.FieldID.empty();
        // 默认选项为"未绑定字段"
        var op = $("<option>");
        op.val("");
        op.text("未绑定字段");
        $.ibo.formEditor.IInput.FieldID.append(op);

        // 绑定字段下拉框只显示可绑定类型的字段
        if (fieldType != null) {

            // 绑定数据表字段信息
            var fieldArr = [];

            var ParentID = this.attrList["ParentID"];
            // 若控件无父控件   则数据源来自主表
            if ($.trim(ParentID).length == 0) {
                fieldArr = this.formEditor.View.TbColumnList;
            }
                // 否则数据源来自控件的父控件绑定数据源
            else {
                $.each(this.formEditor.View.subTbColumnListArr, function (i, n) {
                    if (n.ParentID == ParentID) {
                        fieldArr = n.TbColumnList;
                        return false;
                    }
                });
            }

            // 判断是否意见
            var IsAdvice = this.attrList["Input_IsAdvice"] == "true";

            // 遍历字段信息生成下拉框选择项目
            $.each(fieldArr, function (i, n) {
                // 只显示与此控件数据相符的字段   且意见控件只能选择意见字段
                if (n.FieldType == fieldType && n.IsAdvice == IsAdvice) {
                    var op = $("<option>");
                    // value=FieldID
                    op.val(n.FieldID);
                    // text=Rmk
                    op.text(n.Rmk);
                    $.ibo.formEditor.IInput.FieldID.append(op);
                }
            });

            // 设置下拉框选中之前设置绑定字段
            $.ibo.formEditor.IInput.FieldID.val(this.attrList["Input_FieldID"]);

            // 根据控件生成数据表 只显示绑定字段 不可设置
            if (this.formEditor.View.GenerateType == 2) $.ibo.formEditor.IInput.FieldID.prop("disabled", true);
            else $.ibo.formEditor.IInput.FieldID.prop("disabled", false);
        }
    };


    // 添加验证控件方法
    this.AddDoValidFn(function () {
        // 默认合法
        IsValid = true;
        // this.formEditor.CurViewType != "1"当前编辑的不是普通页面
        // && this.formEditor.View.GenerateType != "2"且不是控件生成数据表
        if (this.formEditor.CurViewType != "1" && this.formEditor.View.GenerateType != "2") {

            var fieldArr;
            var ParentID = this.attrList["ParentID"];
            // 若控件无父控件   则数据源来自主表
            if ($.trim(ParentID).length == 0) {
                fieldArr = this.formEditor.View.TbColumnList;
            }
                // 否则数据源来自控件的父控件绑定数据源
            else {
                $.each(this.formEditor.View.subTbColumnListArr, function (i, n) {
                    if (n.ParentID == ParentID) {
                        fieldArr = n.TbColumnList;
                        return false;
                    }
                });
            }

            // 设为不合法
            IsValid = false;

            // 存在Input_FieldID属性值  判断绑定字段是否合法
            if ($.trim(this.attrList["Input_FieldID"]).length != 0) {
                var ctrl = this;
                // 存在对应数据表信息  判断绑定字段是否合法
                if (fieldArr) {
                    $.each(fieldArr, function (i, n) {
                        // 绑定字段存在对应数据表信息  判断绑定字段合法
                        if (n.FieldID == ctrl.attrList["Input_FieldID"]) {
                            IsValid = true;
                            return false;
                        }
                    });
                }
            }

            // 未绑定 或绑定不合法  给予提示
            if (!IsValid) {
                $.ibo.ShowErrorMsg("请给控件设置绑定字段！");
            }
        }

        return IsValid;
    });

};
// 录入控件接口初始化
$.ibo.formEditor.IInput.Init = function () {

    // "是否必填"设置Li
    $.ibo.formEditor.IInput.IsNotNull_Li = $("#Property_IsNotNull_Li");
    // "绑定字段"设置Li
    $.ibo.formEditor.IInput.FieldID_Li = $("#Property_FieldID_Li");
    // "是否意见"设置Li
    $.ibo.formEditor.IInput.IsAdvice_Li = $("#Property_IsAdvice_Li");
    // "是否必填"勾选框
    $.ibo.formEditor.IInput.IsNotNull = $("#Property_IsNotNull_Chk");
    // "绑定字段"下拉框
    $.ibo.formEditor.IInput.FieldID = $("#Property_FieldID_Slt");
    // "是否意见"勾选框
    $.ibo.formEditor.IInput.IsAdvice = $("#Property_IsAdvice_Chk");


    // 绑定"是否必填"勾选框更改勾选同时更改选中控件属性
    $.ibo.formEditor.IInput.IsNotNull.on("click", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Input_IsNotNull"] = $(this).is(":checked") ? "true" : "false";
        ctrl.setIsNotNullStar();
    });

    // 绑定"绑定字段"下拉框更改选中项同时更改选中控件属性
    $.ibo.formEditor.IInput.FieldID.on("input propertychange", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Input_FieldID"] = $(this).val();
    });

    // 绑定"是否意见"勾选框更改勾选同时更改选中控件属性
    $.ibo.formEditor.IInput.IsAdvice.on("click", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 更换是否意见属性
        ctrl.attrList["Input_IsAdvice"] = $(this).is(":checked") ? "true" : "false";
        // 置空绑定字段属性
        ctrl.attrList["Input_FieldID"] = "";
        // 重新设置字段下拉框
        ctrl.SetFieldIDSelect();
    });

};


// 设置尺寸接口  setH：是否可设置高度   setW：是否可设置宽度
$.ibo.formEditor.ISetSize = function (setH, setW) {
    // 控件是否可拉伸
    this.resizable = true;

    var handles;
    // 只可纵向拉伸
    if (setH) handles = "s";

    if (handles) {
        var ctrl = this;
        this.resizable = true;
        // 设置覆盖div可拉伸 
        this.divObj.resizable({
            minWidth: ctrl.formEditor.MinControlWidth, // 拉伸最小宽度  默认50px
            handles: handles,
            // 只可在页面容器中拉伸  子容器只可在父容器中拉伸
            containment: ctrl.container,
            // 拉伸开始时隐藏选中显意边框
            start: function (e, ui) {
                ctrl.formEditor.resizeStart(e, ui);
            },
            // 拉伸中
            resize: function (e, ui) {
                ctrl.formEditor.resize(e, ui);
            },
            // 拉伸结束后显示选中显意边框
            stop: function (e, ui) {
                ctrl.formEditor.resizeStop(e, ui);
            }
        });
        this.divObj.resizable("disable");
    }
        // 不能设置高度和宽度  控件不可拉伸
    else this.resizable = false;

    // 添加属性显示方法  设置宽度、高度是否可编辑
    this.AddShowPrototypeFn(function () {
        // 可设置宽度  "宽度"输入框可编辑
        if (setW) {
            $.ibo.formEditor.control.WidthSlt.prop("disabled", false);
        }
            // 否则不可编辑
        else {
            $.ibo.formEditor.control.WidthSlt.prop("disabled", true);
        }

        // 可设置高度  "高度"输入框可编辑
        if (setH) $.ibo.formEditor.control.HeightTxt.prop("readonly", false);
            // 否则不可编辑
        else $.ibo.formEditor.control.HeightTxt.prop("readonly", true);

        // 既不可设置高也不可设置宽
        if (!setW && !setH) {
            // 隐藏高宽设置LI
            $.ibo.formEditor.control.SizeLi.hide();
            // 隐藏对其方式
            $.ibo.formEditor.control.Align_Li.hide();
        }
        else {
            // 显示高宽设置LI
            $.ibo.formEditor.control.SizeLi.show();
            // 显示对其方式
            $.ibo.formEditor.control.Align_Li.show();
        }
    });

};


// 提示文字接口  isMuti:是否多行
$.ibo.formEditor.ITips = function (para, isMuti) {

    this.isMuti = isMuti;

    // 提示文字
    this.attrList["Tips_Prompt"] = typeof para.attrList["Tips_Prompt"] == "undefined" ? "" : para.attrList["Tips_Prompt"];

    // 设置"提示文字"
    this.SetPrompt = function (v) {
        if (typeof v != "undefined") {
            this.attrList["Tips_Prompt"] = v;
        }

        this.htmlObj.attr("placeholder", this.attrList["Tips_Prompt"]);
    };
    this.SetPrompt();

    // 添加属性显示方法  显示必填、打印、绑定字段信息的设置
    this.AddShowPrototypeFn(function () {

        if (this.isMuti) {
            $.ibo.formEditor.ITips.TextArea.show();
            $.ibo.formEditor.ITips.Txt.hide();
        }
        else {
            $.ibo.formEditor.ITips.TextArea.hide();
            $.ibo.formEditor.ITips.Txt.show();
        }

        // 设置"提示文字"多行输入框
        $.ibo.formEditor.ITips.TextArea.val(this.attrList["Tips_Prompt"]);
        // 设置"提示文字"单行输入框
        $.ibo.formEditor.ITips.Txt.val(this.attrList["Tips_Prompt"]);
        // 显示"提示文字"Li
        $.ibo.formEditor.ITips.Li.show();

    });

};
// 提示文字接口初始化
$.ibo.formEditor.ITips.Init = function () {

    // "提示文字"设置li
    $.ibo.formEditor.ITips.Li = $("#Property_Prompt_Li");
    // "提示文字"多行输入框
    $.ibo.formEditor.ITips.TextArea = $("#Property_Prompt_TextArea");
    // "提示文字"单行输入框
    $.ibo.formEditor.ITips.Txt = $("#Property_Prompt_Txt");

    // "提示文字"多行输入框绑定事件设置
    $.ibo.formEditor.ITips.TextArea.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        var v = $(this).val();
        // 设置"提示文字"
        ctrl.SetPrompt(v);
    });
    // "提示文字"单行输入框绑定事件设置
    $.ibo.formEditor.ITips.Txt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        var v = $(this).val();
        // 设置"提示文字"
        ctrl.SetPrompt(v);
    });
};


// 数字输入接口  privatePara:参数{ "Number_Length":"默认初始数字长度", "Number_MaxValue":"默认初始最大值", "Number_MinValue":"默认初始最小值","IsDecimal":"是否允许小数" }
$.ibo.formEditor.INumber = function (para, privatePara) {
    // 是否允许负数   "true"  "false"
    this.attrList["Number_Minus"] = para.attrList["Number_Minus"] == "true" ? "true" : "false";
    // 数字长度
    this.attrList["Number_Length"] = typeof para.attrList["Number_Length"] == "undefined" ? privatePara.Number_Length : para.attrList["Number_Length"];
    // 最大值
    this.attrList["Number_MaxValue"] = typeof para.attrList["Number_MaxValue"] == "undefined" ? privatePara.Number_MaxValue : para.attrList["Number_MaxValue"];
    // 最小值
    this.attrList["Number_MinValue"] = typeof para.attrList["Number_MinValue"] == "undefined" ? privatePara.Number_MinValue : para.attrList["Number_MinValue"];

    // 最大设置数据长度
    this.MaxDecimallen = privatePara.Number_Length;

    // 是否录入小数
    this.IsDecimal = privatePara.IsDecimal == "true";

    // 设置"数字长度"下拉框选中项
    this.setDecimallen = function () {

        $.ibo.formEditor.INumber.Length_Slt.empty();

        // 根据最大设置数据长度设置长度下拉框可选项
        for (var i = 1; i <= this.MaxDecimallen; i++) {
            var option = $("<option>")
            option.text(i);
            option.val(i);
            $.ibo.formEditor.INumber.Length_Slt.append(option);
        }

        // 设置选中项为Decimallen属性值
        $.ibo.formEditor.INumber.Length_Slt.val(this.attrList["Number_Length"]);

        // "最大值"设置输入框maxlength
        $.ibo.formEditor.INumber.MaxValue_Txt.attr("maxlength", this.attrList["Number_Length"]);

        // "最小值"设置输入框maxlength
        $.ibo.formEditor.INumber.MinValue_Txt.attr("maxlength", this.attrList["Number_Length"]);

    };

    // 根据"是否负数"设置最大最小输入框可输入值
    this.setMinus = function () {

        var Minus = this.attrList["Number_Minus"] == "true";

        // 设置最大值可输入值
        $.ibo.setNumOnly($.ibo.formEditor.INumber.MaxValue_Txt, this.IsDecimal, Minus);

        // 设置最小值可输入值
        $.ibo.setNumOnly($.ibo.formEditor.INumber.MinValue_Txt, this.IsDecimal, Minus);

    };

    // 添加属性显示方法  显示数字录入接口属性设置
    this.AddShowPrototypeFn(function () {

        // 设置"允许负数"checkbox
        $.ibo.formEditor.INumber.Minus_Txt.prop("checked", this.attrList["Number_Minus"] == "true");
        // "允许负数"设置Li
        $.ibo.formEditor.INumber.Minus_Li.show();

        // 设置"数字长度"下拉框选中项
        this.setDecimallen();
        // "数字长度"设置Li
        $.ibo.formEditor.INumber.Length_Li.show();

        // "最大值"设置输入框
        $.ibo.formEditor.INumber.MaxValue_Txt.val(this.attrList["Number_MaxValue"]);
        // "最大值"设置Li
        $.ibo.formEditor.INumber.MaxValue_Li.show();

        // "最小值"设置输入框
        $.ibo.formEditor.INumber.MinValue_Txt.val(this.attrList["Number_MinValue"]);
        // "最小值"设置Li
        $.ibo.formEditor.INumber.MinValue_Li.show();

        // 根据"是否负数"设置最大最小输入框可输入值
        this.setMinus();

    });

};
// 提示文字接口初始化
$.ibo.formEditor.INumber.Init = function () {

    // "允许负数"设置Li
    $.ibo.formEditor.INumber.Minus_Li = $("#Property_Number_Minus_Li");
    // "允许负数"设置checkbox
    $.ibo.formEditor.INumber.Minus_Txt = $("#Property_Number_Minus_Txt");
    // 绑定"允许负数"checkbox设置属性
    $.ibo.formEditor.INumber.Minus_Txt.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Number_Minus"] = $(this).is(":checked") ? "true" : "false";
        ctrl.setMinus();

        // 不能输入负数
        if (ctrl.attrList["Number_Minus"] == "false") {
            var v = $.ibo.formEditor.INumber.MaxValue_Txt.val();
            // 设置不允许输入负数   若原本最大值输入框的文本是负数   则设为0
            if (v.length > 0 && v[0] == "-") $.ibo.formEditor.INumber.MaxValue_Txt.val("0");

            v = $.ibo.formEditor.INumber.MinValue_Txt.val();
            // 设置不允许输入负数   若原本最小值输入框的文本是负数   则设为0
            if (v.length > 0 && v[0] == "-") $.ibo.formEditor.INumber.MinValue_Txt.val("0");
        }
    });


    // "数字长度"设置Li
    $.ibo.formEditor.INumber.Length_Li = $("#Property_Number_Length_Li");
    // "数字长度"设置下拉框
    $.ibo.formEditor.INumber.Length_Slt = $("#Property_Number_Length_Slt");
    // 绑定"数字长度"下拉框设置属性
    $.ibo.formEditor.INumber.Length_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Number_Length"] = $(this).val();

        var length = parseInt(ctrl.attrList["Number_Length"]);

        // "最大值"设置输入框maxlength
        $.ibo.formEditor.INumber.MaxValue_Txt.attr("maxlength", ctrl.attrList["Number_Length"]);

        // 若"最大值"设置输入框原本输入长度大于length则剪切
        var v = $.ibo.formEditor.INumber.MaxValue_Txt.val();
        if (v.length > length) {
            v = v.substring(0, length);
            // 最后一位是小数点则去掉
            if (v[length - 1] == ".") v = v.substring(0, length - 1);
            // 若只有一位   且输入为符号则置为0
            if (length == 1 && v == "-") v = "0";
            $.ibo.formEditor.INumber.MaxValue_Txt.val(v);
            ctrl.attrList["Number_MaxValue"] = v;
        }

        // "最小值"设置输入框maxlength
        $.ibo.formEditor.INumber.MinValue_Txt.attr("maxlength", ctrl.attrList["Number_Length"]);

        // 若"最小值"设置输入框原本输入长度大于length则剪切
        v = $.ibo.formEditor.INumber.MinValue_Txt.val();
        if (v.length > length) {
            v = v.substring(0, length);
            // 最后一位是小数点则去掉
            if (v[length - 1] == ".") v = v.substring(0, length - 1);
            // 若只有一位   且输入为符号则置为0
            if (length == 1 && v == "-") v = "0";
            $.ibo.formEditor.INumber.MinValue_Txt.val(v);
            // 最小值
            ctrl.attrList["Number_MinValue"]
        }
    });


    // "最大值"设置Li
    $.ibo.formEditor.INumber.MaxValue_Li = $("#Property_Number_MaxValue_Li");
    // "最大值"设置输入框
    $.ibo.formEditor.INumber.MaxValue_Txt = $("#Property_Number_MaxValue_Txt");
    // 绑定"最大值"输入框设置属性
    $.ibo.formEditor.INumber.MaxValue_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Number_MaxValue"] = $(this).val();
    });


    // "最小值"设置Li
    $.ibo.formEditor.INumber.MinValue_Li = $("#Property_Number_MinValue_Li");
    // "最小值"设置输入框
    $.ibo.formEditor.INumber.MinValue_Txt = $("#Property_Number_MinValue_Txt");
    // 绑定"最小值"输入框设置属性
    $.ibo.formEditor.INumber.MinValue_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Number_MinValue"] = $(this).val();
    });

};


// 单选多选框属性接口   isMuti:是否多选
$.ibo.formEditor.ICheckedGroup = function (para, isMuti) {

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 继承录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);


    // CheckedGroup_Option选择群组选项属性
    this.attrList["CheckedGroup_Option"] = typeof para.attrList["CheckedGroup_Option"] == "undefined" ? "[ {\"text\":\"选项1\",\"value\":\"1\"},{\"text\":\"选项2\",\"value\":\"2\"},{\"text\":\"选项3\",\"value\":\"3\"}]" : para.attrList["CheckedGroup_Option"];

    // CheckedGroup_Index选择序列号
    this.attrList["CheckedGroup_Index"] = typeof para.attrList["CheckedGroup_Index"] == "undefined" ? "4" : para.attrList["CheckedGroup_Index"];

    // CheckedGroup_Default默认勾选项
    this.attrList["CheckedGroup_Default"] = typeof para.attrList["CheckedGroup_Default"] == "undefined" ? "[]" : para.attrList["CheckedGroup_Default"];

    // 当前控件是否多选
    this.isMuti = isMuti;

    // 设置"选项"
    this.SetOption = function () {

        // 清空table原有数据
        $.ibo.formEditor.ICheckedGroup.Table.empty();

        // 属性反序列化成对象
        var arr = $.parseJSON(this.attrList["CheckedGroup_Option"]);

        // 遍历对象生成table数据
        for (var i = 0; i < arr.length; i++) {
            this.CreateOptionTr(arr[i]);
        }
    };

    // 获取"选项"
    this.GetOption = function () {

        var arr = [];

        // 遍历Table
        $.each($.ibo.formEditor.ICheckedGroup.Table.find("tr"), function (i, n) {
            var input = $(n).find("input[type=text]");
            var chk = $(n).find("input[name=Property_Checked_input]");
            arr.push({ "text": input.val(), "value": chk.val() });
        });

        this.attrList["CheckedGroup_Option"] = $.toJSON(arr);

        this.setHtmlObj();
    };

    // 创建html对象一行选择项
    this.createCheckedRow = function (n) {

        // 属性反序列化成对象
        var defArr = $.parseJSON(this.attrList["CheckedGroup_Default"]);

        var LineHeight = this.formEditor.View.LineHeight;
        var LineDistance = this.formEditor.View.LineDistance;

        // 生成一行div
        var div = $("<div>");
        div.css({ "width": "100%", "height": LineHeight + "px", "line-height": LineHeight + "px", "margin-bottom": LineDistance + "px" });

        // 生成html选项   多选为checkbox  单选为radio
        var input = $("<input>", { "type": (this.isMuti ? "checkbox" : "radio"), "name": this.HtmlID, "value": n.value });
        input.css({ "margin-left": LineDistance + "px", "margin-top": LineDistance + "px" });
        // 设置是否默认选中
        if (defArr.contain(n.value)) {
            input.prop("checked", true);
        }
        div.append(input);

        // 生成显示文本
        var span = $("<span>");
        span.css({ "display": "inline-block", "height": LineHeight + "px" });
        span.text(n.text);
        div.append(span);

        this.htmlObj.append(div);

    }

    // 设置html对象
    this.setHtmlObj = function () {

        // 属性反序列化成对象
        var arr = $.parseJSON(this.attrList["CheckedGroup_Option"]);

        var height = this.Size().height;

        var line = 0;

        // 清空现有html对象
        this.htmlObj.empty();

        // 遍历对象生成table数据
        for (var i = 0; i < arr.length; i++) {
            this.createCheckedRow(arr[i]);
            line++;
        }

        // 动态设置html对象高度
        this.Size({ "h": this.formEditor.View.CountLineHeight(line) + "px" });
        this.showSelectedLine();

    }
    this.setHtmlObj();

    // 创建选项行  创建于某一行之后afterTr
    this.CreateOptionTr = function (n, afterTr) {

        var ctrl = this;
        // 属性反序列化成对象
        var defArr = $.parseJSON(this.attrList["CheckedGroup_Default"]);

        // 创建行
        var tr = $("<tr>");
        // 创建第一格
        var td = $("<td>");
        // 第一格中   多选为checkbox   单选为radio
        var input = $("<input>", { "type": (this.isMuti ? "checkbox" : "radio"), "name": "Property_Checked_input", "value": n.value });
        // 设置是否默认选中
        if (defArr.contain(n.value)) {
            input.prop("checked", true);
        }
        input.on("click", function () {

            var arr = [];

            // 遍历所有选中input
            $.each($.ibo.formEditor.ICheckedGroup.Table.find("input[name=Property_Checked_input]:checked"), function (i, n) {
                arr.push($(n).val());
            });

            ctrl.attrList["CheckedGroup_Default"] = $.toJSON(arr);
            ctrl.GetOption();
        });
        td.append(input);
        tr.append(td);

        // 创建第二格
        var td = $("<td>");
        // 第二格中为文本输入框
        input = $("<input>", { "type": "text", "class": "ibo-controls-tools-text" });
        input.val(n.text);
        input.on("input propertychange", function () {
            ctrl.GetOption();
        });
        td.append(input);
        tr.append(td);

        // 创建第三格
        var td = $("<td>");
        // 第三格中为新增删除选项按钮
        input = $("<div>");
        input.addClass("ibo-btn-optionAdd");
        input.on("click", function () {
            var obj = { "text": "选项" + ctrl.attrList["CheckedGroup_Index"], "value": ctrl.attrList["CheckedGroup_Index"] };
            ctrl.attrList["CheckedGroup_Index"] = (parseInt(ctrl.attrList["CheckedGroup_Index"]) + 1).toString();
            ctrl.CreateOptionTr(obj, tr);
            ctrl.GetOption();

            // 设置其它下方控件下移一行
            ctrl.setOtherControlPosition(1);
        });
        td.append(input);

        // table中有行则可以添加删除按钮  否则第一行不添加删除按钮
        if ($.ibo.formEditor.ICheckedGroup.Table.find("tr").length > 0) {
            input = $("<div>");
            input.addClass("ibo-btn-optionDlt");
            input.on("click", function () {
                tr.remove();
                ctrl.GetOption();

                // 设置其它下方控件上移一行
                ctrl.setOtherControlPosition(-1);
            });
            td.append(input);
        }

        tr.append(td);

        if (afterTr) afterTr.after(tr);
        else $.ibo.formEditor.ICheckedGroup.Table.append(tr);
    };

    // 添加属性显示方法  显示必填、打印、绑定字段信息的设置
    this.AddShowPrototypeFn(function () {
        // 设置"选项"Table
        this.SetOption();
        // 显示"单选多选框属性接口"设置li
        $.ibo.formEditor.ICheckedGroup.Li.show();

    });

};
// 单选多选框属性接口初始化
$.ibo.formEditor.ICheckedGroup.Init = function () {

    // "单选多选框属性接口"设置li
    $.ibo.formEditor.ICheckedGroup.Li = $("#Property_Checked_Li");
    // "单选多选框属性接口"设置Table
    $.ibo.formEditor.ICheckedGroup.Table = $("#Property_Checked_Table");

};


// 边框设置接口   defaultStyle：默认样式
$.ibo.formEditor.IBorder = function (para, defaultStyle) {

    if (typeof defaultStyle == "undefined") defaultStyle = "2";
    // 边框类别   0：无边框   1：下边框   2：全边框
    this.attrList["Border_Style"] = typeof para.attrList["Border_Style"] == "undefined" ? defaultStyle : para.attrList["Border_Style"];

    // 何止边框类别
    this.SetBorderStyle = function (s) {
        if (typeof s != "undefined") {
            this.attrList["Border_Style"] = s;
        }

        // 根据类别设置CSS样式
        switch (this.attrList["Border_Style"]) {
            case "0":
                this.htmlObj.css({ "border": "0 none" });
                break;
            case "1":
                this.htmlObj.css({ "border": "0 none" });
                this.htmlObj.css({ "border-bottom": "1px solid #CCCCCC" });
                break;
            case "2":
                this.htmlObj.css({ "border": "1px solid #CCCCCC" });
                break;
            default: break;
        }
    };
    this.SetBorderStyle();


    // 添加属性显示方法  显示边框设置
    this.AddShowPrototypeFn(function () {
        // 设置"边框类型"下拉框
        $.ibo.formEditor.IBorder.Border_Slt.val(this.attrList["Border_Style"]);
        // 显示"边框类型"设置Li
        $.ibo.formEditor.IBorder.Border_Li.show();
    });

};
// 边框接口初始化
$.ibo.formEditor.IBorder.Init = function () {

    // "边框类型"设置Li
    $.ibo.formEditor.IBorder.Border_Li = $("#Property_Border_Li");
    // "边框类型"下拉框
    $.ibo.formEditor.IBorder.Border_Slt = $("#Property_Border_Slt");
    // 绑定"边框类型"下拉框设置
    $.ibo.formEditor.IBorder.Border_Slt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.SetBorderStyle($(this).val());
    });

};


// 设置数据源接口   SubPara:{ hasSub:是否需要子表属性, Default:子表属性默认值 }   isForGenerateType:是否与页面制作方式关联
$.ibo.formEditor.IDataSource = function (para, SubPara, isForGenerateType) {

    // 绑定数据源表名
    this.attrList["DataSource_TbName"] = typeof para.attrList["DataSource_TbName"] == "undefined" ? "" : para.attrList["DataSource_TbName"];

    // 数据源是否子表
    if (SubPara.hasSub) {
        // 默认新增控件是否子表属性值
        var defaultV = SubPara.Default;
        // 参数未传递DataSource_IsSub   则是新增控件
        if (typeof para.attrList["DataSource_IsSub"] == "undefined") this.attrList["DataSource_IsSub"] = defaultV;
            // 否则继承参数传递值
        else this.attrList["DataSource_IsSub"] = para.attrList["DataSource_IsSub"] == "true" ? "true" : "false";
    }

    // 更改数据源处理方法数组
    this.afterDataSourceArr = [];
    // 添加更改数据源处理方法
    this.addAfterDataSourceFn = function (fn) {
        this.afterDataSourceArr.push(fn);
    };
    // 设置数据源表信息
    this.setDataSource = function (tbColumnList) {

        // 是否已经修改已有数据表信息
        var hasEdit = false;

        if (this.formEditor.View.subTbColumnListArr.length > 0) {
            // 当前控件HtmlID
            var ParentID = this.HtmlID;
            // 遍历子表字段信息
            $.each(this.formEditor.View.subTbColumnListArr, function (i, n) {
                // 根据当前控件HtmlID查询绑定子表字段信息
                if (n.ParentID == ParentID) {
                    // 重新设置表名
                    n.TbName = tbColumnList.TbName;
                    // 重新设置表描述
                    n.TbNameRmk = tbColumnList.TbNameRmk;
                    // 重新设置字段信息
                    n.TbColumnList = tbColumnList.TbColumnList;
                    hasEdit = true;
                    return false;
                }
            });
        }

        // 不存在已有数据表信息  则新增数据表信息
        if (!hasEdit) {
            this.formEditor.View.subTbColumnListArr.push(tbColumnList);
        }

        // 设置DataSource_TbName属性
        this.attrList["DataSource_TbName"] = tbColumnList.TbName;

        // 遍历执行数据源处理方法
        var length = this.afterDataSourceArr.length;
        if (length > 0) {
            for (i = 0; i < length; i++) {
                var fn = this.afterDataSourceArr[i];
                fn.call(this, tbColumnList);
            }
        }

    };


    // 获取数据源表信息
    this.getDataSource = function () {

        var res = { "TbName": "", "ParentID": this.HtmlID, "TbColumnList": [], "TbNameRmk": "" };

        if (!this.formEditor.View.subTbColumnListArr)
            this.formEditor.View.subTbColumnListArr = [];
        if (this.formEditor.View.subTbColumnListArr.length > 0) {
            // 遍历子表字段信息
            $.each(this.formEditor.View.subTbColumnListArr, function (i, n) {
                // 根据当前控件HtmlID查询绑定子表字段信息
                if (n.ParentID == res.ParentID) {
                    res = n;
                    return false;
                }
            });
        }

        return res;
    };


    // 添加属性显示方法  显示边框设置
    this.AddShowPrototypeFn(function () {

        var TbNameRmk = this.getDataSource().TbNameRmk;
        // 设置"数据源"表名输入框
        $.ibo.formEditor.IDataSource.TbName_Txt.val(TbNameRmk);

        // 显示"数据源"设置Li
        $.ibo.formEditor.IDataSource.TbName_Li.show();

        // 需要子表属性才显示
        if (SubPara.hasSub) {
            // 设置"是否子表"设置checkbox
            $.ibo.formEditor.IDataSource.IsSub_Chk.prop("checked", this.attrList["DataSource_IsSub"] == "true");
            // 显示"是否子表"设置Li
            $.ibo.formEditor.IDataSource.IsSub_Li.show();
        }

        // 关联页面制作方式  且  当前页面为根据页面生成数据表
        if (isForGenerateType && this.formEditor.View.GenerateType == "2") {
            // 隐藏"数据源"表名选择按钮
            $.ibo.formEditor.IDataSource.TbName_Btn.hide();
        }
        else {
            // 显示"数据源"表名选择按钮
            $.ibo.formEditor.IDataSource.TbName_Btn.show();
        }

    });

};
// 设置数据源接口初始化
$.ibo.formEditor.IDataSource.Init = function () {
    // "数据源"设置Li
    $.ibo.formEditor.IDataSource.TbName_Li = $("#Property_DataSource_TbName_Li");
    // "数据源"表名输入框
    $.ibo.formEditor.IDataSource.TbName_Txt = $("#Property_DataSource_TbName_Txt");
    // "数据源"表名选择按钮
    $.ibo.formEditor.IDataSource.TbName_Btn = $("#Property_DataSource_TbName_Btn");

    // "是否子表"设置Li
    $.ibo.formEditor.IDataSource.IsSub_Li = $("#Property_DataSource_IsSub_Li");
    // "是否子表"设置checkbox
    $.ibo.formEditor.IDataSource.IsSub_Chk = $("#Property_DataSource_IsSub_Chk");

    // 绑定"数据源"表名选择按钮设置
    $.ibo.formEditor.IDataSource.TbName_Btn.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];

        var DataSource_IsSub = ctrl.attrList["DataSource_IsSub"] == "true";

        // 给控件设置数据表之前必须先给
        if (DataSource_IsSub && $.trim(ctrl.formEditor.View.TbName).length == 0) {
            $.ibo.ShowErrorMsg("请选给页面设置绑定数据表！");
            return;
        }


        var url = "../../views/select/selectTbName(1).html?TimeStamp=201604011320&";
        // DataSource_IsSub属性为true  则只查询子表数据
        if (DataSource_IsSub) {
            url += "&TbName3=" + ctrl.formEditor.View.TbName;
        }

        // 打开数据表选择窗口
        $.ibo.openNewWin({
            width: 700,
            height: 470,
            hasTitle: true,
            title: "选择数据源",
            url: url,
            callBackFun: function (obj) {

                ctrl.TbNameRmk = obj.TbNameRmk;

                // 设置数据表名输入框
                $.ibo.formEditor.IDataSource.TbName_Txt.val(obj.TbNameRmk);
                ctrl.setDataSource({ "TbName": obj.TbName, "TbNameRmk": obj.TbNameRmk, "ParentID": ctrl.HtmlID, "TbColumnList": obj.TbColumnList, "SelectFields": obj.selectFields });
                // 设置子表字段信息
                formEditor.View.subTbColumnListArr.push({ "TbName": obj.TbName, "ParentID": ctrl.HtmlID, "TbColumnList": obj.TbColumnList, "TbNameRmk": obj.TbNameRmk });
                
                // 生成子表控件
                $.each(obj.selectFields, function (j, m) {
                    formEditor.CreateControlByFieldInfo(m);
                });
                // 设置数据表信息
            
                //ctrl.empty();
                //if (obj.selectFields) {
                //    $.each(obj.selectFields, function (i, n) {
                //        ctrl.CreateControlByFieldInfo(n);
                //    });
                //}
                if ("treeview" == ctrl.ControlType) {       // 只有在当前选中控件为treeview时，才执行如下代码。
                    // obj.TbColumnList 设置到下拉框
                    $.ibo.formEditor.SetBindField($("#Property_TVFieldID_Slt1"), obj.TbColumnList);

                    // obj.TbColumnList 设置到下拉框
                    $.ibo.formEditor.SetBindField($("#Property_RTVFieldID_Slt1"), obj.TbColumnList);

                }
            }
        });
    });

    // 绑定"是否子表"checkbox设置
    $.ibo.formEditor.IDataSource.IsSub_Chk.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];

        // 数据表生成页面控件需要提示   绑定数据表是否子表已经更改
        if (ctrl.formEditor.View.GenerateType == "1") {
            // 若已经绑定数据源
            if ($.trim(ctrl.attrList["DataSource_TbName"]).length > 0) {
                // 提示更改"是否子表"会更改数据源信息
                if (!$.ibo.ShowYesOrNoDialog("当前操作会使控件丢失原有数据源，是否确认执行此操作？")) {
                    $(this).prop("checked", !$(this).is(":checked"));
                    return;
                }
            }

            // 设置数据表信息   跟换绑定表类别   则清除之前绑定数据表信息
            ctrl.setDataSource({ "TbName": "", "TbNameRmk": "", "ParentID": ctrl.HtmlID, "TbColumnList": [] });
            $.ibo.formEditor.IDataSource.TbName_Txt.val("");
        }

        // 设置DataSource_IsSub属性
        ctrl.attrList["DataSource_IsSub"] = $(this).is(":checked") ? "true" : "false";

    });

};


// 设置数据源接口——为treeview控件另外写的接口（叶节点数据源）
$.ibo.formEditor.IDataSourceTV = function (para) {

    // 更改数据源处理方法数组
    this.afterDataSourceArr2 = [];
    // 添加更改数据源处理方法
    this.addAfterDataSourceFn2 = function (fn) {
        this.afterDataSourceArr2.push(fn);
    };
    // 设置数据源表信息
    this.setDataSource2 = function (tbColumnList) {

        // 是否已经修改已有数据表信息
        var hasEdit = false;

        if (this.formEditor.View.subTbColumnListArr2.length > 0) {
            // 当前控件HtmlID
            var ParentID = this.HtmlID;
            // 遍历子表字段信息
            $.each(this.formEditor.View.subTbColumnListArr2, function (i, n) {
                // 根据当前控件HtmlID查询绑定子表字段信息
                if (n.ParentID == ParentID) {
                    // 重新设置表名
                    n.TbName = tbColumnList.TbName;
                    // 重新设置表描述
                    n.TbNameRmk = tbColumnList.TbNameRmk;
                    // 重新设置字段信息
                    n.TbColumnList = tbColumnList.TbColumnList;
                    hasEdit = true;
                    return false;
                }
            });
        }

        // 不存在已有数据表信息  则新增数据表信息
        if (!hasEdit) {
            this.formEditor.View.subTbColumnListArr2.push(tbColumnList);
        }

        // 设置DataSource_TbName2属性
        this.attrList["DataSource_TbName2"] = tbColumnList.TbName;
        this.attrList["DataSource_TbName_Rmk2"] = tbColumnList.TbNameRmk;
        this.attrList["DataSource_TbSelectColumns2"] = $.toJSON(tbColumnList.SelectFields);
        this.attrList["DataSource_TbColumns2"] = $.toJSON(tbColumnList.TbColumnList);

        // 遍历执行数据源处理方法
        var length = this.afterDataSourceArr2.length;
        if (length > 0) {
            for (i = 0; i < length; i++) {
                var fn = this.afterDataSourceArr2[i];
                fn.call(this);
            }
        }

    };

    // 获取数据源表信息
    this.getDataSource2 = function () {

        var res = { "TbName": "", "ParentID": this.HtmlID, "TbColumnList": [] };

        if (this.formEditor.View.subTbColumnListArr2 && this.formEditor.View.subTbColumnListArr2.length > 0) {
            // 遍历子表字段信息
            $.each(this.formEditor.View.subTbColumnListArr2, function (i, n) {
                // 根据当前控件HtmlID查询绑定子表字段信息
                if (n.ParentID == res.ParentID) {
                    res = n;
                    return false;
                }
            });
        }

        return res;
    };


    // 添加属性显示方法  显示边框设置
    this.AddShowPrototypeFn(function () {

        // 显示第一个数据源绑定字段的Li
        $.ibo.formEditor.IDataSourceTV.TVFieldID_Li1.show();

        // 第一个"数据源"的"绑定字段"关联字段Li1（用于关联父节点和叶节点的关系）
        $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li1.show();

        // 显示"是否设置叶结点数据源"checkbox
        $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Li.show();

        // 如果勾选"是否设置叶结点数据源"，则将叶节点数据源的相关DOM元素显示出来
        if ($("#Property_IsSetLeafDataSource_Chk").prop("checked")) {
            var TbNameRmk = this.getDataSource2().TbNameRmk;
            if (TbNameRmk)
                $.ibo.formEditor.IDataSourceTV.TbName_Txt2.val(this.getDataSource2().TbNameRmk);
            $.ibo.formEditor.IDataSourceTV.TbName_Li2.show();
            $.ibo.formEditor.IDataSourceTV.TVFieldID_Li2.show();

            // 第二个"数据源"的"绑定字段"关联字段Li3（用于关联父节点和叶节点的关系）
            $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li3.show();
        }
    });
};
// 设置数据源接口以及它对应的绑定字段的初始化——为treeview控件另外写的接口（叶节点数据源）
$.ibo.formEditor.IDataSourceTV.Init = function () {
    // 字段一 "绑定字段"下拉框（父节点）
    $.ibo.formEditor.IDataSourceTV.TVFieldID_Slt1 = $("#Property_TVFieldID_Slt1");
    // 字段二 "绑定字段"下拉框（叶节点）
    $.ibo.formEditor.IDataSourceTV.TVFieldID_Slt2 = $("#Property_TVFieldID_Slt2");


    // "是否设置叶结点数据源"checkbox
    $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Li = $("#Property_IsSetLeafDataSource_Li");
    // "是否设置叶结点数据源"勾选框
    $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk = $("#Property_IsSetLeafDataSource_Chk");
    // 绑定"叶数据源"checkbox设置
    $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];

        if ($(this).prop("checked")) {      // 如果勾选，则将叶节点数据源的相关DOM元素显示出来
            // 每次勾选都要将第二个数据源相关DOM元素设置成初始状态
            $.ibo.formEditor.IDataSourceTV.TbName_Txt2.val("");
            $.ibo.formEditor.IDataSourceTV.TVFieldID_Li2.find("option").remove();
            $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li3.find("option").remove();

            $.ibo.formEditor.IDataSourceTV.TbName_Li2.show();
            $.ibo.formEditor.IDataSourceTV.TVFieldID_Li2.show();
            $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li3.show();
        }
        else {      // 反之，则将叶节点数据源的相关DOM元素隐藏
            $.ibo.formEditor.IDataSourceTV.TbName_Li2.hide();
            $.ibo.formEditor.IDataSourceTV.TVFieldID_Li2.hide();
            $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li3.hide();
        }

        // 设置IsSetLeafDataSource（设置叶节点数据源）属性
        if (ctrl)
            ctrl.attrList["IsSetLeafDataSource"] = $(this).is(":checked") ? "true" : "false";

    });

    // 第一个数据源的相关设置共用原来的，所以这里不写
    // 第一个"数据源"的"绑定字段"设置Li（用于作为父节点的文本显示）
    $.ibo.formEditor.IDataSourceTV.TVFieldID_Li1 = $("#Property_TVFieldID_Li1");
    // 第一个"数据源"的"绑定字段"下拉框
    $.ibo.formEditor.IDataSourceTV.TVFieldID1 = $("#Property_TVFieldID_Slt1");
    // 第一个"数据源"的绑定"绑定字段"下拉框更改选中项同时更改选中控件属性
    $.ibo.formEditor.IDataSourceTV.TVFieldID1.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["DataSource_FieldID"] = $(this).val();
        ctrl.attrList["DataSource_FieldName1"] = $(this).find("option[value='" + $(this).val() + "']").attr("fieldname");
    });

    // 第一个"数据源"的"绑定字段"关联字段Li1（用于关联父节点和叶节点的关系）
    $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li1 = $("#Property_RTVFieldID_Li1");
    // 第一个"数据源"的"绑定字段"关联字段下拉框1
    $.ibo.formEditor.IDataSourceTV.RTVFieldID1 = $("#Property_RTVFieldID_Slt1");
    // 第一个"数据源"的"绑定字段"关联字段下拉框1更改选中项同时更改选中控件属性
    $.ibo.formEditor.IDataSourceTV.RTVFieldID1.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["DataSource_RFieldID1"] = $(this).val();
        ctrl.attrList["DataSource_RFieldName1"] = $(this).find("option[value='" + $(this).val() + "']").attr("fieldname");
    });




    // 第二个"数据源"设置Li
    $.ibo.formEditor.IDataSourceTV.TbName_Li2 = $("#Property_DataSourceTV_TbName_Li2");
    // 第二个"数据源"表名输入框
    $.ibo.formEditor.IDataSourceTV.TbName_Txt2 = $("#Property_DataSourceTV_TbName_Txt2");
    // 第二个"数据源"表名选择按钮
    $.ibo.formEditor.IDataSourceTV.TbName_Btn2 = $("#Property_DataSourceTV_TbName_Btn2");
    // 第二个绑定"数据源"表名选择按钮设置
    $.ibo.formEditor.IDataSourceTV.TbName_Btn2.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];        //当前被选中控件，即treeview控件
        var url = "../../views/select/selectTbName(1).html?TimeStamp=201604011320&";

        // 打开数据表选择窗口
        $.ibo.openNewWin({
            width: 700,
            height: 470,
            hasTitle: true,
            title: "选择数据源",
            url: url,
            callBackFun: function (obj) {

                ctrl.TbNameRmk2 = obj.TbNameRmk;

                // 设置数据表名输入框
                $.ibo.formEditor.IDataSourceTV.TbName_Txt2.val(obj.TbNameRmk);

                // 设置数据表信息
                ctrl.setDataSource2({ "TbName": obj.TbName, "TbNameRmk": obj.TbNameRmk, "ParentID": ctrl.HtmlID, "TbColumnList": obj.TbColumnList, "SelectFields": obj.selectFields });

                if ("treeview" == ctrl.ControlType) {       // 只有在当前选中控件为treeview时，才执行如下代码。
                    // obj.TbColumnList 设置到下拉框
                    $.ibo.formEditor.SetBindField($("#Property_TVFieldID_Slt2"), obj.TbColumnList);

                    // obj.TbColumnList 设置到下拉框
                    $.ibo.formEditor.SetBindField($("#Property_RTVFieldID_Slt3"), obj.TbColumnList);
                }
            }
        });
    });

    // 第二个"数据源"的"绑定字段"设置Li（用于作为叶节点的文本显示）
    $.ibo.formEditor.IDataSourceTV.TVFieldID_Li2 = $("#Property_TVFieldID_Li2");
    // 第二个"数据源"的"绑定字段"下拉框
    $.ibo.formEditor.IDataSourceTV.TVFieldID2 = $("#Property_TVFieldID_Slt2");
    // 第二个"数据源"的绑定"绑定字段"下拉框更改选中项同时更改选中控件属性
    $.ibo.formEditor.IDataSourceTV.TVFieldID2.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["DataSource_FieldID2"] = $(this).val();
        ctrl.attrList["DataSource_FieldName2"] = $(this).find("option[value='" + $(this).val() + "']").attr("fieldname");
    });

    // 第二个"数据源"的"绑定字段"关联字段Li3（用于关联父节点和叶节点的关系）
    $.ibo.formEditor.IDataSourceTV.RTVFieldID_Li3 = $("#Property_RTVFieldID_Li3");
    // 第二个"数据源"的"绑定字段"关联字段下拉框3
    $.ibo.formEditor.IDataSourceTV.RTVFieldID3 = $("#Property_RTVFieldID_Slt3");
    // 第二个"数据源"的"绑定字段"关联字段下拉框3更改选中项同时更改选中控件属性
    $.ibo.formEditor.IDataSourceTV.RTVFieldID3.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["DataSource_RFieldID3"] = $(this).val();
        ctrl.attrList["DataSource_RFieldName3"] = $(this).find("option[value='" + $(this).val() + "']").attr("fieldname");
    });
};

// 选择图片属性接口
$.ibo.formEditor.IImage = function (para) {

    (function () {

        // 绑定图片路径字段
        this.attrList["Img_Src"] = typeof para.attrList["Img_Src"] == "undefined" ? "" : para.attrList["Img_Src"];

        // 设置图片路径
        this.setSrc = function (src) {
            // 属性数组保存路径
            this.attrList["Img_Src"] = src;

            if (this.htmlObj) {
                if (typeof src != "undefined") {
                    this.htmlObj.attr("src", src);
                }
                else this.htmlObj.attr("src", "");
            }
        };
        this.setSrc(typeof para.attrList["Img_Src"] == "undefined" ? "" : para.attrList["Img_Src"]);

        // 选择图片后触发事件   默认设置保存图片路径 显示图片至html对象
        this.afterLoadImg = function (url) {
            this.setSrc(url);
        };

        // 添加属性显示方法  显示选择图片的设置
        this.AddShowPrototypeFn(function () {
            // 显示选择图片 Li
            $.ibo.formEditor.IImage.Src_Li.show();
        });

    }).call(this);


};
// 选择图片属性接口初始化
$.ibo.formEditor.IImage.Init = function () {
    // "选择图片"设置Li
    $.ibo.formEditor.IImage.Src_Li = $("#Property_Img_Li");
    // "选择图片"设置input
    $.ibo.formEditor.IImage.Src_File = $("#Property_Img_File");
    // 绑定"选择图片"input设置属性
    $.ibo.formEditor.IImage.Src_File.on("change", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 上传附件
        $.ibo.Upload({
            "file": this.files[0],
            complete: function (evt) {
                // 保存文件路径
                var url = evt.target.responseText;
                ctrl.afterLoadImg(url);

                // 上传完毕后  复制原input file替换   用于处理选择相同图片不触发change事件问题
                var clone = $.ibo.formEditor.IImage.Src_File.clone(true);
                $.ibo.formEditor.IImage.Src_File.after(clone);
                $.ibo.formEditor.IImage.Src_File.remove();
                $.ibo.formEditor.IImage.Src_File = clone;
            }
        });
    });



};



/******************************  下拉框 select ******************************/

// 下拉框 select
$.ibo.formEditor.select = function (formEditor, para) {

    // 创建下拉框基本html
    this.createHtmlObject = function () {
        var obj = $("<select>", { "id": this.HtmlID });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "下拉框");

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);


    // 私有属性设置
    (function () {

        //  Select_Options属性,存储下拉框数据项数据,不同数据项以换行符'\n'分隔  默认为""空字符串
        this.attrList["Select_Options"] = typeof para.attrList["Select_Options"] == "undefined" ? "" : para.attrList["Select_Options"];

        // DefaultValue属性,下拉框初始选中值  默认为""
        this.attrList["Select_Default"] = typeof para.attrList["Select_Default"] == "undefined" ? "" : para.attrList["Select_Default"];

        // 设置数据项
        this.SetOptions = function (ops) {
            // 若有传ops参数  则替换控件attrList["Select_Options"]属性
            if (typeof ops != "undefined") {
                this.attrList["Select_Options"] = ops;
            }

            // 清空数据项下拉框
            $.ibo.formEditor.select.Slt.empty();
            // para.attrList["Select_Options"]不undefined  则根据内容创建下拉框
            if ($.trim(this.attrList["Select_Options"]).length > 0) {
                // 空选择项目
                var option = $("<option>");
                option.val("");
                option.text("请选择");
                $.ibo.formEditor.select.Slt.append(option);

                // Options各项根据换行符'\n'分隔
                var arr = this.attrList["Select_Options"].split("\n");
                // 遍历生成option
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    var v = $.trim(arr[i]);
                    // 选项为空字符
                    if (v.length > 0) {
                        option = $("<option>");
                        option.val(v);
                        option.text(v);
                        $.ibo.formEditor.select.Slt.append(option);
                    }
                }
                // 重新设置数据项   更改选择默认值
                if (typeof ops != "undefined") this.attrList["Select_Default"] = "";
            }

            // 未设置任何下拉项 则设置下拉框禁用  显示为设置
            if ($.ibo.formEditor.select.Slt.find("option:first").length == 0) {
                var option = $("<option>");
                option.val("");
                option.text("未设置任何选项");
                $.ibo.formEditor.select.Slt.append(option);
                $.ibo.formEditor.select.Slt.val("");
                $.ibo.formEditor.select.Slt.prop("disabled", true);
            }
                // 否则下拉框可使用
            else {
                $.ibo.formEditor.select.Slt.prop("disabled", false);
            }
        };

    }).call(this);


    // 添加属性显示方法  显示数据项设置
    this.AddShowPrototypeFn(function () {
        // 根据attrList["Select_Options"]属性重置数据项下拉框选项
        this.SetOptions();
        // 设置数据项下拉框默认值
        $.ibo.formEditor.select.Slt.val(this.attrList["Select_Default"]);
        // 显示数据项设置
        $.ibo.formEditor.select.Li.show();
    });


    // 添加验证控件方法
    this.AddDoValidFn(function () {

        // 默认合法
        IsValid = false;

        if (this.attrList["Select_Options"]) {
            // 根据换行符\n分隔字符串
            var arr = this.attrList["Select_Options"].split("\n");

            // 遍历判断
            $.each(arr, function (i, n) {
                // 有设置任意一项则判断合法
                if ($.trim(n).length > 0) {
                    IsValid = true;
                    return false;
                }
            });
        }

        if (!IsValid) {
            $.ibo.ShowErrorMsg("请给下拉框设置数据项！");
        }

        return IsValid;
    });

};
// 下拉框初始化
$.ibo.formEditor.select.Init = function () {

    // "数据项"设置Li
    $.ibo.formEditor.select.Li = $("#Property_Select_Options_Li");
    // "下拉项"下拉框
    $.ibo.formEditor.select.Slt = $("#Property_Select_Options_Slt");
    // "数据项"按钮
    $.ibo.formEditor.select.SltBtn = $("#Property_Select_Options_Btn");
    // "数据项"设置面板
    $.ibo.formEditor.select.SetDiv = $("#Property_Select_Options_SetDiv");
    // "数据项"设置多行输入框
    $.ibo.formEditor.select.Textarea = $("#Property_Select_Options_Textarea");
    // "数据项"设置保存按钮
    $.ibo.formEditor.select.SaveBtn = $("#Property_Select_Options_SetDiv_Save");
    // "数据项"设置取消按钮
    $.ibo.formEditor.select.CancalBtn = $("#Property_Select_Options_SetDiv_Cancel");


    // 绑定"下拉项"下拉框更改选中项同时更改选中控件属性
    $.ibo.formEditor.select.Slt.on("input propertychange", function () {

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Select_Default"] = $(this).val();
    });


    // 绑定"数据项"按钮打开设置数据项面板
    $.ibo.formEditor.select.SltBtn.on("click", function () {

        // 设置面板位置与按钮相同
        var offset = $(this).offset();
        $.ibo.formEditor.select.SetDiv.css({ "top": offset.top + "px", "left": offset.left + "px" });

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置Textarea文本值
        $.ibo.formEditor.select.Textarea.val(ctrl.attrList["Select_Options"]);

        // 显示设置面板
        $.ibo.formEditor.select.SetDiv.show();
    });


    // 绑定"数据项"面板保存按钮保存数据项更改
    $.ibo.formEditor.select.SaveBtn.on("click", function () {
        // 获取Textarea的内容
        var v = $.ibo.formEditor.select.Textarea.val();

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置控件"数据项"属性
        ctrl.SetOptions(v);

        // 隐藏设置面板
        $.ibo.formEditor.select.SetDiv.hide();
    });


    // 绑定"数据项"面板取消按钮取消数据项更改
    $.ibo.formEditor.select.CancalBtn.on("click", function () {
        // 隐藏设置面板
        $.ibo.formEditor.select.SetDiv.hide();
    });


};



/******************************  单行输入框 text ******************************/

// 输入框 text
$.ibo.formEditor.text = function (formEditor, para) {

    // 创建单行输入框基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "type": "text", "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口继承事件接口   只能绑定打开数据选择事件
    $.ibo.formEditor.IEvent.call(this, para, { "NoJs": $.ibo.formEditor.EventType.NoJs, "OpenSltDataWin": $.ibo.formEditor.EventType.OpenSltDataWin });

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "单行输入框");

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);

};



/******************************  数字框 number ******************************/

// 数字框 number
$.ibo.formEditor.number = function (formEditor, para) {

    // 创建数字框基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "type": "text", "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "数字输入框");

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);

    // 数字录入接口 { "Number_Length":"默认初始数字长度", "Number_MaxValue":"默认初始最大值", "Number_MinValue":"默认初始最小值","IsDecimal":"是否允许小数" }
    $.ibo.formEditor.INumber.call(this, para, { "Number_Length": "9", "Number_MaxValue": "999999999", "Number_MinValue": "0" });

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

};



/******************************  小数输入框 decimal ******************************/

// 小数输入框 decimal
$.ibo.formEditor.decimal = function (formEditor, para) {

    // 创建数字框基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "type": "text", "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "小数输入框");

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);

    // 数字录入接口 { "Number_Length":"默认初始数字长度", "Number_MaxValue":"默认初始最大值", "Number_MinValue":"默认初始最小值","IsDecimal":"是否允许小数" }
    $.ibo.formEditor.INumber.call(this, para, { "Number_Length": "18", "Number_MaxValue": "9999999999.9999", "Number_MinValue": "0", "IsDecimal": "true" });

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);


    // 私有属性设置
    (function () {
        //  DotNumber属性,存储小数位数
        this.attrList["Decimal_DotNumber"] = typeof para.attrList["Decimal_DotNumber"] == "undefined" ? "4" : para.attrList["Decimal_DotNumber"];

        // 重写setMinus方法   设置最大最小值可输入小数位数
        this.setMinus = function () {
            var Minus = this.attrList["Number_Minus"] == "true";

            // 设置最大值可输入值
            $.ibo.setNumOnly($.ibo.formEditor.INumber.MaxValue_Txt, this.IsDecimal, Minus, this.attrList["Decimal_DotNumber"]);

            // 设置最小值可输入值
            $.ibo.setNumOnly($.ibo.formEditor.INumber.MinValue_Txt, this.IsDecimal, Minus, this.attrList["Decimal_DotNumber"]);
        };
    }).call(this);

    // 添加属性显示方法   显示小数长度属性
    this.AddShowPrototypeFn(function () {

        // 设置"小数长度"下拉框
        $.ibo.formEditor.decimal.DotLength_Slt.val(this.attrList["Decimal_DotNumber"]);

        this.setMinus();
        // 显示"小数长度"设置Li
        $.ibo.formEditor.decimal.DotLength_Li.show();
    });

};
// 初始化小数输入框
$.ibo.formEditor.decimal.Init = function () {

    // "小数长度"设置Li
    $.ibo.formEditor.decimal.DotLength_Li = $("#Property_Number_DotLength_Li");
    // "小数长度"设置下拉框
    $.ibo.formEditor.decimal.DotLength_Slt = $("#Property_Number_DotLength_Slt");
    // 绑定"小数长度"设置属性
    $.ibo.formEditor.decimal.DotLength_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Decimal_DotNumber"] = $(this).val();
        ctrl.setMinus();
    });

};



/******************************  日期 date ******************************/

// 日期 date
$.ibo.formEditor.date = function (formEditor, para) {

    // 创建数字框基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "type": "date", "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "日期");

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 私有属性设置
    (function () {
        // 是否默认当前日期
        this.attrList["Date_Default"] = para.attrList["Date_Default"] == "true" ? "true" : "false";
        // 是否附带时间
        this.attrList["Date_HasTime"] = para.attrList["Date_HasTime"] == "true" ? "true" : "false";
    }).call(this);

    // 设置HTML控件
    this.setInput = function () {
        // 需要时间type=datetime-local
        if (this.attrList["Date_HasTime"] == "true") {
            this.htmlObj.attr("type", "datetime-local");
        }
            // 不需要时间type=date
        else {
            this.htmlObj.attr("type", "date");
        }
    };
    this.setInput();

    // 添加属性显示方法   显示小数长度属性
    this.AddShowPrototypeFn(function () {

        // 设置是否当前日期checkbox
        $.ibo.formEditor.date.Date_Default_Chk.prop("checked", this.attrList["Date_Default"] == "true");

        // 显示是否当前日期设置Li
        $.ibo.formEditor.date.Date_Default_Li.show();

        // 设置是否附带时间checkbox
        $.ibo.formEditor.date.Date_HasTime_Chk.prop("checked", this.attrList["Date_HasTime"] == "true");

        // 设置是否附带时间Li
        $.ibo.formEditor.date.Date_HasTime_Li.show();
    });

};
// 日期初始化
$.ibo.formEditor.date.Init = function () {
    // 是否当前日期设置Li
    $.ibo.formEditor.date.Date_Default_Li = $("#Property_Date_Default_Li");
    // 是否当前日期设置checkbox
    $.ibo.formEditor.date.Date_Default_Chk = $("#Property_Date_Default_Chk");

    // 绑定是否当前日期设置
    $.ibo.formEditor.date.Date_Default_Chk.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Date_Default"] = $(this).prop("checked") ? "true" : "false";
    });

    // 是否附带时间Li
    $.ibo.formEditor.date.Date_HasTime_Li = $("#Property_Date_HasTime_Li");
    // 是否附带时间checkbox
    $.ibo.formEditor.date.Date_HasTime_Chk = $("#Property_Date_HasTime_Chk");

    // 绑定是否附带时间设置
    $.ibo.formEditor.date.Date_HasTime_Chk.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Date_HasTime"] = $(this).prop("checked") ? "true" : "false";
        ctrl.setInput();
    });


};



/******************************  多行文本框 textarea ******************************/

// 多行文本框 textarea
$.ibo.formEditor.textarea = function (formEditor, para) {

    // 创建多行文本框基本html
    this.createHtmlObject = function () {
        var obj = $("<textarea>", { "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "多行文本框");

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 4);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, true, true);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);
};



/******************************  图片 image ******************************/

// 图片 image
$.ibo.formEditor.image = function (formEditor, para) {

    // 创建多行文本框基本html
    this.createHtmlObject = function () {
        var obj = $("<img>", { "id": this.HtmlID });
        return obj;
    };


    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "图片");

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 4);

    // 事件接口
    $.ibo.formEditor.IEvent.call(this, para);

    // 设置尺寸接口  可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, true, true);

    //选择图片接口
    $.ibo.formEditor.IImage.call(this, para);


    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

};


/******************************  多选框 checkbox ******************************/

// 勾选框 checkbox
$.ibo.formEditor.checkbox = function (formEditor, para) {

    // 创建多选框基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        obj.css({ "overflow": "hidden", "text-align": "left" });
        obj.addClass("grayborder");
        return obj;
    };

    // 单选多选框接口
    $.ibo.formEditor.ICheckedGroup.call(this, para, true);
    // 标题接口
    para.attrList["Title_HasTitle"] = "false";
    para.ControlName = "多选框";
    $.ibo.formEditor.ITitle.call(this, para, para);
  

};



/******************************  单选框 radio ******************************/

// 单选框 radio
$.ibo.formEditor.radio = function (formEditor, para) {

    // 创建多选框基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        obj.css({ "overflow": "hidden", "text-align": "left" });
        obj.addClass("grayborder");
        return obj;
    };


    // 单选多选框接口
    $.ibo.formEditor.ICheckedGroup.call(this, para, false);
    // 标题接口
    para.attrList["Title_HasTitle"] = "false";
    para.ControlName = "单选框";
    $.ibo.formEditor.ITitle.call(this, para, para);
   

};


/******************************  表格 table ******************************/

// 表格 table
$.ibo.formEditor.table = function (formEditor, para) {
    // 创建多选框基本html
    var para_m = para;
    this.createHtmlObject = function () {
        var row = 2;// parseInt(ctrlObj.attrList["gridrows"]);
        var htmlid = this.HtmlID;
        var obj = $("<div>", { "id": htmlid });
        obj.css({ "overflow": "hidden" });
        obj.addClass("grayborder");
        if (para_m != undefined && para_m.attrList["table_rows"] != undefined) {
            var table_rows = para_m.attrList["table_rows"];
            var table_fontsize = para_m.attrList["table_fontsize"];
            var table_fields = $.parseJSON(para_m.attrList["table_fields"]);
            var table_colradio = para_m.attrList["table_colradio"];
            var tab_bindfields = para_m.attrList["tab_bindfields"];
            var table_hideheader = para_m.attrList["table_hideheader"];
            var hidFrame = para_m.attrList["Border_Style"] == "2" ? true : false;//边框

            var para_t = { table_rows: table_rows, table_fontsize: table_fontsize, table_fields: table_fields, table_colradio: table_colradio, tab_bindfields: tab_bindfields, table_hideheader: table_hideheader, hidFrame: hidFrame };

            var divRow = setTableByParams(htmlid, para_t);
            obj.append(divRow);
        }
        else {
            var tb = $("<table>");

            // 行数



            // 列信息
            var colInfo = [
                { "Rmk": "标题1", "BackColor": "#FFFFFF", "ForeColor": "#000000", "IsShow": true, "ColWidth": this.formEditor.width / 2 + "px" },
                { "Rmk": "标题2", "BackColor": "#FFFFFF", "ForeColor": "#000000", "IsShow": true, "ColWidth": this.formEditor.width / 2 + "px" },
            ];

            // 情况table原数据
            tb.empty();
            // 标题行
            var thTrObj = $("<tr>");
            thTrObj.css({ "height": (this.formEditor.View.LineHeight - 2) + "px", "border-top": "1px solid #BEBEBE" });
            tb.append(thTrObj);
            // 内容行
            var tdTrArr = [];
            for (var i = 0; i < row; i++) {
                var tdTrObj = $("<tr>")
                tdTrArr.push(tdTrObj);
                tdTrObj.css({ "height": (this.formEditor.View.LineHeight + this.formEditor.View.LineDistance) + "px", "border-top": "1px solid #BEBEBE" });
                tb.append(tdTrObj);
            }

            var length = colInfo.length;
            for (var i = 0; i < length; i++) {
                var colObj = colInfo[i];
                if (colObj.IsShow) {
                    var thObj = $("<th>");
                    thObj.css({ "background": "#EDEDED", "color": "#000000", "width": colObj.ColWidth, "border-right": "1px solid #BEBEBE", "text-align": "center" });
                    thObj.text(colObj.Rmk);
                    thTrObj.append(thObj);

                    $.each(tdTrArr, function (j, n) {
                        var tdObj = $("<td>");
                        tdObj.css({ "background": colObj.BackColor, "color": colObj.ForeColor, "border-right": "1px solid #BEBEBE" });
                        n.append(tdObj);
                    });
                }
            }
            obj.append(tb);
        }
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 1);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);
    this.Size({ "h": "200px" });
    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);


    // 数据源接口   不需要子表属性   不需要关联页面制作方式
    $.ibo.formEditor.IDataSource.call(this, para, { "hasSub": false }, false);


    // 私有属性设置
    this.setPrivateProp = function () {

        this.attrList["table_rows"] = typeof para.attrList["table_rows"] == "undefined" ? "1" : para.attrList["table_rows"];//列表行数
        this.attrList["table_fontsize"] = typeof para.attrList["table_fontsize"] == "undefined" ? "" : para.attrList["table_fontsize"];//列表字体
        this.attrList["table_fields"] = typeof para.attrList["table_fields"] == "undefined" ? [] : para.attrList["table_fields"];//列属性设置
        this.attrList["table_colradio"] = typeof para.attrList["table_colradio"] == "undefined" ? "0" : para.attrList["table_colradio"];//是否显示单选按钮列
        this.attrList["tab_bindfields"] = typeof para.attrList["tab_bindfields"] == "undefined" ? [] : para.attrList["tab_bindfields"];//是否显示操作字段
        //tab_bindfields.push({ itemDesc, IsShow, itemImg, colorback, colorfore, jsevent, linktitle, UrlTyp, linkurl_text, linkurl_value, pageparams, linkurl_fields});

        this.attrList["table_hideheader"] = typeof para.attrList["table_hideheader"] == "undefined" ? "0" : para.attrList["table_hideheader"];//每行显示列数


    };
    this.setPrivateProp();
    // 添加显示属性方法  显示按钮私有属性
    this.AddShowPrototypeFn(function () {

        // 是否显示绑定字段
        $.ibo.formEditor.table.Table_OperateField_Li.show();

        //是否显示网格列标题
        $.ibo.formEditor.table.Table_HideHeader_Li.show();
        //每页显示行数
        $.ibo.formEditor.table.Table_Rows_Li.show();
        //网格字体
        $.ibo.formEditor.table.Table_FontSize_Li.show();
        //网格字段设置
        $.ibo.formEditor.table.Table_Cols_Li.show();

        $("#Table_HideHeader_chk")[0].checked = this.attrList["table_hideheader"] == "1" ? true : false;
        $("#Table_Rows_Txt").val(this.attrList["table_rows"]);
        $("#Table_FontSize_Txt").val(this.attrList["table_fontsize"]);
        $("#Table_colRadio")[0].checked = this.attrList["table_colradio"] == "1" ? true : false;
        $("#Table_Rows_Txt").val(this.attrList["table_rows"]);
    });

};


// 初始化表格输入框
$.ibo.formEditor.table.Init = function () {

    $.ibo.formEditor.table.Property_Img_Li = $("#Property_Img_Li");

    // 是否显示操作字段
    $.ibo.formEditor.table.Table_OperateField_Li = $("#Table_OperateField_Li");
    $.ibo.formEditor.table.Table_Cols_Href = $("#Table_OperateField_Href");
    $.ibo.formEditor.table.Table_Cols_Href.on("click", function () {
        showOperateColumns(700, 300, this);
        $("select[name='tab_JsEvent_Slt']").each(function (i, n) {

            switch ($(n).val()) {
                case "8"://打开新窗口
                    $.ibo.tabOpenNewWinFn(i);
                    break;
                case "9":
                case "10":
                case "11":
                case "12":
                    $.ibo.tabOpenInnerWinFn(i);
                    break;
                default:
                    $.ibo.tabEvent_HideAttr(i);
            }
        });

    });



    //是否显示网格列标题
    $.ibo.formEditor.table.Table_HideHeader_Li = $("#Table_HideHeader_Li");
    $.ibo.formEditor.table.Table_HideHeader_chk = $("#Table_HideHeader_chk");
    $.ibo.formEditor.table.Table_HideHeader_chk.on("click", function () {
        if ($(this).is(":checked")) {
            formEditor.sltControls[0].attrList["table_hideheader"] = "1";
        }
        else {
            formEditor.sltControls[0].attrList["table_hideheader"] = "0";
        }

    });

    //是否单选列
    $.ibo.formEditor.table.Table_colRadio = $("#Table_colRadio");
    $.ibo.formEditor.table.Table_colRadio.on("click", function () {
        if ($(this).is(":checked")) {
            formEditor.sltControls[0].attrList["table_colradio"] = "1";
        }
        else {
            formEditor.sltControls[0].attrList["table_colradio"] = "0";
        }

    });


    //每页显示行数
    $.ibo.formEditor.table.Table_Rows_Li = $("#Table_Rows_Li");
    $.ibo.formEditor.table.Table_Rows_Txt = $("#Table_Rows_Txt");
    $.ibo.formEditor.table.Table_Rows_Txt.on("input propertychange", function () {
        formEditor.sltControls[0].attrList["table_rows"] = $(this).val();
    });
    //网格字体
    $.ibo.formEditor.table.Table_FontSize_Li = $("#Table_FontSize_Li");
    $.ibo.formEditor.table.Table_FontSize_Txt = $("#Table_FontSize_Txt");
    $.ibo.formEditor.table.Table_FontSize_Txt.on("input propertychange", function () {
        formEditor.sltControls[0].attrList["table_fontsize"] = $(this).val();
    });
    //网格字段设置
    $.ibo.formEditor.table.Table_Cols_Li = $("#Table_Cols_Li");
    $.ibo.formEditor.table.Table_Cols_Href = $("#Table_Cols_Href");
    $.ibo.formEditor.table.Table_Cols_Href.on("click", function () {
        showPopColumns(380, 350, this);
    });

};
//设置表格效果
function setTableByParams(HtmlID, para) {
    var table_rows = para.table_rows;
    var table_fontsize = para.table_fontsize;
    var table_fields = para.table_fields;
    var table_colradio = para.table_colradio;
    var tab_bindfields = para.tab_bindfields;
    var table_hideheader = para.table_hideheader;

    var hidFrame = para.Border_Style == "2" ? true : false;//边框
    var LineHeight = "30px";

    var divRow = $("<table>", { "id": HtmlID + "_list", "class": "dtlist" });
    divRow.css({ "width": "100%", "border-right-style": "solid", "border-right-color": "gray", "border-width": "1px", "border-top-style": "solid", "border-top-color": "gray" });

    for (var irow = 1; irow <= table_rows; irow++) {
        var trHeader = $("<tr>", { "name": "tr" + irow.toString() });
        var tmpTh = $("<th>");
        var divtable = $("<table>", { "class": "dtlist" });
        divtable.css({ "width": "100%", "border-right-style": "solid", "border-right-color": "gray", "border-width": "1px", "border-top-style": "solid", "border-top-color": "gray" });
        var trHeader1 = $("<tr>", { "name": "tr" + irow.toString() });

        if (irow == table_rows - 1) {
            trHeader1.css({ "borderBottom": "1px solid gray" });
            trHeader.css({ "borderBottom": "1px solid gray" });
        }
        var tdHeader = $("<th>");
        tdHeader.css({ "border": "0px", "background": "rgb(255, 255, 255)", "width": "50px", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight, "font-size": table_fontsize });
        tmpTh.css({ "border": "0px", "background": "rgb(255, 255, 255)", "width": "50px", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight, "font-size": table_fontsize });
        if (!hidFrame) {//显示边框
            tdHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
            tmpTh.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
        }
        if (table_colradio) {
            if (irow == 1) {
                tdHeader.text("选择");
            }
            trHeader1.append(tdHeader);
        }

        for (var i = 0; i < table_fields.length; i++) {
            var fObj = table_fields[i];

            // 列宽
            var width = fObj.ColWidth == "" ? 10 : parseInt(fObj.ColWidth);
            if (fObj.RowNo == irow.toString() && fObj.IsShow) {

                var colHeader = $("<th>");
                colHeader.css({ "border": "0px", "font-size": fObj.FontSize + "px", "color": fObj.ForeColor, "background": fObj.BackColor, "width": width + "%", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight });
                if (!hidFrame) {
                    colHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
                }
                colHeader.text(fObj.Rmk);
                trHeader1.append(colHeader);

            }
        }
        if (tab_bindfields != "") {

            if (irow == table_rows - 1) {
                var colHeader = $("<th>");
                colHeader.css({ "border": "0px", "color": "#000000", "background": "#ffffff", "width": "80px", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight, "font-size": table_fontsize });
                if (!hidFrame) {
                    colHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
                }

                trHeader1.append(colHeader);
            }

        }
        divtable.append(trHeader1);
        tmpTh.append(divtable);
        trHeader.append(tmpTh);
        divRow.append(trHeader);

    }


    for (var i = 0; i < 3; i++) {
        for (var irow = 1; irow <= table_rows; irow++) {
            var trHeader = $("<tr>", { "name": "tr_data" + i.toString() });
            var tmpTh = $("<th>");
            var divtable = $("<table>", { "class": "dtlist" });
            divtable.css({ "width": "100%", "border-right-style": "solid", "border-right-color": "gray", "border-width": "1px", "border-top-style": "solid", "border-top-color": "gray" });
            var trHeader1 = $("<tr>", { "name": "tr" + irow.toString() });


            if (irow == table_rows - 1) {
                trHeader1.css({ "borderBottom": "1px solid gray" });
                trHeader.css({ "borderBottom": "1px solid gray" });
            }

            if (table_colradio) {
                var tdHeader = $("<td>");
                tdHeader.css({ "border": "0px", "background": "rgb(255, 255, 255)", "width": "50px", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight, "font-size": table_fontsize });
                if (!hidFrame) {
                    tdHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
                }
                if (irow == 1) {
                    var selOption = $("<input>", { "type": "radio" });
                    selOption.css({ "margin-top": "0", "height": LineHeight });


                    tdHeader.append(selOption);
                }
                trHeader1.append(tdHeader);
            }

            for (var ifield = 0; ifield < table_fields.length; ifield++) {
                var fObj = table_fields[ifield];
                //  storeColumns.push({ name: fObj.FieldName });
                // 列宽
                var width = fObj.ColWidth == "" ? 10 : parseInt(fObj.ColWidth);
                if (fObj.IsShow && fObj.RowNo == irow.toString()) {

                    var colHeader = $("<td>");
                    colHeader.css({ "border": "0px", "font-size": fObj.FontSize + "px", "color": fObj.ForeColor, "background": fObj.BackColor, "width": fObj.ColWidth + "%", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight });
                    if (!hidFrame) {
                        colHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
                    }
                    //if (fObj.FieldType == "8" && fObj.value != "") {
                    //    var imgField = $("<img src=\"../../../img/products/" + fObj.value + "\"  width=\"50\" height=\"50\" class=\"img-ks-lazyload\">");
                    //    colHeader.append(imgField);
                    //}
                    //else {
                    colHeader.text("测试");
                    //}
                    trHeader1.append(colHeader);


                }

            }

            if (tab_bindfields != "") {

                if (irow == table_rows - 1) {
                    var colHeader = $("<td>");
                    colHeader.css({ "border": "0px", "width": "80px", "line-height": LineHeight, "text-align": "center", "padding": "0", "height": LineHeight, "font-size": table_fontsize });
                    if (!hidFrame) {
                        colHeader.css({ "border-left-width": "1px", "border-left-style": "solid", "border-left-color": "gray", "border-right-width": "1px", "border-right-style": "solid", "border-right-color": "gray" });
                    }
                    var arrText = $("<a>", { "id": HtmlID + i.toString(), "name": "operateField" })
                    arrText.attr("rowIndex", i.toString());
                    arrText.css({ "cursor": "hand" });
                    arrText.text("操作");
                    //  arrText.attr("onclick", "$.ibo.operateMenuClick(this," + operateField + "," + table_rows + ");");

                    colHeader.append(arrText);

                    trHeader1.append(colHeader);
                }

            }
            divtable.append(trHeader1);
            tmpTh.append(divtable);
            trHeader.append(tmpTh);
            divRow.append(trHeader);
        }
    }
    return divRow;
}
function showOperateColumns(w, h, obj) {

    var popUp = $("#poptablecolumns");
    popUp.empty();
    popUp.css({
        top: "200px",
        right: "0px",
        width: w + "px",
        height: h + "px"
    });

    // 创建按钮区div
    var divBtn = $("<div>", { "id": "statusbar" });
    divBtn.css({ "margin-top": "0" });
    // 确定按钮
    var btnAdd = $("<a>", { "class": "ibo-ImgBtn-Small ibo-ImgBtn-Ok" });
    btnAdd.css({ "color": "#ffffff", "text-decoration": "none" });
    btnAdd.text("确定");
    btnAdd.on("click", function () { submitTabFields(); });
    divBtn.append(btnAdd);
    // 取消按钮
    var btnCancal = $("<a>", { "class": "ibo-ImgBtn-Small ibo-ImgBtn-Cancel" });
    btnCancal.css({ "color": "#ffffff", "text-decoration": "none" });
    btnCancal.text("关闭");
    btnCancal.on("click", function () { $("#poptablecolumns").hide(); });
    divBtn.append(btnCancal);
    popUp.append(divBtn);

    // 创建数据区div
    var divList = $("<div>", { "id": "tbDiv", "class": "listtbdiv" });
    // 创建数据表
    var dt = $("<table>", { "class": "dtlist" });
    divList.append(dt);
    // 创建表列头
    var hTr = $("<tr>");
    hTr.append("<th style=\"width:10%\">选择</th><th style=\"width:10%\">背景色</th><th style=\"width:10%\">前景色</th><th style=\"width:10%\">图片</th><th  style=\"width:10%\">绑定事件</th><th style=\"width:10%\">描述</th>")
    hTr.append("<th  style=\"width:10%\">窗口标题</th><th  style=\"width:10%\">地址类别</th><th  style=\"width:10%\">窗口地址</th><th  style=\"display:none;\">参数设置</th>");
    dt.append(hTr);

    // 当前选中控件
    var ctrl = formEditor.sltControls[0];
    // 控件之前设置列信息
    var gridfields = [];// $.parseJSON(ctrl.attrList["tab_bindfields"]);

    if (ctrl.attrList["tab_bindfields"] != "undefined" && ctrl.attrList["tab_bindfields"] != "") {
        gridfields = $.parseJSON(ctrl.attrList["tab_bindfields"]);
    };
    var length = gridfields.length;

    //if (tabColumnList != "") {
    // 遍历页面绑定数据表列信息
    for (var i = 0; i < 5; i++) {



        var IsShow = false;
        //// 列标题
        var itemDesc = "";

        var itemImg = "";

        var Event_Type = "";
        var Event_LinkTitle = "";
        var Event_UrlType = "0";
        var linkurl_text = "";
        var Event_LinkUrl = "";
        var Event_PageParams = "";
        var Event_PageValues = "";
        //// 背景色
        var colorback = "#ffffff";
        // 前景色
        var colorfore = "#000000";

        if (i < length) {
            var fieldInfo = gridfields[i];
            // 判断当前列信息是否之前设置过

            // 判断是否显示checkbox是否需要设置勾选
            IsShow = fieldInfo.IsShow;

            colorback = fieldInfo.colorback;
            colorfore = fieldInfo.colorfore;
            itemDesc = fieldInfo.itemDesc;

            itemImg = fieldInfo.itemImg;

            Event_Type = fieldInfo.Event_Type;
            Event_LinkTitle = fieldInfo.Event_LinkTitle;
            Event_UrlType = fieldInfo.Event_UrlType;
            linkurl_text = fieldInfo.linkurl_text;
            Event_LinkUrl = fieldInfo.Event_LinkUrl;
            Event_PageParams = fieldInfo.Event_PageParams;
            Event_PageValues = fieldInfo.Event_PageValues;
        }


        // 创建数据行
        var dataTr = $("<tr>", { "class": "listdata" });
        // 创建单元格 字段名称和设置是否显示checkbox
        var _td = $("<td>");

        // 是否显示checkbox
        _input = $("<input>", { "type": "checkbox", "name": "tab_selOperate", "class": "dtcheckbox" });
        _input.prop("checked", IsShow);
        _input.attr("rowIndex", i.toString());
        _td.append(_input);
        dataTr.append(_td);
        // 创建单元格 背景色
        _td = $("<td>");
        _input = $("<input>", { "type": "color", "name": "tab_ColorBack", "class": "dtinput" });
        _input.attr("rowIndex", i.toString());
        _input.val(colorback);
        _td.append(_input);
        dataTr.append(_td);
        // 创建单元格 前景色
        _td = $("<td>");
        _input = $("<input>", { "type": "color", "name": "tab_ColorFore", "class": "dtinput" });
        _input.attr("rowIndex", i.toString());
        _input.val(colorfore);
        _td.append(_input);
        dataTr.append(_td);
        // 创建单元格 图片
        _td = $("<td>");
        var _hideimgFile = $("<input>", { "type": "hidden", "name": "tab_imgFile_hide" });
        _hideimgFile.attr("rowIndex", i.toString());
        _hideimgFile.val(itemImg);
        _td.append(_hideimgFile);

        _input = $("<input>", { "name": "tab_Img_File", "accept": "image/*", "type": "file", "value": "浏览" });
        _input.attr("rowIndex", i.toString());
        // 绑定"选择图片"input设置属性
        _input.on("change", function () {
            var _rowIndex = $(this).attr("rowIndex");
            // 上传附件
            $.ibo.Upload({
                "file": this.files[0],
                complete: function (evt) {
                    // 文件路径只存AppService根目录之后的路径
                    var url = evt.target.responseText.toUpperCase().replace($.ibo.ApplicationSrvUrl.toUpperCase(), "");
                    $($("input[name='tab_imgFile_hide']")[_rowIndex]).val(url);

                }
            });
        });
        _td.append(_input);



        dataTr.append(_td);


        // 创建单元格 事件
        _td = $("<td>");

        /* 控件绑定事件 */
        var _selevent = $("<select>", { "name": "tab_JsEvent_Slt" });
        _selevent.css({ "width": "50px" });
        _selevent.empty();
        // 根据参数重新设置下拉框选项
        for (var name in $.ibo.formEditor.EventType) {
            var info = $.ibo.formEditor.EventType[name];
            if (info.value != "1" && info.value != "2" && info.value != "4" && info.value != "5" && info.value != "6" && info.value != "7" && info.value != "13") {//去掉上一条、下一条、返回数据、关闭窗口、打开数据选择窗口
                var option = $("<option>", { "name": name });
                option.val(info.value);
                option.text(info.text);
                _selevent.append(option);
            }
        }
        _selevent.attr("rowIndex", i.toString());
        _selevent.val(Event_Type);
        _selevent.on("input propertychange", function () {

            // 当前选中控件
            var sltOp = $(this).find("option:selected");
            var tab_event_type = sltOp.val();

            //获取当前行号
            var rowIndex = $(this).attr("rowIndex");
            //// 重置事件接口相关属性值
            $.ibo.tabEvent_ResetAttr(rowIndex);
            //// 根据事件类型执行方法
            switch (tab_event_type) {
                case "8"://打开新窗口
                    $.ibo.tabOpenNewWinFn(rowIndex);
                    break;
                case "9":
                case "10":
                case "11":
                case "12":
                    $.ibo.tabOpenInnerWinFn(rowIndex);
                    break;
                default:
                    $.ibo.tabEvent_HideAttr(rowIndex);
            }
        });
        _td.append(_selevent);
        dataTr.append(_td);
        // 创建单元格 描述
        _td = $("<td>");
        _input = $("<input>", { "type": "text", "name": "tab_itemDesc", "class": "dtinput" });
        _input.attr("rowIndex", i.toString());
        _input.val(itemDesc);
        _td.append(_input);
        dataTr.append(_td);

        /* 窗口标题 */
        _td = $("<td>");
        var _linktitle = $("<input>", { "name": "tab_linktitle", "type": "text" });
        _linktitle.attr("rowIndex", i.toString());
        _linktitle.css({ "width": "50px", "display": "none" });
        _linktitle.val(Event_LinkTitle);
        _td.append(_linktitle);
        dataTr.append(_td);
        /* 地址类别 */
        _td = $("<td>");
        var _selUrlType = $("<select>", { "name": "tab_UrlType_Slt" });
        _selUrlType.css({ "width": "50px", "display": "none" });
        _selUrlType.attr("rowIndex", i.toString());
        var opt_Type1 = $("<option>");
        opt_Type1.val("0");
        opt_Type1.text("内部地址");
        _selUrlType.append(opt_Type1);

        var opt_Type2 = $("<option>");
        opt_Type2.val("1");
        opt_Type2.text("外部地址");
        _selUrlType.append(opt_Type2);

        _selUrlType.val(Event_UrlType);
        _td.append(_selUrlType);
        dataTr.append(_td);
        /*窗口地址*/

        _td = $("<td>");
        var _linkurl_txt = $("<input>", { "name": "tab_linkurl_txt", "type": "text" });
        _linkurl_txt.css({ "width": "50px", "display": "none" });
        _linkurl_txt.attr("readonly", "readonly");
        _linkurl_txt.attr("rowIndex", i.toString());
        _linkurl_txt.val(linkurl_text);
        _td.append(_linkurl_txt);
        var _hideLinkUrl = $("<input>", { "type": "hidden", "name": "tab_linkurl_hide" });
        _hideLinkUrl.attr("rowIndex", i.toString());
        _hideLinkUrl.val(Event_LinkUrl);
        _td.append(_hideLinkUrl);

        var _linkurl_href = $("<a>", { "class": "easyui-linkbutton", "name": "tab_linkurl_href" })
        _linkurl_href.css({ "width": "20px", "display": "none" });
        _linkurl_href.text(".");
        _linkurl_href.attr("rowIndex", i.toString());
        _linkurl_href.attr("href", "javascript:void(0);");
        // 设置"窗口地址"按钮点击
        _linkurl_href.on("click", function () {
            var rowIndex = $(this).attr("rowIndex");
            //窗体事件
            var EventJs = $($("select[name='tab_JsEvent_Slt']")[rowIndex]).val();
            // 新窗口地址类型   "0"：内部地址 "1"：外部地址
            var UrlType = $($("select[name='tab_UrlType_Slt']")[rowIndex]).val();

            // 打开选择页面参数
            var querystring = "";

            //   "8"：打开新窗口   "14"：打开分享窗口
            if (EventJs == "8" || EventJs == "14") {

                //   ViewSort=1(页面种类=普通页面(主页面))   SizeType=ctrl.formEditor.View.SizeType(页面风格=当前页面风格)
                //   IsFlow=false(非流程页面)
                if (UrlType == "0") {
                    querystring = "ViewSort=1&SizeType=" + ctrl.formEditor.View.SizeType + "&IsFlow=false";
                }
                else if (UrlType == "1") {
                    var url = $.ibo.GetUrl();
                    // url = null  表示用户取消输入url
                    if (url != null) {
                        // 保存页面地址
                        $($("input[name='tab_linkurl_txt']")[rowIndex]).val(url);
                        $($("input[name='tab_linkurl_hide']")[rowIndex]).val(url);
                    }
                    // 外部地址不再打开选择内部窗口
                    return;
                }
            }
                // "9"：新增(打开新窗口)   "11"：打开明细窗口(查看)   "12"：打开明细窗口(编辑)
            else if (EventJs == "9" || EventJs == "11" || EventJs == "12") {
                //   ViewSort=3(页面种类=明细页面)   SizeType=ctrl.formEditor.View.SizeType(页面风格=当前页面风格)
                //   IsFlow=false(非流程页面)   TbName=ctrl.formEditor.View.TbName(数据表=当前页面数据表)
                querystring = "ViewSort=3&SizeType=" + ctrl.formEditor.View.SizeType + "&IsFlow=false&TbName=" + ctrl.formEditor.View.TbName;
            }
                // "10"：打开从表窗口
            else if (EventJs == "10") {
                //   ViewSort=2(页面种类=从表页面)   SizeType=ctrl.formEditor.View.SizeType(页面风格=当前页面风格)
                //   IsFlow=false(非流程页面)   TbName1=ctrl.formEditor.View.TbName(数据主表=当前页面数据表)
                querystring = "ViewSort=2&SizeType=" + ctrl.formEditor.View.SizeType + "&IsFlow=false&TbName1=" + ctrl.formEditor.View.TbName;
            }
                // "13"：打开数据选择窗口
            else if (EventJs == "13") {
                //   ViewSort=4(页面种类=数据选择页面)   SizeType=ctrl.formEditor.View.SizeType(页面风格=当前页面风格)
                //   IsFlow=false(非流程页面)
                querystring = "ViewSort=4&SizeType=" + ctrl.formEditor.View.SizeType + "&IsFlow=false";
            }

            $.ibo.openNewWin({
                width: 832,
                height: 510,
                hasTitle: true,
                title: "选择窗口地址",
                url: "../../views/select/selectViews(1).html?TimeStamp=201604011320&IsMenu=1&" + querystring,
                callBackFun: function (obj) {
                    // 保存选择页面
                    $($("input[name='tab_linkurl_txt']")[rowIndex]).val(obj.ViewName);
                    $($("input[name='tab_linkurl_hide']")[rowIndex]).val(obj.ViewID);
                    $.ibo.tabGetViewFieldInfo(rowIndex);
                }
            });

        });


        _td.append(_linkurl_href);
        dataTr.append(_td);
        /*页间参数设置*/
        _td = $("<td style=\"display:none;\">");

        var _tab_pageparams_hide = $("<input>", { "type": "hidden", "name": "tab_pageparams_hide" });
        _tab_pageparams_hide.attr("rowIndex", i.toString());
        _tab_pageparams_hide.val(Event_PageParams);
        _td.append(_tab_pageparams_hide);

        var _tab_linkurl_fields = $("<input>", { "type": "hidden", "name": "tab_linkurl_fields" });
        _tab_linkurl_fields.attr("rowIndex", i.toString());
        _tab_linkurl_fields.val(Event_PageValues);
        _td.append(_tab_linkurl_fields);


        var _pageparams_btn = $("<input>", { "name": "tab_pageparams_btn", "type": "button", "class": "linkbutton" });
        _pageparams_btn.css({ "width": "50px", "display": "none" });
        _pageparams_btn.attr("rowIndex", i.toString());
        _pageparams_btn.text("点击设置");
        // "页间参数设置"设置按钮绑定弹出
        _pageparams_btn.on("click", function () {
            var rowIndex = $(this).attr("rowIndex");
            var tab_LinkUrl = $($("input[name='tab_linkurl_hide']")[rowIndex]).val();
            if (tab_LinkUrl == "") {
                $.ibo.ShowErrorMsg("请先选择打开窗口地址！");
            }
            else {
                $.ibo.tabSetPageParamsInfo($(this).offset(), rowIndex);
            }
        });
        _td.append(_pageparams_btn);
        dataTr.append(_td);

        dt.append(dataTr);
    }
    //}

    popUp.append(divList);
    popUp.show();
}


// 获取参数传值列表信息   flag: 1 参数设置   2 传值设置
$.ibo.tabGetPageParamsInfo = function (rowIndex) {
    var arr = [];

    // 所有数据行
    var trs = $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata");
    if (trs.length > 0) {
        $.each(trs, function (i, n) {
            n = $(n);
            var HtmlID = n.find("select").val();
            // 若HtmlID为空  则未选择控件  数据无意义  不保存
            if ($.trim(HtmlID).length != 0) {
                var FieldID = n.find("input[type=hidden]").val();
                arr.push({ "HtmlID": HtmlID, "FieldID": FieldID });
            }
        });
    }
    $($("input[name='tab_pageparams_hide']")[rowIndex]).val($.toJSON(arr));
    // this.attrList["Event_PageParams"] = $.toJSON(arr);

    // 隐藏面板
    $.ibo.formEditor.IEvent.Params_SetDiv.hide();
};

// 获取打开页面绑定数据表字段信息
$.ibo.tabGetViewFieldInfo = function (rowIndex) {
    var ctrl = this;
    // 根据viewid查询绑定数据表字段信息
    var ViewID = $($("input[name='tab_linkurl_hide']")[rowIndex]).val();//this.attrList["Event_LinkUrl"];
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "FormFieldListByViewID",
        data: $.toJSON({ "ViewID": ViewID }),
        success: function (obj) {
            // 查询成功
            if ($.ibo.ResFlag.Success == obj.ResFlag && obj.ResObj) {
                //   ctrl.ViewFieldInfoList = obj.ResObj;
                $($("input[name='tab_linkurl_fields']")[rowIndex]).val($.toJSON(obj.ResObj));
            }
            else {
                $.ibo.ShowErrorMsg(obj);
            }
        }
    });
};



// 设置参数列表信息   offset：面板出现位置
$.ibo.tabSetPageParamsInfo = function (offset, rowIndex) {


    // 移除原有Table数据
    $.ibo.formEditor.IEvent.PageParams_Table.find(".listdata").remove();

    var linkurlfields = $.parseJSON($($("input[name='tab_linkurl_fields']")[rowIndex]).val());
    if (linkurlfields && linkurlfields.length > 0) {

        var _pageparams_hide = $($("input[name='tab_pageparams_hide']")[rowIndex]).val();
        var params = _pageparams_hide == "" ? [] : $.parseJSON(_pageparams_hide);
        // 设置标题
        $.ibo.formEditor.IEvent.Params_SetDivTitle.text("设置参数");

        // 获取所有输入控件
        var arr = [];// this.GetAllInputCtrl();
        if (formEditor.sltControls.length > 0 && formEditor.sltControls[0].getDataSource().TbColumnList.length > 0) {
            arr = formEditor.sltControls[0].getDataSource().TbColumnList;

        }
        else if (formEditor.View.TbColumnList.length <= 0) {
            alert("请先选择数据源");
            return;
        }
        else {
            arr = formEditor.View.TbColumnList;
        }

        // 遍历打开页面绑定数据表字段信息  生成设置行
        $.each(linkurlfields, function (i, n) {
            var tr = $("<tr>", { "class": "listdata" });
            // 首列 控件下拉框
            var td = $("<td>");

            // 根据录入控件组成下拉框
            var slt = $.ibo.GetSltFromArr(arr, "Rmk", "FieldID");

            td.append(slt);
            tr.append(td);

            // 第二列 字段名
            td = $("<td>");
            var txt = $("<input>", { "type": "text", "readonly": "readonly" });
            txt.css({ "text-align": "center" });
            txt.val(n.Rmk);
            td.append(txt);

            txt = $("<input>", { "type": "hidden" });
            txt.val(n.FieldID);
            td.append(txt);
            tr.append(td);

            if (params && params.length > 0) {
                // 遍历已存储的参数设置信息
                $.each(params, function (j, m) {
                    if (m.FieldID == n.FieldID) {
                        slt.val(m.HtmlID);
                        return false;
                    }
                });
            }

            $.ibo.formEditor.IEvent.PageParams_Table.append(tr);
        });
    }

    // 移除保存按钮原有保存事件
    $.ibo.formEditor.IEvent.SetDiv_Save.off("click");
    // 重新设置保存按钮保存事件
    $.ibo.formEditor.IEvent.SetDiv_Save.on("click", function () {
        $.ibo.tabGetPageParamsInfo(rowIndex);
    });

    // 设置面板位置
    $.ibo.formEditor.IEvent.Params_SetDiv.css({ "left": (offset.left - 300) + "px", "top": (offset.top + 220) + "px", "height": "225px" });
    $($.ibo.formEditor.IEvent.PageParams_Table[0].parentNode).css({ "height": "105px" });
    // 显示面板
    $.ibo.formEditor.IEvent.Params_SetDiv.show();
};


//清除当前行事件属性
$.ibo.tabEvent_ResetAttr = function (rowIndex) {

    $("input[name='tab_linktitle']")[rowIndex].value = "";
    $("select[name='tab_UrlType_Slt']")[rowIndex].value = "";
    $("input[name='tab_linkurl_txt']")[rowIndex].value = "";

}

// 隐藏事件接口相关属性设置
$.ibo.tabEvent_HideAttr = function (rowIndex) {

    // 隐藏"窗口标题"设置Li
    $($("input[name='tab_linktitle']")[rowIndex]).hide();
    // 隐藏"地址类别"设置Li
    $($("select[name='tab_UrlType_Slt']")[rowIndex]).hide();
    // 隐藏"窗口地址"设置Li
    $($("input[name='tab_linkurl_txt']")[rowIndex]).hide();
    // 隐藏"页间参数设置"设置Li
    $($("a[name='tab_linkurl_href']")[rowIndex]).hide();

    $($("input[name='tab_pageparams_btn']")[rowIndex]).hide();

};

// 打开新窗口
$.ibo.tabOpenNewWinFn = function (rowIndex) {


    // 隐藏其余属性
    $.ibo.tabEvent_HideAttr(rowIndex);


    // 显示"窗口标题"设置Li
    $($("input[name='tab_linktitle']")[rowIndex]).show();


    // 显示"地址类别"设置Li
    $($("select[name='tab_UrlType_Slt']")[rowIndex]).show();

    // 隐藏"窗口地址"设置Li
    $($("input[name='tab_linkurl_txt']")[rowIndex]).show();
    // 隐藏"页间参数设置"设置Li
    $($("a[name='tab_linkurl_href']")[rowIndex]).show();

};
// 打开内部页面新窗口
$.ibo.tabOpenInnerWinFn = function (rowIndex) {

    // 隐藏其余属性
    $.ibo.tabEvent_HideAttr(rowIndex);

    // 显示"窗口标题"设置Li
    $($("input[name='tab_linktitle']")[rowIndex]).show();


    // 隐藏"窗口地址"设置Li
    $($("input[name='tab_linkurl_txt']")[rowIndex]).show();
    // 隐藏"页间参数设置"设置Li
    $($("a[name='tab_linkurl_href']")[rowIndex]).show();

    $($("input[name='tab_pageparams_btn']")[rowIndex]).show();

};

function submitTabFields() {

    var tab_bindfields = new Array();
    $("input[name='tab_selOperate']").each(function (i) {
        var IsShow = $(this).prop("checked");
        if (IsShow) {
            var itemDesc = $("input[name='tab_itemDesc']")[i].value;

            var itemImg = $("input[name='tab_imgFile_hide']")[i].value;

            var colorback = $("input[name='tab_ColorBack']")[i].value;
            var colorfore = $("input[name='tab_ColorFore']")[i].value;
            var Event_Type = $("select[name='tab_JsEvent_Slt']")[i].value;

            var Event_LinkTitle = $("input[name='tab_linktitle']")[i].value;
            var Event_UrlType = $("select[name='tab_UrlType_Slt']")[i].value;

            var linkurl_text = $("input[name='tab_linkurl_txt']")[i].value;
            var Event_LinkUrl = $("input[name='tab_linkurl_hide']")[i].value;


            var Event_PageParams = $("input[name='tab_pageparams_hide']")[i].value;

            var Event_PageValues = $("input[name='tab_linkurl_fields']")[i].value;

            tab_bindfields.push({ itemDesc: itemDesc, IsShow: IsShow, itemImg: itemImg, colorback: colorback, colorfore: colorfore, Event_Type: Event_Type, Event_LinkTitle: Event_LinkTitle, Event_UrlType: Event_UrlType, linkurl_text: linkurl_text, Event_LinkUrl: Event_LinkUrl, Event_PageParams: Event_PageParams, Event_PageValues: Event_PageValues });
        }
    });
    $.ibo.formEditor.Instance.sltControls[0].attrList["tab_bindfields"] = $.toJSON(tab_bindfields);
    $("#poptablecolumns").hide();

    var selCtrl = $.ibo.formEditor.Instance.sltControls[0];
    var table_rows = selCtrl.attrList["table_rows"];
    var table_fontsize = selCtrl.attrList["table_fontsize"];
    var table_fields = $.parseJSON(selCtrl.attrList["table_fields"]);
    var table_colradio = selCtrl.attrList["table_colradio"];
    var tab_bindfields = selCtrl.attrList["tab_bindfields"];
    var table_hideheader = selCtrl.attrList["table_hideheader"];
    var hidFrame = selCtrl.attrList["Border_Style"] == "2" ? true : false;//边框
    $(selCtrl.htmlObj).empty();
    var para = { table_rows: table_rows, table_fontsize: table_fontsize, table_fields: table_fields, table_colradio: table_colradio, tab_bindfields: tab_bindfields, table_hideheader: table_hideheader, hidFrame: hidFrame };

    var divRow = setTableByParams(selCtrl.HtmlID, para);
    $(selCtrl.htmlObj).append(divRow);
}
// 初始化列表选择列信息窗口
function showPopColumns(w, h, obj) {
    var tabColumnList = [];
    if ($.ibo.formEditor.Instance.sltControls.length > 0 && $.ibo.formEditor.Instance.sltControls[0].getDataSource().SelectFields != undefined) {

        tabColumnList = $.ibo.formEditor.Instance.sltControls[0].getDataSource().SelectFields;

    }
    else if ($.ibo.formEditor.Instance.sltControls.length > 0 && $.ibo.formEditor.Instance.sltControls[0].getDataSource().TbColumnList != undefined) {

        tabColumnList = $.ibo.formEditor.Instance.sltControls[0].getDataSource().TbColumnList;

    }
    else if (formEditor.View.TbColumnList.length <= 0) {
        alert("请先选择数据源");
        return;
    }
    else {
        tabColumnList = $.ibo.formEditor.Instance.View.SelectFields;
    }
    var ctrl = $.ibo.formEditor.Instance.sltControls[0];

    var rowcount = ctrl.attrList["table_rows"];
    if (rowcount == "") {
        alert("请设置行数");
        return;
    }
    var popUp = $("#poptablecolumns");
    popUp.empty();
    popUp.css({
        top: "200px",
        right: "200px",
        width: w + "px",
        height: h + "px"
    });

    // 创建按钮区div
    var divBtn = $("<div>", { "id": "statusbar" });
    divBtn.css({ "margin-top": "0" });
    // 确定按钮
    var btnAdd = $("<a>", { "class": "ibo-ImgBtn-Small ibo-ImgBtn-Ok" });
    btnAdd.css({ "color": "#ffffff", "text-decoration": "none" });
    btnAdd.text("确定");
    btnAdd.on("click", function () { submitFields(); });
    divBtn.append(btnAdd);
    // 取消按钮
    var btnCancal = $("<a>", { "class": "ibo-ImgBtn-Small ibo-ImgBtn-Cancel" });
    btnCancal.css({ "color": "#ffffff", "text-decoration": "none" });
    btnCancal.text("关闭");
    btnCancal.on("click", function () { $("#poptablecolumns").hide(); });
    divBtn.append(btnCancal);
    popUp.append(divBtn);

    // 创建数据区div
    var divList = $("<div>", { "id": "tbDiv", "class": "listtbdiv" });
    // 创建数据表
    var dt = $("<table>", { "class": "dtlist" });
    divList.append(dt);
    // 创建表列头
    var hTr = $("<tr>");
    hTr.append("<th>选择</th><th>列标题</th><th>列宽</th><th>背景色</th><th>前景色</th><th>字体</th><th>行号</th><th>列号</th>");
    dt.append(hTr);

    // 当前选中控件
    // 控件之前设置列信息
    //var gridfields = ctrl.attrList["table_fields"];
    var gridfields = [];// $.parseJSON(ctrl.attrList["tab_bindfields"]);

    if (ctrl.attrList["table_fields"] != "undefined" && ctrl.attrList["table_fields"] != "") {
        gridfields = $.parseJSON(ctrl.attrList["table_fields"]);
    };
    var length = gridfields.length;

    if (tabColumnList != "") {
        // 遍历页面绑定数据表列信息
        for (var i = 0; i < tabColumnList.length; i++) {

            var columnInfo = tabColumnList[i];

            var IsShow = false;
            // 列标题
            var popFieldRmk = columnInfo.Rmk;
            // 列宽
            var popColWidth = "";
            // 背景色
            var popColorBack = "#ffffff";
            // 前景色
            var popColorFore = "#000000";

            var popFontSize = "9";
            var popRowNo = "1";
            var popColNo = "1";
            for (var j = 0; j < length; j++) {
                var fieldInfo = gridfields[j];
                // 判断当前列信息是否之前设置过
                if (fieldInfo.FieldID == columnInfo.FieldID) {
                    // 判断是否显示checkbox是否需要设置勾选
                    IsShow = fieldInfo.IsShow;
                    popFieldRmk = fieldInfo.Rmk;
                    popColWidth = fieldInfo.ColWidth;
                    popColorBack = fieldInfo.BackColor;
                    popColorFore = fieldInfo.ForeColor;
                    popFontSize = fieldInfo.FontSize;
                    popRowNo = fieldInfo.RowNo;
                    popColNo = fieldInfo.ColNo;
                }
            }

            // 创建数据行
            var dataTr = $("<tr>", { "class": "listdata" });
            // 创建单元格 字段名称和设置是否显示checkbox
            var _td = $("<td>");
            // 字段ID
            var _input = $("<input>", { "type": "hidden", "name": "popFieldID", "value": columnInfo.FieldID });
            var _hideFieldType = $("<input>", { "type": "hidden", "name": "popFieldType", "value": columnInfo.FieldType });
            _td.append(_hideFieldType);
            _td.append(_input);
            // 字段名称
            _input = $("<input>", { "type": "hidden", "name": "popFieldName", "value": columnInfo.FieldName });
            _td.append(_input);
            // 是否显示checkbox
            _input = $("<input>", { "type": "checkbox", "name": "checkfields", "class": "dtcheckbox" });
            _input.prop("checked", IsShow);
            dataTr.append(_td);
            _td.append(_input);
            // 创建单元格 列标题
            _td = $("<td>");
            _input = $("<input>", { "type": "text", "name": "popFieldRmk", "value": popFieldRmk, "class": "dtinput" });
            _td.append(_input);
            dataTr.append(_td);
            // 创建单元格 列宽
            _td = $("<td>");
            _input = $("<input>", { "type": "number", "name": "popColWidth", "value": popColWidth == "" ? "52" : popColWidth, "class": "dtinput" });
            _td.append(_input);
            dataTr.append(_td);
            // 创建单元格 背景色
            _td = $("<td>");
            _input = $("<input>", { "type": "color", "name": "popColorBack", "class": "dtinput" });
            _input.val(popColorBack);
            _td.append(_input);
            dataTr.append(_td);
            // 创建单元格 前景色
            _td = $("<td>");
            _input = $("<input>", { "type": "color", "name": "popColorFore", "class": "dtinput" });
            _input.val(popColorFore);
            _td.append(_input);
            dataTr.append(_td);

            // 创建单元格 字体
            _td = $("<td>");
            _input = $("<input>", { "type": "number", "name": "popFontSize", "class": "dtinput" });
            _input.val(popFontSize);
            _td.append(_input);
            dataTr.append(_td);

            // 创建单元格 行号
            _td = $("<td>");
            _input = $("<input>", { "type": "number", "name": "popRowNo", "class": "dtinput", "max": rowcount, "min": "1" });


            _input.val(popRowNo);
            _td.append(_input);
            dataTr.append(_td);
            dt.append(dataTr);

            // 创建单元格 列号
            _td = $("<td>");
            _input = $("<input>", { "type": "number", "name": "popColNo", "class": "dtinput", "max": (length == 0 ? tabColumnList.length : length), "min": "1" });

            _input.val(popColNo);
            _td.append(_input);
            dataTr.append(_td);
            dt.append(dataTr);
        }
    }

    popUp.append(divList);
    popUp.show();
}

function submitFields() {
    var gridfields = new Array();
    $("input[name='checkfields']").each(function (i) {
        var fieldid = $("input[name='popFieldID']")[i].value;
        var IsShow = $(this).prop("checked");
        var rmk = $("input[name='popFieldRmk']")[i].value;
        var colwidth = $("input[name='popColWidth']")[i].value;
        var colorback = $("input[name='popColorBack']")[i].value;
        var colorfore = $("input[name='popColorFore']")[i].value;
        var fieldname = $("input[name='popFieldName']")[i].value;
        var fieldtype = $("input[name='popFieldType']")[i].value;
        var fontsize = $("input[name='popFontSize']")[i].value;
        var rowno = $("input[name='popRowNo']")[i].value;
        var colno = $("input[name='popColNo']")[i].value;
        gridfields.push({ FieldID: fieldid, FieldType: fieldtype, Rmk: rmk, FieldName: fieldname, BackColor: colorback, ForeColor: colorfore, FontSize: fontsize, RowNo: rowno, ColNo: colno, IsShow: IsShow, ColWidth: colwidth });

    });
    $.ibo.formEditor.Instance.sltControls[0].attrList["table_fields"] = $.toJSON(gridfields);
    $("#poptablecolumns").hide();
    var selCtrl = $.ibo.formEditor.Instance.sltControls[0];
    var table_rows = selCtrl.attrList["table_rows"];
    var table_fontsize = selCtrl.attrList["table_fontsize"];
    var table_fields = $.parseJSON(selCtrl.attrList["table_fields"]);
    var table_colradio = selCtrl.attrList["table_colradio"];
    var tab_bindfields = selCtrl.attrList["tab_bindfields"];
    var table_hideheader = selCtrl.attrList["table_hideheader"];
    var hidFrame = selCtrl.attrList["Border_Style"] == "2" ? true : false;//边框
    $(selCtrl.htmlObj).empty();
    var para = { table_rows: table_rows, table_fontsize: table_fontsize, table_fields: table_fields, table_colradio: table_colradio, tab_bindfields: tab_bindfields, table_hideheader: table_hideheader, hidFrame: hidFrame };

    var divRow = setTableByParams(selCtrl.HtmlID, para);
    $(selCtrl.htmlObj).append(divRow);
}


/******************************  按钮 button ******************************/

//按钮  button
$.ibo.formEditor.button = function (formEditor, para) {

    // 创建多行文本框基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "id": this.HtmlID, "type": "button" });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    if ($.trim(this.name).length == 0) this.name = "按钮" + this.HtmlID.replace("ctrl", "");


    // 设置默认宽高  宽度为页面100%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 事件接口
    $.ibo.formEditor.IEvent.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);


    // 私有属性设置
    (function () {

        // 按钮文字
        this.attrList["Btn_Text"] = typeof para.attrList["Btn_Text"] == "undefined" ? "按钮" : para.attrList["Btn_Text"];

        // 设置按钮文字
        this.setText = function (t) {
            if (typeof t != "undefined") {
                this.attrList["Btn_Text"] = t;
            }
            this.htmlObj.val(this.attrList["Btn_Text"]);
        };
        this.setText();

    }).call(this);


    // 重写更改事件类型后处理函数
    this.afterChangeEventType = function () {
        // 当前事件类型
        var v = this.attrList["Event_Type"];
        // 判断当前是绑定的哪种事件
        for (var i in $.ibo.formEditor.EventType) {
            var n = $.ibo.formEditor.EventType[i];
            // 设置按钮显示文本与事件类型一致
            if (n.value == v) {
                this.setText(n.text);
                $.ibo.formEditor.button.Text_Txt.val(n.text);
                break;
            }
        }
    };

    // 添加显示属性方法  显示按钮私有属性
    this.AddShowPrototypeFn(function () {

        // 设置"按钮文字"输入框
        $.ibo.formEditor.button.Text_Txt.val(this.attrList["Btn_Text"]);
        // 显示"按钮文字"Li
        $.ibo.formEditor.button.Li.show();
    });
};
// 按钮初始化
$.ibo.formEditor.button.Init = function () {

    // 设置"按钮文字"Li
    $.ibo.formEditor.button.Li = $("#Property_Btn_Li");
    // 设置"按钮文字"输入框
    $.ibo.formEditor.button.Text_Txt = $("#Property_Btn_Text_Txt");
    // 绑定"按钮文字"输入框设置
    $.ibo.formEditor.button.Text_Txt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.setText($(this).val());
    });
};



/******************************  文本标签 article ******************************/

// 文本标签 article
$.ibo.formEditor.article = function (formEditor, para) {

    // 创建下拉框基本html
    this.createHtmlObject = function () {
        var obj = $("<article>", { "id": this.HtmlID, "contenteditable": "true" });
        obj.css({ "outline": "none", "word-break": "break-all", "word-wrap": "break-word" });
        this.cssList["outline"] = "none";
        this.cssList["word-break"] = "break-all";
        this.cssList["word-wrap"] = "break-word";
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    if ($.trim(this.name).length == 0) this.name = "文本标签" + this.HtmlID.replace("ctrl", "");

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 4);

    // 设置尺寸接口  可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, true, true);

    // 继承事件接口
    $.ibo.formEditor.IEvent.call(this, para);

    // 继承动画接口
    $.ibo.formEditor.IAnimate.call(this, para);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);


    // 私有属性设置
    (function () {
        //  article文本内容
        this.attrList["Article_Text"] = typeof para.attrList["Article_Text"] == "undefined" ? "<font size=\"3\">请双击输入文字</font>" : para.attrList["Article_Text"];
        this.htmlObj.html(this.attrList["Article_Text"]);

        //  article文本对齐方式 left：左对齐   center：居中   right：右对齐
        this.cssList["text-align"] = typeof para.cssList["text-align"] == "undefined" ? "left" : para.cssList["text-align"];
        this.htmlObj.css({ "text-align": this.cssList["text-align"] });

        //  article文本行间距
        this.cssList["line-height"] = typeof para.cssList["line-height"] == "undefined" ? "30px" : para.cssList["line-height"];
        this.htmlObj.css({ "line-height": this.cssList["line-height"] });

        // 文本超长隐藏
        this.cssList["overflow"] = "hidden";
        this.htmlObj.css({ "overflow": "hidden" });
    }).call(this);


    // 设置对其方式
    this.Align = function (a) {
        if (a) {
            this.cssList["text-align"] = a;
            this.htmlObj.css({ "text-align": a });
        }
        return this.cssList["text-align"];
    };

    // 设置行间距
    this.LineHeight = function (h) {
        if (h) {
            this.cssList["line-height"] = h;
            this.htmlObj.css({ "line-height": h });
        }
        return parseInt(this.cssList["line-height"].replace("px", ""));
    };

    // 设置对齐方式图标样式
    this.setAlignImgCss = function () {

        // 三个图标移除选中样式
        $.ibo.formEditor.article.Left_Btn.removeClass("ibo-linkselectclass");
        $.ibo.formEditor.article.Center_Btn.removeClass("ibo-linkselectclass");
        $.ibo.formEditor.article.Right_Btn.removeClass("ibo-linkselectclass");


        // 判断文本对齐方式 设置图标样式
        var align = this.Align();
        // 左对齐
        if (align == "left") {
            $.ibo.formEditor.article.Left_Btn.addClass("ibo-linkselectclass");
        }
            // 居中
        else if (align == "center") {
            $.ibo.formEditor.article.Center_Btn.addClass("ibo-linkselectclass");
        }
            // 右对齐
        else if (align == "right") {
            $.ibo.formEditor.article.Right_Btn.addClass("ibo-linkselectclass");
        }
    };

    // 添加属性显示事件  文本标签article的私有属性设置
    this.AddShowPrototypeFn(function () {

        // 显示光标所在文本属性
        $.ibo.formEditor.article.ShowArticleProperties();

        // 显示"背景色"设置Li
        $.ibo.formEditor.article.Background_Li.show();

        // 显示"文字颜色"设置Li
        $.ibo.formEditor.article.Color_Li.show();

        // 显示"字体大小"设置Li
        $.ibo.formEditor.article.FontSize_Li.show();

        // 显示"超链接"设置Li
        $.ibo.formEditor.article.Link_Li.show();

        // 设置对齐方式图标样式
        this.setAlignImgCss();

        // 显示"字体设置"设置Li
        $.ibo.formEditor.article.FontStyle_Li.show();


        // 设置"行间距"输入框
        $.ibo.formEditor.article.LineHeight_Txt.val(this.LineHeight());
        // 显示"行间距"设置Li
        $.ibo.formEditor.article.LineHeight_Li.show();
    });

};
// 设置文本样式属性   objtype为类型 objvalue为值
$.ibo.formEditor.article.SetEditProperties = function (objtype, objvalue) {
    // 获取选中内容
    var content = $.ibo.formEditor.article.getSelectText();
    if (content != "" && content != undefined) {
        switch (objtype) {
            // 背景颜色
            case "BackColor":
                document.execCommand("BackColor", "false", objvalue);
                break;
                // 字体颜色
            case "ForeColor":
                document.execCommand("ForeColor", "false", objvalue);
                break;
                // 字体大小
            case "FontSize":
                document.execCommand("FontSize", "false", objvalue);
                break;
                // 创建链接
            case "CreateLink":
                document.execCommand("CreateLink", false, objvalue);
                break;
                // 字体加粗
            case "Bold":
                document.execCommand("Bold");
                if (document.queryCommandValue("Bold") == "true") {
                    $.ibo.formEditor.article.Bold_Btn.addClass("ibo-linkselectclass");
                }
                else {
                    $.ibo.formEditor.article.Bold_Btn.removeClass("ibo-linkselectclass");
                }
                break;
                // 字体斜体
            case "Italic":
                document.execCommand("Italic");
                if (document.queryCommandValue("Italic") == "true") {
                    $.ibo.formEditor.article.Italic_Btn.addClass("ibo-linkselectclass");
                }
                else {
                    $.ibo.formEditor.article.Italic_Btn.removeClass("ibo-linkselectclass");
                }
                break;
                // 字体下划线
            case "Underline":
                document.execCommand("Underline");
                if (document.queryCommandValue("Underline") == "true") {
                    $.ibo.formEditor.article.Decoration_Btn.addClass("ibo-linkselectclass");
                }
                else {
                    $.ibo.formEditor.article.Decoration_Btn.removeClass("ibo-linkselectclass");
                }
                break;
        }

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 保存文本输入内容
        ctrl.attrList["Article_Text"] = ctrl.htmlObj.html();
    }
};
// 文本内容全选
$.ibo.formEditor.article.selectText = function (element) {
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
// 获取选中内容
$.ibo.formEditor.article.getSelectText = function () {
    //适用于IE 
    if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
        //适用于其他浏览器
    } else if (window.getSelection) {
        return window.getSelection();
    }
};
// 绑定覆盖div事件
$.ibo.formEditor.article.prototype.events = {
    // 双击设置文本可编辑
    dblclick: function (e, ctrl) {
        // 设置文本可编辑
        ctrl.htmlObj.attr("contenteditable", "true");
        // 隐藏表层覆盖div
        ctrl.divObj.hide();
        ctrl.htmlObj.focus();
        // 设置文本全选
        $.ibo.formEditor.article.selectText(ctrl.htmlObj[0]);
        $.ibo.formEditor.article.ShowArticleProperties(ctrl);
    },
    // 取消选择 保存文本输入内容
    unSelect: function (e, ctrl) {
        // 取消文本可编辑
        ctrl.htmlObj.attr("contenteditable", "false");
        // 保存文本输入内容
        ctrl.attrList["Article_Text"] = ctrl.htmlObj.html();
        // 显示编辑时隐藏的覆盖div
        $(".ctrl").show();
    }
};
// 绑定HTML对象事件
$.ibo.formEditor.article.prototype.objEvents = {
    click: function (e, ctrl) {
        // 取消文本可编辑
        ctrl.htmlObj.attr("contenteditable", "true");
        $.ibo.formEditor.article.ShowArticleProperties();
    }
};
// 显示光标所在文本属性
$.ibo.formEditor.article.ShowArticleProperties = function () {

    // 设置选中文本"背景色"颜色选择框
    $.ibo.formEditor.article.Background_Clr.val($.ibo.formEditor.Rgb2hex(document.queryCommandValue("BackColor")));

    // 设置选中文本"文字颜色"颜色选择框
    $.ibo.formEditor.article.Color_Clr.val($.ibo.formEditor.Rgb2hex(document.queryCommandValue("ForeColor")));

    // 设置选中文本"字体大小"下拉框选中项
    $.ibo.formEditor.article.FontSize_Slt.val(document.queryCommandValue("FontSize"));


    // 设置"字体加粗"图标样式
    if (document.queryCommandValue("Bold") == "true") {
        $.ibo.formEditor.article.Bold_Btn.addClass("ibo-linkselectclass");
    }
    else {
        $.ibo.formEditor.article.Bold_Btn.removeClass("ibo-linkselectclass");
    }

    // 设置"字体加下划线"图标样式
    if (document.queryCommandValue("Underline") == "true") {
        $.ibo.formEditor.article.Decoration_Btn.addClass("ibo-linkselectclass");
    }
    else {
        $.ibo.formEditor.article.Decoration_Btn.removeClass("ibo-linkselectclass");
    }

    // 设置"字体加斜"图标样式
    if (document.queryCommandValue("Italic") == "true") {
        $.ibo.formEditor.article.Italic_Btn.addClass("ibo-linkselectclass");
    }
    else {
        $.ibo.formEditor.article.Italic_Btn.removeClass("ibo-linkselectclass");
    }

};
// 颜色值 由 rgb(0,0,0,0)转行成#000000
$.ibo.formEditor.Rgb2hex = function (rgb) {
    //nnd, Firefox / IE not the same, fxck 
    if (rgb.charAt(0) == '#')
        return rgb;
    var n = Number(rgb);
    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);

    // 转到固定长度的十六进制字符串，不够则补0 
    var s = decimal.toString(16);
    while (s.length < 6)
        s = "0" + s;

    return "#" + s;
};
// 文本标签初始化
$.ibo.formEditor.article.Init = function () {

    // "背景色"设置Li
    $.ibo.formEditor.article.Background_Li = $("#Property_Article_Background_Li");
    // "背景色"颜色选择框
    $.ibo.formEditor.article.Background_Clr = $("#Property_Article_Background_Clr");
    // 绑定"背景色"颜色选择框设置选中文本背景色
    $.ibo.formEditor.article.Background_Clr.on("input propertychange", function () {
        $.ibo.formEditor.article.SetEditProperties("BackColor", $(this).val());
    });


    // "文字颜色"设置Li
    $.ibo.formEditor.article.Color_Li = $("#Property_Article_Color_Li");
    // "文字颜色"颜色选择框
    $.ibo.formEditor.article.Color_Clr = $("#Property_Article_Color_Clr");
    // 绑定"文字颜色"颜色选择框设置选中文本文字颜色
    $.ibo.formEditor.article.Color_Clr.on("input propertychange", function () {
        $.ibo.formEditor.article.SetEditProperties("ForeColor", $(this).val());
    });


    // "字体大小"设置Li
    $.ibo.formEditor.article.FontSize_Li = $("#Property_Article_FontSize_Li");
    // "字体大小"下拉框
    $.ibo.formEditor.article.FontSize_Slt = $("#Property_Article_FontSize_Slt");
    // 绑定"字体大小"下拉框设置选中文本字体大小
    $.ibo.formEditor.article.FontSize_Slt.on("input propertychange", function () {
        $.ibo.formEditor.article.SetEditProperties("FontSize", $(this).val());
    });

    // "超链接"设置Li
    $.ibo.formEditor.article.Link_Li = $("#Property_Article_Link_Li");
    // "超链接"设置按钮
    $.ibo.formEditor.article.Link_Btn = $("#Property_Article_Link_Btn");
    // 绑定"超链接"按钮设置选中文本为超链接
    $.ibo.formEditor.article.Link_Btn.on("click", function () {
        // 要求用户输入链接地址
        var value = $.ibo.GetUrl();
        // value == null  用户取消输入
        if (value == null) return;
        $.ibo.formEditor.article.SetEditProperties("CreateLink");
    });


    // "字体设置"设置Li
    $.ibo.formEditor.article.FontStyle_Li = $("#Property_Article_FontStyle_Li");

    // "加粗"设置按钮
    $.ibo.formEditor.article.Bold_Btn = $("#Property_Article_Bold_Btn");
    // 绑定"加粗"设置
    $.ibo.formEditor.article.Bold_Btn.on("click", function () {
        $.ibo.formEditor.article.SetEditProperties("Bold");
    });

    // "下划线"设置按钮
    $.ibo.formEditor.article.Decoration_Btn = $("#Property_Article_Decoration_Btn");
    // 绑定"下划线"设置
    $.ibo.formEditor.article.Decoration_Btn.on("click", function () {
        $.ibo.formEditor.article.SetEditProperties("Underline");
    });

    // "斜体"设置按钮
    $.ibo.formEditor.article.Italic_Btn = $("#Property_Article_Italic_Btn");
    // 绑定"斜体"设置
    $.ibo.formEditor.article.Italic_Btn.on("click", function () {
        $.ibo.formEditor.article.SetEditProperties("Italic");
    });

    // "居左对齐"设置按钮
    $.ibo.formEditor.article.Left_Btn = $("#Property_Article_Left_Btn");
    // 绑定"居左对齐"设置
    $.ibo.formEditor.article.Left_Btn.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.Align("left");
        // 设置对齐方式图标样式
        ctrl.setAlignImgCss();
    });

    // "居中对齐"设置按钮
    $.ibo.formEditor.article.Center_Btn = $("#Property_Article_Center_Btn");
    // 绑定"居中对齐"设置
    $.ibo.formEditor.article.Center_Btn.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.Align("center");
        // 设置对齐方式图标样式
        ctrl.setAlignImgCss();
    });

    // "居右对齐"设置按钮
    $.ibo.formEditor.article.Right_Btn = $("#Property_Article_Right_Btn");
    // 绑定"居右对齐"设置
    $.ibo.formEditor.article.Right_Btn.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.Align("right");
        // 设置对齐方式图标样式
        ctrl.setAlignImgCss();
    });


    // "行间距"设置Li
    $.ibo.formEditor.article.LineHeight_Li = $("#Property_Article_LineHeight_Li");
    // "行间距"输入框
    $.ibo.formEditor.article.LineHeight_Txt = $("#Property_Article_LineHeight_Txt");
    // 设置"行间距"输入框只可输入数字
    $.ibo.setNumOnly($.ibo.formEditor.article.LineHeight_Txt);
    // 绑定"行间距"设置
    $.ibo.formEditor.article.LineHeight_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 获取当前输入值 转化为数字
        var v = parseInt($(this).val());
        // 最小行高12px
        if (isNaN(v) || v < 12) v = 12;
        ctrl.LineHeight(v + "px");
    });
    // 绑定"行间距"设置
    $.ibo.formEditor.article.LineHeight_Txt.on("blur", function () {
        // 获取当前输入值 转化为数字
        var v = parseInt($(this).val());
        // 最小行高12px
        if (isNaN(v) || v < 12) {
            $(this).val(12);
        }
    });

};
// 获取URL地址
$.ibo.GetUrl = function () {
    // 弹出输入
    var value = $.ibo.ShowOneLineDialog("请输入链接地址：", "");
    // 判断用户输入是否合法
    if (value != null && !$.ibo.formEditor.UrlReg.test(value)) {
        $.ibo.ShowErrorMsg("请输入正确的地址格式，例如: www.baidu.com");
        value = $.ibo.GetUrl();
    }
    return value;
};
// URL地址正则表达式
$.ibo.formEditor.UrlReg = new RegExp("^((https|http|ftp|rtsp|mms)?://)"
+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
+ "|" // 允许IP和DOMAIN（域名）
+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
+ "[a-z]{2,6})" // first level domain- .com or .museum
+ "(:[0-9]{1,4})?" // 端口- :80
+ "((/?)|" // a slash isn't required if there is no file name
+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");



/******************************  上传附件 upload ******************************/

// 上传附件  upload
$.ibo.formEditor.upload = function (formEditor, para) {

    // 创建上传附件基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        obj.addClass("dropzone");
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "上传附件");

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 5);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);

};



/******************************  图表控件 ******************************/

//图表控件  charts
$.ibo.formEditor.charts = function (formEditor, para) {

    // 创建上传附件基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 设置默认宽高  宽度为页面100%  高度为7行
    this.setDefaultSize(para, 100, 7);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);

    // 设置绑定数据源接口   不需要子表属性   不需要关联页面制作方式
    $.ibo.formEditor.IDataSource.call(this, para, { "hasSub": false }, false);

    // 设置私有属性
    (function () {

        // 图表类别   1：线条图形   2：区域图形   3：柱状图形   4：饼状图形   5：柱状3D   6：饼状3D
        this.attrList["Charts_Type"] = typeof para.attrList["Charts_Type"] == "undefined" ? "1" : para.attrList["Charts_Type"];
        // 设置图表
        this.SetCharts = function () {

            var para;

            switch (this.attrList["Charts_Type"]) {
                // 1：线条图形
                case "1":
                    para = $.ibo.formEditor.charts.LineChartPara;
                    break;
                    // 2：区域图形
                case "2":
                    para = $.ibo.formEditor.charts.AreaChartPara;
                    break;
                    // 3：柱状图形
                case "3":
                    para = $.ibo.formEditor.charts.ColumnChartPara;
                    break;
                    // 4：饼状图形
                case "4":
                    para = $.ibo.formEditor.charts.PieChartPara;
                    break;
                    // 5：柱状3D
                case "5":
                    para = $.ibo.formEditor.charts.Column3DChartPara;
                    break;
                    // 6：饼状3D
                case "6":
                    para = $.ibo.formEditor.charts.Pie3DChartPara;
                    break;
            }

            this.htmlObj.highcharts(para);
            this.chartsObj = this.htmlObj.highcharts();

            this.SetChartsTitle();
            this.SetXAxisTitle();
            this.SetYAxisTitle();

        };

        // 主标题
        this.attrList["Charts_Title"] = typeof para.attrList["Charts_Title"] == "undefined" ? "主标题" : para.attrList["Charts_Title"];
        // 副标题
        this.attrList["Charts_SubTitle"] = typeof para.attrList["Charts_SubTitle"] == "undefined" ? "副标题" : para.attrList["Charts_SubTitle"];

        // 设置标题
        this.SetChartsTitle = function () {
            this.chartsObj.setTitle({ "text": this.attrList["Charts_Title"] }, { "text": this.attrList["Charts_SubTitle"] });
        };

        // X轴说明
        this.attrList["Charts_XTitle"] = typeof para.attrList["Charts_XTitle"] == "undefined" ? "X轴" : para.attrList["Charts_XTitle"];
        // 设置X轴说明
        this.SetXAxisTitle = function () {
            this.chartsObj.xAxis[0].setTitle({ "text": this.attrList["Charts_XTitle"] });
        };

        // Y轴说明
        this.attrList["Charts_YTitle"] = typeof para.attrList["Charts_YTitle"] == "undefined" ? "Y轴" : para.attrList["Charts_YTitle"];
        // 设置Y轴说明
        this.SetYAxisTitle = function () {
            this.chartsObj.yAxis[0].setTitle({ "text": this.attrList["Charts_YTitle"] });
        };


        // 设置字段选择下拉框
        this.setFiledOption = function () {

            // 清空下拉框

            // "X轴字段"下拉框
            $.ibo.formEditor.charts.XFieldID_Slt.empty();
            // "Y轴字段"下拉框
            $.ibo.formEditor.charts.YFieldID_Slt.empty();
            // "统计字段"下拉框
            $.ibo.formEditor.charts.FieldID_Slt.empty();

            var option = $("<option>");
            option.val("");
            option.text("请选择");

            // 设置空选项
            // "X轴字段"下拉框
            $.ibo.formEditor.charts.XFieldID_Slt.append(option.clone());
            // "Y轴字段"下拉框
            $.ibo.formEditor.charts.YFieldID_Slt.append(option.clone());
            // "统计字段"下拉框
            $.ibo.formEditor.charts.FieldID_Slt.append(option.clone());

            var TbInfo = this.getDataSource();
            if (TbInfo && TbInfo.TbColumnList.length > 0) {
                $.each(TbInfo.TbColumnList, function (i, n) {

                    // 文件 = 8,
                    // 地址 = 11,
                    // 地理位置 = 14,
                    // 文本编辑器 = 15
                    // 以上四种字段类型不可用于图表
                    if (n.FieldType.toString() == "8" || n.FieldType.toString() == "11" || n.FieldType.toString() == "14" || n.FieldType.toString() == "15") return;

                    var option = $("<option>");
                    option.val(n.FieldID);
                    option.text(n.Rmk);

                    // 设置选项
                    // "X轴字段"下拉框
                    $.ibo.formEditor.charts.XFieldID_Slt.append(option.clone());
                    // "统计字段"下拉框
                    $.ibo.formEditor.charts.FieldID_Slt.append(option.clone());

                    // 整数 = 1,
                    // 小数 = 2,
                    // Y轴字段只可绑定数字型字段
                    if (n.FieldType.toString() != "1" && n.FieldType.toString() != "2") return;
                    // "Y轴字段"下拉框
                    $.ibo.formEditor.charts.YFieldID_Slt.append(option.clone());
                });
            }
        };

        // X轴字段
        this.attrList["Charts_XFieldID"] = typeof para.attrList["Charts_XFieldID"] == "undefined" ? "" : para.attrList["Charts_XFieldID"];
        // Y轴字段
        this.attrList["Charts_YFieldID"] = typeof para.attrList["Charts_YFieldID"] == "undefined" ? "" : para.attrList["Charts_YFieldID"];
        // 统计字段
        this.attrList["Charts_FieldID"] = typeof para.attrList["Charts_FieldID"] == "undefined" ? "" : para.attrList["Charts_FieldID"];


        this.SetCharts();

        // 设置属性可见性
        this.SetChartsPropVisible = function () {

            // "图表类别"Li
            $.ibo.formEditor.charts.Type_Li.show();
            // "主标题"Li
            $.ibo.formEditor.charts.Title_Li.show();
            // "副标题"Li
            $.ibo.formEditor.charts.SubTitle_Li.show();

            switch (this.attrList["Charts_Type"]) {
                //// 1：线条图形
                //case "1":
                //    break;
                //    // 2：区域图形
                //case "2":
                //    break;
                //    // 3：柱状图形
                //case "3":
                //    break;
                // 4：饼状图形
                case "4":
                    // "X轴说明"Li
                    $.ibo.formEditor.charts.XTitle_Li.hide();
                    // "Y轴说明"Li
                    $.ibo.formEditor.charts.YTitle_Li.hide();
                    // "Y轴字段"Li
                    $.ibo.formEditor.charts.YFieldID_Li.hide();
                    break;
                    //    // 5：柱状3D
                    //case "5":
                    //    break;
                    // 6：饼状3D
                case "6":
                    // "X轴说明"Li
                    $.ibo.formEditor.charts.XTitle_Li.hide();
                    // "Y轴说明"Li
                    $.ibo.formEditor.charts.YTitle_Li.hide();
                    // "Y轴字段"Li
                    $.ibo.formEditor.charts.YFieldID_Li.hide();
                    break;
                default:
                    // "X轴说明"Li
                    $.ibo.formEditor.charts.XTitle_Li.show();
                    // "Y轴说明"Li
                    $.ibo.formEditor.charts.YTitle_Li.show();
                    // "Y轴字段"Li
                    $.ibo.formEditor.charts.YFieldID_Li.show();
                    break;
            }

            // "统计字段"Li
            $.ibo.formEditor.charts.FieldID_Li.show();
            // "X轴字段"Li
            $.ibo.formEditor.charts.XFieldID_Li.show();

        };

    }).call(this);


    // 添加更改数据源触发事件
    this.addAfterDataSourceFn(function () {
        this.setFiledOption();
    });

    // 添加属性显示事件  图表控件charts的私有属性设置
    this.AddShowPrototypeFn(function () {

        // "图标类别"下拉框
        $.ibo.formEditor.charts.Type_Slt.val(this.attrList["Charts_Type"]);

        // "主标题"输入框
        $.ibo.formEditor.charts.Title_Txt.val(this.attrList["Charts_Title"]);

        // "副标题"输入框
        $.ibo.formEditor.charts.SubTitle_Txt.val(this.attrList["Charts_SubTitle"]);


        // "X轴说明"输入框
        $.ibo.formEditor.charts.XTitle_Txt.val(this.attrList["Charts_XTitle"]);

        // "Y轴说明"输入框
        $.ibo.formEditor.charts.YTitle_Txt.val(this.attrList["Charts_YTitle"]);

        // 设置字段选择下拉框
        this.setFiledOption();

        // "X轴字段"下拉框
        $.ibo.formEditor.charts.XFieldID_Slt.val(this.attrList["Charts_XFieldID"]);

        // "Y轴字段"下拉框
        $.ibo.formEditor.charts.YFieldID_Slt.val(this.attrList["Charts_YFieldID"]);

        // "统计字段"下拉框
        $.ibo.formEditor.charts.FieldID_Slt.val(this.attrList["Charts_FieldID"]);

        this.SetChartsPropVisible();
    });

    // 添加控件验证
    this.AddDoValidFn(function () {
        var msg = "";
        var isValid = true;

        // X轴字段必须设置
        if (this.attrList["Charts_XFieldID"].length == "") {
            isValid = false;
            msg += "请设置X轴字段！\n";
        }

        switch (this.attrList["Charts_Type"]) {
            //// 1：线条图形
            //case "1":
            //    break;
            //    // 2：区域图形
            //case "2":
            //    break;
            //    // 3：柱状图形
            //case "3":
            //    break;
            // 4：饼状图形
            case "4":
                break;
                //    // 5：柱状3D
                //case "5":
                //    break;
                // 6：饼状3D
            case "6":
                break;
            default:
                if (this.attrList["Charts_YFieldID"].length == "") {
                    isValid = false;
                    msg += "请设置Y轴字段！\n";
                }
                break;
        }
        // 统计字段必须设置
        if (this.attrList["Charts_FieldID"].length == "") {
            isValid = false;
            msg += "请设置统计字段！\n";
        }

        if (!isValid) {
            $.ibo.ShowErrorMsg(msg);
        }
        return isValid;
    });
};
// 图表控件初始化
$.ibo.formEditor.charts.Init = function () {

    // "图标类别"Li
    $.ibo.formEditor.charts.Type_Li = $("#Property_Charts_Type_Li");
    // "图标类别"下拉框
    $.ibo.formEditor.charts.Type_Slt = $("#Property_Charts_Type_Slt");
    // 绑定"图标类别"下拉框
    $.ibo.formEditor.charts.Type_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_Type"] = $(this).val();
        // 设置图标实例
        ctrl.SetCharts();
        // 设置属性可见性
        ctrl.SetChartsPropVisible();
    });

    // "主标题"Li
    $.ibo.formEditor.charts.Title_Li = $("#Property_Charts_Title_Li");
    // "主标题"输入框
    $.ibo.formEditor.charts.Title_Txt = $("#Property_Charts_Title_Txt");
    // 绑定"主标题"输入框设置
    $.ibo.formEditor.charts.Title_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_Title"] = $(this).val();
        ctrl.SetChartsTitle();
    });

    // "副标题"Li
    $.ibo.formEditor.charts.SubTitle_Li = $("#Property_Charts_SubTitle_Li");
    // "副标题"输入框
    $.ibo.formEditor.charts.SubTitle_Txt = $("#Property_Charts_SubTitle_Txt");
    // 绑定"副标题"输入框设置
    $.ibo.formEditor.charts.SubTitle_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_SubTitle"] = $(this).val();
        ctrl.SetChartsTitle();
    });

    // "X轴说明"Li
    $.ibo.formEditor.charts.XTitle_Li = $("#Property_Charts_XTitle_Li");
    // "X轴说明"输入框
    $.ibo.formEditor.charts.XTitle_Txt = $("#Property_Charts_XTitle_Txt");
    // 绑定"X轴说明"输入框设置
    $.ibo.formEditor.charts.XTitle_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_XTitle"] = $(this).val();
        ctrl.SetXAxisTitle();
    });

    // "Y轴说明"Li
    $.ibo.formEditor.charts.YTitle_Li = $("#Property_Charts_YTitle_Li");
    // "Y轴说明"输入框
    $.ibo.formEditor.charts.YTitle_Txt = $("#Property_Charts_YTitle_Txt");
    // 绑定"Y轴说明"输入框设置
    $.ibo.formEditor.charts.YTitle_Txt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_YTitle"] = $(this).val();
        ctrl.SetYAxisTitle();
    });

    // "X轴字段"Li
    $.ibo.formEditor.charts.XFieldID_Li = $("#Property_Charts_XFieldID_Li");
    // "X轴字段"下拉框
    $.ibo.formEditor.charts.XFieldID_Slt = $("#Property_Charts_XFieldID_Slt");
    // 绑定"X轴字段"下拉框
    $.ibo.formEditor.charts.XFieldID_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_XFieldID"] = $(this).val();
    });

    // "Y轴字段"Li
    $.ibo.formEditor.charts.YFieldID_Li = $("#Property_Charts_YFieldID_Li");
    // "Y轴字段"下拉框
    $.ibo.formEditor.charts.YFieldID_Slt = $("#Property_Charts_YFieldID_Slt");
    // 绑定"Y轴字段"下拉框
    $.ibo.formEditor.charts.YFieldID_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_YFieldID"] = $(this).val();
    });

    // "统计字段"Li
    $.ibo.formEditor.charts.FieldID_Li = $("#Property_Charts_FieldID_Li");
    // "统计字段"下拉框
    $.ibo.formEditor.charts.FieldID_Slt = $("#Property_Charts_FieldID_Slt");
    // 绑定"统计字段"下拉框
    $.ibo.formEditor.charts.FieldID_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Charts_FieldID"] = $(this).val();
    });

};
// 图表示例参数
(function () {

    // 线条图形示例参数
    $.ibo.formEditor.charts.LineChartPara = {
        chart: { type: "line" },
        title: { text: "线条图形" },
        subtitle: { text: "示例" },
        xAxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], title: { text: "月份" } },
        yAxis: { title: { text: "温度(°C)" } },
        plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: false } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ name: "实例一", data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6] }, { name: "实例二", data: [2, -2, -3, 2, 1, 10, 7, 9, 4, 5] }]
    };
    // 区域图形示例参数
    $.ibo.formEditor.charts.AreaChartPara = {
        chart: { type: "area" },
        title: { text: "区域图形" },
        subtitle: { text: "示例" },
        xAxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], title: { text: "月份" } },
        yAxis: { title: { text: "温度(°C)" } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ name: "实例一", data: [5, 3, 4, 7, 2, 10, 12, 3, 18, 9] }, { name: "实例二", data: [2, -2, -3, 2, 1, 10, 7, 9, 4, 5] }]
    };
    // 柱状图形示例参数
    $.ibo.formEditor.charts.ColumnChartPara = {
        chart: { type: "column" },
        title: { text: "柱状图形" },
        subtitle: { text: "示例" },
        xAxis: { categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], title: { text: "月份" } },
        yAxis: { title: { text: "下雨量(mm)" } },
        plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ name: "实例一", data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] },
            { name: "实例二", data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3] }]
    };
    // 饼状图形示例参数
    $.ibo.formEditor.charts.PieChartPara = {
        chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: "pie" },
        title: { text: "饼状图形" },
        tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
        plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ name: "Brands", colorByPoint: true, data: [{ name: "IE", y: 56.33 }, { name: "Chrome", y: 24.03, sliced: true, selected: true }, { name: "Firefox", y: 10.38 }, { name: "Safari", y: 4.77 }, { name: "Opera", y: 0.91 }, { name: "Others", y: 0.2 }] }]
    };
    // 柱状3D图形示例参数
    $.ibo.formEditor.charts.Column3DChartPara = {
        chart: { type: "column", margin: 75, options3d: { enabled: true, alpha: 10, beta: 25, depth: 70 } },
        title: { text: "柱状3D" },
        subtitle: { text: "示例" },
        xAxis: { categories: Highcharts.getOptions().lang.shortMonths, title: { text: "x轴" } },
        yAxis: { title: { text: "y轴" } },
        plotOptions: { column: { depth: 25 } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ name: 'Sales', data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3] }]
    };
    // 饼状3D图形示例参数
    $.ibo.formEditor.charts.Pie3DChartPara = {
        chart: { type: "pie", options3d: { enabled: true, alpha: 45, beta: 0 } },
        title: { text: "柱状3D" },
        xAxis: { categories: Highcharts.getOptions().lang.shortMonths, title: { text: "x轴" } },
        yAxis: { title: { text: "y轴" } },
        tooltip: { pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>" },
        plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', depth: 35, dataLabels: { enabled: true, format: '{point.name}' } } },
        // 禁用版权信息
        credits: { enabled: false },
        series: [{ type: 'pie', name: 'Browser share', data: [['Firefox', 45.0], ['IE', 26.8], { name: 'Chrome', y: 12.8, sliced: true, selected: true }, ['Safari', 8.5], ['Opera', 6.2], ['Others', 0.7]] }]
    };
})();


/******************************  部门 ******************************/

// 部门 depart
$.ibo.formEditor.depart = function (formEditor, para) {

    // 创建部门基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "id": this.HtmlID, "type": "text" });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "部门");

    // 设置默认宽高  宽度为页面100%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);

    // 设置私有属性
    (function () {

        // 是否默认当前部门
        this.attrList["Depart_IsCur"] = para.attrList["Depart_IsCur"] == "true" ? "true" : "false";
    }).call(this);

    // 添加显示属性方法   显示部门私有属性
    this.AddShowPrototypeFn(function () {

        // 设置是否默认当前部门checkbox
        $.ibo.formEditor.depart.chk.prop("checked", this.attrList["Depart_IsCur"] == "true");
        // 显示是否默认当前部门Li
        $.ibo.formEditor.depart.Li.show();
    });

};
// 部门初始化
$.ibo.formEditor.depart.Init = function () {

    // 设置是否默认当前部门Li
    $.ibo.formEditor.depart.Li = $("#Property_Depart_Li");
    // 设置是否默认当前部门checkbox
    $.ibo.formEditor.depart.chk = $("#Property_Depart_Chk");
    // 绑定设置是否默认当前部门checkbox
    $.ibo.formEditor.depart.chk.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Depart_IsCur"] = $(this).is(":checked") ? "true" : "false";
    });

};



/******************************  姓名 ******************************/

// 姓名 employeename
$.ibo.formEditor.employeename = function (formEditor, para) {

    // 创建姓名基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "id": this.HtmlID, "type": "text" });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "姓名");

    // 设置默认宽高  宽度为页面100%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);

    // 设置私有属性
    (function () {

        // 是否默认当前部门
        this.attrList["Employeename_IsCur"] = para.attrList["Employeename_IsCur"] == "true" ? "true" : "false";
    }).call(this);

    // 添加显示属性方法   显示部门私有属性
    this.AddShowPrototypeFn(function () {

        // 设置是否默认当前部门checkbox
        $.ibo.formEditor.employeename.chk.prop("checked", this.attrList["Employeename_IsCur"] == "true");
        // 显示是否默认当前部门Li
        $.ibo.formEditor.employeename.Li.show();
    });

};
// 部门初始化
$.ibo.formEditor.employeename.Init = function () {

    // 设置是否默认当前部门Li
    $.ibo.formEditor.employeename.Li = $("#Property_Employeename_Li");
    // 设置是否默认当前部门checkbox
    $.ibo.formEditor.employeename.chk = $("#Property_Employeename_Chk");
    // 绑定设置是否默认当前部门checkbox
    $.ibo.formEditor.employeename.chk.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Employeename_IsCur"] = $(this).is(":checked") ? "true" : "false";
    });

};



/******************************  地址 ******************************/

// 地址 address
$.ibo.formEditor.address = function (formEditor, para) {

    // 创建地址基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });

        // 省
        var slt = $("<select>");
        slt.css({ "width": "33%", "height": this.formEditor.View.CountLineHeight(1) + "px" });
        var option = $("<option>");
        option.val("");
        option.text("省/自治区");
        slt.append(option);

        this.ProviceSlt = slt;
        obj.append(slt);

        // 市
        slt = $("<select>");
        slt.css({ "width": "33%", "height": this.formEditor.View.CountLineHeight(1) + "px" });
        option = $("<option>");
        option.val("");
        option.text("市");
        slt.append(option);

        this.CitySlt = slt;
        obj.append(slt);

        // 区
        slt = $("<select>");
        slt.css({ "width": "34%", "height": this.formEditor.View.CountLineHeight(1) + "px" });
        option = $("<option>");
        option.val("");
        option.text("区/县");
        slt.append(option);

        this.AreaSlt = slt;
        obj.append(slt);

        //详细地址
        var textarea = $("<textarea>");
        textarea.css({ "width": "100%", "height": this.formEditor.View.CountLineHeight(3) + "px", "box-sizing": "border-box" });

        // 详细地址
        textarea.attr("placeholder", "详细地址");

        this.DetailTxt = textarea;
        obj.append(textarea);

        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "地址");

    // 设置默认宽高  宽度为页面100%  高度为5行
    this.setDefaultSize(para, 100, 5);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);


    // 私有属性设置
    (function () {

        // 省下拉框默认值
        this.attrList["Address_Provice"] = typeof para.attrList["Address_Provice"] == "undefined" ? "" : para.attrList["Address_Provice"];

        this.ProviceSlt.empty();
        this.ProviceSlt.append($("<option>").text(this.attrList["Address_Provice"]).val(this.attrList["Address_Provice"]));

        // 市下拉框默认值
        this.attrList["Address_City"] = typeof para.attrList["Address_City"] == "undefined" ? "" : para.attrList["Address_City"];

        this.CitySlt.empty();
        this.CitySlt.append($("<option>").text(this.attrList["Address_City"]).val(this.attrList["Address_City"]));

        // 区下拉框默认值
        this.attrList["Address_Area"] = typeof para.attrList["Address_Area"] == "undefined" ? "" : para.attrList["Address_Area"];

        this.AreaSlt.empty();
        this.AreaSlt.append($("<option>").text(this.attrList["Address_Area"]).val(this.attrList["Address_Area"]));

        // 详细地址默认值
        this.attrList["Address_Detail"] = typeof para.attrList["Address_Detail"] == "undefined" ? "" : para.attrList["Address_Detail"];

        this.DetailTxt.val(this.attrList["Address_Detail"]);


        // 设置属性值到对应设置控件中
        this.SetSltOptions = function () {
            // 设置"省默认值"下拉框
            $.ibo.formEditor.address.Provice_Slt.val(this.attrList["Address_Provice"]);
            // 手动出发change 获取市下拉框选项
            $.ibo.formEditor.address.Provice_Slt.change();


            // 设置"市默认值"下拉框
            $.ibo.formEditor.address.City_Slt.val(this.attrList["Address_City"]);
            // 手动出发change 获取区下拉框选项
            $.ibo.formEditor.address.City_Slt.change();

            // 设置"区默认值"下拉框
            $.ibo.formEditor.address.Area_Slt.val(this.attrList["Address_Area"]);
            // 手动出发change
            $.ibo.formEditor.address.Area_Slt.change();

            // 设置"详细地址默认值"多行输入框
            $.ibo.formEditor.address.Detail_TextArea.val(this.attrList["Address_Detail"]);
        };

        // 设置html对象下拉框内容
        this.setHtmlObj = function () {

            // 设置省
            var Address_Provice = this.attrList["Address_Provice"];
            if (Address_Provice.length == 0) Address_Provice = "省/自治区";

            var option = $("<option>");
            option.val(Address_Provice);
            option.text(Address_Provice);

            this.ProviceSlt.empty();
            this.ProviceSlt.append(option);

            // 设置市
            var Address_City = this.attrList["Address_City"];
            if (Address_City.length == 0) Address_City = "市";

            option = $("<option>");
            option.val(Address_City);
            option.text(Address_City);

            this.CitySlt.empty();
            this.CitySlt.append(option);

            // 设置区
            var Address_Area = this.attrList["Address_Area"];
            if (Address_Area.length == 0) Address_Area = "区/县";

            option = $("<option>");
            option.val(Address_Area);
            option.text(Address_Area);

            this.AreaSlt.empty();
            this.AreaSlt.append(option);
        };
        // 设置html对象也选择相同项
        this.setHtmlObj();

    }).call(this);

    // 添加属性显示方法   显示地址私有属性
    this.AddShowPrototypeFn(function () {

        this.SetSltOptions();

        // 显示"省默认值"Li
        $.ibo.formEditor.address.Provice_Li.show();
        // 显示"市默认值"Li
        $.ibo.formEditor.address.City_Li.show();
        // 显示"区默认值"Li
        $.ibo.formEditor.address.Area_Li.show();
        // 显示"详细地址默认值"Li
        $.ibo.formEditor.address.Detail_Li.show();

    });

};
// 地址初始化
$.ibo.formEditor.address.Init = function () {
    // 设置"省默认值"Li
    $.ibo.formEditor.address.Provice_Li = $("#Property_Address_Provice_Li");
    // 设置"省默认值"下拉框
    $.ibo.formEditor.address.Provice_Slt = $("#Property_Address_Provice_Slt");
    // 设置"市默认值"Li
    $.ibo.formEditor.address.City_Li = $("#Property_Address_City_Li");
    // 设置"市默认值"下拉框
    $.ibo.formEditor.address.City_Slt = $("#Property_Address_City_Slt");
    // 设置"区默认值"Li
    $.ibo.formEditor.address.Area_Li = $("#Property_Address_Area_Li");
    // 设置"区默认值"下拉框
    $.ibo.formEditor.address.Area_Slt = $("#Property_Address_Area_Slt");

    // 设置 省 市 区 三级联动   $.ibo.SetAddress方法存在于address-cn.js中
    $.ibo.SetAddress($.ibo.formEditor.address.Provice_Slt, $.ibo.formEditor.address.City_Slt, $.ibo.formEditor.address.Area_Slt);

    // 更改"省默认值"同步更改html对象
    $.ibo.formEditor.address.Provice_Slt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Address_Provice"] = $(this).val();

        // 设置html对象也选择相同项
        ctrl.setHtmlObj();
    });
    // 更改"市默认值"同步更改html对象
    $.ibo.formEditor.address.City_Slt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Address_City"] = $(this).val();

        // 设置html对象也选择相同项
        ctrl.setHtmlObj();
    });
    // 更改"市默认值"同步更改html对象
    $.ibo.formEditor.address.Area_Slt.on("input propertychange", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Address_Area"] = $(this).val();

        // 设置html对象也选择相同项
        ctrl.setHtmlObj();
    });

    // 设置"详细地址默认值"Li
    $.ibo.formEditor.address.Detail_Li = $("#Property_Address_Detail_Li");
    // 设置"详细地址默认值"多行输入框
    $.ibo.formEditor.address.Detail_TextArea = $("#Property_Address_Detail_TextArea");
    // 绑定"详细地址默认值"多行输入框设置事件
    $.ibo.formEditor.address.Detail_TextArea.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Address_Detail"] = $(this).val();
        ctrl.DetailTxt.val($(this).val());
    });
};





/******************************  手机 ******************************/

// 手机 telephone
$.ibo.formEditor.telephone = function (formEditor, para) {

    // 创建手机基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "id": this.HtmlID, "type": "text" });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "手机");

    // 设置默认宽高  宽度为页面100%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);
};



/******************************  电子邮箱 ******************************/

// 电子邮箱 email
$.ibo.formEditor.email = function (formEditor, para) {

    // 创建电子邮箱基本html
    this.createHtmlObject = function () {
        var obj = $("<input>", { "id": this.HtmlID, "type": "text" });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "电子邮箱");

    // 设置默认宽高  宽度为页面100%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 提示文字接口
    $.ibo.formEditor.ITips.call(this, para, false);
};



/******************************  地理位置 ******************************/

// 地理位置 location
$.ibo.formEditor.location = function (formEditor, para) {



    // 创建地理位置基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        // 外层div不换行   隐藏超出内容
        obj.css({ "overflow": "hidden", "white-space": "nowrap" });

        // 位置文字描述
        var txt = $("<input>", { "type": "text" });
        txt.css({ "width": "100%", "height": this.formEditor.View.CountLineHeight(1) + "px" });
        obj.append(txt);

        // 地图div
        var map = $("<div>");
        map.css({ "width": "100%", "height": (this.formEditor.View.CountLineHeight(5) + this.formEditor.View.LineDistance - 2) + "px", "margin-top": "2px" });
        // 地图假图片
        var img = $("<img>");
        img.attr("src", "../../img/map.png");
        map.append(img);
        obj.append(map);

        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "地理位置");

    // 设置默认宽高  宽度为页面100%  高度为7行
    this.setDefaultSize(para, 100, 7);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

};




/******************************  时间 ******************************/

// 时间 time
$.ibo.formEditor.time = function (formEditor, para) {

    // 创建时间基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        // 外层div不换行   隐藏超出内容
        obj.css({ "overflow": "hidden", "white-space": "nowrap" });

        // 当前时间
        var date = new Date();
        // 小时
        var h = date.getHours();
        // 分钟
        var m = date.getMinutes();

        var option;
        var lineHeight = this.formEditor.View.LineHeight;

        // 时种下拉框
        var slt = $("<select>");
        slt.css({ "width": "46%", "height": lineHeight + "px" });
        //for (var i = 0; i < 24; i++) {
        //    option = $("<option>");
        //    option.val(i < 10 ? "0" + i : i);
        //    option.text(i < 10 ? "0" + i : i);
        //    slt.append(option);
        //}

        option = $("<option>");
        option.val(h < 10 ? "0" + h : h);
        option.text(h < 10 ? "0" + h : h);
        slt.append(option);
        this.htmlObj_Hours = slt;
        obj.append(slt);

        obj.append("<span style=\"display:inline-block;width:8%;text-align:center;font-weight:bold;\">:<span>");

        // 分钟下拉框
        slt = $("<select>");
        slt.css({ "width": "46%", "height": lineHeight + "px", "float": "right" });
        //for (var i = 0; i < 60; i++) {
        //    option = $("<option>");
        //    option.val(i < 10 ? "0" + i : i);
        //    option.text(i < 10 ? "0" + i : i);
        //    slt.append(option);
        //}

        option = $("<option>");
        option.val(m < 10 ? "0" + m : m);
        option.text(m < 10 ? "0" + m : m);
        slt.append(option);
        this.htmlObj_Mins = slt;
        obj.append(slt);

        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "时间");

    // 设置默认宽高  宽度为页面50%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    // 移除htmlObj在边框接口中设置的边框
    this.htmlObj.css({ "border": "0 none" });


    // 设置私有属性
    (function () {

        // 是否默认为当前时间
        this.attrList["Time_Default"] = para.attrList["Time_Default"] == "true" ? "true" : "false";

        // 重写设置边框样式方法
        this.SetBorderStyle = function (s) {
            if (typeof s != "undefined") {
                this.attrList["Border_Style"] = s;
            }

            // 根据类别设置CSS样式   只设置连个下拉框的样式   不设置别的样式
            switch (this.attrList["Border_Style"]) {
                case "0":
                    this.htmlObj_Hours.css({ "border": "0 none" });
                    this.htmlObj_Mins.css({ "border": "0 none" });
                    break;
                case "1":
                    this.htmlObj_Hours.css({ "border": "0 none" });
                    this.htmlObj_Hours.css({ "border-bottom": "1px solid #CCCCCC" });
                    this.htmlObj_Mins.css({ "border": "0 none" });
                    this.htmlObj_Mins.css({ "border-bottom": "1px solid #CCCCCC" });
                    break;
                case "2":
                    this.htmlObj_Hours.css({ "border": "1px solid #CCCCCC" });
                    this.htmlObj_Mins.css({ "border": "1px solid #CCCCCC" });
                    break;
                default: break;
            }
        };
        this.SetBorderStyle();

    }).call(this);

    // 添加显示属性方法
    this.AddShowPrototypeFn(function () {

        // 设置"当前时间"checkbox
        $.ibo.formEditor.time.Default_Chk.prop("checked", this.attrList["Time_Default"] == "true");
        // 显示"当前时间"设置Li
        $.ibo.formEditor.time.Default_Li.show();
    });

};
// 初始化时间
$.ibo.formEditor.time.Init = function () {

    // "当前时间"设置Li
    $.ibo.formEditor.time.Default_Li = $("#Property_Time_Default_Li");
    // "当前时间"设置checkbox
    $.ibo.formEditor.time.Default_Chk = $("#Property_Time_Default_Chk");
    // 绑定"当前时间"checkbox设置
    $.ibo.formEditor.time.Default_Chk.on("click", function () {
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["Time_Default"] = $(this).is(":checked") ? "true" : "false";
    });
};



/******************************  配图商品 ******************************/

// 配图商品 imageproduct
$.ibo.formEditor.imageproduct = function (formEditor, para) {

    // 创建时间基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "配图商品");

    // 设置默认宽高  宽度为页面50%  高度为1行
    this.setDefaultSize(para, 100, 2);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);
};



/******************************  无图商品 ******************************/

// 无图商品 noimgproduct
$.ibo.formEditor.noimgproduct = function (formEditor, para) {

    // 创建时间基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "无图商品");

    // 设置默认宽高  宽度为页面50%  高度为1行
    this.setDefaultSize(para, 100, 2);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);
};



/******************************  面板 div ******************************/

$.ibo.formEditor.panel = function (formEditor, para) {

    // 创建面板基本html
    this.createHtmlObject = function () {

        var obj = $("<div>", { "id": this.HtmlID });
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "面板");

    // 设置默认宽高  宽度为页面100%  高度为3行
    this.setDefaultSize(para, 100, 3);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);

    // 设置绑定数据源接口  需要子表属性  默认子表属性为true  需要关联页面制作方式
    $.ibo.formEditor.IDataSource.call(this, para, { "hasSub": true, "Default": "true" }, true);

    // 私有属性设置
    (function () {

        // 设置面板高度
        this.setHeight = function () {

            var length = this.formEditor.controls.length;

            // 计算高度
            var height = 0;

            // 行间距
            var LineDistance = this.formEditor.View.LineDistance;

            for (var i = 0; i < length; i++) {
                var ctrl = this.formEditor.controls[i];
                // 查询所有容器内子容器的高度和
                if (ctrl.attrList["ParentID"] == this.HtmlID) {
                    height += ctrl.Size().height + LineDistance;
                }
            }

            // 面板默认比所有控件高度和多一行
            height += this.formEditor.View.CountLineHeight(1);

            var minHeight = this.formEditor.View.CountLineHeight(2);

            // 空白面板默认为2行高度
            if (height < minHeight) height = minHeight;
            // 含有标题 需要增加一行
            if (this.attrList["Title_HasTitle"] == "true") {
                height += this.formEditor.View.CountLineHeight(1) + LineDistance;
            }

            // 面板原有高度
            var oldHeight = this.Size().height;

            // 面板高度有变化
            if (oldHeight != height) {

                this.Size({ "h": height + "px" });

                // 计算此次变化多少行高度
                var line = (height - oldHeight) / (LineDistance + this.formEditor.View.LineHeight);

                // 设置其它控件偏移
                this.setOtherControlPosition(line);
            }
        };

        var fn = this.setHasTitle;
        // 重写设置当前控件是否有标题
        this.setHasTitle = function (flag) {
            // 执行父类的方法
            fn.call(this, flag);

            // 单行高度
            var lineHeight = this.formEditor.View.LineHeight + this.formEditor.View.LineDistance;
            // 遍历所有子控件  重置位置
            var length = this.formEditor.controls.length;
            for (var i = 0; i < length; i++) {
                var ctrl = this.formEditor.controls[i];
                if (ctrl.attrList["ParentID"] == this.HtmlID) {
                    var top = ctrl.Position().top;
                    // 增加标题   所有控件下移一行
                    if (flag) {
                        ctrl.Position({ "t": (top + lineHeight) + "px" });
                    }
                        // 去除标题   所有控件上移一行
                    else {
                        ctrl.Position({ "t": (top - lineHeight) + "px" });
                    }
                }
            }

        };

    }).call(this);

    // 添加移除控件方法  移除子控件
    this.AddRemoveFn(function () {
        var length = this.formEditor.controls.length;
        var arr = [];
        // 查询所有子控件
        for (var i = 0; i < length; i++) {
            var ctrl = this.formEditor.controls[i];
            if (ctrl.attrList["ParentID"] == this.HtmlID) {
                arr.push(ctrl);
            }
        }
        // 移除所有子控件
        while (arr.length > 0) {
            var ctrl = arr.pop();
            ctrl.remove()
        }

    });

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para, "1");

    // 添加验证方法
    this.AddDoValidFn(function () {
        var res = true;

        // 当前是根据页面控件生成数据表
        if (this.formEditor.View.GenerateType == "2") {
            // 当前控件未勾选子表属性
            if (this.attrList["DataSource_IsSub"] == "false") {
                // 页面是否具有主表录入控件
                var hasViewInput = false;
                // 当前面板是否具有录入控件
                var curHasInput = false;

                var length = this.formEditor.controls.length;
                for (var i = 0; i < length; i++) {
                    var ctrl = this.formEditor.controls[i];
                    // ParentID为空  主表控件
                    if (!hasViewInput && $.trim(ctrl.attrList["ParentID"]).length == 0
                        // Input_FieldID!=undefined  录入控件
                        && typeof ctrl.attrList["Input_FieldID"] != "undefined") hasViewInput = true;
                    // ParentID= this.HtmlID  当前面板的子控件
                    if (!curHasInput && ctrl.attrList["ParentID"] == this.HtmlID
                        // Input_FieldID!=undefined  录入控件
                        && typeof ctrl.attrList["Input_FieldID"] != "undefined") curHasInput = true;

                    // 既存在主表录入控件   又存在面板的录入子控件
                    if (hasViewInput && curHasInput) {

                        // 显示控件名字
                        var name = this.name;
                        // 控件无名字 则显示面板+HtmlID随机数
                        if ($.trim(name).length == 0) name = "面板" + this.HtmlID.replace("ctrl", "");
                        // 给予提示
                        if (!$.ibo.ShowYesOrNoDialog("\"" + name + "\"没有勾选是否子表，则面板生成的数据表不会成为页面生成的数据表的子表，是否确认执行此操作？")) {
                            res = false;
                        }
                        break;
                    }
                }
            }
        }
        return res;
    });
};



/****************************** 文本编辑器 *****************************/

$.ibo.formEditor.articleedit = function (formEditor, para) {
    // 创建面板基本html
    this.createHtmlObject = function () {
        var obj = $("<textarea>");
        obj.attr("id", this.HtmlID);
        obj.attr("name", "articleedit");
        return obj;
    };
    // 属性继承自$.ibo.formEditor.control
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 设置带标题
    $.ibo.formEditor.ITitle.call(this, para, "文本编辑器");

    // 设置默认宽高  宽度为页面100%  高度为4行
    this.setDefaultSize(para, 100, 4);

    // 录入控件接口
    $.ibo.formEditor.IInput.call(this, para);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, true, true);

}



/******************************  树形控件 ******************************/

$.ibo.formEditor.treeview = function (formEditor, para) {
    // 验证控件只能添加一个
    if ($.grep($.ibo.formEditor.Instance.controls, function (m, j) { return m.ControlType == "treeview" }).length > 0) {
        $.ibo.ShowErrorMsg("系统只能添加一个树形控件！");
        this.htmlObj = null;
        return;
    }
    else {  //如果是新添加的，则要重置树形控件属性面板
        $.ibo.formEditor.treeview.ReSetProp();
    }

    // 创建面板基本html
    this.createHtmlObject = function () {
        var obj = $('<div><div id="tree" class="treeview" style="width: 320px;"><ul class="list-group"><li class="treeview-node-item node-tree" data-nodeid="0" style="font-weight: bold;"><span class="icon expand-icon glyphicon glyphicon-chevron-up"></span><span></span><span class="icon node-icon"></span>Parent</li><li class="treeview-node-item node-tree" data-nodeid="1" style="font-weight: bold;"><span class="icon expand-icon glyphicon glyphicon-chevron-up"></span><span>--</span><span class="icon node-icon"></span>Child</li><li class="treeview-node-item node-tree" data-nodeid="2" style="color:undefined;background-color:undefined;"><input type="button" class="treeview-opbtn treeview-opbtn-message" onclick="message()"><span class="icon glyphicon"></span><span class="icon node-icon"></span>Grandchild</li><li class="treeview-node-item node-tree" data-nodeid="3" style="font-weight: bold;"><span class="icon expand-icon glyphicon glyphicon-chevron-up"></span><span>--</span><span class="icon node-icon"></span>Child</li><li class="treeview-node-item node-tree node-selected" data-nodeid="4" style="color:undefined;background-color:undefined;"><input type="button" class="treeview-opbtn treeview-opbtn-message" onclick="message()"><span class="icon glyphicon"></span><span class="icon node-icon"></span>Grandchild</li><li class="treeview-node-item node-tree" data-nodeid="5" style="color:undefined;background-color:undefined;"><input type="button" class="treeview-opbtn treeview-opbtn-go" onclick="go()"><span class="icon glyphicon"></span><span class="icon node-icon"></span>Grandchild</li></ul></div></div>');
        obj.attr("id", this.HtmlID);
        obj.attr("name", "treeview");
        return obj;
    };

    // 属性继承自$.ibo.formEditor.control
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 设置带标题
    $.ibo.formEditor.ITitle.call(this, para, "树形控件");

    // 设置默认宽高  宽度为页面100%  高度为8行
    this.setDefaultSize(para, 100, 8);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);

    // 继承事件接口
    $.ibo.formEditor.IEvent.call(this, para);

    // 设置绑定数据源接口（父节点数据源）   不需要子表属性   不需要关联页面制作方式
    $.ibo.formEditor.IDataSource.call(this, para, { "hasSub": false }, false);

    //数据源接口（叶节点数据源）
    $.ibo.formEditor.IDataSourceTV.call(this, para);

    // 设置私有属性
    (function () {

        // 先将属性赋值给控件
        this.attrList["DataSource_TbSelectColumns"] = typeof para.attrList["DataSource_TbSelectColumns"] == "undefined" ? "[]" : para.attrList["DataSource_TbSelectColumns"];   // 第一个数据源选中的列
        this.attrList["DataSource_TbColumns"] = typeof para.attrList["DataSource_TbColumns"] == "undefined" ? "[]" : para.attrList["DataSource_TbColumns"];                     // 第一个数据源所有的列
        this.attrList["DataSource_FieldID"] = typeof para.attrList["DataSource_FieldID"] == "undefined" ? "" : para.attrList["DataSource_FieldID"];                             // 第一个数据源绑定字段ID（用于父节点文本显示）
        this.attrList["DataSource_FieldName1"] = typeof para.attrList["DataSource_FieldName1"] == "undefined" ? "" : para.attrList["DataSource_FieldName1"];                    // 第一个数据源关联字段的字段名称，如“field1”
        this.attrList["DataSource_RFieldID1"] = typeof para.attrList["DataSource_RFieldID1"] == "undefined" ? "" : para.attrList["DataSource_RFieldID1"];                       // 第一个数据源关联字段的字段ID（自己关联自己）
        this.attrList["DataSource_RFieldName1"] = typeof para.attrList["DataSource_RFieldName1"] == "undefined" ? "" : para.attrList["DataSource_RFieldName1"];                 // 第一个数据源关联字段的字段名称（自己关联自己）

        this.attrList["DataSource_TbName2"] = typeof para.attrList["DataSource_TbName2"] == "undefined" ? "" : para.attrList["DataSource_TbName2"];                             // 第二个数据源名称
        this.attrList["DataSource_TbName_Rmk2"] = typeof para.attrList["DataSource_TbName_Rmk2"] == "undefined" ? "" : para.attrList["DataSource_TbName_Rmk2"];                 // 第二个数据源描述
        this.attrList["DataSource_TbSelectColumns2"] = typeof para.attrList["DataSource_TbSelectColumns2"] == "undefined" ? "[]" : para.attrList["DataSource_TbSelectColumns2"];// 第二个数据源选中的列
        this.attrList["DataSource_TbColumns2"] = typeof para.attrList["DataSource_TbColumns2"] == "undefined" ? "[]" : para.attrList["DataSource_TbColumns2"];                  // 第二个数据源所有的列
        this.attrList["DataSource_FieldID2"] = typeof para.attrList["DataSource_FieldID2"] == "undefined" ? "" : para.attrList["DataSource_FieldID2"];                          // 第二个数据源绑定字段ID（用于叶节点文本显示）
        this.attrList["DataSource_FieldName2"] = typeof para.attrList["DataSource_FieldName2"] == "undefined" ? "" : para.attrList["DataSource_FieldName2"];                    // 第二个数据源关联字段的字段名称ID（用于叶节点文本显示）
        this.attrList["DataSource_RFieldID3"] = typeof para.attrList["DataSource_RFieldID3"] == "undefined" ? "" : para.attrList["DataSource_RFieldID3"];                       // 第二个数据源关联字段的字段ID（和第一个数据源关联）
        this.attrList["DataSource_RFieldName3"] = typeof para.attrList["DataSource_RFieldName3"] == "undefined" ? "" : para.attrList["DataSource_RFieldName3"];                 // 第二个数据源关联字段的字段名称（和第一个数据源关联）

        this.attrList["IsSetLeafDataSource"] = para.attrList["IsSetLeafDataSource"] == "true" ? "true" : "false";                   // 是否设置第二个数据源
        this.attrList["BackColor"] = typeof para.attrList["BackColor"] == "undefined" ? "" : para.attrList["BackColor"];            // 背景色
        this.attrList["ForeColor"] = typeof para.attrList["ForeColor"] == "undefined" ? "" : para.attrList["ForeColor"];            // 字体颜色
        this.attrList["SelBackColor"] = typeof para.attrList["SelBackColor"] == "undefined" ? "" : para.attrList["SelBackColor"];   // 选中颜色
        this.attrList["FontSize"] = typeof para.attrList["FontSize"] == "undefined" ? "" : para.attrList["FontSize"];               // 字体大小

        // "是否设置叶节点数据源"选中
        if (para.attrList["IsSetLeafDataSource"] == "true") {
            $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk.click();                             // 如果为“true”，则设置勾选
            $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk.attr("checked", "checked");
        }

        // 设置第一个数据源的相关绑定字段
        if (para.attrList["DataSource_TbColumns"] != null && para.attrList["DataSource_TbColumns"] != "[]") {
            $.ibo.formEditor.SetBindField($("#Property_TVFieldID_Slt1"), JSON.parse(para.attrList["DataSource_TbColumns"]), para.attrList["DataSource_FieldID"]);        // obj.TbColumnList 设置到下拉框
            $.ibo.formEditor.SetBindField($("#Property_RTVFieldID_Slt1"), JSON.parse(para.attrList["DataSource_TbColumns"]), para.attrList["DataSource_RFieldID1"]);     // obj.TbColumnList 设置到下拉框
        }

        // 设置第二个数据源的数据表名
        if (para.attrList["DataSource_TbName2"] != null && para.attrList["DataSource_TbName2"] != "")
            $.ibo.formEditor.IDataSourceTV.TbName_Txt2.val(para.attrList["DataSource_TbName_Rmk2"]);    // 设置数据表名输入框

        // 设置第二个数据源的相关绑定字段
        if (para.attrList["DataSource_TbColumns2"] != null && para.attrList["DataSource_TbColumns2"] != "[]") {
            $.ibo.formEditor.SetBindField($("#Property_TVFieldID_Slt2"), JSON.parse(para.attrList["DataSource_TbColumns2"]), para.attrList["DataSource_FieldID2"]);      // obj.TbColumnList 设置到下拉框
            $.ibo.formEditor.SetBindField($("#Property_RTVFieldID_Slt3"), JSON.parse(para.attrList["DataSource_TbColumns2"]), para.attrList["DataSource_RFieldID3"]);    // obj.TbColumnList 设置到下拉框
        }

        // 设置背景色
        if (this.attrList["BackColor"] != "") {
            $.ibo.formEditor.treeview.SetEditProperties("BackColor", this.attrList["BackColor"]);
            $.ibo.formEditor.treeview.Background_Clr.val(this.attrList["BackColor"]);
        }

        // 设置字体颜色
        if (this.attrList["ForeColor"] != "") {
            $.ibo.formEditor.treeview.SetEditProperties("ForeColor", this.attrList["ForeColor"]);
            $.ibo.formEditor.treeview.Color_Clr.val(this.attrList["ForeColor"]);
        }

        // 设置选中颜色
        if (this.attrList["SelBackColor"] != "") {
            $.ibo.formEditor.treeview.SetEditProperties("SelBackColor", this.attrList["SelBackColor"]);
            $.ibo.formEditor.treeview.SelBG_Clr.val(this.attrList["SelBackColor"]);
        }

        // 设置字体大小
        if (this.attrList["FontSize"] != "") {
            $.ibo.formEditor.treeview.SetEditProperties("FontSize", this.attrList["FontSize"]);
            $.ibo.formEditor.treeview.FontSize_Slt.find("option[value='" + this.attrList["FontSize"] + "']").attr("selected", "selected");
        }

        // 添加私有数据源处理方法
        this.addAfterDataSourceFn(function (tbColumnList) {
            this.attrList["DataSource_TbSelectColumns"] = $.toJSON(tbColumnList.SelectFields);          // 存储数据表所有被选中列
            this.attrList["DataSource_TbColumns"] = $.toJSON(tbColumnList.TbColumnList);                // 存储数据表所有列
        });

    }).call(this);

    // 添加属性显示事件  树形控件treeview的私有属性设置
    this.AddShowPrototypeFn(function () {

        // 显示"背景色"设置Li
        $.ibo.formEditor.treeview.Background_Li.show();

        // 显示"文字颜色"设置Li
        $.ibo.formEditor.treeview.Color_Li.show();

        // 显示"选中项背景色"设置Li
        $.ibo.formEditor.treeview.SelBG_Li.show();

        // 显示"字体大小"设置Li
        $.ibo.formEditor.treeview.FontSize_Li.show();

    });

}

// 设置文本样式属性   objtype为类型 objvalue为值
$.ibo.formEditor.treeview.SetEditProperties = function (objtype, objvalue) {
    switch (objtype) {
        case "BackColor":       // 背景颜色
            $(".treeview-node-item:not(.node-selected)").css("background", objvalue);
            break;
        case "ForeColor":       // 字体颜色
            $(".treeview-node-item").css("color", objvalue);
            break;
        case "SelBackColor":    // 选中项背景颜色
            $(".node-selected").css("background", objvalue);
            break;
        case "FontSize":        // 字体大小
            switch (objvalue) {
                case "1":
                    objvalue = "smaller";
                    break;
                case "2":
                    objvalue = "small";
                    break;
                case "3":
                    objvalue = "medium";
                    break;
                case "4":
                    objvalue = "large";
                    break;
                case "5":
                    objvalue = "larger";
                    break;
                case "6":
                    objvalue = "x-large";
                    break;
                case "7":
                    objvalue = "xx-large";
                    break;
                default:
                    break;
            }
            $(".treeview-node-item").css("font-size", objvalue);
            break;
        default:
            break;
    }
};

// 重置树形控件属性面板
$.ibo.formEditor.treeview.ReSetProp = function () {

    // 重置"背景色"颜色选择框
    $.ibo.formEditor.treeview.Background_Clr.val("#ffffff");

    // "文字颜色"颜色选择框
    $.ibo.formEditor.treeview.Color_Clr.val("#333333");

    // "选中项背景色"颜色选择框
    $.ibo.formEditor.treeview.SelBG_Clr.val("#428bca");

    // "字体大小"下拉框$.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk = $("#Property_IsSetLeafDataSource_Chk");
    $.ibo.formEditor.treeview.FontSize_Slt.find("option[value='2']").attr("selected", "selected");

    // "叶数据源"默认不勾选
    $.ibo.formEditor.IDataSourceTV.IsSetLeafDataSource_Chk.prop("checked", "");

    // 将两个数据源清空
    $.ibo.formEditor.IDataSource.TbName_Txt.val("");
    $.ibo.formEditor.IDataSourceTV.TbName_Txt2.val("");

    // 将五个绑定数据项的下拉列表清空
    $("#Property_TVFieldID_Slt1").find("option").remove();
    $("#Property_TVFieldID_Slt2").find("option").remove();
    $("#Property_RTVFieldID_Slt1").find("option").remove();
    $("#Property_RTVFieldID_Slt3").find("option").remove();

};

// 树形控件初始化
$.ibo.formEditor.treeview.Init = function () {

    // "背景色"设置Li
    $.ibo.formEditor.treeview.Background_Li = $("#Property_TreeView_Background_Li");
    // "背景色"颜色选择框
    $.ibo.formEditor.treeview.Background_Clr = $("#Property_TreeView_Background_Clr");
    // 绑定"背景色"颜色选择框设置选中文本背景色
    $.ibo.formEditor.treeview.Background_Clr.on("input propertychange", function () {
        $.ibo.formEditor.treeview.SetEditProperties("BackColor", $(this).val());
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["BackColor"] = $(this).val();
    });


    // "文字颜色"设置Li
    $.ibo.formEditor.treeview.Color_Li = $("#Property_TreeView_Color_Li");
    // "文字颜色"颜色选择框
    $.ibo.formEditor.treeview.Color_Clr = $("#Property_TreeView_Color_Clr");
    // 绑定"文字颜色"颜色选择框设置选中文本文字颜色
    $.ibo.formEditor.treeview.Color_Clr.on("input propertychange", function () {
        $.ibo.formEditor.treeview.SetEditProperties("ForeColor", $(this).val());
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["ForeColor"] = $(this).val();
    });


    // "选中项背景色"设置Li
    $.ibo.formEditor.treeview.SelBG_Li = $("#Property_TreeView_SelectedItemBGC_Li");
    // "选中项背景色"颜色选择框
    $.ibo.formEditor.treeview.SelBG_Clr = $("#Property_TreeView_SelectedItemBGC_Clr");
    // 绑定"选中项背景色"颜色选择框设置选中项背景颜色
    $.ibo.formEditor.treeview.SelBG_Clr.on("input propertychange", function () {
        $.ibo.formEditor.treeview.SetEditProperties("SelBackColor", $(this).val());
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["SelBackColor"] = $(this).val();
    });


    // "字体大小"设置Li
    $.ibo.formEditor.treeview.FontSize_Li = $("#Property_TreeView_FontSize_Li");
    // "字体大小"下拉框
    $.ibo.formEditor.treeview.FontSize_Slt = $("#Property_TreeView_FontSize_Slt");
    // 绑定"字体大小"下拉框设置选中文本字体大小
    $.ibo.formEditor.treeview.FontSize_Slt.on("input propertychange", function () {
        $.ibo.formEditor.treeview.SetEditProperties("FontSize", $(this).val());
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.attrList["FontSize"] = $(this).val();
    });
};

/********************************搜索***********************************/
// 搜索 search
$.ibo.formEditor.search = function (formEditor, para) {

    if ($.grep($.ibo.formEditor.Instance.controls, function (m, j) { return m.ControlType == "search" }).length > 0) {
        $.ibo.ShowErrorMsg("系统只能添加一个搜索控件！");
        this.htmlObj = null;
        return;
    }

    // 创建搜索基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        // 外层div不换行   隐藏超出内容
        obj.css({ "overflow": "hidden", "white-space": "nowrap" });

        var lineHeight = this.formEditor.View.LineHeight;
        //最外层div
        var firstDiv = $("<div>");
        firstDiv.css({ "width": "100%", "height": lineHeight + "px", "border": "1px solid rgb(204,204,204)" });

        // 搜索文本框
        var sltDiv = $("<div>");
        sltDiv.css({ "float": "left", "border": "0 none", "width": "75%" });
        var slt = $("<input>", { "type": "text" });
        slt.css({ "width": "100%", "height": (lineHeight - 3) + "px", "border": "0 none" });
        sltDiv.append(slt);
        this.htmlObj_input = slt;
        firstDiv.append(sltDiv);


        // 搜索按钮
        sltDiv = $("<div>");
        sltDiv.css({ "float": "left", "border-left": "1px solid rgb(204,204,204)", "width": "25%", "padding": "1px 5px", "height": lineHeight + "px" });
        var imageA = $("<img>", { "src": "" });
        imageA.css({ "width": (lineHeight - 5) + "px", "height": (lineHeight - 5) + "px" });//<img src="/img/buttons/1.png" style="width:25px;height:25px">
        sltDiv.append(imageA);
        this.htmlObj_img = imageA;
        slt = $("<span>");
        slt.css({ "padding-left": "3px" });
        sltDiv.append(slt);
        this.htmlObj_button = slt;
        firstDiv.append(sltDiv);

        this.htmlObj_div = firstDiv;
        obj.append(firstDiv);

        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 标题接口
    $.ibo.formEditor.ITitle.call(this, para, "搜索");

    // 设置默认宽高  宽度为页面50%  高度为1行
    this.setDefaultSize(para, 100, 1);

    // 设置尺寸接口  不可设置高度  可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, true);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);

    //数据源接口  不需要子表属性   不需要与页面制作方式关联
    $.ibo.formEditor.IDataSource.call(this, para, { "hasSub": false }, false);

    //选择图片接口
    $.ibo.formEditor.IImage.call(this, para);

    // 移除htmlObj在边框接口中设置的边框
    this.htmlObj.css({ "border": "0 none" });

    // 重写设置边框样式方法
    this.SetBorderStyle = function (s) {
        if (typeof s != "undefined") {
            this.attrList["Border_Style"] = s;
        }

        // 根据类别设置CSS样式
        switch (this.attrList["Border_Style"]) {
            case "0":
                this.htmlObj_div.css({ "border": "0 none" });
                break;
            case "1":
                this.htmlObj_div.css({ "border": "0 none" });
                this.htmlObj_div.css({ "border-bottom": "1px solid #CCCCCC" });
                break;
            case "2":
                this.htmlObj_div.css({ "border": "1px solid #CCCCCC" });
                break;
            default: break;
        }
    };
    this.SetBorderStyle();

    // 重写图片路径 
    this.setSrc = function (src) {
        // 属性数组保存路径
        this.attrList["Img_Src"] = src;
        if (src.length > 0) {
            this.htmlObj_img.attr("src", src);
        }
        else this.htmlObj_img.attr("src", "");
    };
    this.setSrc(typeof para.attrList["Img_Src"] == "undefined" ? "" : para.attrList["Img_Src"]);

    // 私有属性设置
    this.setPrivateProp = function () {

        // 搜索文字
        this.attrList["Btn_Text"] = typeof para.attrList["Btn_Text"] == "undefined" ? "搜索" : para.attrList["Btn_Text"];
        this.attrList["Search_IsShowImg"] = typeof para.attrList["Search_IsShowImg"] == "undefined" ? "false" : para.attrList["Search_IsShowImg"];
        this.attrList["Search_SelectField"] = typeof para.attrList["Search_SelectField"] == "undefined" ? "[]" : para.attrList["Search_SelectField"];

        // 设置按钮文字
        this.setText = function (t) {
            if (typeof t != "undefined") {
                this.attrList["Btn_Text"] = t;
            }
            this.htmlObj_button.text(this.attrList["Btn_Text"]);
        };
        this.setText();

        //设置是否显示图片
        this.setImgShow = function (t) {
            if (typeof t != "undefined") {
                this.attrList["Search_IsShowImg"] = t;
            }
            if (this.attrList["Search_IsShowImg"] == "true") {
                this.htmlObj_img.show();
            }
            else {
                this.htmlObj_img.hide();
            }
        }
        this.setImgShow();

        //设置选择的字段值 
        this.setSelectField = function (t) {
            var selectFields = new Array();
            if (t.length > 0) {
                var allCheckFields = this.getDataSourceSelectField();
                if (allCheckFields.length > 0) {
                    for (var i = 0; i < t.length; i++) {
                        var item = t[i];
                        for (var j = 0; i < allCheckFields.length; j++) {
                            var field = allCheckFields[j];
                            if (item.FieldID == field.FieldID) {
                                selectFields.push(field.FieldID);
                                break;
                            }
                        }
                    }
                }
            }
            this.attrList["Search_SelectField"] = $.toJSON(selectFields);
        }

        this.getSelectField = function () {
            return this.attrList["Search_SelectField"];

        }
        this.getDataSourceSelectField = function () {
            return this.getDataSource().TbColumnList;

        }
    };
    this.setPrivateProp();


    // 添加显示属性方法  显示按钮私有属性
    this.AddShowPrototypeFn(function () {

        // 设置"按钮文字"输入框
        $.ibo.formEditor.search.Text_Txt.val(this.attrList["Btn_Text"]);
        // 显示"按钮文字"Li
        $.ibo.formEditor.search.Li.show();

        // 设置"是否有图片"框
        $.ibo.formEditor.search.IsShowImg_Chk.prop("checked", this.attrList["Search_IsShowImg"] == "true");
        // 显示"是否有图片"Li
        $.ibo.formEditor.search.IsShowImg_Li.show();
        // 显示"绑定字段"Li
        $.ibo.formEditor.search.SelectField_Li.show();

    });

    // 添加更改数据源处理方法
    this.addAfterDataSourceFn(function () {

        //重新给搜索选定的绑定字段赋值
        this.setSelectField([]);
    });
};
// 搜索初始化
$.ibo.formEditor.search.Init = function () {

    // 设置"按钮文字"Li
    $.ibo.formEditor.search.Li = $("#Property_Search_Li");
    // 设置"按钮文字"输入框
    $.ibo.formEditor.search.Text_Txt = $("#Property_Search_txt");

    // "是否有图片"设置Li
    $.ibo.formEditor.search.IsShowImg_Li = $("#Property_Search_IsShowImg_Li");
    // "是否有图片"设置checkbox
    $.ibo.formEditor.search.IsShowImg_Chk = $("#Property_Search_IsShowImg_chk");

    // "绑定字段"设置Li
    $.ibo.formEditor.search.SelectField_Li = $("#Property_Search_SelectField_Li");
    // "绑定字段"设置按钮
    $.ibo.formEditor.search.SelectField_Btn = $("#Property_Search_SelectField_btn");

    // "绑定字段"设置面板
    $.ibo.formEditor.search.SetDiv = $("#Property_Search_SelectField_SetDiv");
    // "绑定字段"设置表格
    $.ibo.formEditor.search.Table = $("#Property_Search_SelectField_Tb");
    // "绑定字段"设置表格内容
    $.ibo.formEditor.search.TableBody = $("#Property_Search_SelectField_Tbody");
    // "绑定字段"设置保存按钮
    $.ibo.formEditor.search.SaveBtn = $("#Property_Search_SelectField_SetDiv_Save");
    // "绑定字段"设置取消按钮
    $.ibo.formEditor.search.CancalBtn = $("#Property_Search_SelectField_SetDiv_Cancel");


    // 绑定"按钮文字"输入框设置
    $.ibo.formEditor.search.Text_Txt.on("input propertychange", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        ctrl.setText($(this).val());
    });

    // 绑定"是否有图片"checkbox设置
    $.ibo.formEditor.search.IsShowImg_Chk.on("click", function () {

        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置Search_IsShowImg属性
        var isImgShow = $(this).is(":checked") ? "true" : "false";
        ctrl.setImgShow(isImgShow);
    });

    // 绑定"绑定字段"按钮打开设置数据项面板
    $.ibo.formEditor.search.SelectField_Btn.on("click", function () {

        // 设置面板位置与按钮相同
        var offset = $(this).offset();
        $.ibo.formEditor.search.SetDiv.css({ "top": offset.top + "px", "left": (offset.left + 130) + "px" });

        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        //给表格内容赋值
        $.ibo.formEditor.search.TableBody.html("");
        var allCheckFields = ctrl.getDataSourceSelectField();
        if (allCheckFields.length > 0) {
            for (var i = 0; i < allCheckFields.length; i++) {
                var field = allCheckFields[i];
                var tr = $("<tr>", { "class": "listdata" });
                var td1 = $("<td>");
                var checkBox = $("<input>", { "type": "checkbox", "name": "checkfields", "tempvalue": field.FieldID, "temptype": field.FieldType });
                td1.append(checkBox);
                tr.append(td1);
                var td2 = $("<td>", { "text": field.Rmk });
                tr.append(td2);

                var dataType = "";
                switch (field.FieldType) {
                    case "1": dataType = "整数";
                        break;
                    case "2": dataType = "小数";
                        break;
                    case "3": dataType = "日期";
                        break;
                    case "4": dataType = "时间";
                        break;
                    case "6": dataType = "字符";
                        break;
                    case "8": dataType = "文件";
                        break;
                    case "9": dataType = "姓名";
                        break;
                    case "10": dataType = "部门";
                        break;
                    case "11": dataType = "地址";
                        break;
                    case "12": dataType = "手机";
                        break;
                    case "13": dataType = "电子邮箱";
                        break;
                    case "14": dataType = "地理位置";
                        break;
                    default: break;
                }
                var td3 = $("<td>", { "text": dataType });
                tr.append(td3);
                $.ibo.formEditor.search.TableBody.append(tr);
            }
        }

        // 设置选中的字段值 
        var allCheckFields = $.parseJSON(ctrl.getSelectField());
        if (allCheckFields.length > 0) {
            for (var i = 0; i < allCheckFields.length; i++) {
                var field = allCheckFields[i];
                $("#Property_Search_SelectField_Tb input[tempvalue='" + field + "']").prop("checked", true);
            }
        }

        // 显示设置面板
        $.ibo.formEditor.search.SetDiv.show();
    });


    // 绑定"绑定字段"面板保存按钮保存数据项更改
    $.ibo.formEditor.search.SaveBtn.on("click", function () {
        // 获取选中的字段      
        var gridfields = new Array();
        var isContinue = true;
        $("#Property_Search_SelectField_Tb input[name='checkfields']").each(function (i) {
            var IsShow = $(this).prop("checked");
            if (IsShow) {
                var fieldid = $(this).attr("tempvalue");
                var fieldtype = $(this).attr("temptype");
                if (fieldtype != "6") {
                    $(this).prop("checked", false);
                    isContinue = false;
                    $.ibo.ShowErrorMsg("请选择字段类型为字符的字段！");
                    return false;
                }
                gridfields.push({ FieldID: fieldid });
            }
        });
        if (isContinue) {
            // 当前选中控件
            var ctrl = $.ibo.formEditor.Instance.sltControls[0];
            // 设置控件"字段项"属性
            ctrl.setSelectField(gridfields);

            // 隐藏设置面板
            $.ibo.formEditor.search.SetDiv.hide();
        }
    });


    // 绑定"绑定字段"面板取消按钮取消数据项更改
    $.ibo.formEditor.search.CancalBtn.on("click", function () {
        // 隐藏设置面板
        $.ibo.formEditor.search.SetDiv.hide();
    });

};


/********************************   工具栏   ***********************************/

// 工具栏 tools
$.ibo.formEditor.tools = function (formEditor, para) {

    // 创建下拉框基本html
    this.createHtmlObject = function () {
        var obj = $("<div>", { "id": this.HtmlID });
        obj.css("overflow", "hidden");
        return obj;
    };

    // 继承控件基类
    $.ibo.formEditor.control.call(this, formEditor, para);

    // 设置默认宽高  宽度为页面100%  高度为一行
    this.setDefaultSize(para, 100, 1);

    // 设置尺寸接口  不可设置高度  不可设置宽度
    $.ibo.formEditor.ISetSize.call(this, false, false);

    // 边框设置接口
    $.ibo.formEditor.IBorder.call(this, para);


    (function () {

        var ctrl = this;

        // Tools_Index按钮序列号
        this.attrList["Tools_Index"] = typeof para.attrList["Tools_Index"] == "undefined" ? "4" : para.attrList["Tools_Index"];

        // Tools_ButtonStyle按钮风格   0:普通按钮   1:图片按钮
        this.attrList["Tools_ButtonStyle"] = typeof para.attrList["Tools_ButtonStyle"] == "undefined" ? "0" : para.attrList["Tools_ButtonStyle"];

        // Tools_BorderStyle边框风格   0:无边框   1:方角边框   2:圆角边框
        this.attrList["Tools_BorderStyle"] = typeof para.attrList["Tools_BorderStyle"] == "undefined" ? "0" : para.attrList["Tools_BorderStyle"];

        // Tools_BorderColor边框颜色   #AAAAAA默认灰色
        this.attrList["Tools_BorderColor"] = typeof para.attrList["Tools_BorderColor"] == "undefined" ? "#AAAAAA" : para.attrList["Tools_BorderColor"];

        // Tools_BorderWidth边框宽度   1px 普通   2px 较粗   3px 很粗
        this.attrList["Tools_BorderWidth"] = typeof para.attrList["Tools_BorderWidth"] == "undefined" ? "1px" : para.attrList["Tools_BorderWidth"];

        // Tools_FontSize字体大小   12px 较小   14px 普通   16px 较大   18px 很大
        this.attrList["Tools_FontSize"] = typeof para.attrList["Tools_FontSize"] == "undefined" ? "14px" : para.attrList["Tools_FontSize"];

        // Tools_FontColor字体颜色   #AAAAAA默认灰色
        this.attrList["Tools_FontColor"] = typeof para.attrList["Tools_FontColor"] == "undefined" ? "#AAAAAA" : para.attrList["Tools_FontColor"];

        // Tools_BackColor按钮背景   #FFFFFF默认白色
        this.attrList["Tools_BackColor"] = typeof para.attrList["Tools_BackColor"] == "undefined" ? "#FFFFFF" : para.attrList["Tools_BackColor"];

        // 创建按钮信息类
        this.CreateButtonObj = function (id, text, attrList) {
            var btn = {
                "id": id,
                "text": text,
                "attrList": attrList ? attrList : {},
                "formEditor": this.formEditor,
                // 添加显示属性方法
                "AddShowPrototypeFn": function (fn) { this.ShowPrototypeFnArr.push(fn); },
                // 显示属性方法数组
                "ShowPrototypeFnArr": [],
                // 显示属性
                "ShowPrototype": function () {
                    var length = this.ShowPrototypeFnArr.length;
                    for (var i = 0; i < length; i++) {
                        var fn = this.ShowPrototypeFnArr[i];
                        if (typeof fn == "function") {
                            fn.call(this);
                        }
                    }
                }
            };
            // 按钮继承事件接口
            $.ibo.formEditor.IEvent.call(btn, { "attrList": btn.attrList });
            // 按钮继承图片接口
            $.ibo.formEditor.IImage.call(btn, { "attrList": btn.attrList });

            btn.attrList["ParentID"] = this.attrList["ParentID"];

            // 追加属性显示处理
            btn.AddShowPrototypeFn(function () {
                // 若当前按钮风格为普通按钮  不需要显示上传图片设置
                if (ctrl.attrList["Tools_ButtonStyle"] == "0") $.ibo.formEditor.IImage.Src_Li.hide();
            });

            // 创建按钮html对象
            btn.CreateButtonHtmlObj = function () {
                // 创建div 代替按钮
                var btnObj = $("<div>", { "class": "ibo-controls-tools-htmlButton" });
                // 设置高度为一个行高
                var h = formEditor.View.CountLineHeight(1);
                var lineD = formEditor.View.LineDistance;

                var borderWidth = parseInt(ctrl.attrList["Tools_BorderWidth"].replace("px", ""));

                // 若按钮有边框  则按钮行高需要减去边框宽度
                var lineHeight = h;
                if (ctrl.attrList["Tools_BorderStyle"] != "0") lineHeight = lineHeight - borderWidth * 2;

                btnObj.css({ "height": h + "px", "line-height": lineHeight + "px", "margin-bottom": lineD + "px" });

                // 按钮风格   0:普通按钮
                if (ctrl.attrList["Tools_ButtonStyle"] == "0") {
                    // 按钮显示文字
                    btnObj.text(this.text);
                    // 边框样式  0:无边框   1:方边框   2:圆边框
                    btnObj.addClass("border" + ctrl.attrList["Tools_BorderStyle"]);
                    // 边框颜色
                    btnObj.css("border-color", ctrl.attrList["Tools_BorderColor"]);
                    // 边框宽度
                    btnObj.css("border-width", ctrl.attrList["Tools_BorderWidth"]);
                    // 字体大小
                    btnObj.css("font-size", ctrl.attrList["Tools_FontSize"]);
                    // 字体颜色
                    btnObj.css("color", ctrl.attrList["Tools_FontColor"]);
                    // 背景颜色
                    btnObj.css("background-color", ctrl.attrList["Tools_BackColor"]);
                }
                    //   1:图片按钮
                else {
                    // 判断是否已经上传图片
                    if (this.attrList["Img_Src"] == "") {
                        // 未上传图片 显示灰色边框
                        btnObj.css("border", "1px solid #CCCCCC");
                    }
                    else {
                        // 上传图片  显示图片
                        btnObj.css("background-image", "url('" + this.attrList["Img_Src"] + "')");
                    }
                }

                return btnObj;
            };

            return btn;
        };

        // 构建默认初始按钮信息
        // 初始4个按钮
        var Tools_Buttons_default_arr = [];
        for (var i = 0; i < 4; i++) {
            var btnObj = this.CreateButtonObj(i, "按钮" + (i + 1));
            Tools_Buttons_default_arr.push({ "id": btnObj.id, "text": btnObj.text, "attrList": btnObj.attrList });
        }

        // Tools_Buttons按钮数据
        this.attrList["Tools_Buttons"] = typeof para.attrList["Tools_Buttons"] == "undefined" ? $.toJSON(Tools_Buttons_default_arr) : para.attrList["Tools_Buttons"];

        // Tools_Buttons按钮数据 js对象数组
        this.Tools_Buttons_arr = [];
        Tools_Buttons_default_arr = $.parseJSON(this.attrList["Tools_Buttons"]);

        // 按钮数据处理继承事件接口
        var length = Tools_Buttons_default_arr.length;
        for (var i = 0; i < length; i++) {
            var btnObj = Tools_Buttons_default_arr[i];
            this.Tools_Buttons_arr.push(this.CreateButtonObj(btnObj.id, btnObj.text, btnObj.attrList));
        }


        // 当前设置按钮
        this.curSetBtn = null;


        // 重写上传图片后触发事件
        this.afterLoadImg = function (url) {
            // 记录按钮绑定图片
            this.curSetBtn.setSrc(url);
            // 获取按钮Tool_Bottuns属性
            this.GetButtons();
            // 设置左侧设计窗体html对象
            this.setHtmlObj();
        };

        // 获取事件属性设置对象   当前设置按钮
        this.GetEventObj = function () { return this.curSetBtn; };

        // 新增按钮   n:按钮信息   afterTr:添加到哪列之后    afterN:添加到哪个对象之后
        this.AddButton = function (n, afterTr, afterN) {
            // 不存在按钮信息
            if (!n) {
                // 根据序列号构建按钮信息
                var Tools_Index = parseInt(this.attrList["Tools_Index"]);
                Tools_Index++;
                this.attrList["Tools_Index"] = Tools_Index.toString();
                n = this.CreateButtonObj(Tools_Index, "按钮" + Tools_Index);

                // 新家按钮信息需要保存在Tools_Buttons_arr中
                if (afterN) this.Tools_Buttons_arr.insert(this.Tools_Buttons_arr.indexOf(afterN) + 1, n);
                else this.Tools_Buttons_arr.push(n);
                // 保存按钮信息Json字符串
                this.GetButtons();
            }

            // 按钮设置行
            var tr = $("<tr>");
            // 第一列   选择radio
            var td = $("<td>", { "class": "ibo-controls-tools-td" });
            var input = $("<input>", { "type": "radio", "name": "ibo-contols-tools-radio", "class": "ibo-contols-tools-radio" });
            input.on("click", function () {
                // 记录当前设置按钮
                ctrl.curSetBtn = n;
                // 显示事件属性设置Li
                n.ShowPrototype();

                // 判断当前选中是第几个按钮
                var ind = ctrl.Tools_Buttons_arr.indexOf(n);
                // 查找按钮对应的设计视图预览显示按钮
                var htmlBtnObj = ctrl.htmlObj.find(".ibo-controls-tools-htmlButton").eq(ind);
                // 设置选中示意边框到按钮处
                var pos = htmlBtnObj.position();
                ctrl.sltBtnBorderDiv.css({ "top": (pos.top - 1) + "px", "left": (pos.left - 1) + "px", "display": "block" });
            });
            td.append(input);
            tr.append(td);

            // 第二列   按钮显示文本
            td = $("<td>", { "class": "ibo-controls-tools-td" });
            input = $("<input>", { "type": "text", "class": "ibo-controls-tools-text" });
            input.val(n.text);
            input.on("input propertychange", function () {
                // 文本内容有变化  记录到控件属性中
                n.text = $(this).val();
                ctrl.GetButtons();
                ctrl.setHtmlObj(true);
            });
            td.append(input);
            tr.append(td);

            // 第三格中为新增删除选项按钮
            td = $("<td>", { "class": "ibo-controls-tools-td" });
            // 增加按钮图标
            input = $("<div>");
            input.addClass("ibo-btn-optionAdd");
            input.on("click", function () {
                // 点击新增一个按钮
                ctrl.AddButton(null, tr, n);
                // 重置设计页面按钮
                ctrl.setHtmlObj();
            });
            td.append(input);

            // table中有行则可以添加删除按钮  否则第一行不添加删除按钮
            if ($.ibo.formEditor.tools.Button_Tb.find("tr").length > 0) {
                input = $("<div>");
                input.addClass("ibo-btn-optionDlt");
                input.on("click", function () {
                    // 点击移除当前行按钮
                    ctrl.removeButton(n, tr);
                });
                td.append(input);
            }
            tr.append(td);

            // 不存在afterTr   则添加到table最后
            if (!afterTr) $.ibo.formEditor.tools.Button_Tb.append(tr);
                // 否则添加到afterTr行的后面
            else afterTr.after(tr);
        };


        // 移除按钮
        this.removeButton = function (n, tr) {
            tr.remove();
            // 从Tools_Buttons_arr中移除
            this.Tools_Buttons_arr.remove(n);
            // 保存按钮信息Json字符串
            this.GetButtons();
            // 重置设计页面按钮
            this.setHtmlObj();
        };


        // 设置窗体设计视图按钮
        this.setHtmlObj = function (first) {
            // 清除原有按钮
            this.htmlObj.empty();

            // 用于显示选中按钮示意边框div
            this.sltBtnBorderDiv = $("<div>", { "class": "ibo-controls-tools-htmlButton-sltDiv" });
            this.sltBtnBorderDiv.css({ "height": formEditor.View.CountLineHeight(1) + "px", "display": "none" });
            this.htmlObj.append(this.sltBtnBorderDiv);

            var Tools_Buttons
            // 遍历按钮信息设置
            $.each(this.Tools_Buttons_arr, function (i, n) {
                var btn = n.CreateButtonHtmlObj();
                ctrl.htmlObj.append(btn);
            });

            var h = 0;
            // 原始高度
            var oldH = this.Size().height;

            // 计算控件高度  4个按钮一行
            var line = 0;
            // 判断控件占几行
            line = parseInt(this.Tools_Buttons_arr.length / 4);
            // 不是整行需要追加一行
            if (this.Tools_Buttons_arr.length % 4 > 0) line++;
            //// 最多显示两行
            //if (line > 2) line = 2;

            // 根据行数计算高度
            h = formEditor.View.CountLineHeight(line);
            // 设置控件高度
            this.Size({ "h": h + "px" });

            // 重新设置选中示意边框
            this.showSelectedLine();
            // 现有高度与原始高度不同   first:是否初次初始化  初次在formEditor.AddControl中会修正位置  不重复偏移处理
            if (oldH != h && first != true) {
                // 计算前后高度差
                var line = h - oldH;
                // 计算高度差是几行行高
                line = parseInt(line / (formEditor.View.LineHeight + formEditor.View.LineDistance));
                // 设置其它控件偏移
                this.setOtherControlPosition(line);
            }
        };
        this.setHtmlObj(true);


        // 设置"工具按钮"Table内容
        this.SetButtons = function () {
            // 清空table原有数据
            $.ibo.formEditor.tools.Button_Tb.empty();

            // 属性反序列化成对象
            var length = this.Tools_Buttons_arr.length;

            // 遍历对象生成table数据
            for (var i = 0; i < length; i++) {
                this.AddButton(this.Tools_Buttons_arr[i]);
            }
            // 重置设计页面按钮
            this.setHtmlObj();
            // 默认选择第一个按钮
            $.ibo.formEditor.tools.Button_Tb.find("input[type=radio][name=ibo-contols-tools-radio]:first").click();
        };
        // 初始设置"工具按钮"
        this.SetButtons();


        // 获取"工具按钮"attrList["Tools_Buttons"]属性
        this.GetButtons = function () {
            var arr = [];
            // 遍历按钮信息js对象数组
            var length = this.Tools_Buttons_arr.length;
            for (var i = 0; i < length; i++) {
                var btnObj = this.Tools_Buttons_arr[i];
                // 只保存id text attrList三个属性
                arr.push({ "id": btnObj.id, "text": btnObj.text, "attrList": btnObj.attrList });
            }
            // 保存Json字符串
            this.attrList["Tools_Buttons"] = $.toJSON(arr);
        };


        // 更改事件类型后处理函数
        this.afterChangeEventType = function () {
            // 当前事件类型
            var v = this.curSetBtn.attrList["Event_Type"];
            // 判断当前是绑定的哪种事件
            for (var i in $.ibo.formEditor.EventType) {
                var n = $.ibo.formEditor.EventType[i];
                // 设置按钮显示文本与事件类型一致
                if (n.value == v) {
                    this.GetEventObj().text = n.text;
                    $.ibo.formEditor.tools.Button_Tb.find("input[type=radio]:checked:first").parent().parent().find("input[type=text]").val(n.text);
                    break;
                }
            }
            // 重新更新按钮显示区html
            this.setHtmlObj(false);
            // 重新获取"工具按钮"attrList["Tools_Buttons"]属性
            this.GetButtons();
        };
        // 更改标题后处理函数
        this.afterChangeWinTitle = function () {
            // 重新获取"工具按钮"attrList["Tools_Buttons"]属性
            this.GetButtons();
        };
        // 更改窗口类别后处理函数
        this.afterChangeWinType = function () {
            // 重新获取"工具按钮"attrList["Tools_Buttons"]属性
            this.GetButtons();
        };
        // 调用控件更改窗口地址处理函数
        this.afterChangeWinUrl = function () {
            // 重新获取"工具按钮"attrList["Tools_Buttons"]属性
            this.GetButtons();
        };

        // 设置属性设置Li可见性
        this.setPropLiVisible = function () {
            // 普通风格按钮
            if (this.attrList["Tools_ButtonStyle"] == "0") {
                // 显示按钮边框设置Li
                $.ibo.formEditor.tools.BorderStyle_Li.show();

                // 显示边框颜色设置Li
                $.ibo.formEditor.tools.BorderColor_Li.show();

                // 显示边框宽度设置Li
                $.ibo.formEditor.tools.BorderWidth_Li.show();

                // 显示字体大小设置Li
                $.ibo.formEditor.tools.FontSize_Li.show();

                // 显示字体颜色设置Li
                $.ibo.formEditor.tools.FontColor_Li.show();

                // 显示字体颜色设置Li
                $.ibo.formEditor.tools.BackColor_Li.show();

                // 隐藏按钮图片设置Li
                $.ibo.formEditor.IImage.Src_Li.hide();
            }
                // 图标风格按钮
            else {
                // 隐藏按钮边框设置Li
                $.ibo.formEditor.tools.BorderStyle_Li.hide();

                // 隐藏边框颜色设置Li
                $.ibo.formEditor.tools.BorderColor_Li.hide();

                // 隐藏边框宽度设置Li
                $.ibo.formEditor.tools.BorderWidth_Li.hide();

                // 隐藏字体大小设置Li
                $.ibo.formEditor.tools.FontSize_Li.hide();

                // 隐藏字体颜色设置Li
                $.ibo.formEditor.tools.FontColor_Li.hide();

                // 隐藏字体颜色设置Li
                $.ibo.formEditor.tools.BackColor_Li.hide();

                // 显示按钮图片设置Li
                $.ibo.formEditor.IImage.Src_Li.show();
            }
        };

        if (!this.events) this.events = {};
        // 添加取消选中处理
        this.events["unSelect"] = function (e, control) {
            // 隐藏选中按钮示意边框div
            control.sltBtnBorderDiv.hide();
        };

    }).call(this);


    // 添加显示属性方法  显示工具栏私有属性
    this.AddShowPrototypeFn(function () {

        // 重置按钮数量Table
        this.SetButtons();
        // 显示按钮数量设置Li
        $.ibo.formEditor.tools.Button_Li.show();

        // 设置按钮风格下拉框值
        $.ibo.formEditor.tools.ButtonStyle_Slt.val(this.attrList["Tools_ButtonStyle"]);
        // 显示按钮风格设置Li
        $.ibo.formEditor.tools.ButtonStyle_Li.show();

        // 设置按钮边框下拉框值
        $.ibo.formEditor.tools.BorderStyle_Slt.val(this.attrList["Tools_BorderStyle"]);

        // 设置边框颜色下拉框值
        $.ibo.formEditor.tools.BorderColor_Clr.val(this.attrList["Tools_BorderColor"]);

        // 设置边框宽度下拉框值
        $.ibo.formEditor.tools.BorderWidth_Slt.val(this.attrList["Tools_BorderWidth"]);

        // 设置字体大小下拉框值
        $.ibo.formEditor.tools.FontSize_Slt.val(this.attrList["Tools_FontSize"]);

        // 设置字体颜色下拉框值
        $.ibo.formEditor.tools.FontColor_Clr.val(this.attrList["Tools_FontColor"]);

        // 设置字体颜色下拉框值
        $.ibo.formEditor.tools.BackColor_Clr.val(this.attrList["Tools_BackColor"]);

        // 设置属性可见性
        this.setPropLiVisible();
    });

};
// 工具栏初始化
$.ibo.formEditor.tools.Init = function () {
    // 按钮数量设置Li
    $.ibo.formEditor.tools.Button_Li = $("#Property_Tools_Button_Li");
    // 按钮数量设置Table
    $.ibo.formEditor.tools.Button_Tb = $("#Property_Tools_Button_Tb");

    // 按钮风格设置Li
    $.ibo.formEditor.tools.ButtonStyle_Li = $("#Property_Tools_ButtonStyle_Li");
    // 按钮风格设置下拉框
    $.ibo.formEditor.tools.ButtonStyle_Slt = $("#Property_Tools_ButtonStyle_Slt");
    // 绑定按钮风格下拉框设置事件
    $.ibo.formEditor.tools.ButtonStyle_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置按钮风格属性
        ctrl.attrList["Tools_ButtonStyle"] = $(this).val();
        // 重新设置属性可见性
        ctrl.setPropLiVisible();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 按钮边框设置Li
    $.ibo.formEditor.tools.BorderStyle_Li = $("#Property_Tools_BorderStyle_Li");
    // 按钮边框下拉框
    $.ibo.formEditor.tools.BorderStyle_Slt = $("#Property_Tools_BorderStyle_Slt");
    // 绑定按钮边框下拉框设置事件
    $.ibo.formEditor.tools.BorderStyle_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置按钮风格属性
        ctrl.attrList["Tools_BorderStyle"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 边框颜色设置Li
    $.ibo.formEditor.tools.BorderColor_Li = $("#Property_Tools_BorderColor_Li");
    // 边框颜色设置input
    $.ibo.formEditor.tools.BorderColor_Clr = $("#Property_Tools_BorderColor_Clr");
    // 绑定边框颜色设置事件
    $.ibo.formEditor.tools.BorderColor_Clr.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置边框颜色属性
        ctrl.attrList["Tools_BorderColor"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 边框宽度设置Li
    $.ibo.formEditor.tools.BorderWidth_Li = $("#Property_Tools_BorderWidth_Li");
    // 边框宽度设置下拉框
    $.ibo.formEditor.tools.BorderWidth_Slt = $("#Property_Tools_BorderWidth_Slt");
    // 绑定边框宽度设置事件
    $.ibo.formEditor.tools.BorderWidth_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置边框宽度属性
        ctrl.attrList["Tools_BorderWidth"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 字体大小设置Li
    $.ibo.formEditor.tools.FontSize_Li = $("#Property_Tools_FontSize_Li");
    // 字体大小设置下拉框
    $.ibo.formEditor.tools.FontSize_Slt = $("#Property_Tools_FontSize_Slt");
    // 绑定字体大小设置事件
    $.ibo.formEditor.tools.FontSize_Slt.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置字体大小属性
        ctrl.attrList["Tools_FontSize"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 字体颜色设置Li
    $.ibo.formEditor.tools.FontColor_Li = $("#Property_Tools_FontColor_Li");
    // 字体颜色设置input
    $.ibo.formEditor.tools.FontColor_Clr = $("#Property_Tools_FontColor_Clr");
    // 绑定字体颜色设置事件
    $.ibo.formEditor.tools.FontColor_Clr.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置边框颜色属性
        ctrl.attrList["Tools_FontColor"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 按钮背景设置Li
    $.ibo.formEditor.tools.BackColor_Li = $("#Property_Tools_BackColor_Li");
    // 按钮背景设置input
    $.ibo.formEditor.tools.BackColor_Clr = $("#Property_Tools_BackColor_Clr");
    // 绑定按钮背景设置事件
    $.ibo.formEditor.tools.BackColor_Clr.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置边框颜色属性
        ctrl.attrList["Tools_BackColor"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });

    // 按钮图标设置Li
    $.ibo.formEditor.tools.Image_Li = $("#Property_Tools_Image_Li");
    // 按钮图标设置File
    $.ibo.formEditor.tools.Image_File = $("#Property_Tools_Image_File");
    // 绑定按钮图标设置事件
    $.ibo.formEditor.tools.Image_File.on("input propertychange", function () {
        // 当前选中控件
        var ctrl = $.ibo.formEditor.Instance.sltControls[0];
        // 设置边框颜色属性
        ctrl.attrList["Tools_BackColor"] = $(this).val();
        // 设置更改按钮html对象
        ctrl.setHtmlObj();
    });



};


/********************************   Tab页   ***********************************/

// Tab页 tabpage
$.ibo.formEditor.tabpage = function (formEditor, para) {

};




//根据属性选中菜单控件
$.ibo.showselectmenu = function (ctrltype) {
    var classcolor = { "background-color": "rgb(232, 132, 57)", "color": "#fff" };
    var classname = "selectedControl";
    var alinks = $("#divControls .div-body").find("a");
    alinks.removeAttr("style");
    var divlinks = $("#divControls .image-text-pair")
    divlinks.removeClass(classname);
    if (ctrltype) {
        $("#a" + ctrltype).css(classcolor);
        $("#a" + ctrltype).parent().addClass(classname);
    }
};