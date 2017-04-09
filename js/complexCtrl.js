////-------多选项，单选项代码------------
function addRadios(obj) {
    var rowIndex = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("itemList");
    var row = table.insertRow(rowIndex + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var radiolength = $(".list-group-item .radio").length;
    if (radiolength > 0) {
        cell1.innerHTML = "<input name=\"CHKED\" value=\"1\" class=\"radio\" type=\"radio\" title=\"默认选中此择项\">";
    }
    else
        cell1.innerHTML = "<input name=\"CHKED\" value=\"1\" class=\"checkbox\" type=\"checkbox\" title=\"默认选中此择项\">";
    cell2.innerHTML = "<input name=\"VAL\" type=\"text\" class=\"l\" style=\"width:100%\" onchange=\"changeOptions()\">";
    cell3.innerHTML = "<a class=\"icononly-add\" title=\"添加一个新的选择项\" onclick=\"addRadios(this)\"></a><a class=\"icononly-del\" title=\"删除此选择项\" onclick=\"delRadios(this)\"></a>";
    changeOptions();
}
function changeOptions() {
    var rdoOptions = "";
    $("#" + formEditor.sltControls[0].HtmlID).empty();

    if (formEditor.sltControls[0] != undefined) {
        $(".list-group-item .l").each(function (i, n) {
            rdoOptions = rdoOptions + n.value + ",";


        });

        if (rdoOptions.length > 0)
            rdoOptions = rdoOptions.substr(0, rdoOptions.length - 1);
        formEditor.sltControls[0].attrList["Options"] = rdoOptions;
        if (formEditor.sltControls[0].ControlType.toString() === $.ibo.formEditor.ctlType.radio) {
            $.ibo.SetRadioData({ "id": formEditor.sltControls[0].HtmlID, "Options": rdoOptions });
        }
        else {
            $.ibo.SetCheckBoxData({ "id": formEditor.sltControls[0].HtmlID, "Options": rdoOptions });
        }
    }
    else {
        alert("请先选择控件！");
    }
}
function delRadios(obj) {
    var rowIndex = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("itemList");
    table.deleteRow(rowIndex);
    changeOptions();
}
//单选框
$.ibo.SetRadioData = function (para) {

    var id = para.id;
    var reqd = para.reqd;

    var fieldvisible = para.fieldvisible;
    var fieldwidth = para.fieldwidth;

    var fieldcss = para.fieldcss;
    var arrOptions = para.Options.split(",");

    $("#" + id).empty();
    for (var i = 0; i < arrOptions.length; i++) {
        var divRow = $("<div>");
        divRow.css({ "overflow": "hide", "width": "100%", "height": $.ibo.LineHeight + "px", "line-height": $.ibo.LineHeight + "px" });
        if (i > 0) divRow.css({ "margin-top": $.ibo.LineDistance + "px" });
        var inputChk = $("<input>", { "name": "radio" + id, "type": "radio", "value": arrOptions[i] });
        var txtSpan = $("<span>");
        txtSpan.text(arrOptions[i]);
        divRow.append(inputChk);
        divRow.append(txtSpan);
        $("#" + id).append(divRow);
    }
};
//复选框
$.ibo.SetCheckBoxData = function (para) {

    var id = para.id;
    var reqd = para.reqd;

    var fieldvisible = para.fieldvisible;
    var fieldwidth = para.fieldwidth;

    var fieldcss = para.fieldcss;
    var arrOptions = para.Options.split(",");

    $("#" + id).empty();
    for (var i = 0; i < arrOptions.length; i++) {
        var divRow = $("<div>");
        divRow.css({ "overflow": "hide", "width": "100%", "height": $.ibo.LineHeight + "px", "line-height": $.ibo.LineHeight + "px" });
        if (i > 0) divRow.css({ "margin-top": $.ibo.LineDistance + "px" });
        var inputChk = $("<input>", { "name": "chk" + id, "type": "checkbox", "value": arrOptions[i] });
        var txtSpan = $("<span>");
        txtSpan.text(arrOptions[i]);
        divRow.append(inputChk);
        divRow.append(txtSpan);
        $("#" + id).append(divRow);
    }
};
////-------多选项，单选项代码------------

////-------地址------------
function InitCity(city, district, R) {
    city.empty().append("<option value=''>市</option>");
    district.empty().append("<option value=''>区/县</option>");
    if (R) {
        var S = "";
        $.each(address.provinces[R], function (U, T) {
            S += "<option value=" + U + ">" + U + "</option>";
        }
        );
        city.append(S);
    }
}
function InitDistrict(district, T, R) {
    district.empty().append("<option value=''>区/县</option>");
    if (T) {
        var S = "";
        $.each(address.provinces[R][T], function (V, U) {
            S += "<option value=" + U + ">" + U + "</option>";
        }
        );
        district.append(S);
    }
}
function initAddressEvent(obj, def_province, def_city, def_district) {

    //地址
    var t = "";      //t = "<option value=''>省/自治区/直辖市</option>";
    $.each(address.provinces, function (S, R) {
        t += "<option value=" + S + ">" + S + "</option>";
    }
    );
    var province = obj.find(".xxlprovince");
    province.each(function (i, n) {
        $(this)[0].removeAttribute("disabled");


        var city = obj.find(".xxlcity")[i];
        city.removeAttribute("disabled");


        var zip = obj.find(".xxlzip")[i];
        zip.removeAttribute("disabled");

        $(this).append(t);
        //for (var k = 0; k < formEditor.controls.length; k++) {
        //    if (n.parentNode.id == formEditor.controls[k].HtmlID) {
        $(n).val(def_province);
        InitCity($(city), $(zip), def_province);
        $(city).val(def_city);
        InitDistrict($(zip), def_city, def_province);
        $(zip).val(def_district);
        //    }
        //}

        $(this).change(function () {
            var R = $(this).val();
            InitCity($(city), $(zip), R);
        }
        );
        $(city).change(function () {
            var T = $(this).val()
              , R = $(this).val();
            InitDistrict($(zip), T, R);

        }
        );
    });
}
function initAddressData(obj, para) {
    var id = obj.id;
    var fieldid =para==undefined? null : para.fieldid;
    var province = $("<select>", { "class": "xxlprovince" });
    province.css({ "width": "70px", "height": $.ibo.LineHeight + "px", "margin-bottom": $.ibo.LineDistance + "px" });
    province.attr("disabled", "disabled");
    obj.append(province);

    var city = $("<select>", { "class": "xxlcity" });
    city.css({ "width": "70px", "height": $.ibo.LineHeight + "px", "margin-bottom": $.ibo.LineDistance + "px" });
    city.attr("disabled", "disabled");
    obj.append(city);

    var district = $("<select>", { "class": "xxlzip" });
    district.attr("disabled", "disabled");
    district.css({ "width": "70px", "height": $.ibo.LineHeight + "px", "margin-bottom": $.ibo.LineDistance + "px" });
    obj.append(district);

    var txtdetail = $("<textarea validator='validator' " + (para == undefined ? "" : para.validation) + " name='" + (para == undefined ? "" : para.name) + "'>");
    txtdetail.addClass("input xxl detail");
  
    txtdetail.css({ "width": "210px", "margin": "0" });
    obj.append(txtdetail);
    if (fieldid != null) {
        province.attr("DataField", "1");
        province.attr("FieldName", fieldid + "_province");
        province.attr("FieldType", "11");

        city.attr("DataField", "1");
        city.attr("FieldName", fieldid + "_city");
        city.attr("FieldType", "11");

        district.attr("DataField", "1");
        district.attr("FieldName", fieldid + "_area");
        district.attr("FieldType", "11");

        txtdetail.attr("DataField", "1");
        txtdetail.attr("FieldName", fieldid);
        txtdetail.attr("FieldType", "11");
    }
    setTimeout(function () {        //等这个控件加载完之后，再让第一个下拉框“省/自治区/直辖市”那里直接选“北京市”
       // $(".xxlprovince")[0].options[0].selected = true;
      //  $(".xxlprovince").change();
    }, 200);
    return txtdetail;
};
//地址
$.ibo.SetAddressData = function (para) {
    var id = para.id;
    initAddressData($("#" + id), para); //para.fieldid
    initAddressEvent($("#" + id), para.province, para.city, para.district);

};
////-------地址------------

//商品
$.ibo.SetProductData = function (para) {
    var id = para.id;
    var bView = false;
    var ProductType = para.ProductType;
    var productlist=[] ;
    // 查询企业信息
    $.ibo.crossOrgin({
        url: $.ibo.ApplicationSrvUrl,
        funcName: "Product_GetProductList",
        data: $.toJSON({ t: Math.random() }),
        success: function (obj) {
            // 查询成功
            if ($.ibo.ResFlag.Success == obj.ResFlag) {

                if (obj.ResObj.length > 0) {
                    $.each(obj.ResObj, function (i, n) {
                        n.ProName;
                        n.ImgUrl;
                        n.Price;
                        n.Count;
                        n.ProType;
                        productlist.push({ productname: n.ProName, price: n.Price, unt: n.Unit, def_number: n.Count, CNY: n.Currency, DES: n.Rmk, imgsrc: n.ImgUrl });
                    });

                    //var FBUY = para.FBUY.toString();

                    var bImgflag = false;
                    var selCntrl = $("#" + id).find(".m-itemlist .grid");
                    selCntrl.empty();
                    var ctrlHeight = 0;
                    //var lineheight = $.ibo.LineHeight + $.ibo.LineDistance;
                    switch (ProductType) {
                        case "2"://无图商品
                            ctrlHeight = productlist.length * 115 + 80;
                            break;
                        case "1"://有图商品
                            ctrlHeight = productlist.length * 215 + 80;
                            break;
                    }
                    $("#" + id).css({ height: (ctrlHeight + "px"),top:"0px",position:"relative" });
                   // if (ProductType == "1") { }
                    for (var t = 0; t < productlist.length; t++) {
                        var goodsitem = $("<div>", { "class": "item" });
                        if (ProductType == "1") {
                            var divimg = $("<div>", { "class": "image_content" })
                            var img = $("<img src=\"../../../img/products/" + productlist[t].imgsrc + "\"  width=\"50\" height=\"100\" class=\"img-ks-lazyload\">");
                            divimg.append(img);
                            goodsitem.append(divimg);
                            goodsitem.css({ height: "200px" });
                        }
                        else {
                            goodsitem.css({height : "100px"});
                        }
                        var pfont_min = $("<p>", { "class": "font_min" });
                        pfont_min.text(productlist[t].productname);
                        goodsitem.append(pfont_min);
                        var pexplain = $("<p>", { "class": "font_min explain" });
                        pexplain.text(productlist[t].DES);
                        goodsitem.append(pexplain);
                        var pfont_max = $("<p>", { "class": "font_max" });
                        pfont_max.text(productlist[t].price);
                        goodsitem.append(pfont_max);
 
                        selCntrl.append(goodsitem);

                    };
                    
                    //var parenttop = 0;//parseInt($("#" + id)[0].style.top.replace("px", "")
                    //var ctrltop = parseInt($("#" + id)[0].style.height.replace("px", "")) + parenttop ;
                    //var minTop = 0;
                    //$("*[maincontrol='1']").each(function (i, n) {
                    //    if (n.id != id) {

                    //        if (parseInt($("#" + n.id)[0].style.top.replace("px", "")) > parenttop) {
                    //            if (minTop == 0) {
                    //                minTop = parseInt($("#" + n.id)[0].style.top.replace("px", ""));
                    //            }
                    //            if (minTop > parseInt($("#" + n.id)[0].style.top.replace("px", ""))) {
                    //                minTop = parseInt($("#" + n.id)[0].style.top.replace("px", ""));
                    //            }
                    //        }
                    //    }
                    //});
                    //if (minTop > 0) {
                    //    minTop = ctrltop - minTop;
                    //    $("*[maincontrol='1']").each(function (i, n) {
                    //        if (n.id != id) {
                    //            if (parseInt($("#" + n.id)[0].style.top.replace("px", "")) > parenttop) {
                    //                minTop = parseInt($("#" + n.id)[0].style.top.replace("px", "")) + minTop;
                    //                $("#" + n.id).css({ top: (minTop + "px") });

                    //            }
                    //        }
                    //    });
                    //    //var totalheight = $("#ibo-view").height() + minTop;
                    //    //$("#ibo-view").css({ height: (totalheight + "px") });
                    //}
                }
                else {
                    var div = $("<div>");
                    div.css({ "height": "70px", "text-align": "center", "line-height": "70px", "font-size": "20px", "color": "gray" });
                    div.text("没有适合的商品！");
                    $("#ibo-main").append(div);
                }
                resizeCtrlTop();
            }
            else alert(obj.ResObj);
        }
    });

};

////-------有图商品------------

function resizeCtrlTop() {

    var arr = [];
    var childs = $("[parent_id]");
    childs.each(function (index, n) {

        n = $(n);
        // 获取top值
        var top = parseInt(n.css("top").replace("px", ""));
        var hasInsert = false;
        $.each(arr, function (j, m) {
            // 根据top正序排列插入arr
            if (top < m.top) {
                arr.insert(j, { "top": top, "obj": n });
                hasInsert = true;
            }
        });
        // 为找到合适插入位置则插入arr末尾
        if (!hasInsert) {
            arr[arr.length] = { "top": top, "obj": n };
        }
        var parentId = $(n).attr("parent_id");
        if (parentId != "") {
            $("#" + parentId).css({ "height": "0px" });

        }
        
    });

    // top正序遍历控件 转换为非绝对定位
    $.each(arr, function (i, n) {
        n.obj.css({ "top": "0px", "position": "relative", "margin-top": $.ibo.LineDistance + "px" });
        var parentId = $(n.obj).attr("parent_id");
        if (parentId != "") {
            var parentContent = $("#" + parentId);
            $(parentContent).append(n.obj);
            $("#" + parentId).css({ "height": ($("#" + parentId).height() + $(n.obj).height()) + "px" });
        }
        // 重新append一次  至于#ibo-view末尾
        //    $("form").append(n.obj);
    });
    childs.each(function (index, n) {
        var parentId = $(n).attr("parent_id");
        if (parentId == "") {
            $("#ibo-view").css({ "height": ($("#" + parentId).height() + $("#ibo-view").height()) + "px" });
        }
    });


}
////-------地理位置------------

    // 实例化点标记
function addMarker(lnglatXY) {

        marker = new AMap.Marker({

            icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",

            position: lnglatXY

        });
        map.clearMap();
        marker.setMap(map);
        markers.push(marker);
    }

//回调函数
function geocoder_CallBack(data) {
    //返回地址描述
    var address = data.regeocode.formattedAddress;
    
    $("*[fieldtype='14']")[0].value = address;

   
}
//地理位置
var map;
var markers = [];
$.ibo.SetLocationData = function (para) {
    var id = para.id;
    $("*[fieldtype='14']").css({ "width": "100%" });
    //$("#" + id).css({ width: "210px" });
    //$("#" + id).css({ heihgt: "90px" });
    //地理位置
    var marker;
    map = new AMap.Map("container", {

        resizeEnable: true,

        //   center: [116.397428, 39.90923],

        zoom: 13
    });
    var ctrlid = id + "_input";
    ////输入提示
    var autoOptions = {
        input: ctrlid
    };


    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
        map: map
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
    }

    //为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function (e) {
        var lnglatXY = new AMap.LngLat(e.lnglat.getLng(), e.lnglat.getLat());
       
        map.remove(markers);

        addMarker(lnglatXY);

        if ($("*[fieldtype='14']").length == 4) {
            $("*[fieldtype='14']")[1].value = map.getZoom();
            $("*[fieldtype='14']")[2].value = e.lnglat.getLng();
            $("*[fieldtype='14']")[3].value = e.lnglat.getLat();

        }
        var MGeocoder;
        //加载地理编码插件
        map.plugin(["AMap.Geocoder"], function () {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //返回地理编码结果
            AMap.event.addListener(MGeocoder, "complete", geocoder_CallBack);
            //逆地理编码http://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png
            MGeocoder.getAddress(lnglatXY);



        });

        if ($("*[fieldtype='14']").length == 4) {
            $("*[fieldtype='14']")[1].value = map.getZoom();
            $("*[fieldtype='14']")[2].value = e.lnglat.getLng();
            $("*[fieldtype='14']")[3].value = e.lnglat.getLat();

        }
    });

};

////-------地理位置------------
//数字
$.ibo.SetNumberData = function (para) {
    var id = para.id;
    var minus = para.minus;
    var Decimallen = para.Decimallen;
    var MaxValue = para.MaxValue;
    var MinValue = para.MinValue;
    var prompt = para.prompt;
    $("#" + id).attr("onfocus", "funDigitFocus(this," + prompt + ")");
    $("#" + id).attr("onblur", "funDigitBlur(this," + prompt + ")");
    //  $("#" + id).attr("onchange", "checkMobile(this)");
    $("#" + id).attr("onkeyup", "clearNoNum(event,this,0," + minus + "," + Decimallen + "," + MaxValue + "," + MinValue + ")");
    $("#" + id).attr("onafterpaste", "clearNoNum(event,this,0," + minus + "," + Decimallen + "," + MaxValue + "," + MinValue + ")");
};
function funDigitFocus(obj, prompt) {
    if (obj.value == prompt) {
        obj.value = "";
    }
}
function funDigitBlur(obj, prompt) {
    if (obj.value == "") {
        obj.value = prompt;
    }
}
//浮点数
$.ibo.SetDecimalData = function (para) {
    var id = para.id;
    var minus = para.minus;
    var Decimallen = para.Decimallen;
    var MaxValue = para.MaxValue;
    var MinValue = para.MinValue;
    var dotnumber = para.dotnumber;
    var prompt = para.prompt;
    $("#" + id).attr("onfocus", "funDigitFocus(this," + prompt + ")");
    $("#" + id).attr("onblur", "funDigitBlur(this," + prompt + ")");
    //  $("#" + id).attr("onchange", "checkMobile(this)");
    $("#" + id).attr("onkeyup", "clearNoNum(event,this," + dotnumber + "," + minus + "," + Decimallen + "," + MaxValue + "," + MinValue + ")");
    $("#" + id).attr("onafterpaste", "clearNoNum(event,this," + dotnumber + "," + minus + "," + Decimallen + "," + MaxValue + "," + MinValue + ")");
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

function DigitInput(obj, event) {
    //响应鼠标事件，允许左右方向键移动 
    event = window.event || event;
    if (event.keyCode == 37 | event.keyCode == 39) {
        return;
    }
    obj.value = obj.value.replace(/\D/g, "");
}

//姓名
$.ibo.SetEmployeeNameData = function (para) {
    var id = para.id;
    $("#" + id)[0].style.border = "0px";
    $("#" + id + "_input").attr("readonly", "readonly");
  //  $("#" + id).attr("onclick", "$.ibo.OperateUserDialog(this);");

};

var ctrlEmp = "";
//分享按钮操作
$.ibo.OperateUserDialog = function (emp) {
    ctrlEmp = emp;
    $.ibo.openWin({
        url: "../../Common/SltUsers.html?multiple=false",
        callBackFun: function (obj) {
            $("#" + ctrlEmp.parentNode.id + " input")[0].value = obj[obj.length - 1].EmpName;
            $("#" + ctrlEmp.parentNode.id + " input")[1].value = obj[obj.length - 1].EmpID;
            $($("#" + ctrlEmp.parentNode.id + " input")[0]).focus();
            $($("#" + ctrlEmp.parentNode.id + " input")[0]).blur();
        }
    });
}


// 获取查询条件
$.ibo.Condition = [];

// 分页查询数据 PageIndex:分页数据索引  webPager:分页控件 callbackFun:查询回调函数
$.ibo.GetPanelList = function (TbName, callbackFun) {
    if (TbName && TbName.length > 0) {
        var data = $.toJSON({
            TbName: TbName, // 数据表名
            PageSize: 0, // 分页大小
            PageIndex: 0, // 查询数据分页索引
            Condition: $.ibo.Condition, // 查询条件
            OrderBy: "" // 查询排序字段
        });

        // 查询信息
        $.ibo.crossOrgin({
            url: $.ibo.ApplicationSrvUrl,
            funcName: "GetList",
            data: data,
            success: function (obj) {
                // 查询成功
                if ($.ibo.ResFlag.Success == obj.ResFlag) {
                    $.ibo.ModelID = 0;
                    $.ibo.Model = null;

                    //webPager.setPageDataInfo(obj.ResObj);
                    $.ibo.ModelList = obj.ResObj.List;
                    callbackFun(obj.ResObj);
                }
                else alert(obj.ResObj);
            }
        });
    }
};

//面板数据源
$.ibo.SetPanelData = function (para) {
    if (para.isdetail == "false") {
        var TbName = $("#" + para.HtmlID).attr("listdatasource");
        $.ibo.GetPanelList(TbName, function (obj) {

            if (obj.List.length > 0) {

                $.each(obj.List, function (i, n) {

                    $("#ibo-view *[listdatasource]").each(function (j, m) {             //遍历页面控件 凡是带有listdatasource属性的即表示是从表控件
                        if ($(m).attr("listdatasource") === TbName) {                 //先找到对应表名的从表控件
                            $("#ibo-view *[DataField=1]").each(function (k, o) {        //再找出该从表下对应的绑定了数据项的控件
                                var mid = "";
                                if (i == 0) {
                                    mid = m.id;
                                }
                                else {
                                    mid = m.id + i;
                                }
                                if ($(o).attr("parentid") === mid) {
                                    var obj1 = n;
                                    for (var item in obj1) {
                                        var ctrlval = obj1[item];
                                        $("#ibo-view *[FieldName='" + obj1[item].name + "']").each(function (l, p) {
                                            if ($(p).attr("parentid") === mid) {
                                                if (ctrlval.value != null) {
                                                    FormatOutputs(this, ctrlval);
                                                }
                                            }
                                        });
                                    }
                                }


                            });
                        }
                    });
                });
            }
            resizeCtrlTop();
        });

    }
    else {
        resizeCtrlTop();
    }
}
//将输出到页面的数据按照类型不同而格式化
function FormatOutputs(thisObj, ctrlval) {
    switch (ctrlval.FieldType) {
        case "4"://时间
            if (ctrlval.value.indexOf(":") > 0) {
                $("#" + thisObj.id + " select")[0].value = ctrlval.value.split(":")[0];
                $("#" + thisObj.id + " select")[1].value = ctrlval.value.split(":")[1];
            }
            break;
        case "3":
            $(thisObj).val(ctrlval.value.replace(" 00:00:00", ""));
            break;
        case "8"://文件
            if (ctrlval.value.trim() === "")
                return;
            var links = ctrlval.value.split(",");       //拆分成多个文件路径
            if (links.length > 0) {
                var Str = "";                           //最终要添加到上传控件里的HTML代码
                for (var i = 0; i < links.length; i++) {    //进行HTML代码拼接
                    n = links[i];
                    var htmlStr = "";
                    htmlStr += "<div class=\"dz-preview dz-processing dz-image-preview dz-success dz-complete\" style=\"transform-origin: left top 0px; transform: scale(0.5, 0.5); position: absolute; \">";
                    htmlStr += "<div class=\"dz-image\">";
                    htmlStr += "<img data-dz-thumbnail=\"\" src=\"" + n + "\" style=\"height: 97px; width: 100px;\"></div>";
                    htmlStr += "<a class=\"dz-remove\" href=\"javascript:undefined;\" onclick=\"$.ibo.SetDeleteFun(this)\" data-dz-remove=\"\">删除</a><a class=\"dz-link\" target=\"_blank\" href=\"" + n + "\">下载</a></div>";
                    Str += htmlStr;
                }
                if (Str.length > 0) {
                    $(thisObj).find(".dz-default").remove();
                    $(thisObj).append(Str);
                }
            }
            reArrangement(thisObj);
            break;
        case "9"://姓名
        case "10"://部门
            $(thisObj).val(ctrlval.value);
            break;
        case "11"://地址
            $(thisObj).val(ctrlval.value);
            var ctrl_province = $("#" + thisObj.parentNode.id).find(".xxlprovince")[0];
            var ctrl_city = $("#" + thisObj.parentNode.id).find(".xxlcity")[0];
            var ctrl_zip = $("#" + thisObj.parentNode.id).find(".xxlzip")[0];
            if ($(thisObj).attr("fieldname") == "field9_province") {//省
                InitCity($(ctrl_city), $(ctrl_zip), ctrlval.value);
                $(thisObj).change(function () {
                    var R = $(this).val();
                    InitCity($(ctrl_city), $(ctrl_zip), R);
                });
            }
            else if ($(thisObj).attr("fieldname") == "field9_city") {//市
                InitDistrict($(ctrl_zip), ctrlval.value, ctrl_province.value);
                $(ctrl_city).change(function () {
                    var T = $(this).val()
                      , R = $(this).val();
                    InitDistrict($(ctrl_zip), T, R);

                }
                );
            }
            break;
        case "12"://手机

            break;
        case "13"://电子邮件
            $("#" + thisObj.id + " input")[0].value = ctrlval.value;
            break;
        case "14"://地理位置
            $(thisObj).val(ctrlval.value);
            break;
        default:
            $(thisObj).val(ctrlval.value);
            break;
    }
};


$.ibo.SetDepartData = function (para) {
    var id = para.id;
    $("#" + id)[0].style.border = "0px";
    $("#" + id + "_input").attr("readonly", "readonly");
  //  $("#" + id).attr("onclick", "$.ibo.OperateDepartDialog(this);");

};
var ctrlDepart = "";
//分享按钮操作
$.ibo.OperateDepartDialog = function (depart) {
    ctrlDepart = depart;
    $.ibo.openWin({

        url: "../../Common/SltDepts.html?multiple=false",
        callBackFun: function (obj) {
            $("#" + ctrlDepart.parentNode.id + " input")[0].value = obj[obj.length - 1].DeptName;
            $("#" + ctrlDepart.parentNode.id + " input")[1].value = obj[obj.length - 1].DeptID;
            $($("#" + ctrlDepart.parentNode.id + " input")[0]).focus();
            $($("#" + ctrlDepart.parentNode.id + " input")[0]).blur();
        }
    });
}

//手机
$.ibo.SetTelephoneData = function (para) {
    var id = para.id;
    $("#" + id + "_input").attr("onBlur", "checkMobile(event,this)");
   // $("#" + id).attr("onafterpaste", "checkMobile(event,this)");
};
function checkMobile(event, obj) {
    event = window.event || event;
    if (event.keyCode == 37 | event.keyCode == 39) {
        return;
    }
    var str = obj.value;
    var re = /^1\d{10}$/
    if (!re.test(str)) {
        alert("请输入正确的手机号码！");
        obj.value = "";
    } 
}

//电子邮箱
$.ibo.SetEmailData = function (para) {
    var id = para.id;
    $("#" + id)[0].style.border = "0px";
    $("#" + id + "_input").attr("onBlur", "checkEmail(event,this)");
  //  $("#" + id).attr("onafterpaste", "checkMobile(event,this)");

};
function checkEmail(event, obj) {
    event = window.event || event;
    if (event.keyCode == 37 | event.keyCode == 39) {
        return;
    }
    var str = obj.value;
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (!re.test(str) && str!="") {
        alert("请输入正确的电子邮箱！");
        obj.value = "";
    }

}
//时间
$.ibo.SetDateData = function (para) {
    var id = para.id;
   
    $("#" + id)[0].style.border= "0px";
}
//时间
$.ibo.SetDateTimeData = function (para) {
    var id = para.id;

    $("#" + id).find(".hh.input").each(function () {
        hhsel = $(this)[0];
        hhsel.removeAttribute("disabled");
        hhsel.options.length = 0;
        hhsel.options.add(new Option("时", ""));
        for (var i = 0; i < 24; i++) {
            if (i < 10) {
                hhsel.options.add(new Option("0" + i.toString(), "0" + i.toString()));
            }
            else {
                hhsel.options.add(new Option(i.toString(), i.toString()));
            }
        };
    });


    $("#" + id).find(".mm.input").each(function () {
        var minusel = $(this)[0];
        minusel.removeAttribute("disabled");
        minusel.options.length = 0;
        minusel.options.add(new Option("分", ""));
        for (var i = 0; i < 60; i++) {
            if (i < 10) {
                minusel.options.add(new Option("0" + i.toString(), "0" + i.toString()));
            }
            else {
                minusel.options.add(new Option(i.toString(), i.toString()));
            }
        };
    });
};


