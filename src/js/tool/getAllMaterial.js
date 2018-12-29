/********************************************************************
 * 影片剪辑                                                          *
 ********************************************************************/
import player from './playerData';


export default function getAllMaterial(app){
  var w = app.view.width;
  var h = app.view.height;
  var res = PIXI.loader.resources;

  //这个配置文件是对所有动画json文件的维护，使用起来非常方便
  var characterAnimation = res['characterAnimation'].data;

  //游戏中全部的影片剪辑的维护
  var list = {
    bgImg:function(){
      var img = new PIXI.Sprite(res.background.texture);
      return img;
    },

    //观看按钮
    viewBtnMC:function(){
      var sourceArr = characterAnimation['button.json']['viewBtn'];
      var frameArr=[];
      for (var i = 0; i < sourceArr.length; i++) {
        frameArr.push(PIXI.Texture.fromFrame( sourceArr[i] ));
      }
      var mc = new PIXI.extras.AnimatedSprite(frameArr);
      //mc.x = w-mc.width/2-12;
      //mc.y = mc.height/2+892;
      mc.anchor.set(0.5);
      mc.gotoAndStop(0); 
      mc.interactive = true;
      mc.buttonMode = true;
      mc.on('pointerdown', function(){
        //舞台切换场景
        app.stage.getChildByName('stage1').visible = false;
        app.stage.getChildByName('stage2').visible = true;
      });
      return mc;
    },

    soundBtnMC:function(){
      //声音
      var mySound = res.bgmSound.sound;
      mySound && mySound.play();
      
      var sourceArr = characterAnimation['button.json']['soundBtn']
      var frameArr=[];
      for (var i = 0; i < sourceArr.length; i++) {
        frameArr.push(PIXI.Texture.fromFrame( sourceArr[i] ));
      }
      var mc = new PIXI.extras.AnimatedSprite(frameArr);
      mc.x = w-mc.width/2-30;
      mc.y = mc.height/2+30;
      mc.anchor.set(0.5);
      mc.gotoAndStop(0); 
      mc.interactive = true;
      mc.buttonMode = true;
      mc.scale.x = mc.scale.y = 1;
      var flag = false;
      mc.on('pointerdown', function(){
        if(flag){
          mc.gotoAndStop(0);
          mySound && mySound.play();
          flag = false;
        }else{
          mc.gotoAndStop(1);
          mySound && mySound.stop();
          flag = true;
        }
      });
      return mc;
    },
    btn:function(){
      var txt = new PIXI.Text('游戏开始',{
        fontSize: 60,
        fill: 0x000,
        align: 'left'
      });
      txt.anchor.set(.5)
      txt.x = w/2;
      txt.y = 200;
      txt.interactive = true;
      txt.buttonMode = true;
      return txt;
    },
    page01Img:function(){var img = new PIXI.Sprite(res.page01.texture);img.name = "page01";return img;},
    page02Img:function(){var img = new PIXI.Sprite(res.page02.texture);img.name = "page02";return img;},
    bookMC:function(){
      var mc = new PIXI.Container();
      mc.name = "book";
      mc.addChild(list.pageMC())
      return mc;
    },
    pageMC:function(){
      var mc = PIXI.Sprite.fromImage("bg2");
      mc.name = "bg2";
      mc.width = w; 
      mc.height = h; 
      return mc;
    },

    //返回主页
    homeBtnMC:function(){
      var mc = PIXI.Sprite.fromImage("icon-exit.png");
      mc.x = mc.width/2+30;
      mc.y = mc.height/2+30;
      mc.anchor.set(0.5);
      mc.interactive = true;
      mc.buttonMode = true;
      mc.scale.x = mc.scale.y = 1;
      var flag = false;
      mc.on('pointerdown', function(){
        app.stage.getChildByName('stage1').visible = true;
        app.stage.getChildByName('stage2').visible = false;
      });
      return mc;
    }

    //按钮_首页_开始游戏
    ,gameStartBtnMC:function(){
      var txt = new PIXI.Text('开始游戏',{
        fontSize: 60,
        fill: 0x000,
        align: 'left'
      });
      txt.anchor.set(.5)
      txt.x = w/2;
      txt.y = 200;
      txt.interactive = true;
      txt.buttonMode = true;
      txt.on('pointerdown', function(){
        app.stage.getChildByName('stage1').visible = false;
        app.stage.getChildByName('stage2').visible = true;
      });
      return txt;
    }

    //按钮_首页_继续游戏
    ,gameContinueBtnMC:function(){
      var txt = new PIXI.Text('继续游戏',{
        fontSize: 60,
        fill: 0x000,
        align: 'left'
      });
      txt.anchor.set(.5)
      txt.x = w/2;
      txt.y = 400;
      txt.interactive = true;
      txt.buttonMode = true;
      txt.on('pointerdown', function(){
        alert(222);
      });
      return txt;
    }

    //按钮_首页_退出游戏
    ,gameExitBtnMC:function(){
      var txt = new PIXI.Text('退出游戏',{
        fontSize: 60,
        fill: 0x000,
        align: 'left'
      });
      txt.anchor.set(.5)
      txt.x = w/2;
      txt.y = 600;
      txt.interactive = true;
      txt.buttonMode = true;
      txt.on('pointerdown', function(){
        alert(333);
      });
      return txt;
    }

    //头像
    ,portraitMC:function(x,y){
      var sourceArr = characterAnimation['portrait.json']['portraitBox'];
      var frameArr=[];
      for (var i = 0; i < sourceArr.length; i++) {
        frameArr.push(PIXI.Texture.fromFrame( sourceArr[i] ));
      }
      var mc = new PIXI.extras.AnimatedSprite(frameArr);
      mc.gotoAndStop(0); 
      mc.scale.x = mc.scale.y = 3;
      mc.anchor.set(0.5);
      mc.x = x;
      mc.y = y;
      mc.name = "portrait"
      return mc;
    }

    //向左箭头
    ,arrowLeftMC:function(x,y){
      var texture = PIXI.Texture.from( 'arrow_left.png' ) //获取合成图中的素材，只需要传入名字就行，不用像做动画那么麻烦
      var img = new PIXI.Sprite(texture);            
      img.anchor.set(0.5)
      img.interactive = true; 
      return img;
    }

    //向右箭头
    ,arrowRightMC:function(x,y){
      var texture = PIXI.Texture.from( 'arrow_right.png' ) 
      var img = new PIXI.Sprite(texture);            
      img.anchor.set(0.5)
      img.interactive = true; 
      return img;
    }

    //姓名-文字展示渲染
    ,playerNameMC:function(myName){
      var txt = new PIXI.Text( myName,{
        fontSize: 80,
        fill: 0xc3592f,
        align:'center'
      });
      txt.x = 100;
      txt.y = 0;
      //txt.width=260;
      txt.interactive = true;
      return txt;
    }

    //骰子按钮
    ,btnDiceMC:function(x,y){
      var texture = PIXI.Texture.from( 'btn_dice.png' ) 
      var img = new PIXI.Sprite(texture);            
      img.interactive = true;
      img.buttonMode = true; 
      return img;
    }

    //ok按钮
    ,btnOkMC:function(x,y){
      var texture = PIXI.Texture.from( 'btn_ok.png' ) 
      var img = new PIXI.Sprite(texture);            
      img.interactive = true;
      img.buttonMode = true; 
      return img;
    }

    //绿色背景布
    ,bgImgMC:function(){
      var mc = PIXI.Sprite.fromImage("bg2");
      mc.name = "bgImg";
      mc.width = w; 
      mc.height = h; 
      return mc;
    }


  }
    
  return list;
}




