	//构造函数
	function GameEngine(){
		if( !GameEngine.instance ){
			GameEngine.instance = {
				score : 0,
				level : 0, //记录游戏等级
				body : $id("main"), //游戏引擎的背景
				oUl : $id("options"),
				enemes : new Set(),//该属性用来存放创建的敌机对象
				initMenu : function(){
					//使用委托的方式为每一个li添加单击事件    记录等级   用来控制子弹创建时的速度  
					this.oUl.onclick = function(e){
						var e = e || event;
						var target = e.target || e.srcElement;
						if( target.nodeName == "LI" ){
							this.level = target.getAttribute("level");
							//console.log(this.level);
							//删除菜单 
							this.oUl.remove();
							
							//引出动画飞机  logo  背景移动
							this.gameStart();
						}
					}.bind(this)
				},
				gameStart : function(){
					this.logo = createEle("div");
					this.logo.className = "logo";
					this.loading = createEle("div");
					this.loading.className = "loading";
					this.body.appendChild( this.logo );
					this.body.appendChild( this.loading );
					
					//loading动画
					var timer = null;
					var index = 1;
					timer = setInterval(function(){
						this.loading.style.backgroundImage = "url(images/loading"+(++index)+".png)";
						if( index == 3 ){
							index = 0;
						}
					}.bind(this),600)
					
					//背景移动  实际上就是改变main背景位置  纵向
					var count = 0;
					setInterval(function(){
						this.body.style.backgroundPositionY = ++count + "px";
					}.bind(this),30)
					
					//3秒后  动画飞机和logo消失   战斗机出场
					setTimeout(function(){
						clearInterval(timer);
						this.logo.remove();
						this.loading.remove();
						
						//战斗机出场
						this.play();
					}.bind(this),3000)
				},
				play : function(){
					//战斗机出场
					new MyPlane().show();
					//敌机出场
					this.autoCreateEnemy();
				},
				width : function(){ // 获取引擎的宽度
					return this.body.offsetWidth;
				},
				height : function(){
					return this.body.offsetHeight;
				},
				left : function(){
					return this.body.offsetLeft;
				},
				autoCreateEnemy : function(){
					//自动创建不同类型的敌机					
					//小飞机
					setInterval(function(){
						if( Math.random() > 0.2 ){
							//创建敌机的同时  再将该敌机存入到集合enemes中
							//注意：将move方法设置一个返回值 return this
							//  将move方法的返回值存入到集合中
							//  move方法的返回值就是当前new出来的对象
							this.enemes.add( new Enemy("small").init().move() );
						}
					}.bind(this),800)
					
					//中飞机
					setInterval(function(){
						if( Math.random()>0.35 ){
							this.enemes.add( new Enemy("middle").init().move() );
						}
					}.bind(this),1000)
					
					//大飞机
					setInterval(function(){
						if( Math.random()>0.65 ){
							this.enemes.add( new Enemy("large").init().move() );
						}
					}.bind(this),2000)
				}
			}
		}
		return GameEngine.instance;
	}