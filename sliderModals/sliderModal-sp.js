/**
 * sliderModal-sp
 * 没有动态效果的轮播
 */
(function(modals){
  if(!modals.SliderModal) throw new Error("未定义 轮播组件 SliderModal");

  var activeIndex_sp = 0;
  SliderModal = modals.SliderModal;
  SliderModal.prototype.build_sp = function(){
    // 创建内容区
    this.cnt_sp = document.createElement("ul");
    this.cnt_sp.className = "content";
    this.cntArr_sp = [];
    this.cntArr_sp[0] = document.createElement("li");
    this.cntArr_sp[1] = document.createElement("li");
    this.container.appendChild(this.cnt_sp);
    this.cnt_sp.appendChild(this.cntArr_sp[0]);
    this.cnt_sp.appendChild(this.cntArr_sp[1]);
    for (var i=0, len=this.cntArr_sp.length; i< len; i++)
    {
      var li =  this.cntArr_sp[i];
      li.innerHTML = '<a href="#"><img src="http://111.231.220.231/commonres/default.png" alt="图片" title="" ></a>';
    }
    // 创建指示器区
    this.buildCursor_sp();
    // 初始
    this.imgIndex_sp = 0;
    this.setIndex_sp(0);
    if (this.isAutoPlay)
      this.autoplay_sp();
  }
  // 创建指示器区
  SliderModal.prototype.buildCursor_sp = function(){
    var perWidth = Math.floor(100 / this.dataArrLen);
    this.cursorArr_sp = [];
    this.cursor_sp = document.createElement("ul");
    this.cursor_sp.className = "cursor";
    this.container.appendChild(this.cursor_sp);
    
    for (var i=0; i<this.dataArrLen; i++){
      var li = document.createElement("li");
      var ai = document.createElement("i");
      li.setAttribute("data-index", i);
      li.style.width = perWidth +"%";
      li.appendChild(ai);
      this.cursor_sp.appendChild(li);
      this.cursorArr_sp.push(li);
    }
    // 指示器事件代理
    this.cursor_sp.addEventListener('click', function(event){
      if (event.target.nodeName == 'LI'){
        
          if (this.isAutoPlay)
            this.stop_sp();
            
          var dataset = event.target.dataset;
          this.setIndex_sp(parseInt(dataset.index));
          
          if (this.isAutoPlay)
            this.autoplay_sp();
      }
    }.bind(this));
  }
  // 创建指示器区
  SliderModal.prototype.setCursorIndex_sp = function(index){
    var len = this.cursorArr_sp.length;
    var cursor;
    for (var i=0; i<len; i++){
      cursor = this.cursorArr_sp[i];
      cursor.className = (i==index) ? "active" : "";
    }
  }
  // 获取后方容器
  SliderModal.prototype.getBack_sp = function(){
    // 当activeIndex_sp == 0，表示正在显示的是 this.cntArr_sp[0]
    if (!activeIndex_sp) return this.cntArr_sp[1];
    return this.cntArr_sp[0];
  }
  // 获取当前显示容器
  SliderModal.prototype.getFace_sp = function(){
    // 当activeIndex_sp == 0，表示正在显示的是 this.cntArr_sp[0]
    if (!activeIndex_sp) return this.cntArr_sp[0];
    return this.cntArr_sp[1];
  }
  // 轮播下一个
  SliderModal.prototype.pointNext_sp = function(){
    // 若当前 为 最后一张，跳转第一张
    this.imgIndex_sp = (this.imgIndex_sp == this.dataArr[0].last) ? 0 : (this.imgIndex_sp +1);

    this.setIndex_sp(this.imgIndex_sp);
  }
  // 指定轮播序号
  SliderModal.prototype.setIndex_sp = function(index){
    this.imgIndex_sp = index;
    // 获得要显示的内容
    var data = this.dataArr[index];
    // 获得后方容器
    var cnt = this.getBack_sp();
    // 设置要显示的内容
    cnt.getElementsByTagName("a")[0].setAttribute("href", (!!data.imgdata[1]) ? data.imgdata[1] : "#");
    cnt.getElementsByTagName("img")[0].setAttribute("src", (!!data.imgdata[0]) ? data.imgdata[0] : "");

    // 显示变化
    this.change_sp();
    // 指示器变化
    this.setCursorIndex_sp(index);
  };
  // 进行变化
  SliderModal.prototype.change_sp = function(){
    var cnt0 = this.getFace_sp();
    var cnt1 = this.getBack_sp();

    cnt1.style.opacity = 1;
    cnt1.setAttribute("z-inde" , 2);
    cnt0.style.opacity = 0;
    cnt0.setAttribute("z-inde" , 1);
    activeIndex_sp = !activeIndex_sp;
  }

  // 自动轮播
  SliderModal.prototype.autoplay_sp = function(){
    this.timer_sp = setInterval(function(slider){
        this.pointNext_sp();
    }.bind(this), this.interval);
  };
  // 停止轮播
  SliderModal.prototype.stop_sp = function(){
    clearInterval(this.timer_sp);
  };

  modals.SliderModal = SliderModal;
})(window.modals);