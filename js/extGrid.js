Ext.require([
   'Ext.grid.*',
   'Ext.data.*',
   'Ext.util.*',
   'Ext.state.*'
]);

/*对外参数*/
var gridrows = 20;//列表行数

var gridrowheight = "30"; //行高
var gridleft = "20"; //列表左间距
var gridtop = "30";//列表上间距

var gridfilter = "{0}>0";//特殊条件
var gridsizes = "24pt";//列表字体
var gridcolor = "#f00";//特殊条件颜色
var gridfields = new Array();//列属性设置，列对象数组FieldID, Rmk, BackColor, ForeColor, IsShow，ColWidth
var myData = new Array();//已装载的数据源

//{ FieldID: 字段ID, 目前没用  

//Rmk: 列标题, 
//BackColor: 列背景颜色, 
//ForeColor: 列字体颜色,
//IsShow:是否显示列;
/*对外参数*/
var colfields = new Array();
var grid = null;
function InitGrid(dvGrid) {
    Ext.onReady(function () {
        Ext.QuickTips.init();

        var colColumns = new Array();

        myData.length = gridrows;


        for (var i = 0; i < gridfields.length; i++) {

            colfields.push({ name: gridfields[i].FieldID });
            if (gridfields[i].IsShow) {
                var itemCol = {
                    text: gridfields[i].Rmk,
                    width: gridfields[i].ColWidth,
                    sortable: true,
                    //css: 'background: #FF0000;color:#E0E0E0',
                    renderer: function (v, m, record) {
                        if (!isNaN(v)) {
                            var temp = gridfilter.format(v);
                            var test = eval("(" + temp + ")");
                            if (test) {
                                //  return '<span style="background: ' + gridfields[m.columnIndex].BackColor + ';color:' + gridcolor + ';font-size:' + gridsizes + ';">' + v + '</span>';
                                m.style = 'line-height:' + gridrowheight + 'px;background: ' + gridfields[m.columnIndex].BackColor + ';color:' + gridcolor + ';font-size:' + gridsizes + ';';
                            }
                            else {
                                //   return '<span style="background: ' + gridfields[m.columnIndex].BackColor + ';color:' + gridfields[m.columnIndex].ForeColor + ';font-size:' + gridsizes + ';">' + v + '</span>';
                                m.style = 'line-height:' + gridrowheight + 'px;background: ' + gridfields[m.columnIndex].BackColor + ';color:' + gridfields[m.columnIndex].ForeColor + ';font-size:' + gridsizes + ';';
                            }
                            return v;
                        }
                        else
                            return v;
                    },
                    dataIndex: gridfields[i].FieldID
                };
                colColumns.push(itemCol);
            }
        }
        // create the data store
        var store = Ext.create('Ext.data.ArrayStore', {
            fields: colfields,
            data: myData
        });
        store.load();
        // create the Grid
        grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columnLines: true,
            columns: colColumns,
            height: 550,
            width: 800,
            title: '自定义网格',
            renderTo: dvGrid

        });
    });
}
function reloadGridData() {
    if (grid != null) {
        var store = Ext.create('Ext.data.ArrayStore', {
            fields: colfields,

            data: myData
        });

        grid.reconfigure(store);
    }
}

//格式化字符串参数，比如gridfilter.format(v)其中gridfilter="{0}>0"
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}