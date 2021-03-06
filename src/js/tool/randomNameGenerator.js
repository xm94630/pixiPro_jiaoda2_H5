/********************************************************************
 * 随机姓名生成器                                                     *
 ********************************************************************/

//1苏2陌3浅4诗5漠6染7安8夏9木0伊。
//1颜2唯3洛4雨5潇6子7小8简9晗10宇11景12悠。
//1苒2若3希4韵5雅6朵7涵8蔓9曦10璇11暄12默13言14柒15嫣16紫17荨18帆19末20凉21落22尘23语24轩25歌26熙27夕28影29莫30然31语。

function getRandomName(){
  let arr1 = [
    "白",
    "史",
    "苏",
    "顾",
    "夏",
    "江",
    "鹿",
  ]

  let arr2 = [
    "云天",
    "云依",
    "云龙",
    "兴花",
    "兴梅",
    "兴竹",
    "梦龙",
    "商龙",
    "应龙",
    "长云",
    "长月",
    "长风",
    "一一",
    "星缘",
  ]

  let firstName = arr1[Math.floor(Math.random()*arr1.length)]
  let surName   = arr2[Math.floor(Math.random()*arr2.length)]

  return firstName+surName;
}

export default getRandomName;