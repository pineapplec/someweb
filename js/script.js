function byId(id) {
	return	typeof(id) === "string"?document.getElementById(id):id;
}
//console.log(byId("main"));
//全局变量
var	index = 0,
	timer = null,
	pics  = byId("banner").getElementsByTagName("div"),
	dots  = byId("dots").getElementsByTagName("span"),
	prev  = byId("prev"),
	next  = byId("next"),
	len   = pics.length;
function slideImg() {
	var main = byId("main");
	main.onmouseover = function () {
		// 划过清除定时器
		if (timer) {
			clearInterval(timer);
		}
	}
	main.onmouseout = function () {
		// 离开启动定时器
		timer = setInterval(function () {
			index++;
			if (index >= len) {
				index = 0;
			}
			//切换图片
			changeImg();
		},3000);
		
	}
	//在main上自动触发onmouseout事件
	main.onmouseout();
	//点击圆点切换事件，遍历所有圆点
	for (var i = 0; i < len; i++) {
		//给所有的span加个id的属性值为i，作为span的索引
			dots[i].id = i;
			dots[i].onclick = function() {
				//改变index为span的id值
				index = this.id;
				//调用图片轮播
			changeImg();
				}
		}
		//上一张

		//下一张
		next.onclick = function() {
			index++;
			if (index >= len) {
				index = 0;
			}
			// console.log(index);
			changeImg();
					}
		prev.onclick = function() {
			index--;
			if (index < 0) {
				index = len-1;
			}
			changeImg();
		}

}
function changeImg() {
	//遍历banner下所有div和span标签
	for (var i = 0; i < len; i++) {
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = 'block';
	dots[index].className = "active";
}
slideImg();