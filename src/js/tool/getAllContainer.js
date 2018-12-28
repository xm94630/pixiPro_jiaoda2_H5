/********************************************************************
 * 游戏功能模块（容器）                                                 *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 

export default function(app){

  var w = app.view.width;
  var h = app.view.height;
  var res = PIXI.loader.resources;

  //头像选择
  function selectPortraitContainer(){
    //头像使用第几帧
    let n = 0;
    //素材
    const{
      portraitMC,
      arrowLeftMC,
      arrowRightMC,
    } = getAllMaterial(app);
    //容器
    const container = new PIXI.Container();  
    container.name = "selectPortraitContainer"     
    container.width = 700;     
    container.height = 300;
    container.x = (w-container._width)/2;
    container.y = (h-container._height)/2;
    //背景色
    const containerBg = new PIXI.Sprite(PIXI.Texture.WHITE); //使用这个的时候，方便直观看到容器的区域
    //const containerBg = new PIXI.Sprite(PIXI.Texture.EMPTY);
    containerBg.width  = container._width;   //注意，这里获取的不是container.width
    containerBg.height = container._height;  
    containerBg.interactive = true; //这个要有，否者被该模块挡住的别的按钮啥的还会响应，这个有了就被盖住了。
    //获取头像
    const portrait = portraitMC(container._width/2,container._height/2)
    const totalFrames = portrait.totalFrames;
    //获取左箭头实例
    const arrowLeft = arrowLeftMC();
    arrowLeft.x = arrowLeft.width/2;
    arrowLeft.y = container._height/2;
    arrowLeft.on('pointerdown', function(){
      n--;
      if(n<0){n=totalFrames-1;}
      container.getChildByName('portrait').gotoAndStop(n);
    });
    //获取右箭头实例
    const arrowRight = arrowRightMC();
    arrowRight.x = container._width - arrowRight.width/2;
    arrowRight.y = container._height/2;
    arrowRight.on('pointerdown', function(){
      n--;
      if(n>totalFrames-1){n=0;}
      container.getChildByName('portrait').gotoAndStop(n);
    });



    //添加
    container.addChild(
      containerBg, //背景一定要先添加
      portrait,
      arrowLeft,
      arrowRight,
    );
    return container;
  }


  return {selectPortraitContainer};
}