var SelcetedDeptID = null;      //用于存储被选中节点的部门ID
var SelcetedDeptName = null;    //用于存储被选中节点的部门名称
var SelectedDeptIDs = [];       //用于存储被选中节点的部门ID以及它所有子孙节点的部门ID

var Nodes = [];
var zTree;

//获取管理者应用范围部门列表,userid为管理者ID,(type 1表示右侧单选，2表示右侧多选)
$.ibo.InitTreeList = function (treeDomID,userId,type,formId,ruleId) {
    var data = $.toJSON({ pgIndex: 0, pgSize: 0, IsDelete: "false", ParentID: null, UserID: userId });
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "DeptList",
        data: data,
        success: function (obj) {
            if ($.ibo.ResFlag.Success == obj.ResFlag) {
                if (obj.ResObj && obj.ResObj.List) {
                    Nodes = [];
                    $.each(obj.ResObj.List, function (i, n) {
                        var len = ($.grep(obj.ResObj.List, function (m, j) { return m.ParentID == n.DeptID })).length;
                        var item = { ID: n.DeptID, ParentID: n.ParentID, name: n.DeptName, isParent: len > 0 ? true : false, open: true };
                        Nodes.push(item);
                    });
                }
                
                zTree = $.fn.zTree.init($(treeDomID), createSetting(type), Nodes);
                zTree.selectNode(Nodes[0]);
                GetUserlist(type, formId, ruleId);
            }
            else {
                $.ibo.ShowErrorMsg(obj);
            }
        }
    });
};


// 加载用户列表(1表示右侧单选，2表示右侧多选,3默认全选)
function GetUserlist(type, formId, ruleId) {
    var data = $.toJSON({ pgIndex: 0, pgSize: 0, userType: "3", EmpID: "", EmpName: "", formId: formId, ruleId: ruleId, SelectedDeptIDs: SelectedDeptIDs.toString(), IsDelete: "false" });
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "EmployeeList",
        data: data,
        success: function (obj) {
            if ($.ibo.ResFlag.Success == obj.ResFlag) {
                $("#listuser .listdata").remove();
                $("#seldiv").remove();
                //alert($.toJSON(obj.ResObj));
                if (obj.ResObj && obj.ResObj.List) {
                    $.each(obj.ResObj.List, function (i, n) {
                        if (type == 1) {
                            $("#listuser").append("<tr class=\"listdata\"><td><label><input    sex=\""+n.Sex+"\" id=\"rid_" + n.EmpID + "\" userId=\"" + n.UserID + "\" type=\"radio\" name=\"radio\" IconUrl=\"" + n.IconUrl + "\"  selname=\"" + n.EmpName + "\" value=\"" + n.EmpID + "\"/><span class='inputText'>" + parseInt(i + 1) + "</span><span class='inputText'>" + n.EmpName + "</span></td></label></tr>");
                        }
                        else if (type == 2)
                        {
                            $("#listuser").append("<tr class=\"listdata\"><td><label><input   sex=\""+n.Sex+"\" id=\"chk_" + n.EmpID + "\" userId=\"" + n.UserID + "\" type=\"checkbox\" name=\"checkbox\" IconUrl=\"" + n.IconUrl + "\"  selname=\"" + n.EmpName + "\" value=\"" + n.EmpID + "\"/><span class='inputText'>" + parseInt(i + 1) + "</span><span class='inputText'>" + n.EmpName + "</span></td></label></tr>");
                        } else if (type == 3) {
                            $("#listuser").append("<tr class=\"listdata\"><td><label><input   sex=\""+n.Sex+"\" id=\"chk_" + n.EmpID + "\" userId=\"" + n.UserID + "\" type=\"checkbox\" name=\"checkbox\" IconUrl=\"" + n.IconUrl + "\"  selname=\"" + n.EmpName + "\" value=\"" + n.EmpID + "\"/><span class='inputText'>" + parseInt(i + 1) + "</span><span class='inputText'>" + n.EmpName + "</span></td></label></tr>");
                            //$("#listuser").find("input[type='checkbox']").attr("checked", true);
                            if (i == 0) {
                                var shtml = '<div id="seldiv"><label><input id="seleAll" onchange="selectAll()" type="checkbox"><span class="inputText">全选</span></label></div>';
                                    $("#listuser").parent().prepend(shtml);
                                }
                        }
                    });
                }
            }
            else {
                $.ibo.ShowErrorMsg(obj);
            }
        }
    });
};

// 树形控件初始化设置(1表示右侧单选，2表示右侧多选)
function createSetting(type) {
    var data = {
        simpleData: {
            enable: true,
            idKey: "ID",
            pIdKey: "ParentID",
            rootPId: -1
        }
    }
    var check = {      
        enable: false,
        chkStyle:"",
        radioType: "all"
    };
    var callback ={};
    
    //(1表示右侧单选，2表示右侧多选)
    if (type == 1) {
        callback.beforeClick = NodeClick_ShowRadio;//树点击事件
    }
    else if (type == 2) {
        callback.beforeClick = NodeClick_ShowCheck;//树点击事件
    }// else if (type == 3) {
    //    callback.beforeClick = NodeClick_ShowDept;//部门点击事件
    //}
    var view= {
        showIcon: false
    }

    return {
        data: data,
        check: check,
        callback: callback,
        view:view
    };
};


// Tree节点点击事件
function  NodeClick_ShowRadio(treeId, treeNode) {
    if (treeNode.ParentID == null || treeNode.ParentID < 0) { //如果是根节点，则...
        SelcetedDeptID = null;
        SelcetedDeptName = null;
    }
    else {
        SelcetedDeptID = treeNode.ID;
        SelcetedDeptName = treeNode.name;
    }
    SelectedDeptIDs = [];                //每次选中一个节点，都要将它清空。
    ParentID = treeNode.ID;
    var nodes = zTree.transformToArray(treeNode);//获取选中节点和其子部门
    if (nodes.length > 0) {
        $.each(nodes, function (i, n) {
            SelectedDeptIDs.push(n.ID);
        });
    }
    GetUserlist(1);//加载用户
};

function NodeClick_ShowCheck(treeId, treeNode) {
    if (treeNode.ParentID == null || treeNode.ParentID < 0) { //如果是根节点，则...
        SelcetedDeptID = null;
        SelcetedDeptName = null;
    }
    else {
        SelcetedDeptID = treeNode.ID;
        SelcetedDeptName = treeNode.name;
    }
    SelectedDeptIDs = [];                //每次选中一个节点，都要将它清空。
    ParentID = treeNode.ID;
    var nodes = zTree.transformToArray(treeNode);//获取选中节点和其子部门
    if (nodes.length > 0) {
        $.each(nodes, function (i, n) {
            SelectedDeptIDs.push(n.ID);
        });
    }
    GetUserlist(2);//加载用户
};
//默认用户全选
function NodeClick_ShowCheck(treeId, treeNode) {
    if (treeNode.ParentID == null || treeNode.ParentID < 0) { //如果是根节点，则...
        SelcetedDeptID = null;
        SelcetedDeptName = null;
    }
    else {
        SelcetedDeptID = treeNode.ID;
        SelcetedDeptName = treeNode.name;
    }
    SelectedDeptIDs = [];                //每次选中一个节点，都要将它清空。
    ParentID = treeNode.ID;
    var nodes = zTree.transformToArray(treeNode);//获取选中节点和其子部门
    if (nodes.length > 0) {
        $.each(nodes, function (i, n) {
            SelectedDeptIDs.push(n.ID);
        });
    }
    GetUserlist(3);//加载用户
};

//function NodeClick_ShowDept(treeId, treeNode) {
//    if (treeNode.ParentID == null || treeNode.ParentID < 0) { //如果是根节点，则...
//        SelcetedDeptID = null;
//        SelcetedDeptName = null;
//    }
//    else {
//        SelcetedDeptID = treeNode.ID;
//        SelcetedDeptName = treeNode.name;
//    }
//    SelectedDeptIDs = [];                //每次选中一个节点，都要将它清空。
//    ParentID = treeNode.ID;
//    var nodes = zTree.transformToArray(treeNode);//获取选中节点和其子部门
//    if (nodes.length > 0) {
//        $.each(nodes, function (i, n) {
//            SelectedDeptIDs.push(n.ID);
//        });
//    }
//    getDeptList();
//}

//function getDeptList() {
//    var flag = true;
//    var sName = SelcetedDeptName;
//    var dId = SelcetedDeptID;
//    $("#listuser").find("td").each(function(){
//        if ($(this).attr("data-Id") == dId) {
//            flag = false;
//        }
//    });
//    var bhtml = '<tbody><tr><td selname="' + SelcetedDeptName + '" data-Id="' + SelcetedDeptID + '">' + SelcetedDeptName + '</td></tr></tbody>';
//    if (flag) {
//        $("#listuser").append(bhtml);
//    } else {
//        alert("你已经添加过该部门了");
//    }
//}
function GetChildrenDeptIDs(DeptID) {
    var children = $.grep(Nodes, function (m, j) { return m.ParentID == DeptID; });
    if (children.length > 0) {
        $.each(children, function (i, n) {
            SelectedDeptIDs.push(n.ID);
            GetChildrenDeptIDs(n.ID);
        });
    }
};
 

//需调用的方法SelectObj表示存储值的数组，  type 1表示右侧单选，2表示右侧多选
$.ibo.InitDialogTree = function (SelectObj, userId, type, successfun, cancelfun) {
    SelectObj=[];
    var treeDivId = "selUserTreeNode";
    var div = $("<div><div class='dialogTextLeft'>选择子管理员</div>"), divul = $("<div>"),divtable = $("<div>");
    var ul = $("<ul>");
    ul.prop("id", treeDivId);
    ul.addClass("ztree");
    divul.addClass("divDeptclass");
    divul.append(ul);
    var table = $("<table style='width:100%'>");
    table.prop("id", "listuser");
    table.addClass("dtlist");
    divtable.addClass("divUserclass");
    divtable.append(table);
    div.append(divul);
    div.append("<div class='dialogTextRight'>子管理员属于以下成员</div>");
    div.append(divtable);
    div.dialog({
        modal: true,
        title: "选择子管理员",
        dialogClass: "ibo-dialog",
        width: 750,
        height: 600,
        buttons: {
            "确定": function () {
               
                if (type == 1) {
                    $("#listuser input[type='radio']:checked").each(function (i, n) {
                        var value = {};
                        value.EmpID = $(n).attr("value");
                        value.EmpName = $(n).attr("selname");
                        value.UserID = $(n).attr("userId");
                        value.IconUrl = $(n).attr("IconUrl");
                        value.Type = 1; //人员
						value.sex=$(n).attr("sex");
                        SelectObj.push(value);
                        return false;
                    });
                   
                }
                else if (type == 2)
                {
                    var check = new Array();
                    $("#listuser input[type='checkbox']:checked").each(function (i, n) {
                        var value = {};
                        value.EmpID=$(n).attr("value");
                        value.EmpName = $(n).attr("selname");
                        value.UserID = $(n).attr("userId");
                        value.IconUrl = $(n).attr("IconUrl")
                        value.Type=1; //人员
						value.sex=$(n).attr("sex");
                        SelectObj.push(value);
                    });
                }
                //else if (type == 3) {
                //    $("#listuser").find("td").each(function (i, n) {
                //        var value = {};
                //        value.EmpID = $(n).attr("data-id");
                //        value.EmpName = $(n).attr("selname");
                //        value.Type = 1; //部门
                //        SelectObj.push(value);
                //    });
                //}
                $(this).dialog("destroy");
                if (SelectObj.length > 0 && successfun != null) {
                    successfun(SelectObj);
                }
            },
            "取消": function () {
                $(this).dialog("destroy");
                if (cancelfun != null) {
                    cancelfun();
                }
            }
        },
        open: function () {
            $.ibo.InitTreeList("#" + treeDivId, userId, type,null,null);
        },
        close: function () {
            $(this).dialog("destroy");
            if (cancelfun != null) {
                cancelfun();
            }
        }
    });
    $(".ui-dialog-titlebar-close").blur();

}


//需调用的方法SelectObj表示存储值的数组，  type 1表示右侧单选，2表示右侧多选
$.ibo.InitDialogTreeForm = function (SelectObj, userId, type, successfun, cancelfun,formId,ruleId) {
    SelectObj = [];
    var treeDivId = "selUserTreeNode";
    var div = $("<div><div class='dialogTextLeft'>请选择人员部门</div>"), divul = $("<div>"), divtable = $("<div>");
    var ul = $("<ul>");
    ul.prop("id", treeDivId);
    ul.addClass("ztree");
    divul.addClass("divDeptclass");
    divul.append(ul);
    var table = $("<table style='width:100%'>");
    table.prop("id", "listuser");
    table.addClass("dtlist");
    divtable.addClass("divUserclass");
    divtable.append(table);
    div.append(divul);
    div.append("<div class='dialogTextRight'>请选择人员</div>");
    div.append(divtable);
    div.dialog({
        modal: true,
        title: "选择用户",
        dialogClass: "ibo-dialog",
        width: 750,
        height: 600,
        buttons: {
            "确定": function () {

                if (type == 1) {
                    $("#listuser input[type='radio']:checked").each(function (i, n) {
                        var value = {};
                        value.EmpID = $(n).attr("value");
                        value.EmpName = $(n).attr("selname");
                        value.UserID = $(n).attr("userId");
                        value.IconUrl = $(n).attr("IconUrl");
                        value.Type = 1; //人员
                        SelectObj.push(value);
                        return false;
                    });

                }
                else if (type == 2) {
                    var check = new Array();
                    $("#listuser input[type='checkbox']:checked").each(function (i, n) {
                        var value = {};
                        value.EmpID = $(n).attr("value");
                        value.EmpName = $(n).attr("selname");
                        value.UserID = $(n).attr("userId");
                        value.IconUrl = $(n).attr("IconUrl")
                        value.Type = 1; //人员
                        SelectObj.push(value);
                    });
                }
                //else if (type == 3) {
                //    $("#listuser").find("td").each(function (i, n) {
                //        var value = {};
                //        value.EmpID = $(n).attr("data-id");
                //        value.EmpName = $(n).attr("selname");
                //        value.Type = 1; //部门
                //        SelectObj.push(value);
                //    });
                //}
                $(this).dialog("destroy");
                if (SelectObj.length > 0 && successfun != null) {
                    successfun(SelectObj);
                }
            },
            "取消": function () {
                $(this).dialog("destroy");
                if (cancelfun != null) {
                    cancelfun();
                }
            }
        },
        open: function () {
            $.ibo.InitTreeList("#" + treeDivId, userId, type, formId, ruleId);
        },
        close: function () {
            $(this).dialog("destroy");
            if (cancelfun != null) {
                cancelfun();
            }
        }
    });
    $(".ui-dialog-titlebar-close").blur();

}

//获取url中的参数值
$.ibo.GetPar = function (parName)
{
    var parurl =window.location.search;
    parurl = parurl.length < 2 ? "" : parurl.substr(1, parurl.length);
    var parArray = parurl.split("&");
    for (var i = 0; i < parArray.length; i++)
    {
        if (parName.toLowerCase() == parArray[i].split('=')[0].toLowerCase())
        {
            var par = parArray[i].split('=');
            return par.length<2?"":par[1];
        }
    }
}

//全选
function selectAll()
{
    if ($("#seleAll").is(":checked")) {
        $("#listuser input[type='checkbox']").prop("checked", true);
    } else {
        $("#listuser input[type='checkbox']").prop("checked", false);
    }
}



