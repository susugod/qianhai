/* 控件属性函数  */
var fontweight = "normal";
var textdecoration = "normal";
var fontstyle = "normal";
//设置属性
function changeProperties(objid, objvalue) {
    var t = objvalue;
    var length = formEditor.sltControls.length;
    if (length <= 0) {
        alert("请先选择控件");
        return;
    }
    for (var i = 0; i < length; i++) {
        var ctrlObj = formEditor.sltControls[i];
        switch (objid) {
            // 是否显示标题
            case "chkHasTitle":
                if (typeof ctrlObj.attrList["hasTitle"] != "undefined" && ctrlObj.titleObj) {
                    if ($("#chkHasTitle").is(":checked")) {
                        ctrlObj.setHasTitle(true);
                        $("#ctrlname").prop("disabled", false);
                    }
                    else {
                        ctrlObj.setHasTitle(false);
                        $("#ctrlname").prop("disabled", true);
                    }
                }
                break;
            case "ctrlname":
                formEditor.sltControls[i].name = t;
                if (typeof ctrlObj.attrList["hasTitle"] != "undefined" && ctrlObj.titleObj) {
                    formEditor.sltControls[i].setTitle(t);
                }
                break;
            case "ctrlvalue":
                if (formEditor.sltControls[i].ControlType == $.ibo.formEditor.ctlType.div ||
                    formEditor.sltControls[i].ControlType == $.ibo.formEditor.ctlType.button) {
                    formEditor.sltControls[i].text(t);
                }
                else {
                    //formEditor.sltControls[i].val(t);
                }
                break;
            case "ctrlprompt":
                formEditor.sltControls[i].attrList.prompt = t;
                formEditor.sltControls[i].htmlObj.attr("placeholder", t);
                break;
            case "ctrlisnotnull":
                formEditor.sltControls[i].attrList.isnotnull = $("#" + objid).is(":checked") == true ? "true" : "false";
                break;
            case "ctrlisprint":
                formEditor.sltControls[i].attrList.isprint = $("#" + objid).is(":checked") == true ? "true" : "false";
                break;
            case "ctrlwidth":
                t = t + "px";
                formEditor.sltControls[i].css({ width: t });
                formEditor.sltControls[i].showSelectedLine();
                break;
            case "ctrlheight":
                // 高度改为行倍数值  而不是自定义PX值
                t = parseInt(t);
                if (isNaN(t) || t < 1) t = 1;
                if (t.toString() != $("#ctrlheight").val()) $("#ctrlheight").val(t);
                t = (t * (formEditor.View.LineHeight + formEditor.View.LineDistance) - formEditor.View.LineDistance) + "px";
                formEditor.sltControls[i].css({ height: t });
                formEditor.sltControls[i].showSelectedLine();
                break;
            case "ctrlleft":
                t = t + "px";
                formEditor.sltControls[i].css({ left: t });
                formEditor.sltControls[i].showSelectedLine();
                break;
            case "ctrltop":
                t = t + "px";
                formEditor.sltControls[i].css({ top: t });
                formEditor.sltControls[i].showSelectedLine();
                break;
            case "ctrlbuttonstyle":
                if (formEditor.sltControls[i].ControlType == $.ibo.formEditor.ctlType.button) {
                    if (t === "2") {//全圆角
                        formEditor.sltControls[i].css({ "-webkit-border-radius": "5px", "-moz-border-radius": "5px" });
                    }
                    else if (t === "3") {//左圆角
                        formEditor.sltControls[i].css({ "-webkit-border-radius": "5px 0 0 5px", "-moz-border-radius": "5px 0 0 5px" });
                    }
                    else if (t === "4") {//右圆角
                        formEditor.sltControls[i].css({ "-webkit-border-radius": "0 5px 5px 0", "-moz-border-radius": "0 5px 5px 0" });
                    }
                    else {//全方角
                        formEditor.sltControls[i].css({ "-webkit-border-radius": 0, "-moz-border-radius": 0 });
                    }
                }
                break;
            case "ctrlbackcolor":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article)
                    formEditor.sltControls[i].css({ background: t });
                break;
            case "ctrlfontcolor":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article)
                    formEditor.sltControls[i].css({ color: t });
                break;

            case "ctrlfontsize":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article) {
                    t = t + "px";
                    formEditor.sltControls[i].css({ "font-size": t });
                }
                break;
            case "ctrlfontweight":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article) {
                    if (fontweight == "normal") {
                        fontweight = "bold";
                        $("#ctrlfontweight").addClass("ibo-linkselectclass");
                    }
                    else {
                        fontweight = "normal";
                        $("#ctrlfontweight").removeClass("ibo-linkselectclass");
                    }
                    formEditor.sltControls[i].css({ "font-weight": fontweight });
                }
                break;
            case "ctrlfontstyle":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article) {
                    if (fontstyle == "normal") {
                        fontstyle = "italic";
                        $("#ctrlfontstyle").addClass("ibo-linkselectclass");
                    }
                    else {
                        fontstyle = "normal";
                        $("#ctrlfontstyle").removeClass("ibo-linkselectclass");
                    }
                    formEditor.sltControls[i].css({ "font-style": fontstyle });
                }
                break;
            case "ctrltextdecoration":
                if (formEditor.sltControls[i].ControlType != $.ibo.formEditor.ctlType.article) {
                    if (textdecoration == "normal") {
                        textdecoration = "underline";
                        $("#ctrltextdecoration").addClass("ibo-linkselectclass");
                    }
                    else {
                        textdecoration = "none";
                        $("#ctrltextdecoration").removeClass("ibo-linkselectclass");
                    }
                    formEditor.sltControls[i].css({ "text-decoration": textdecoration });
                }
                break;
            case "ctrltextcenter":
                formEditor.sltControls[i].css({ "text-align": "center" });
                $("#ctrltextleft").removeClass("ibo-linkselectclass");
                $("#ctrltextright").removeClass("ibo-linkselectclass");
                $("#ctrltextcenter").addClass("ibo-linkselectclass");
                break;
            case "ctrltextleft":
                formEditor.sltControls[i].css({ "text-align": "left" });
                $("#ctrltextleft").addClass("ibo-linkselectclass");
                $("#ctrltextright").removeClass("ibo-linkselectclass");
                $("#ctrltextcenter").removeClass("ibo-linkselectclass");
                break;
            case "ctrltextright":
                formEditor.sltControls[i].css({ "text-align": "right" });
                $("#ctrltextleft").removeClass("ibo-linkselectclass");
                $("#ctrltextright").addClass("ibo-linkselectclass");
                $("#ctrltextcenter").removeClass("ibo-linkselectclass");
                break;
            case "ctrlfield":
                switch (formEditor.sltControls[i].ControlType) {
                    case $.ibo.formEditor.ctlType.datetime://时间
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "4") {
                                alert("请选择时间类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                    case $.ibo.formEditor.ctlType.email://电子邮箱
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "13") {
                                alert("请选择电子邮箱类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                    case $.ibo.formEditor.ctlType.employeename://姓名
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "9") {
                                alert("请选择姓名类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                    case $.ibo.formEditor.ctlType.address://地址
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "11") {
                                alert("请选择地址类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                    case $.ibo.formEditor.ctlType.location://地理位置
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "14") {
                                alert("请选择地理位置类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                    case $.ibo.formEditor.ctlType.depart://部门
                        for (var k = 0; k < formEditor.TbColumnList.length; k++) {
                            if (t == formEditor.TbColumnList[k].FieldID && formEditor.TbColumnList[k].FieldType != "10") {
                                alert("请选择部门类型的字段！");
                                $("#" + objid).val("");
                                return;
                            }

                        }
                        break;
                }
                formEditor.sltControls[i].attrList.FieldID = t;
                break;
            case "ctrltablename":
                formEditor.View.TbNameRmk = t;
                formEditor.View.TbName = makePy(t)[0];
                //  formEditor.sltControls[i].attrList.tablename = t;
                break;
            case "ctrlfieldname":
                formEditor.sltControls[i].attrList.fielddesc = t;
                formEditor.sltControls[i].attrList.fieldname = makePy(t)[0];
                break;
            case "ctrldotnumber":
                if (parseInt(t) > 4)        //该语句块是为了将小数位数限制在4位以内
                    t = 4;
                else if (parseInt(t) < 0)
                    t = 0;
                formEditor.sltControls[i].attrList.dotnumber = t;
                break;
            case "ctrlevent":
                formEditor.sltControls[i].attrList.eventjs = t;
                break;
            case "ctrlminus":
                formEditor.sltControls[i].attrList.minus = $("#" + objid)[0].checked;
                break;
            case "ctrlDecimallen":
                formEditor.sltControls[i].attrList.Decimallen = t;
                break;
            case "ctrlMaxValue":
                formEditor.sltControls[i].attrList.MaxValue = t;
                break;
            case "ctrlMinValue":
                formEditor.sltControls[i].attrList.MinValue = t;
                break;
            case "ctrllineheight":
                t = t + "px";
                formEditor.sltControls[i].css({ "line-height": t });
                break;
            case "ctrlopacity":
                formEditor.sltControls[i].css({ "opacity": t });
                break;
                //网格属性设置 
            case "ctrltablerows":
                formEditor.sltControls[i].attrList.gridrows = t;
                formEditor.sltControls[i].setHtmlObj();//选择完行数就直接在页面上显示出来
                break;
            case "ctrltablefilter":
                formEditor.sltControls[i].attrList.gridfilter = t;
                break;
            case "ctrltablesize":
                formEditor.sltControls[i].attrList.gridsizes = t;
                break;
            case "ctrltablecolor":
                formEditor.sltControls[i].attrList.gridcolor = t;
                break;
            case "ctrlcolRadio":
                formEditor.sltControls[i].attrList.gridcolradio = ($("#" + objid)[0].checked ? "1" : "0");

                break;
                //图表控件属性
            case "ctrlChartsType":
                formEditor.sltControls[i].attrList.ChartsType = t;

                break;
            case "ctrlChartsTitle":
                formEditor.sltControls[i].attrList.ChartsTitle = t;
                break;
            case "ctrlChartsSubtitle":
                formEditor.sltControls[i].attrList.ChartsSubtitle = t;
                break;
            case "ctrlChartsXTitle":
                formEditor.sltControls[i].attrList.ChartsXTitle = t;
                break;
            case "ctrlChartsYTitle":
                formEditor.sltControls[i].attrList.ChartsYTitle = t;
                break;
            case "ctrlChartsXField":
                formEditor.sltControls[i].attrList.ChartsXField = t;
                break;
            case "ctrlChartsYField":
                formEditor.sltControls[i].attrList.ChartsYField = t;
                break;
            case "ctrlChartsField":
                formEditor.sltControls[i].attrList.ChartsField = t;
                break;
            case "ctrlisdetail"://是否从表
                formEditor.sltControls[i].attrList.isdetail = $("#" + objid)[0].checked;
                break;
            case "ctrlreqd"://必须输入
                formEditor.sltControls[i].attrList.reqd = $("#" + objid)[0].checked;
                break;
            case "goodsForBuy"://向供应商询价
                formEditor.sltControls[i].attrList.FBUY = $("#" + objid)[0].checked;
                break;
            case "ctrluniq": //不许重复
                formEditor.sltControls[i].attrList.uniq = $("#" + objid)[0].checked;
                break;

            case "ctrlinternal": //启用国际手机
                formEditor.sltControls[i].attrList.internal = $("#" + objid)[0].checked;
                break;
            case "ctrlauthcode":  //验证码
                formEditor.sltControls[i].attrList.authcode = $("#" + objid)[0].checked;
                break;
            case "chkDismark": //禁止手动标注
                formEditor.sltControls[i].attrList.Dismark = $("#" + objid)[0].checked;
                break;
            case "defval_field": //默认值
                formEditor.sltControls[i].attrList.defval_field = $("#" + objid).val();

                break;
            case "ctrlprovince"://默认省份
                formEditor.sltControls[i].attrList.province = t;
                break;
            case "ctrlcity": //默认城市
                formEditor.sltControls[i].attrList.city = t;
                break;
            case "ctrldistrict"://默认县区
                formEditor.sltControls[i].attrList.district = t;
                break;
            case "ctrlfieldvisible": //字段可见性
                formEditor.sltControls[i].attrList.fieldvisible = t;
                break;
            case "ctrlfieldwidth": //字段宽度
                formEditor.sltControls[i].attrList.fieldwidth = t;
                formEditor.sltControls[i].css({ "width": t });
                break;
            case "ctrlfieldcss": //css名称
                formEditor.sltControls[i].attrList.fieldcss = t;
                //    formEditor.sltControls[i].css({ "font-weight": fontweight });
                formEditor.sltControls[i].addClass(t);
                break;
            case "gridfields":
                formEditor.sltControls[i].attrList["gridfields"] = t;
                formEditor.sltControls[i].setHtmlObj();
                break;
            case "ctrldatasource"://从表数据源
                formEditor.sltControls[i].attrList.listdatasourceName = t;
                break;
            case "selectChildDataSource":
                formEditor.sltControls[i].attrList.listdatasource = t;
                break;
            default: break;
        }
    }
}

//显示控件属性
function showpControlProperties(obj) {
    $("#dialogProperties").show();
    $("#spProperties").click();
    $("#spAnimate").hide();
    $(".list-group-item").show();
    $("#liimage").hide();
    $("#lidotnumber").hide();
    $("#liminus").hide();
    $("#liDecimallen").hide();
    $("#liMaxMin").hide();
    $("#lifontsize").show();
    $("#lisize").hide();
    $("#lievent").hide();
    $("#QuPageParam").hide();
    $("#liPageParam").hide();
    $("#liPageValue").hide();
    $("#lilink").hide();
    $("#litablename").hide();//隐藏表名
    $("#lifieldname").hide();//隐藏字段名
    $("#livalue").hide();
    hidePopup();
    $("#litableRows").hide();
    $("#litablefields").hide();
    $("#litableCols").hide();
    $("#litablefilter").hide();
    $("#litablesize").hide();
    $("#litablecolor").hide();
    $("#libuttonstyle").hide();
    $("#liChartsType").hide();
    $("#liChartsTitle").hide();
    $("#liChartsSubtitle").hide();
    $("#liChartsXTitle").hide();
    $("#liChartsYTitle").hide();
    $("#liChartsXField").hide();
    $("#liChartsYField").hide();
    $("#liChartsField").hide();
    $("#lidatasource").hide();
    //特殊属性
    $("#liAddProducts").hide();
    $("#liPriceQuery").hide();
    $("#liManualInput").hide();
    $("#liDefaultInput").hide();
    $("#liFieldVisible").hide();
    $("#liFieldWidth").hide();
    $("#liFieldcss").hide();
    $("#liOptions").hide();
    $("#liisdetail").hide();
    $("#ctrlevent").removeAttr("disabled");



    //特殊属性
    switch (obj.ControlType) {
        case $.ibo.formEditor.ctlType.div: //文本
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#liisprint").hide();
            $("#lievent").show();
            $("#spAnimate").show();
            break;
        case $.ibo.formEditor.ctlType.article://文字
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#liisprint").hide();
            $("#livalue").hide();
            $("#li_field").hide();
            $("#lifontsize").hide();
            $("#lisize").show();
            $("#lilink").show();
            $("#lievent").show();
            $("#spAnimate").show();
            break;
        case $.ibo.formEditor.ctlType.text: //文本框
            $("#liitems").hide();
            $("#lievent").show();
         //   $("#ctrlevent").val("13");
            $("#ctrlevent").attr("disabled", "disabled");
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.textarea: //文本域
            $("#liitems").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.button: //按钮
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#liisprint").hide();
            $("#lievent").show();
            $("#li_field").hide();
            $("#litablename").hide();
            $("#lifieldname").hide();
            $("#libuttonstyle").show();
            $("#livalue").show();
            break;
        case $.ibo.formEditor.ctlType.image: //图片
            hideFontStyle();
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liimage").show();
            $("#lievent").show();
            $("#spAnimate").show();
            //普通页面中数据项要隐藏
            if (obj.formEditor.View.ViewType == 1) {
                $("#li_field").hide();//绑定字段
            }
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.select:  // 下拉选择框 
            hideFontStyle();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.number:  // 数字输入框 
            hideFontStyle();
            $("#liitems").hide();
            $("#liminus").show();
            $("#liDecimallen").show();
            $("#liMaxMin").show();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.decimal: //浮点数输入框
            hideFontStyle();
            $("#liitems").hide();
            $("#lidotnumber").show();
            $("#liminus").show();
            $("#liDecimallen").show();
            $("#liMaxMin").show();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.date: // 日期输入框 
            hideFontStyle();
            $("#liitems").hide();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.checkbox:  // 复选框
            hideFontStyle();
            $("#liprompt").hide();
            $("#liitems").hide();
            $("#liOptions").show();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.radio:   // 单选框  
            hideFontStyle();
            $("#liprompt").hide();
            $("#liitems").hide();
            $("#liOptions").show();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.checkboxlist:  // 复选框列表 
            hideFontStyle();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.radiolist:   // 单选框列表
            hideFontStyle();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.table:
            $("#litablename").hide();
            $("#lifieldname").hide();
            $("#livalue").hide();
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#liisprint").hide();
            $("#li_field").hide();
            $("#liitems").hide();
            $("#liheightwidth").hide();
            $("#libackcolor").hide();
            $("#lifontcolor").hide();
            $("#lifontsize").hide();
            $("#lisize").hide();
            $("#lifontstyle").hide();
            $("#lipacity").hide();
            $("#licontrolname").show();
            $("#litableRows").show();
            $("#litablefields").show();
            $("#litableCols").show();
            $("#litablefilter").show();
            $("#litablesize").show();
            $("#litablecolor").show();
            $("#lidatasource").show();
            break;
        case $.ibo.formEditor.ctlType.upload:
            hideFontStyle();
            $("#liitems").hide();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.charts:
            hideFontStyle();
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#liisprint").hide();
            $("#li_field").hide();
            $("#lifieldname").hide();
            $("#liChartsType").show();
            $("#liChartsTitle").show();
            $("#liChartsSubtitle").show();
            if ($("#ctrlChartsType").val() == "4" || $("#ctrlChartsType").val() == "6") {
                $("#liChartsXTitle").show();
                $("#liChartsYTitle").hide();
                $("#liChartsXField").show();
                $("#liChartsYField").hide();
            }
            else {
                $("#liChartsXTitle").show();
                $("#liChartsYTitle").show();
                $("#liChartsXField").show();
                $("#liChartsYField").show();
            }
            $("#liChartsField").show();
            $("#lidatasource").show();
            break;
        case $.ibo.formEditor.ctlType.video: //多媒体
            $("#liitems").hide();
            $("#liprompt").hide();
            $("#liimage").find("span")[0].innerHTML = "选择多媒体 ："
            $("#liimage").find("input")[0].accept = "*/*";
            $("#liimage").find("input")[0].title = "选择多媒体"
            $("#liimage").show();
            hideFontStyle();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.employeename://姓名
        case $.ibo.formEditor.ctlType.depart://姓名
            $("#liManualInput").hide();//设置

            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称
            $("#liitems").hide();//数据源
            $("#liDefaultInput").hide();//默认值
            $("#defval_field").hide();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_dismark").hide();//默认值
            $("#popt_unique").hide();//不许重复
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            $("#liAddProducts").hide();//添加配图商品
            $("#liprompt").hide();

            $("#liPriceQuery").hide();//商品用于向供应商询价

            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.address: //地址
            $("#liManualInput").hide();//设置
            $("#liDefaultInput").show();//默认值
            $("#liprompt").hide();
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称

            //

            $("#defval_field").hide();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_unique").hide();//不许重复
            $("#popt_dismark").hide();//默认值
            $("#ctrlprovince").show();//省
            $("#ctrlcity").show();//市
            $("#ctrldistrict").show();//县

            $("#liAddProducts").hide();//添加配图商品


            $("#liPriceQuery").hide();//商品用于向供应商询价
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值

            break;
        case $.ibo.formEditor.ctlType.telephone://手机
            $("#liManualInput").show();//设置
            $("#liDefaultInput").show();//默认值
            $("#popt_authcode").show();//启用国际手机
            $("#popt_unique").show();//不许重复
            $("#liprompt").hide();
            $("#popt_dismark").hide();//默认值
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称   

            $("#popt_required").hide();//设置必须输入
            ///

            $("#defval_field").show();

            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            $("#liAddProducts").hide();//添加配图商品


            $("#liPriceQuery").hide();//商品用于向供应商询价
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值


            break;
        case $.ibo.formEditor.ctlType.email://电子邮箱
            $("#liManualInput").show();//设置
            $("#liDefaultInput").show();//默认值
            $("#popt_unique").show();//不许重复
            $("#liprompt").hide();
            $("#popt_dismark").hide();//默认值
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称  


            $("#defval_field").show();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_required").hide();//设置必须输入
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            $("#liAddProducts").hide();//添加配图商品


            $("#liPriceQuery").hide();//商品用于向供应商询价
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值

            break;
        case $.ibo.formEditor.ctlType.location://地理位置
            $("#liManualInput").show();//设置
            $("#popt_dismark").show();//默认值
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称   
            $("#liprompt").hide();
            $("#liDefaultInput").hide();//默认值
            $("#defval_field").hide();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_required").hide();//设置必须输入
            $("#popt_unique").hide();//不许重复
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            $("#liAddProducts").hide();//添加配图商品


            $("#liPriceQuery").hide();//商品用于向供应商询价
            //普通页面中数据项和绑定字段要隐藏
            if (obj.formEditor.View.ViewType == 1) {
                $("#li_field").hide();//绑定字段
                $("#liitems").hide();//绑定数据项
            }

            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值

            break;
        case $.ibo.formEditor.ctlType.datetime://时间
            $("#liManualInput").show();//设置
            $("#liDefaultInput").show();//默认值
            $("#popt_unique").show();//不许重复

            $("#popt_dismark").hide();//默认值
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称 
            $("#liprompt").hide();
            //

            $("#defval_field").show();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_required").hide();//设置必须输入
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            $("#liAddProducts").hide();//添加配图商品


            $("#liPriceQuery").hide();//商品用于向供应商询价
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值

            break;
        case $.ibo.formEditor.ctlType.imageproduct://配图商品
            $("#liAddProducts").hide();//添加配图商品
            $("#addproductname").text("+ 添加配图商品");
            $("#addproductname").attr("onclick", "showContentParam(1)");

            $("#popt_dismark").hide();//默认值
            $("#liPriceQuery").hide();//商品用于向供应商询价
            $("#liManualInput").hide();//设置
            //  $("#liDefaultInput").show();//默认值
            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称  
            $("#liprompt").hide();
            ///

            $("#liDefaultInput").hide();//默认值
            $("#defval_field").hide();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_unique").hide();//不许重复
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            //普通页面中数据项和绑定字段要隐藏
            if (obj.formEditor.View.ViewType == 1) {
                $("#li_field").hide();//绑定字段
                $("#liitems").hide();//绑定数据项
            }
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值

            break;
        case $.ibo.formEditor.ctlType.noimgproduct://无图商品
            $("#liAddProducts").hide();//添加无图商品
            $("#addproductname").text("+ 添加无图商品");
            $("#addproductname").attr("onclick", "showContentParam(2)");
            $("#fileToUpload").hide();
            $("#liPriceQuery").hide();//商品用于向供应商询价
            $("#liManualInput").hide();//设置

            $("#liFieldVisible").show();//字段可见性
            $("#liFieldWidth").show();//字段宽度
            $("#liFieldcss").show();//css名称     
            $("#liprompt").hide();

            $("#popt_dismark").hide();//默认值

            $("#liDefaultInput").hide();//默认值
            $("#defval_field").hide();
            $("#popt_authcode").hide();//启用国际手机
            $("#popt_unique").hide();//不许重复
            $("#ctrlprovince").hide();//省
            $("#ctrlcity").hide();//市
            $("#ctrldistrict").hide();//县

            //普通页面中数据项和绑定字段要隐藏
            if (obj.formEditor.View.ViewType == 1) {
                $("#li_field").hide();//绑定字段
                $("#liitems").hide();//绑定数据项
            }
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.panel://从表
            $("#liprompt").hide();
            $("#liisnotnull").hide();
            $("#lifontstyle").hide();
            $("#li_field").hide();
            $("#liitems").hide();
            $("#lidatasource").show();
            $("#liisdetail").show();
            // 数据表生成控件  可选择数据源
            if (obj.formEditor.View.GenerateType == "1") $("#selectChildDataSource").show();
                // 控件生成数据表  不可选择数据源
            else $("#selectChildDataSource").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        case $.ibo.formEditor.ctlType.articleedit:
            hideFontStyle();
            $("#liitems").hide();
            $("#liprompt").hide();
            changeProperties("ctrlisprint", "on");      //触发是否打印的点击事件，以便赋值，否则如果后续不去操作的话会得到null值
            break;
        default: break;
    }

    $("#ibo-Link-Li").hide();
    $("#QuPageParam").hide();
    $("#liPageParam").hide();
    $("#liPageValue").hide();
    $("#ibo-Link-LinkTitle-Li").hide();
    if (!$("#lievent").is(":hidden")) {
        // 当前选中option
        if (obj.attrList.queryparams && obj.attrList.queryparams.length > 0) {
            var s = document.getElementById("ctrlevent");
            var ops = s.options;
            $.each(ops, function (i, n) {
                if (n.value === '15') //这里是你要选的值
                {
                    ops[i].selected = true;
                }
            });
        }
        var op = $("#ctrlevent").find("option:selected");
        // 是否新打开窗口
        var openwin = op.attr("openwin");

        // 打开新页面
        if (openwin == "1") {
            $("#ibo-Link-LinkTitle-Li").show();
            $("#ibo-Link-LinkTitle").val(obj.attrList["linktitle"]);
            // 是否需要设置新窗口传递参数
            var setPara = op.attr("setPara");
            if (setPara == "1") {
                if ($("#ctrlevent").val() === '15') {
                    $("#QuPageParam").show();
                }
                else {
                    $("#liPageParam").show();
                    $("#liPageValue").show();
                }
            }
            // 是否只可设置内部页面
            var inner = op.attr("inner");
            if (inner == "1") {
                // 只可选择 不可填写
                $("#ibo-Link-Url").prop("readonly", true);
                // 传递参数页面只能打开内部页面
                if (obj.attrList["urltype"] == "1") {
                    $("#ibo-Link-Inner").prop("checked", true);
                }
                // 不显示选择地址类型
                $(".urltypeInfo").hide();
            }
            else {
                $(".urltypeInfo").show();
                if (obj.attrList["urltype"] == "1") {
                    $("#ibo-Link-Outer").prop("checked", true);
                    // 只可选择 不可填写
                    $("#ibo-Link-Url").prop("readonly", false);
                }
                else {
                    $("#ibo-Link-Inner").prop("checked", true);
                    // 只可选择 不可填写
                    $("#ibo-Link-Url").prop("readonly", true);
                }
            }
            $("#ibo-Link-Url").val(obj.attrList["linkurlAddress"]);
            // 显示设置页面地址属性
            if ($("#ctrlevent").val() !== '15')
                $("#ibo-Link-Li").show();
        }
    }

    if (typeof obj.attrList["hasTitle"] != "undefined") $("#licontrolname").show();
    else $("#licontrolname").hide();

};



////event：keyup事件参数
//obj:输入框对象
//dotnumber：小数点最大位数
//minus:是否允许负数
//Decimallen数字长度，不含小数点
//MaxValue:最大值
//MinValue:最小值
function clearNoNum(event, obj, dotnumber, minus, Decimallen, max, min) {
    //响应鼠标事件，允许左右方向键移动 
    event = window.event || event;
    if (event.keyCode == 37 | event.keyCode == 39) {
        return;
    }
    var t = obj.value.charAt(0);
    //先把非数字的都替换掉，除了数字和. 
    obj.value = obj.value.replace(/[^\d.]/g, "");
    //必须保证第一个为数字而不是. 
    obj.value = obj.value.replace(/^\./g, "");
    //保证只有出现一个.而没有多个. 
    obj.value = obj.value.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

    //如果第一位是负号，则允许添加   如果不允许添加负号 可以把这块注释掉
    if (minus) {
        if (t == '-') {
            obj.value = '-' + obj.value;
        }
    }
    if (parseInt(obj.value) < min) {
        obj.value = min;
    }
    if (parseInt(obj.value) > max) {
        obj.value = max;
    }
    //小数点位数
    if (obj.value.indexOf(".") > 0) {
        obj.value = obj.value.substr(0, obj.value.indexOf(".")) + "." + obj.value.substr(obj.value.indexOf(".") + 1, dotnumber);
        //数字长度
        if (obj.value.length > (Decimallen + 1)) {
            obj.value = obj.value.substr(0, Decimallen);
        }
    }
    else {
        //数字长度
        if (obj.value.length > Decimallen) {
            obj.value = obj.value.substr(0, Decimallen);
        }
    }
    tran(obj);
}
function checkNum(obj) {
    //为了去除最后一个. 
    obj.value = obj.value.replace(/\.$/g, "");

}


function DigitInput(obj, event) {
    //响应鼠标事件，允许左右方向键移动 
    event = window.event || event;
    if (event.keyCode == 37 | event.keyCode == 39) {
        return;
    }
    obj.value = obj.value.replace(/\D/g, "");
}

function tran(id) {
    var v, j, sj, rv = "";
    v = id.value.replace(/,/g, "").split(".");
    j = v[0].length % 3;
    sj = v[0].substr(j).toString();
    for (var i = 0; i < sj.length; i++) {
        rv = (i % 3 == 0) ? rv + "," + sj.substr(i, 1) : rv + sj.substr(i, 1);
    }
    var rvalue = (v[1] == undefined) ? v[0].substr(0, j) + rv : v[0].substr(0, j) + rv + "." + v[1];
    if (rvalue.charCodeAt(0) == 44) {
        rvalue = rvalue.substr(1);
    }
    id.value = rvalue;
}
