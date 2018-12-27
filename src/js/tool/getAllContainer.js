/********************************************************************
 * 游戏功能模块（容器）                                                 *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 

export default function(app){

  //头像选择
  function selectPortraitContainer(){
    const{
      viewBtnMC,
    } = getAllMaterial(app);
    const container = new PIXI.Container();  
    container.name = "selectPortraitContainer"              
    container.addChild(
      viewBtnMC(),
    );
    return container;
  }


  return {selectPortraitContainer};
}