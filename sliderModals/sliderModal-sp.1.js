/**
 * sliderModal-sp
 * 没有动态效果的轮播
 */
(function(modals){
  if(!modals.SliderModal) throw new Error("未定义 轮播组件 SliderModal");

  var activeIndex_sp1 = 0;
  SliderModal = modals.SliderModal;
  SliderModal.prototype.build_sp1 = function(){
    // 创建内容区
    this.cnt_sp1 = document.createElement("ul");
    this.cnt_sp1.className = "content";
    this.cntArr_sp1 = [];
    this.cntArr_sp1[0] = document.createElement("li");
    this.cntArr_sp1[1] = document.createElement("li");
    this.container.appendChild(this.cnt_sp1);
    this.cnt_sp1.appendChild(this.cntArr_sp1[0]);
    this.cnt_sp1.appendChild(this.cntArr_sp1[1]);

    // 实现淡入淡出
    for (var i=0; i<2; i++){
      this.cntArr_sp1[i].style.transition = "opacity ease 1s";
    }

    for (var i=0, len=this.cntArr_sp1.length; i< len; i++)
    {
      var li =  this.cntArr_sp1[i];
      li.innerHTML = '<a href="#"><img src="http://111.231.220.231/commonres/default.png" alt="图片" title="" ></a>';
    }
    // 创建指示器区
    this.buildCursor_sp1();
    // 初始
    this.imgIndex_sp1 = 0;
    this.setIndex_sp1(0);
    if (this.isAutoPlay)
      this.autoplay_sp1();
  }
  // 创建指示器区
  SliderModal.prototype.buildCursor_sp1 = function(){
    var perWidth = Math.floor(100 / this.dataArrLen);
    this.cursorArr_sp1 = [];
    this.cursor_sp1 = document.createElement("ul");
    this.cursor_sp1.className = "cursor";
    this.container.appendChild(this.cursor_sp1);
    
    for (var i=0; i<this.dataArrLen; i++){
      var li = document.createElement("li");
      var ai = document.createElement("i");
      li.setAttribute("data-index", i);
      li.style.width = perWidth +"%";
      li.appendChild(ai);
      this.cursor_sp1.appendChild(li);
      this.cursorArr_sp1.push(li);
    }
    // 指示器事件代理
    this.cursor_sp1.addEventListener('click', function(event){
      if (event.target.nodeName == 'LI'){
          if (this.isAutoPlay)
            this.stop_sp1();
            
          var dataset = event.target.dataset;
          this.setIndex_sp1(parseInt(dataset.index));
          
          if (this.isAutoPlay)
            this.autoplay_sp1();
      }
    }.bind(this));
  }
  // 创建指示器区
  SliderModal.prototype.setCursorIndex_sp1 = function(index){
    var len = this.cursorArr_sp1.length;
    var cursor;
    for (var i=0; i<len; i++){
      cursor = this.cursorArr_sp1[i];
      cursor.className = (i==index) ? "active" : "";
    }
  }
  // 获取后方容器
  SliderModal.prototype.getBack_sp1 = function(){
    // 当activeIndex_sp1 == 0，表示正在显示的是 this.cntArr_sp1[0]
    if (!activeIndex_sp1) return this.cntArr_sp1[1];
    return this.cntArr_sp1[0];
  }
  // 获取当前显示容器
  SliderModal.prototype.getFace_sp1 = function(){
    // 当activeIndex_sp1 == 0，表示正在显示的是 this.cntArr_sp1[0]
    if (!activeIndex_sp1) return this.cntArr_sp1[0];
    return this.cntArr_sp1[1];
  }
  // 轮播下一个
  SliderModal.prototype.pointNext_sp1 = function(){
    // 若当前 为 最后一张，跳转第一张
    this.imgIndex_sp1 = (this.imgIndex_sp1 == this.dataArr[0].last) ? 0 : (this.imgIndex_sp1 +1);

    this.setIndex_sp1(this.imgIndex_sp1);
  }
  // 指定轮播序号
  SliderModal.prototype.setIndex_sp1 = function(index){
    this.imgIndex_sp1 = index;
    // 获得要显示的内容
    var data = this.dataArr[index];
    // 获得后方容器
    var cnt = this.getBack_sp1();
    // 设置要显示的内容
    cnt.getElementsByTagName("a")[0].setAttribute("href", (!!data.imgdata[1]) ? data.imgdata[1] : "#");
    cnt.getElementsByTagName("img")[0].setAttribute("src", (!!data.imgdata[0]) ? data.imgdata[0] : "");

    // 显示变化
    this.change_sp1();
    // 指示器变化
    this.setCursorIndex_sp1(index);
  };
  // 进行变化
  SliderModal.prototype.change_sp1 = function(){
    var cnt0 = this.getFace_sp1();
    var cnt1 = this.getBack_sp1();

    cnt1.style.opacity = 1;
    cnt1.setAttribute("z-inde" , 2);
    cnt0.style.opacity = 0;
    cnt0.setAttribute("z-inde" , 1);
    activeIndex_sp1 = !activeIndex_sp1;
  }

  // 自动轮播
  SliderModal.prototype.autoplay_sp1 = function(){
    this.timer_sp1 = setInterval(function(slider){
        this.pointNext_sp1();
    }.bind(this), this.interval);
  };
  // 停止轮播
  SliderModal.prototype.stop_sp1 = function(){
    clearInterval(this.timer_sp1);
  };

  modals.SliderModal = SliderModal;
})(window.modals);