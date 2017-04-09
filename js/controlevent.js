//保存
$.ibo.Save = function (Tablename) {
    var KeyValue = $("*[FieldName='ID']").val(ctrlval);

    var TbData = new Array();
    $("*[DataField='1']").each(function (i) {
        var FieldName = $(this).attr("FieldName");
        var FieldValue;
        if ($(this).length > 0 && $(this)[0].type == "checkbox") {
            FieldValue = ($(this)[0].checked == true ? 1 : 0);
        }
        else
            FieldValue = $(this).val();
        if ($(this).attr("IsNumber") == "1") {
            FieldValue = FieldValue.replace(/,/g, "");
        }
        TbData.push({ Key: FieldName, Value: FieldValue });

    });

    var data = $.toJSON({ TbName: Tablename, ID: KeyValue, TbData: TbData });
    $.ibo.crossOrgin({
        url: $.ibo.ApplicationSrvUrl,
        funcName: "Save",
        data: data,
        success: function (obj) {
            if (obj.ResFlag == $.ibo.ResFlag.Success) {

                alert("保存成功！");
            }
            else {
                alert(obj.ResObj);
                $.ibo.endWaiting();
            }
        }
    });
}

// 根据ID查询信息
$.ibo.GetInfo = function (Tablename, KeyValue) {
    var TbData = new Array();

    var data = $.toJSON({ TbName: Tablename, ID: KeyValue });
    $.ibo.crossOrgin({
        url: $.ibo.ApplicationSrvUrl,
        funcName: "GetByID",
        data: data,
        success: function (obj) {
            if (obj.ResFlag == $.ibo.ResFlag.Success) {
                //$.toJSON(obj.ResObj);
                for (var item in obj.ResObj) {
                    var ctrlval = obj.ResObj[item];
                    if ($("*[FieldName='" + item + "']").length > 0 && $("*[FieldName='" + item + "']")[0].type == "checkbox") {
                        $("*[FieldName='" + item + "']")[0].checked = (ctrlval == 1 ? true : false);
                    }
                    else
                        $("*[FieldName='" + item + "']").val(ctrlval);
                }


            }
            else {
                alert(obj.ResObj);
                $.ibo.endWaiting();
            }
        }
    });
}

//新增按钮 情况当前页属性
$.ibo.New = function (TbName) {

    if (!$.ibo.ShowYesOrNoDialog("是否要放弃保存当前页面改动？")) {
        ibo_Save(TbName);
        return;
    }

    $("*[DataField='1']").each(function (i) {
        if ($(this).length > 0 && $(this)[0].type == "checkbox") {
            $(this)[0].checked = false;
        }
        else if ($(this).attr("IsNumber") == "1")
            $(this).val("0");
        else
            $(this).val("");
    });
};

//删除
$.ibo.Delete = function (Tablename, KeyValue) {

    var data = $.toJSON({ TbName: Tablename, ID: KeyValue });
    $.ibo.crossOrgin({
        url: $.ibo.ApplicationSrvUrl,
        funcName: "Delete",
        data: data,
        success: function (obj) {
            if (obj.ResFlag == $.ibo.ResFlag.Success) {
                alert("删除成功！");
            }
            else {
                alert(obj.ResObj);
                $.ibo.endWaiting();
            }
        }
    });
};

$.ibo.curRecordNo = 1;//当前记录号
$.ibo.Pre = function (TbName, Condition, OrderBy) {
    $.ibo.RecordDirect(TbName, false, Condition, OrderBy);
}

$.ibo.Next = function (TbName, Condition, OrderBy) {
    $.ibo.RecordDirect(TbName, true, Condition, OrderBy);
}
//新增编辑页面导航（按一条记录翻页）
$.ibo.RecordDirect = function (TbName, RecordDirect, Condition, OrderBy) {
    if (!$.ibo.ShowYesOrNoDialog("是否要放弃保存当前页面？")) {

        ibo_Save(TbName);

    }
    if (RecordDirect == true) {
        $.ibo.curRecordNo++;
    }
    else {
        $.ibo.curRecordNo--;
    }

    var data = $.toJSON({ TbName: TbName, PageSize: 1, PageIndex: $.ibo.curRecordNo, Condition: Condition, OrderBy: OrderBy });
    // 查询信息
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "GetList",
        data: data,
        success: function (obj) {
            // 查询成功
            if ($.ibo.ResFlag.Success == obj.ResFlag) {
                if (obj.ResObj.List.length > 0) {
                    for (var item in obj.ResObj.List[0]) {
                        var ctrlval = obj.ResObj.List[0][item];
                        if ($("*[FieldName='" + item + "']").length > 0 && $("*[FieldName='" + item + "']")[0].type == "checkbox") {
                            $("*[FieldName='" + item + "']")[0].checked = (ctrlval == 1 ? true : false);
                        }
                        else
                            $("*[FieldName='" + item + "']").val(ctrlval);
                    }
                }
            }
        }
    });
}