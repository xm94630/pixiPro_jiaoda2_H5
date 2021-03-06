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
    selectNameContainer,
    scrollGameTextContainer,
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
    pageMC,
    homeBtnMC,
    bgImgMC,
    storyTextMC,
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
      //scrollGameTextContainer(), //游戏背景文字滚动模块
    );
    return stage;
  }

  //场景：头像、姓名确认页
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
      stage.visible=false
      app.stage.getChildByName('stage3').visible = true;
      app.stage.getChildByName('stage3').addChild(
        //该组件是动态地被添加的，因为它是个滚动的动画，过早加载的话，动画都完成了...
        //当然，另外一种解决办法就是：在这里才添加动画的ticker，不过效果都一定的，感觉这个更加简单。
        scrollGameTextContainer(),
      )
    });
    stage.addChild(
      bgImgMC(),
      homeBtnMC(),
      portraitCon,
      nameCon,
      btnOkCon
    );
    return stage;
  }

  //场景：背景介绍页
  function stage3(){  
    const stage = new PIXI.Container();  
    stage.width = w;     
    stage.height = h;
    stage.name = "stage3"    
    let btnOkCon    = btnOkMC()                 //确定按钮
    btnOkCon.x = stage._width/2 - btnOkCon.width/2;
    btnOkCon.y = stage._height  - btnOkCon.height/2 - 150;
    btnOkCon.on('pointerdown', function(){
      stage.visible=false
    })
    stage.addChild(
      bgImgMC(),
      btnOkCon,
    );

    return stage;
  }


  return {
    stage1,
    stage2,
    stage3,
  };
}