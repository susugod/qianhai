function ShowFormAuth(obj, auth, authID) {
    var childDiv = $(".CRMLeft .secContent");
    if (childDiv.length > 0) {
        childDiv.remove();
    }

    $.each(auth, function (i, n) {
        var str = "";
        var style = "";
        switch (n.RightID) {
            case 15:
                {
                    if (authID == 15) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../TongYong/List.html"' + style + '>通用</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 16:
                {
                    if (authID == 16) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../QingJia/List.html"' + style + '>请假</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 17:
                {
                    if (authID == 17) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../JiaBan/List.html"' + style + '>加班</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 18:
                {
                    if (authID == 18) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../TiaoXiu/List.html"' + style + '>调休</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 19:
                {
                    if (authID == 19) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../HeTong/List.html"' + style + '>合同</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 20:
                {
                    if (authID == 20) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../BaoXiao/List.html"' + style + ' >报销</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 21:
                {
                    if (authID == 21) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../FuKuan/List.html"' + style + '>付款</a></div>';
                    $(".CRMLeft").append(str);
                } break;

            case 22:
                {
                    if (authID == 22) {
                        style = ' style="color:#4990E1;" ';
                    }
                    str = '<div class="secContent"><a href="../CaiGou/List.html"' + style + '>采购</a></div>';
                    $(".CRMLeft").append(str);
                } break;
        }
    });
}