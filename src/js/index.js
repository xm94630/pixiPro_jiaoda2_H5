import '../css/base.css';
import '../css/game.less';

import WebFont from 'webfontloader';
import * as PIXI from 'pixi.js'
import 'pixi-sound'  //有依赖关系的是这样子引入的就行

//import T from './tool/tweenFun.js';
import resize from './tool/resize.js'; //屏幕适配
import getAllMaterial from './tool/getAllMaterial.js'; 
import getAllStage from './tool/getAllStage.js'; 
import getLoadingStage from './tool/getLoadingStage.js'; 

//自定义字体加载
WebFont.load({custom: {families: ['monogram']}});


/********************************************************************
 * 全局变量                                                          *
 ********************************************************************/
var w = 750;                        //宽
var h = 1200;                       //高                       
var progress;                       //进度
var myTicker = function(){}         //空的ticker


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
 * ticker                                                          *
 ********************************************************************/
function stage0_ticker(delta){
  app.stage.getChildByName('stage0').getChildByName('progressText').text = progress;
}
function stage1_ticker(delta){}
function stage2_ticker(delta){}


/********************************************************************
 * 游戏入口                                                          *
 ********************************************************************/
//这部分逻辑后期可以优化成promise，代码更加优美
//我已经尝试使用promise，似乎并不能在代码上进行优化，所以还是用这里的

PIXI.loader
  //优先加载一部分图片，用来做资源加载页
  .add("characterAnimation", "./img/characterAnimation.json") 
  .add("background", "./img/bg.jpg")
  .add("loadingBox", "./img/loader.json")
  .load(function(xxx,res){

    //加载场景
    const {stage0} = getLoadingStage(app,progress);
    app.stage.addChild( stage0() );
    myTicker = stage0_ticker

    //剩余资源加载
    PIXI.loader
      .add("bgmSound","./sounds/bgm.mp3")
      .add("btn", "./img/btn.json")
      .add("buttons", "./img/buttons.json")
      .add("bg2", "./img/bg2.jpg")
      .add("portraitBox", "./img/portrait.json")   //坑：注意，这里加载的是json，不是图片！
      .add("arrow", "./img/arrow.json")   
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

  //获取场景实例、影片剪辑
  const {stage1,stage2} = getAllStage(app);
  const {soundBtnMC}    = getAllMaterial(app);
  
  //舞台显示 (容器挂载)
  app.stage.removeChild(app.stage.getChildByName('stage0')); //移除loading场景（后续不会再用）
  app.stage.addChild(stage1(),stage2(),soundBtnMC());
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