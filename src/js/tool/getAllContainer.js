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
    //素材
    const{
      viewBtnMC,
    } = getAllMaterial(app);
    //容器
    const container = new PIXI.Container();  
    container.name = "selectPortraitContainer"     
    container.width = 400;     
    container.height = 400;
    container.x = (w-container._width)/2;
    container.y = (h-container._height)/2;
    //背景色
    const containerBg = new PIXI.Sprite(PIXI.Texture.WHITE);
    containerBg.width  = container._width;   //注意，这里获取的不是container.width
    containerBg.height = container._height;  
    //添加
    container.addChild(
      containerBg, //背景一定要先添加
      viewBtnMC(),
    );
    return container;
  }


  return {selectPortraitContainer};
}