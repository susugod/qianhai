
 //得到文章页页码
 function GetArcpage() {

        $("#ArticlePage").html("");
        if (ThisNum == 0) {
            var PageAa = $("<span>").addClass("NOPreviousNext").text("上一篇"); $("#ArticlePage").append(PageAa);
        }
        else {

            var PageAa = $("<span>").addClass("PreviousNext1").text("上一篇").attr("onclick", "ThisNum=ThisNum-1;ThisID=list[ThisNum];GetArt(); moveTop();"); $("#ArticlePage").append(PageAa);
        }

        if (ThisNum == LastNum) {
            var PageAa = $("<span>").addClass("NOPreviousNext").text("下一篇"); $("#ArticlePage").append(PageAa);
        }
        else {

            var PageAa = $("<span>").addClass("PreviousNext1").text("下一篇").attr("onclick", "ThisNum=ThisNum+1;ThisID=list[ThisNum];GetArt(); moveTop();"); $("#ArticlePage").append(PageAa);
        }
        var PageAa = $("<span class=\"ArtBack\">").text("返回目录页"); $("#ArticlePage").append(PageAa);
    }
	
//滑到顶部事件
function moveTop()
{
	$('html,body').scrollTop(0);
}
	
	
//得到列表页页码
//全局变量
//页面的 名称=#Listpage
//       前部的页码=total
//       当前页面个数=PageSize
//		 当前页面=pgindex;
//		点击调用函数GetList//需要在GetList中加入GetListpage
function GetListpage(){
var AllPage=Math.ceil(total/PageSize);
	if(AllPage>0)
	{
		var PageDiv=$("#Listpage");
		$("#Listpage").html("");
		if(pgindex==1)
		{
			var PageAa=$("<span>").addClass("NOPreviousNext").text("上一页");
			PageDiv.append(PageAa);
		}else
		{	
			var PageAa=$("<span>").addClass("PreviousNext1").attr("onclick","pgindex="+(pgindex-1)+";GetList();").text("上一页");
			PageDiv.append(PageAa);
		}
										
		if(AllPage==pgindex&&AllPage>3)
		{
			var PageAa=$("<span>").text("...");
			PageDiv.append(PageAa);
		}
		
		for(var i=(pgindex-2);i<pgindex+3;i++)
		{									
			if(i>0&&i<=AllPage)
			{	if(i==pgindex)
				{
					var PageAa=$("<span>").text(i).addClass("PageNumSelected"); PageDiv.append(PageAa);
				}
				else
				{
					var PageAa=$("<span>").text(i).addClass("PageNum").attr("onclick","pgindex="+i+";GetList();");PageDiv.append(PageAa);
				}
			}							
		}							
		if(AllPage>(pgindex+2))
		{
			var PageAa=$("<span>").text("...");
			PageDiv.append(PageAa);
		}
										
		if(pgindex==AllPage)
		{
			var PageAa=$("<span>").addClass("NOPreviousNext").text("下一页");
			PageDiv.append(PageAa);
		}else
		{
			var PageAa=$("<span>").addClass("PreviousNext1").attr("onclick","pgindex="+(pgindex+1)+";GetList();").text("下一页");
			PageDiv.append(PageAa);
		}									
		var PageAa=$("<a>").addClass("PageAll").text("共"+AllPage+"页");PageDiv.append(PageAa);
		
		var JumpHtml='&nbsp;到&nbsp;<input  onkeyup="value=value.replace(/[^0-9]/g,"")" type="text" id="JumpPage"/>&nbsp;页&nbsp;&nbsp;<span class="BottonW" onclick="JumpPage('+AllPage+');">确定</sapn>';  PageDiv.append(JumpHtml);
		
	}			
}              
function JumpPage(AllPage)
{
	var toPage=Number($("#JumpPage").val());
	if(0<toPage&&toPage<=AllPage)
	{	
		pgindex=toPage;
		GetList();
	}
}

	//更换轮把图
	var imgUrl=[];
	var imgUrlNum=0;
	imgUrl[0]="images/banner1.png";
	imgUrl[1]="images/banner2.png";

	function CarouselFigure()
	{	
		imgUrlNum=(imgUrlNum+1)%imgUrl.length;
		$("#banner").attr("src",imgUrl[imgUrlNum]);
		setTimeout("CarouselFigure();",3000);
	}

	//更换轮把图办办学院
	var imgUrlbb=[];
	var imgUrlNumbb=0;
	imgUrlbb[0]="images/bannerbb1.png";
	imgUrlbb[1]="images/bannerbb2.png";

	function CarouselFigurebb()
	{	
		imgUrlNumbb=(imgUrlNumbb+1)%imgUrlbb.length;
		$("#banner").attr("src",imgUrlbb[imgUrlNumbb]);
		setTimeout("CarouselFigurebb();",3000);
	}

		