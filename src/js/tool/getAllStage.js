/********************************************************************
 * 场景（容器）                                                       *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 
export default function(app){
  //获取容器1（游戏首页）
  function stage1(){
    const{
      bgImg,
      soundBtnMC,
      viewBtnMC,
      page01Img
    } = getAllMaterial(app);
    const stage = new PIXI.Container();  
    stage.name = "stage1"              
    stage.addChild(
      bgImg(),
      viewBtnMC(),
    );
    return stage;
  }

  //获取容器2（游戏内容页）
  function stage2(){  
    const{
      bookMC,
      homeBtnMC,
    } = getAllMaterial(app);
    const stage = new PIXI.Container();  
    stage.name = "stage2"              
    stage.addChild(
      bookMC(),
      homeBtnMC(),
    );
    return stage;
  }
  return {stage1,stage2};
}