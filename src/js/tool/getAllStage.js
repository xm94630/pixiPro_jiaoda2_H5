/********************************************************************
 * 场景（容器）                                                       *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 
import getAllContainer from './getAllContainer.js'; 


export default function(app){

  //获取游戏功能模块
  //其实也是容器，只是按照体量大小，不同的叫法而已。
  const{
    selectPortraitContainer,
  } = getAllContainer(app);

  //获取容器1（游戏首页）
  function stage1(){
    const{
      bgImg,
      soundBtnMC,
      viewBtnMC,
      page01Img,
      gameStartBtnMC,
      gameContinueBtnMC,
      gameExitBtnMC,
    } = getAllMaterial(app);
    const stage = new PIXI.Container();  
    stage.name = "stage1"              
    stage.addChild(
      //影片剪辑
      bgImg(),
      //viewBtnMC(),
      gameStartBtnMC(),
      gameContinueBtnMC(),
      gameExitBtnMC(),

      //游戏模块
      selectPortraitContainer(),
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