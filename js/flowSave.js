
////条件流程/非条件流程
//this.getToSubmitData = function (arrUser,authUser) {
//    var jsonOjb = {
//        Form_ID: this.$FlowBaseTable == "" ? "0" : this.$FlowBaseTable,  //所属表单ID
//        DeptID: this.$DeptID,       //当前操作人的部门ID
//        FlowModelID: flowID,     //当前所建的流程的ID，新建的可传入0，编辑则传入对应ID
//        FlowModelName: this.$FlowBaseName,      //流程名称
//        Description: this.$FlowBaseDesc,        //流程描述
//        Status: this.$FlowBaseStatus,           //流程状态，本处传入1即可（ 0:禁用 1:启用 2:已删除）
//        FlowType: this.$FlowType,               //流程类型，本处传入1即可（ 1：非条件流程 2：条件流程 3：自定义流程）
//        "Ext1": $("#sltExt1").val(),            // 流程类别，本处不用传入
//        "Ext2": $("#hnExt2").val(),             // 流程图标，本处不用传入
//    };

//    var NodeModelList = [];
//    var startNode = {
//        NodeModelID: 0,                                           // 节点id
//        FlowModelID: 0,                                 // 所属流程模型id
//        NodeModelName: "startNode",
//        NodeType: 1,                                              // 自定义流程 只有一个开始节点
//        Description: "开始",
//        //IsRemind: GetMutiCheckBoxValueByName(Node_IsRemind) == 1, // 是否催办
//        //RemindType: GetMutiCheckBoxValueByName(Node_Remind_Type),   // 催办方式
//        //TimeUnit: $(#Node_TimeUnit).val(),                          // 催办时限单位
//        //TimeLimit: $(#Node_TimeLimit).val(),                        // 催办时限
//        WF_RemindSetList: [],
//        WF_StartRightsList: [],
//        WF_NodeModel_FieldsList: []
//    };
//    for (var j = 0; j < arrUser.length; j++) {

//        startNode.WF_StartRightsList.push({ ObjectType: 1, RefID: arrUser[j].userID, OpType: 1 });
//    }
//    NodeModelList.push(startNode);
//    var NodeLinkList = [];
//    for (var i = 0; i < authUser.length;i++) {
//       // var obj = this.$nodeData[k1].properties;
//        //if (obj != undefined) {

//        //    //启动人员设置
//            var start_rights = [];


//        //    for (var j = 0; j < arrUser.length; j++) {

//                start_rights.push({ ObjectType: 1, RefID: arrUser[i].userID, OpType: 1 });
//        //    }
//        //    var TimeLimit = obj.NodeUrgeLimite == undefined ? "0" : obj.NodeUrgeLimite;
//        //    if (TimeLimit == "") TimeLimit = "0";
//            var node = {
//                NodeModelName: obj.NodeBaseName, //节点名称，可为空
//                NodeType: obj.NodeType,          //节点类型，开始1和结束0，中间节点为普通节点2（0:结束 1:开始 2:普通节点 3:会签）
//                Description: obj.NodeBaseDesc,   //节点描述，为空
//                //以下可不传入，默认值即可
//                PassType: obj.NodeBaseWay == undefined ? 0 : obj.NodeBaseWay,
//                IsCC: obj.NodeIsCC == undefined ? true : obj.NodeIsCC,
//                IsBack: obj.NodeIsBack == undefined ? true : obj.NodeIsBack,
//                IsForward: obj.NodeIsForward == undefined ? true : obj.NodeIsForward,
//                IsRecover: obj.NodeIsRecover == undefined ? true : obj.NodeIsRecover,
//                IsJump: obj.NodeIsJump == undefined ? true : obj.NodeIsJump,
//                IsInherit: obj.NodeHintInherit == undefined ? true : obj.NodeHintInherit,
//                IsInherit2: obj.NodeUrgeInherit == undefined ? true : obj.NodeUrgeInherit,
//                IsRemind: obj.NodeUrgeDo == undefined ? false : obj.NodeUrgeDo,//是否催办
//                TimeUnit: obj.NodeUrgeTimeUnit == undefined ? 4 : obj.NodeUrgeTimeUnit,// 时间单位
//                TimeLimit: obj.NodeUrgeLimite == undefined ? "0" : TimeLimit,//办理时限
//                LocationY: 0,
//                LocationX: 0,
//                Width: 0,
//                Height: 0,
//                WF_RemindSetList: [],//提醒设置

//                WF_StartRightsList: start_rights,//启动人员设置
//                WF_NodeModel_FieldsList: [],//显示字段设置

//            };
//            NodeModelList.push(node);


//            var linkNode = {
//                LinkName: obj.LineName,  //链接线名称，可为空
//                Description: obj.LineDesc, //描述，可为空
//                NodeModel1Name: NodeModelList[i].NodeModelName,//接入点，上一个节点
//                NodeModel2Name: NodeModelList[i+1].NodeModelName,//接出点，下一个节点
//                LineType: 3,     //直线折现线段
//                WF_NodeModel_Link_ConList: []
//            }
//            NodeLinkList.push(linkNode);

//     //   }
//    }
   
//    //添加开始结点

//    jsonOjb.WF_NodeModelList = NodeModelList;
//    jsonOjb.WF_NodeModel_LinkList = NodeLinkList;
//    return jsonOjb;
//};


//// 自定义流程
//function GetSubmitData(arrUser, viewID) {
//    var obj = {
//        "Form_ID": viewID,
//        "DeptID": 1,                                                        // 默认增加在顶级部门下
//        "FlowModelID": 0,                                         // 流程模型id
//        "FlowModelName": encodeURIComponent($("#Description").val()),       // 流程模型名称
//        "Description": encodeURIComponent($("#Description").val()),         // 流程模型描述
//        "Status": GetMutiCheckBoxValueByName("FlowStatus") == "1" ? "1" : "0",    // 流程状态
//        "FlowType": 3,                                                      // 流程类别为3 自定义流程
//        "Ext1": $("#sltExt1").val(),                                        // 流程类别
//        "Ext2": $("#hnExt2").val(),                                         // 流程图标
//        "WF_NodeModelList": [                                               // 流程节点信息  自定义流程只有一个节点
//            {
//                "NodeModelID": 0,                                           // 节点id
//                "FlowModelID": 0,                                 // 所属流程模型id
//                "NodeModelName": "startNode",
//                "NodeType": 1,                                              // 自定义流程 只有一个开始节点
//                "Description": "开始",
//                "IsRemind": GetMutiCheckBoxValueByName("Node_IsRemind") == "1", // 是否催办
//                "RemindType": GetMutiCheckBoxValueByName("Node_Remind_Type"),   // 催办方式
//                "TimeUnit": $("#Node_TimeUnit").val(),                          // 催办时限单位
//                "TimeLimit": $("#Node_TimeLimit").val(),                        // 催办时限
//                "WF_RemindSetList": [],
//                "WF_StartRightsList": [],
//                "WF_NodeModel_FieldsList": []
//            }
//        ]
//    };


//    for (var j = 0; j < arrUser.length; j++) {

//        obj.WF_NodeModelList[0].WF_StartRightsList.push({ ObjectType: 1, RefID: arrUser[j].userID, OpType: 1 });
//    }
//    return obj;
//};




//this.finalSave = function (arrUser,authUser,viewID, type) {
//    //按钮变灰
//    var flow = null;
//    if (type == 3) {
//        flow = this.GetSubmitData(arrUser, viewID); //自定义流程
//    }
//    else if (type == 1) {
//        flow = this.getToSubmitData(arrUser); //非条件流程
//    }
//    var data = $.toJSON({ flow: flow });
//    $.ibo.crossOrgin({
//        url: $.ibo.FormFlowSrvUrl,
//        funcName: "WFFlowModelSave",
//        data: data,
//        success: function (obj) {

//            if (obj.ResFlag == $.ibo.ResFlag.Success) {
//                alert("流程保存成功");

//            }
//            else {
//                alert(obj.ResObj);
//                $.ibo.endWaiting();
//            }
//        }
//    });
//};


//非条件流程
function GetConFlowData(flowId,authUser, flowName, checkUser, viewID) {
    var obj = {
        "Form_ID": viewID,
        "DeptID": 1,                                                        // 默认增加在顶级部门下
        "FlowModelID": flowId,                                         // 流程模型id
        "FlowModelName": flowName,       // 流程模型名称
        "Description": flowName,         // 流程模型描述
        "Status": "1",    // 流程状态
        "FlowType": 1,                                                      // 流程类别为3 自定义流程
        "WF_NodeModel_LinkList": [],
        "WF_NodeModelList": [                                               // 流程节点信息  自定义流程只有一个节点
            {
                "NodeModelID": 0,                                           // 节点id
                "FlowModelID": 0,                                 // 所属流程模型id
                "NodeModelName": "startNode",
                "NodeType": 1,                                              // 自定义流程 只有一个开始节点
                "Description": "开始",
                "WF_RemindSetList": [],
                "WF_StartRightsList": [],
                "WF_NodeModel_FieldsList": [],
                "TmpNodeModelID": "node_0"
            }
        ]
    };

    //if (fieldlist != null) {
    //    for (var h = 0; h < fieldlist.length; h++) {
    //        var fld = fieldlist[h];
    //        obj.WF_NodeModelList[0].WF_NodeModel_FieldsList.push({ Field_ID: fld.Field_ID, TbName: fld.TbName, FieldName: fld.FieldName, Rmk: fld.Rmk, IsShow: fld.IsShow, IsEdit: fld.IsEdit });
    //    }
    //}

    if (authUser.length > 0) {
        for (var j = 0; j < authUser.length; j++) {
            obj.WF_NodeModelList[0].WF_StartRightsList.push({ ObjectType: 1, RefID: authUser[j], OpType: 1 });
        }
    }
    else {
        //ObjectType: 2, RefID: authUser[j] 部门ID
        obj.WF_NodeModelList[0].WF_StartRightsList.push({ ObjectType: 2, RefID: 1, OpType: 1 });
    }

    for (var k = 0; k < checkUser.length; k++) {

        var nodeCheck = {
            NodeModelID: k,                                           // 节点id
            FlowModelID: k,                                 // 所属流程模型id
            NodeModelName: "node" + k,
            NodeType: 2,                                              // 自定义流程 只有一个开始节点
            Description: "审批节点",
            WF_RemindSetList: [],
            WF_StartRightsList: [{ ObjectType: 1, RefID: checkUser[k], OpType: 1 }],
            WF_NodeModel_FieldsList: [],
            TmpNodeModelID:"node_"+(k+1)
        };
        obj.WF_NodeModelList.push(nodeCheck);

        var linkNode = {
            LinkName: "link" + k,  //链接线名称，可为空
            Description: "link" + k, //描述，可为空
            NodeModelID1: k,//接入点，上一个节点
            NodeModelID2: k+1,//接出点，下一个节点
            LineType: 3,     //直线折现线段
            WF_NodeModel_Link_ConList: [],
            NodeModel1Name:"node_"+k,
            NodeModel2Name:"node_"+(k+1)
        }
        obj.WF_NodeModel_LinkList.push(linkNode);
    }
    return obj;
}

// 自定义流程
function GetCustFlowData(flowId,arrUser, flowName, viewID) {
    var obj = {
        "Form_ID": viewID,
        "DeptID": 1,                                                        // 默认增加在顶级部门下
        "FlowModelID": flowId,                                         // 流程模型id
        "FlowModelName": flowName,       // 流程模型名称
        "Description": flowName,         // 流程模型描述
        "Status": "1",    // 流程状态
        "FlowType": 3,                                                      // 流程类别为3 自定义流程
        "WF_NodeModelList": [                                               // 流程节点信息  自定义流程只有一个节点
            {
                "NodeModelID": 0,                                           // 节点id
                "FlowModelID": 0,                                 // 所属流程模型id
                "NodeModelName": "startNode",
                "NodeType": 1,                                              // 自定义流程 只有一个开始节点
                "Description": "开始",
                "WF_RemindSetList": [],
                "WF_StartRightsList": [],
                "WF_NodeModel_FieldsList": [],
                "TmpNodeModelID": "node_0"
            }
        ]
    };

    for (var j = 0; j < arrUser.length; j++) {

        obj.WF_NodeModelList[0].WF_StartRightsList.push({ ObjectType: 1, RefID: arrUser[j], OpType: 1 });
    }
    return obj;
};


//authUser 参与人员,checkUser 审批人员
function FlowSave(viewID, flowType, flowName, authUser,checkUser) {

    var flow = null;

    switch (flowType) {
        case 3://自定义流程测试
            flow = this.GetCustFlowData(authUser,flowName, viewID);
            break;
        case 1://条件流程测试
            {
                flow = this.GetConFlowData(authUser, flowName, checkUser, viewID);
            }
            break;
    }
    var data = $.toJSON({ flow: flow });
    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "WFFlowModelSave",
        data: data,
        success: function (obj) {

            if (obj.ResFlag == $.ibo.ResFlag.Success) {
                alert("保存成功");

            }
            else {
                alert(obj.ResObj);
                $.ibo.endWaiting();
            }
        }
    });
}

function SaveRuleAndFlow(flowId,rule, flowType, authUser, checkUser, clicktype)
{
    var flow = null;

    switch (flowType) {
        case 3://自定义流程测试
            flow = this.GetCustFlowData(flowId,authUser, rule.RuleName, rule.FormID);
            break;
        case 1://条件流程测试
            flow = this.GetConFlowData(flowId,authUser, rule.RuleName, checkUser, rule.FormID);
            break;
    }
    var data = $.toJSON({ rule: rule, user: authUser, type: clicktype, flow: flow });

    $.ibo.crossOrgin({
        url: $.ibo.FormFlowSrvUrl,
        funcName: "AddFormAppRule",
        data: data,
        success: function (obj) {
            if ($.ibo.ResFlag.Success == obj.ResFlag) {
                //alert("操作成功....");
				
                window.location.href="AppSetting.html?save=1&id="+GetRequest().formId+"&name="+GetRequest().name+"&type="+GetRequest().type;
            }
            else {
                alert(obj.ResObj);
            }
        }
    });
}
