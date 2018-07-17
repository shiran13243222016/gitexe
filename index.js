// 定义模块 
define(["banner","table","topBar"],function(banner,table,topBar){
	//模块 呈现在页面 
	document.onclick = function(){
		banner();
	}
	document.onmousemove = function(){
		table();
	}
	topBar();
})
