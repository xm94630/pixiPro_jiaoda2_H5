import '../css/base.css';
import '../css/game.less';

import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js'
import 'pixi-sound'  //有依赖关系的是这样子引入的就行

//import T from './tool/tweenFun.js';
import resize from './tool/resize.js'; //屏幕适配
import getAllMaterial from './tool/getAllMaterial.js'; 
import stage from './tool/stage.js'; 

//自定义字体加载
WebFont.load({custom: {families: ['monogram']}});


/********************************************************************
 * 全局变量                                                          *
 ********************************************************************/
var w = 750;                        //宽
var h = 1200;                       //高                       
var progress;                       //进度
var myTicker = function(){}         //空的ticker
var stage0 = new PIXI.Container();  //容器0（加载页）


/********************************************************************
 * 游戏实例创建                                                       *
 ********************************************************************/
var app = new PIXI.Application({width:w,height: h,backgroundColor:0xffffff});
app.view.style.position = "absolute";
app.view.style.display = "block";
app.ticker.add(function(delta) {myTicker(delta);});
document.body.appendChild(app.view);
resize(app);


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
  const mySound = res.bgmSound.sound;
  mySound && mySound.play();

  //获取场景实例（容器）
  const stage1 = stage.getStage1(app);
  const stage2 = stage.getStage2(app);
  //获取影片剪辑
  const{soundBtnMC} = getAllMaterial(app);
  
  //舞台显示 (容器挂载)
  app.stage.removeChild(app.stage.getChildByName('stage0')); //移除loading场景（后续不会再用）
  app.stage.addChild(stage1,stage2,soundBtnMC());
  app.stage.getChildByName('stage1').visible = true;
  app.stage.getChildByName('stage2').visible = false;

  //使用场景对应的ticker
  myTicker = stage2_ticker;
}


/********************************************************************
 * 事件绑定                                                          *
 ********************************************************************/
window.addEventListener('resize', function(){resize(app)});
console.log('=======>')