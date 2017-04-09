/* 富文本编辑器设置、显示属性函数 */


/* 显示文本属性  obj为选择控件对象*/
function ShowEditProperties(obj) {
    if (obj.ControlType == $.ibo.formEditor.ctlType.article) {
        $("#ctrlbackcolor").val(rgb2hex(document.queryCommandValue("BackColor")));
        $("#ctrlfontcolor").val(rgb2hex(document.queryCommandValue("ForeColor")));
        $("#ctrlsize").val(document.queryCommandValue("FontSize"));
        if (document.queryCommandValue("Bold") == "true") {
            $("#ctrlfontweight").addClass("ibo-linkselectclass");
        }
        else {
            $("#ctrlfontweight").removeClass("ibo-linkselectclass");
        }
        if (document.queryCommandValue("Italic") == "true") {
            $("#ctrlfontstyle").addClass("ibo-linkselectclass");
        }
        else {
            $("#ctrlfontstyle").removeClass("ibo-linkselectclass");
        }
        if (document.queryCommandValue("Underline") == "true") {
            $("#ctrltextdecoration").addClass("ibo-linkselectclass");
        }
        else {
            $("#ctrltextdecoration").removeClass("ibo-linkselectclass");
        }
    }
}

/* 设置文本样式属性   objtype为类型 objvalue为值 */
function SetEditProperties(objtype, objvalue) {
    var length = formEditor.sltControls.length;
    if (length <= 0) {
        alert("请先选择控件");
        return;
    }
    for (var i = 0; i < length; i++) {
        if (formEditor.sltControls[i].ControlType == $.ibo.formEditor.ctlType.article) {//文字属性事件
            var content = getSelectText();
            if (content == "" || content == undefined) {
                alert("请先选中内容");
                return;
            }
            switch (objtype) {
                case "ctrlbackcolor":
                    document.execCommand("BackColor", "false", objvalue);
                    break;
                case "ctrlfontcolor":
                    document.execCommand("ForeColor","false",objvalue);
                    break;
                case "ctrlsize":
                    document.execCommand("FontSize","false",objvalue);
                    break;
                case "ctrllink":
                    document.execCommand("CreateLink", false, objvalue);
                    break;
                case "ctrlfontweight":
                    document.execCommand("Bold");
                    if (document.queryCommandValue("Bold") == "true") {
                        $("#ctrlfontweight").addClass("ibo-linkselectclass");
                    }
                    else {
                        $("#ctrlfontweight").removeClass("ibo-linkselectclass");
                    }
                    break;
                case "ctrlfontstyle":
                    document.execCommand("Italic");
                    if (document.queryCommandValue("Italic") == "true") {
                        $("#ctrlfontstyle").addClass("ibo-linkselectclass");
                    }
                    else {
                        $("#ctrlfontstyle").removeClass("ibo-linkselectclass");
                    }
                    break;
                case "ctrltextdecoration":
                    document.execCommand("Underline");
                    if (document.queryCommandValue("Underline") == "true") {
                        $("#ctrltextdecoration").addClass("ibo-linkselectclass");
                    }
                    else {
                        $("#ctrltextdecoration").removeClass("ibo-linkselectclass");
                    }
                    break;
            }
        }
    }
}


/* 获取选中内容 */
function getSelectText() {
    //适用于IE 
    if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
        //适用于其他浏览器
    } else if (window.getSelection) {
        return window.getSelection();
    }
}

//转到固定长度的十六进制字符串，不够则补0 
function zero_fill_hex(num, digits) {
    var s = num.toString(16);
    while (s.length < digits)
        s = "0" + s;
    return s;
}

/* 颜色转换 */
function rgb2hex(rgb) {
    //nnd, Firefox / IE not the same, fxck 
    if (rgb.charAt(0) == '#')
        return rgb;
    var n = Number(rgb);
    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
    return "#" + zero_fill_hex(decimal, 6);
}



(function () {
    var _shconfirm = {};
    var _shprompt = {};
    //闭包初始化；
    $(function () {
        $("#dialogalert").dialog({
            modal: true,
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            },
            buttons: {
                确定: function () {
                    $(this).dialog("close");
                }
            }
        });
        $("#dialogconfirm").dialog({
            modal: true,
            autoOpen: false,
            show: {
                effect: "slide",
                duration: 500
            },
            hide: {
                effect: "drop",
                duration: 500
            },
            buttons: {
                确定: function () {
                    _shconfirm.shconfirmCallBack(true);
                    $(this).dialog("close");
                },

                取消: function () {
                    _shconfirm.shconfirmCallBack(false);
                    $(this).dialog("close");

                }
            }
        });
        $("#dialogprompt").dialog({
            modal: true,
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "puff",
                duration: 500
            },
            buttons: {
                确定: function () {
                    if (_shprompt.shpromptObj.regex) {
                        if (!_shprompt.shpromptObj.regex.test($("#dialogprompt .text").val())) {
                            $("#dialogprompt .alert .promptmsg").html(_shprompt.shpromptObj.regexmsg);
                            $("#dialogprompt .alert").slideDown();
                            return;
                        } else {
                            $("#dialogprompt .alert").hide();
                        }
                    }
                    _shprompt.shpromptObj.callback($("#dialogprompt .text").val());
                    $(this).dialog("close");
                },

                取消: function () {
                    _shprompt.shpromptObj.callback($("#dialogprompt .text").val());
                    $(this).dialog("close");

                }
            }
        });
    });

    window.shalert = function (message) {
        $("#dialogalert .msgcontent").html(message);
        $("#dialogalert").dialog("open");
    };
    //message 提示的信息 ,callback(true/false)回调函数
    window.shconfirm = function (message, callback) {
        $("#dialogconfirm .msgcontent").html(message);
        $("#dialogconfirm").dialog("open");
        _shconfirm.shconfirmCallBack = callback;
    };
    //message 提示的信息 ,callback(msg)回调函数（用户输入的消息）, param：regex 输入的 正则验证，regexmsg 正则验证不通过的提示
    window.shprompt = function (message, callback, regex, regexmsg) {
        $("#dialogprompt .msgcontent").html(message);
        $("#dialogprompt").dialog("open");
        _shprompt.shpromptObj = {
            callback: callback,
            regex: regex,
            regexmsg: regexmsg
        };
    }
})();


