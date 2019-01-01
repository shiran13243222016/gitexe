//敌机
function  Enemy(type){//敌机的类型 type
	this.type = type;
	this.body = createEle("div");
	this.init = function(){ //敌机创建 根据不同的type值创建不同的飞机
		switch(this.type){
			case "small" : {
				this.body.className = "enemy-small";
				this.speed = 8;
				this.hp = 1;
				this.score = 1;
				this.imgs = ["plain1_die1.png","plain1_die2.png","plain1_die3.png"];//存放小敌机销毁图片
				new GameEngine().body.appendChild( this.body );
				this.left( rand( 0, new GameEngine().width() - this.width() ) );
				this.top(-this.height());
				break;
			}
			case "middle" : {
				this.score = 2;
				this.body.className = "enemy-middle";
				new GameEngine().body.appendChild( this.body );
				this.imgs = ["plain2_die1.png","plain2_die2.png","plain2_die3.png","plain2_die4.png"];//存放中敌机销毁图片
				this.speed = 5;
				this.hp = 3;
				this.left( rand( 0, new GameEngine().width() - this.width() ) );
				this.top(-this.height());
				break;
			}
			case "large" : {
				this.score = 3;
				this.body.className = "enemy-large";
				new GameEngine().body.appendChild( this.body );
				this.speed = 3;
				this.imgs = ["plain3_die1.png","plain3_die2.png","plain3_die3.png","plain3_die4.png","plain3_die5.png","plain3_die6.png"];//存放大敌机销毁图片
				this.hp = 5;
				this.left( rand( 0, new GameEngine().width() - this.width() ) );
				this.top(-this.height());
				break;
			}
		}
		return this;
	}
	this.explode = function(){
		//爆炸后 敌机停止移动
		clearInterval(this.timer);
		//爆炸后敌机还能中枪否？？  不能中枪  该敌机不能再和子弹完成碰撞检测
		//将集合中的敌机删掉
		new GameEngine().enemes.delete( this );
		
		var t = setInterval(function(){
			//当数组的长度变为0时 说明爆炸结束   敌机销毁
			if( this.imgs.length == 0 ){
				this.body.remove();
				
				return;
			}
			this.body.style.backgroundImage = "url(images/"+this.imgs.shift()+")";
		}.bind(this),300)
	}
	
	this.move = function(){
		this.timer = setInterval(function(){
			this.top( this.top() + this.speed );
			if( this.top() > new GameEngine().height() ){
				clearInterval( this.timer );
				this.body.remove();
			}
		}.bind(this),30)
		return this;
	}
	this.left = function(val){
		if( val || val== 0 ){ // 如果val有值  就设置  否则就获取offsetLeft
			this.body.style.left = val + "px";
		}
		return this.body.offsetLeft;
	}
	this.top = function(val){
		if( val || val== 0 ){ // 如果val有值  就设置  否则就获取offsetLeft
			this.body.style.top = val + "px";
		}
		return this.body.offsetTop;
	}
	this.width = function(){
		return this.body.offsetWidth;
	}
	this.height = function(){
		return this.body.offsetHeight;
	}
	this.hurt = function(){
		//敌机受伤方法  当敌机的血值减到 0时   敌机爆炸  
		--this.hp == 0 ? this.explode() : "";
	}
	
}