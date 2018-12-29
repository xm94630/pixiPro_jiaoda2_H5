/********************************************************************
 * 场景（容器）                                                       *
 ********************************************************************/

import getAllMaterial from './getAllMaterial.js'; 
import getAllContainer from './getAllContainer.js'; 


export default function(app){

  var w = app.view.width;
  var h = app.view.height;
  var res = PIXI.loader.resources;

  //获取游戏功能模块
  //其实也是容器，只是按照体量大小，不同的叫法而已。
  const{
    selectPortraitContainer,
    selectNameContainer
  } = getAllContainer(app);

  const{
    bgImg,
    soundBtnMC,
    viewBtnMC,
    page01Img,
    gameStartBtnMC,
    gameContinueBtnMC,
    gameExitBtnMC,
    btnOkMC,
    bookMC,
    homeBtnMC,
  } = getAllMaterial(app);

  //获取容器1（游戏首页）
  function stage1(){
    const stage = new PIXI.Container();  
    stage.name = "stage1"              
    stage.addChild(
      //影片剪辑
      bgImg(),
      //viewBtnMC(),
      gameStartBtnMC(),
      gameContinueBtnMC(),
      gameExitBtnMC(),

      //btnOkMC(),  //ok按钮


      //游戏模块
      //selectPortraitContainer(), //头像选择
      //selectNameContainer(),     //姓名选择
    );
    return stage;
  }

  //获取容器2（游戏内容页）
  function stage2(){  
    const stage = new PIXI.Container();  
    stage.width = w;     
    stage.height = h;
    stage.name = "stage2"              
    let portraitCon = selectPortraitContainer() //头像选择
    let nameCon     = selectNameContainer()     //姓名选择
    let btnOkCon    = btnOkMC()                 //确定按钮
    portraitCon.y = 300
    nameCon.y = 700
    btnOkCon.x = stage._width/2 - btnOkCon.width/2;
    btnOkCon.y = stage._height  - btnOkCon.height/2 - 150;
    btnOkCon.on('pointerdown', function(){
      alert('ok')
    });
    stage.addChild(
      bookMC(),
      homeBtnMC(),
      portraitCon,
      nameCon,
      btnOkCon
    );
    return stage;
  }
  return {
    stage1,
    stage2
  };
}