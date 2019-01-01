//子弹
class Bullet {
	constructor() {
		this.init = function () {
			this.body = createEle("div");
			new GameEngine().body.appendChild(this.body);
			this.body.className = "bullet";
			var _left = new MyPlane().left() + new MyPlane().width() / 2 - this.width() / 2;
			var _top = new MyPlane().top() - this.height();
			this.left(_left);
			this.top(_top);
			return this;
		};
		this.left = function (val) {
			if (val || val == 0) {
				this.body.style.left = val + "px";
			}
			return this.body.offsetLeft;
		};
		this.top = function (val) {
			if (val || val == 0) {
				this.body.style.top = val + "px";
			}
			return this.body.offsetTop;
		};
		this.width = function () {
			return this.body.offsetWidth;
		};
		this.height = function () {
			return this.body.offsetHeight;
		};
		this.move = function () {
			//每一个子弹都有自己的定时器
			this.timer = setInterval(function () {
				this.top(this.top() - 5);
				if (this.top() < -this.height()) {
					clearInterval(this.timer);
					this.body.remove();
				}
				//在子弹移动时  检测每一个子弹和敌机的碰撞    遍历所有的敌机
				//找到所有的敌机对象
				var enemes = new GameEngine().enemes;
				for (var en of enemes) { //遍历集合
					if (pz(this.body, en.body)) {
						//子弹爆炸 销毁
						this.explode();
						//敌机血值减少  （敌机受伤了）
						en.hurt();
						//停止子弹碰撞后的定时器
						clearInterval(this.timer);
					}
				}
			}.bind(this), 30);
		};
		this.explode = function () {
			this.body.className = "bullet_die";
			setTimeout(function () {
				this.body.style.backgroundImage = "url(images/die2.png)";
				setTimeout(function () {
					this.body.remove();
				}.bind(this), 100);
			}.bind(this), 200);
		};
	}
}
