/********************************************************************
 * 场景（容器）                                                       *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 

export default function getLoadingStage(app,progress){

  var w = app.view.width;
  var h = app.view.height;
  var res = PIXI.loader.resources;

  function stage0(){
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
  
    var stage = new PIXI.Container(); 
    stage.name = "stage0"
    //stage.removeChildren(0, stage.children.length);
    stage.addChild(
      img,mc,progressTextMC
    );

    return stage;
  }

  return {stage0}
}