import getAllMaterial from './getAllMaterial.js'; 


/********************************************************************
 * 场景（容器）                                                          *
 ********************************************************************/

//获取容器1（游戏首页）
function getStage1(app){
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
function getStage2(app){  
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

export default {getStage1,getStage2}