// 定义模块 
define(["bullet","enemy","gameengine","myplane"],function(bullet,enemy,gameengine,myplane){
	//模块 呈现在页面 
	/*document.onclick = function(){
		map();
	}
	document.onmousemove = function(){
		table();
	}
	topBar();*/
	window.onload = function(){
		//require(["index"]);
		new GameEngine().initMenu();
	}
})
