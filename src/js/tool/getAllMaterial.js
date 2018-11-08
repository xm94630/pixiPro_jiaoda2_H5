//参数：pixi实例、宽、高、加载的资源

export default function getAllMaterial(app,w,h,res){

  //这个配置文件是对所有动画json文件的维护，使用起来非常方便
  var characterAnimation = res['characterAnimation'].data;

  //游戏中全部的影片剪辑的维护
  var list = {
    bgImg:function(){
      var img = new PIXI.Sprite(res.background.texture);
      return img;
    },
    viewBtnMC:function(){
      var sourceArr = characterAnimation['button.json']['viewBtn'];
      var frameArr=[];
      for (var i = 0; i < sourceArr.length; i++) {
        frameArr.push(PIXI.Texture.fromFrame( sourceArr[i] ));
      }
      var mc = new PIXI.extras.AnimatedSprite(frameArr);
      mc.x = w-mc.width/2-12;
      mc.y = mc.height/2+892;
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
  }
  return list;
}




