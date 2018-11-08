import '../css/base.css';
import '../css/game.less';

import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js'
import 'pixi-sound'  //有依赖关系的是这样子引入的就行

//import T from './tool/tweenFun.js';
import resize from './tool/resize.js'; //屏幕适配
import getAllMaterial from './tool/getAllMaterial.js'; 

//自定义字体加载
WebFont.load({custom: {families: ['monogram']}});



/********************************************************************
 * 全局变量                                                          *
 ********************************************************************/
var w = 750;                        //宽
var h = 1200;                       //高
var mySound;                        //声音
var progress;                       //进度
var myTicker = function(){}         //空的ticker
var stage0 = new PIXI.Container();  //容器0（加载页）
var stage1 = new PIXI.Container();  //容器1（游戏首页）
var stage2 = new PIXI.Container();  //容器2（游戏内容页）
stage1.name = "stage1"              //容器1名字
stage2.name = "stage2"              //容器2名字



/********************************************************************
 * 游戏实例创建                                                       *
 ********************************************************************/
var app = new PIXI.Application({width:w,height: h,backgroundColor:0xffffff});
app.view.style.position = "absolute";
app.view.style.display = "block";
app.ticker.add(function(delta) {myTicker(delta);});
document.body.appendChild(app.view);
resize(app,w,h);



/********************************************************************
 * 场景布局                                                          *
 ********************************************************************/
 
//加载声音前的loading场景
function stage0_layout(res){
  var characterAnimation = res['characterAnimation'].data;
  //进度条(图形)
  var sourceArr = characterAnimation['loadingBox.json']['loadingBox'];
  var frames = [];
  for (var i = 0; i < sourceArr.length; i++) {
      frames.push(PIXI.Texture.fromFrame( sourceArr[i] ));
  }
  var mc = new PIXI.extras.AnimatedSprite(frames);
  mc.name="loadingBox";
  mc.x = w / 2;
  mc.y = h / 2;
  mc.anchor.set(0.5);
  mc.animationSpeed = 0.25
  mc.play();
  //进度条（文字）
  var progressTextMC = new PIXI.Text(progress,{
    fontSize: 60,
    fill: 0x000,
    align: 'left'
  });
  progressTextMC.anchor.set(.5)
  progressTextMC.x = w/2;
  progressTextMC.y = 700;
  progressTextMC.name="progressText"
  //背景图
  var img = new PIXI.Sprite(res.background.texture)
  img.height = h;

  stage0.name = "stage0"
  stage0.removeChildren(0, stage0.children.length);
  stage0.addChild(
    img,mc,progressTextMC
  );
  //使用场景对应的ticker
  myTicker = stage0_ticker;
}

//场景布局1
function stage1_layout(res){
  const{bgImg,soundBtnMC,viewBtnMC,page01Img} = getAllMaterial(app,w,h,res);
  stage1.removeChildren(0, stage1.children.length);
  stage1.addChild(
    bgImg(),
    viewBtnMC(),
  );
}

//场景布局2
function stage2_layout(res){   
  const{
    bookMC,
    homeBtnMC,
  } = getAllMaterial(app,w,h,res);
  stage2.removeChildren(0, stage2.children.length);
  stage2.addChild(
    bookMC(),
    homeBtnMC(),
  );
}


/********************************************************************
 * ticker                                                          *
 ********************************************************************/
function stage0_ticker(delta){
  stage0.getChildByName('progressText').text = progress;
}
function stage1_ticker(delta){}
function stage2_ticker(delta){}



/********************************************************************
 * 游戏入口                                                          *
 ********************************************************************/
//这部分逻辑后期可以优化成promise，代码更加优美
//我已经尝试使用promise，似乎并不能在代码上进行优化，所以还是用这里的

PIXI.loader
  .add("characterAnimation", "./img/characterAnimation.json") 
  .add("background", "./img/bg.jpg")
  .add("loadingBox", "./img/loader.json")
  .load(function(xxx,res){
    //优先加载一部分图片，用来做资源加载页
    stage0_layout(res);
    app.stage.addChild(stage0);

    //剩余资源加载
    PIXI.loader
      .add("bgmSound","./sounds/bgm.mp3")
      .add("btn", "./img/btn.json")
      .add("buttons", "./img/buttons.json")
      .add("bg2", "./img/bg2.jpg")
      .load(setup)
      .onProgress.add((myLoader,res) => {
        progress = 'Loading...'+ Math.round(myLoader.progress) +'%';
      });
  });




/********************************************************************
 * 游戏主体逻辑部分                                                    *
 ********************************************************************/
function setup(xxx,res) {
  
  //声音
  mySound = res.bgmSound.sound;
  mySound && mySound.play();

  //场景布局（创建容器）
  stage1_layout(res);
  stage2_layout(res);
  
  //舞台显示 (容器挂载)
  const{soundBtnMC} = getAllMaterial(app,w,h,res);
  app.stage.removeChild(app.stage.getChildByName('stage0')); //移除（后续不会再用）
  app.stage.addChild(stage1,stage2,soundBtnMC());
  app.stage.getChildByName('stage1').visible = true;
  app.stage.getChildByName('stage2').visible = false;

  //使用场景对应的ticker
  myTicker = stage2_ticker;
}


/********************************************************************
 * 事件绑定                                                          *
 ********************************************************************/
window.addEventListener('resize', function(){resize(app,w,h)});
console.log('=======>')