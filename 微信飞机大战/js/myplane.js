	//战斗机
	function MyPlane(){ 
		if( !MyPlane.instance ){
			MyPlane.instance = {
				show : function(){
					this.init();//创建
					this.addListener({type:"mouse"}); // 控制飞机移动  鼠标？键盘
					this.fire();//开火
				},
				fire : function(){
					//飞机开火功能   实际上就是创建子弹
					setInterval(function(){
						new Bullet().init().move();
					},100*new GameEngine().level)
				},
				addListener : function(obj){
					switch( obj.type ){
						case "mouse" : {
							new GameEngine().body.addEventListener("mousemove",function(e){
								var e = e || event;
								//改变飞机的left值
								var _left = e.pageX - new GameEngine().left() - this.width()/2;
								//边界处理
								// Math.max(0,_left) 左边界
								// Math.min( maxL ,  Math.max(0,_left) )  右边界
								//_left = Math.max(0,_left);
								_left = Math.min( new GameEngine().width() - this.width() , Math.max(0,_left) );
								this.left( _left );
							}.bind(this))
							break;
						}
						
						case "key" : {
							document.addEventListener("keydown",function(e){
								var e = e || event;
								var code = e.keyCode || e.which;
								switch(code){
									case 37 : {
										// Math.max(0,this.left()-7)
										var _left = this.left()-7;
										_left = Math.max(0,_left);
										this.left( _left );
										break;
									}
									
									case 39 : {
										this.left( Math.min(new GameEngine().width() - this.width(),this.left()+7) );
										break;
									}
								}
							}.bind(this))
							break;
						}
					}
				},
				init : function(){
					this.body = createEle("div");
					//将创建的战斗机添加到游戏引擎中
					new GameEngine().body.appendChild( this.body );
					this.body.className = "my-warplain";
					var _left = ( new GameEngine().width() - this.width() )/2
					this.left( _left );
					this.body.style.bottom = "0px";
				},
				left : function(val){ //设置飞机的左侧初始位置
					if( val || val== 0 ){ // 如果val有值  就设置  否则就获取offsetLeft
						this.body.style.left = val + "px";
					}
					return this.body.offsetLeft;
				},
				width: function(){ //获取飞机的宽度
					return this.body.offsetWidth;
				},
				height : function(){ //获取飞机的高度
					return this.body.offsetHeight;
				},
				top : function(){
					return this.body.offsetTop;
				}
			}
		}
		return MyPlane.instance;
	}