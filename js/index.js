//    自动轮播图部分js
//需求1：图片自动轮播；且对应下方square值；当鼠标放入，停止轮播，离开，继续轮播
//需求2：点击下方square对应值，背景色改变，滑动到对应值图片
//需求3：点击span按钮，图片滑动，且下方square对应值改变
//技术点：无缝连接，给ul li中赋值第一张图片放入最后，当轮播到最后复制的那一张时，迅速将index值改为1，让其闪现到第一张，来继续下一张轮播。
//难点：让三个需求得到同步。

//需求1：图片自动轮播；且对应下方square值；当鼠标放入，停止轮播，离开，继续轮播
//步骤：获取ul span ol li
var all = document.getElementById("all");
var ul = all.children[0].children[0];
var ulLiArr = ul.children;
var ol = all.children[0].children[1];
var btnLeftRight = all.children[0].children[2].children;
//复制一个li标签放入到ul中
var newLi = ulLiArr[0].cloneNode(true);
ul.appendChild(newLi);
//创建一个li标签放入到ol中
//    for(var i=0;i<ulLiArr.length-1;i++){
//        var newOlLi = document.createElement("li");
//        newOlLi.innerHTML = i+1;
//        ol.appendChild(newOlLi);
//    }
//设置定时器，让square的li和ul同步变化
var key = 0;
var square = 0;
var timer = setInterval(autoPlay,1000);
function autoPlay(){
    key++;
    square++;
    //判断图片是否超出值
    if(key>ulLiArr.length-1){
        ul.style.left = 0;
        key = 1;
    }
    animate(ul,-key*ul.children[0].offsetWidth);
    //判断ol li是否超出值
    square = square>olLiArr.length-1?0:square;
    for(var j=0;j<olLiArr.length;j++){
        olLiArr[j].className = "";
    }
    olLiArr[square].className = "current";
}

//绑定事件all，当鼠标放上，清除定时器，离开，启动
all.onmouseover =  function(){
    clearInterval(timer);
    all.children[0].children[2].style.display = "block";

};
all.onmouseout = function(){
    timer = setInterval(autoPlay,1000);
    all.children[0].children[2].style.display = "none";
};
//需求2：点击下方square对应值，背景色改变，滑动到对应值图片
var olLiArr = ol.children;
olLiArr[0].className  = "current";
for(var i=0;i<olLiArr.length;i++){
    //下方的这个index必须绑在olLiArr[i]上，要不然下方的olLiArr[this.index].className = "current";会因为找不到index属性，一直报错。
    olLiArr[i].index = i;
    olLiArr[i].onmouseover = function(){
        for(var j=0;j<olLiArr.length;j++){
            olLiArr[j].className = "";
        }
        olLiArr[this.index].className = "current";
        animate(ul,-this.index*ul.children[0].offsetWidth);
        key = square = this.index;
    }
}
//需求3：点击span按钮，图片滑动，且下方square对应值改变
btnLeftRight[0].onclick = function(){
    key--;
    square--;
    //判断图片是否超出值
    if(key<0){
        ul.style.left = -ul.children[0].offsetWidth*5+"px";
        key = 4;
    }
    animate(ul,-ul.children[0].offsetWidth*key);
    //判断ol li是否超出值
    square = square>olLiArr.length-1?0:square;
    for(var j=0;j<olLiArr.length;j++){
        olLiArr[j].className = "";
    }
    olLiArr[square].className = "current";
};
btnLeftRight[1].onclick = function(){
    key++;
    square++;
    //判断图片是否超出值
    if(key>olLiArr.length){
        ul.style.left = 0;
        key = 1;
    }
    animate(ul,-ul.children[0].offsetWidth*key);
    //判断ol li是否超出值
    square = square>olLiArr.length-1?0:square;
    for(var j=0;j<olLiArr.length;j++){
        olLiArr[j].className = "";
    }
    olLiArr[square].className = "current";
};
function animate(ele,target){
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function(){
        var valSum = target-ele.offsetLeft;
        ele.style.left = ele.offsetLeft + speed + "px";
        if(Math.abs(valSum)<Math.abs(speed)){
            ele.style.left = target+"px";
            clearInterval(ele.timer);
        }
    },10)
}


//    左右焦点部分
//需求1：鼠标放在all上，显示span，离开隐藏。
//需求2：点击span，img对应的ul进行相应的移动。
//步骤：获取ul span
var box = document.getElementById("box");
var ul = box.children[0].children[0];
var boxLeftRight = box.children[1]
var btnArr = boxLeftRight.children;
var imgWidth = box.children[0].offsetWidth;
//绑定事件
//需求1：鼠标放在all上，显示span，离开隐藏。
box.onmouseover = function(){
    boxLeftRight.style.display = "block";
};
box.onmouseout = function(){
    boxLeftRight.style.display = "none";
};
//需求2：点击span，img对应的ul进行相应的移动。
//设置一个计数器index，当点击left，盒子右移，index--；当点击right，盒子左移，index++。
//技术点：因为点一下，移动一张图片，此时变为第二张，所以移动的宽度为一张图片的宽度，所以这个计数器的值和索引值相似。都是从0开始
//步骤：设置计数器
var index = 0;
//绑定left和right
btnArr[0].onclick = function(){
    //当left或right被点击一次，index--
    index--;
    //设置index极限值，当index<0 index>ul.children.length,赋值
    if(index<0){
        index = 0;
        alert("第一张")
    }
    animate(ul,-imgWidth*index);
};
btnArr[1].onclick = function(){
    //当left或right被点击一次，index++
    index++;
    if(index>ul.children.length-1){
        index = ul.children.length-1;
        alert("到头了")
    }
    animate(ul,-imgWidth*index);
};
function animate(ele,target){
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function(){
        var val = target-ele.offsetLeft;
        ele.style.left = ele.offsetLeft+speed+"px";
        if(Math.abs(val)<Math.abs(speed)){
            ele.style.left = target+"px";
            clearInterval(ele.timer);
        }
    },10)
}



//    滑动焦点部分
//需求：鼠标放在小方块上，改变背景色，对应的ul移动
//获取相关span ul
var inner = document.getElementById("inner");
var ul = inner.children[0];
var spanArr = inner.children[1].children;
var imgWidth = inner.offsetWidth;
//绑定事件
for(var i=0;i<spanArr.length;i++){
    spanArr[i].index = i;
    spanArr[i].onmouseover = function(){
        //排他思想
        for(var j=0;j<spanArr.length;j++){
            spanArr[j].className = "";
        }
        //赋class值，移动ul
        this.className = "current";
        animate(ul,-imgWidth*this.index);
    }
}
function animate(ele,target){
    //先定义，后清空定时器
    clearInterval(ele.timer);
    var speed = target>ele.offsetLeft?10:-10;
    ele.timer = setInterval(function(){
        var valSum = target-ele.offsetLeft;
        ele.style.left = ele.offsetLeft+speed+"px";
        if(Math.abs(valSum)<Math.abs(speed)){
            ele.style.left = target+"px";
            clearInterval(ele.timer);
        }
    },10)
}