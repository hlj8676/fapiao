
// var initData = 'Fapiao infomation:'
// var extraLine = [];
// Page({
//    data: {
//      text: initData
//   },
//    /**
//    * button点击事件监听
//    */
//   clickButton: function (e) {
    
//     wx.scanCode({
//       success: (res) => {
//        // console.log(res.result)
        
//         //第1位为国家税务局、地方税务局代码，1为国家税务局、2为地方税务局，0为总局。
//         //第2、3、4、5位为地区代码(省、市级)，以全国行政区域统一代码为准。按照省局的地区代码分配表，我市的地区代码为3210，省局的3200，总局为0000
//         //第6、7位为年份代码（例如2006年以06表示）。
//         //第8位为统一的行业代码，地税行业划分：共分为9个行业，外加1位0，具体划分是这样的：1交通运输业、2建筑业、3金融保险业、4邮电通信业、5文化体育业、6娱乐业、7服务业、8转让无形资产、9销售不动产、0表示其他。这个其他是指：其他行业（经营项目）划分应分别列入相关行业，未列入1-9类的发票均用0表示也就是其他表示。（例如：我们目前有的刮奖定额、通用发票、税务机关代开统一发票、非经营性收款凭据等等）
//         //第9、10位为细化的发票种类代码：在我们1.0的省局征管软件中，第9、10位都是细化的发票种类代码（例如：刮奖定额1元、2元、5元、10元、20元、50元、100元、200元，细化代码为31—38，服务业中分广告业、住宿就是以前的旅馆、照相等等）而现在除全国、全省统一发票分类代码由省局规定以外，原则上不再细分小类， 我市根据省局已定的细化方法在省局已用的顺序号后顺延。（例如：服务业中的国际货代票为01那么国际海运代理为02，而我们添加的票种在省局已用的代码后顺延，企业自印的如：文化体育业扬州瘦西湖公园门票为01；那么扬州大明寺为02；扬州市个园03；扬州市何园04依次顺延）固定代码的最大的优点是1、便于识别，2、杜绝发票串用。
//         //第11位为发票类型代码：1-统一机打平式票；2-统一机打卷式票；3-统一手开式发票；4-统一定额式发票；5作为备用；6-冠名机打平式票；7-冠名机打卷式票；8-冠名定额式发票。（冠名即指套印企业名称的企业自印发票）
//        // 第12位原则上为批次代码，你们现在看到的统一发票的第12全部为0，因为我们没有用完8位数的顺序号，我们的发票要用满999万后才后动用批次，而在企业自印发票时这个第12位号码则代表自印发票的版面金额。（即：1—定额壹元；2—定额贰元；3—定额伍元；4—定额拾元；5—定额贰拾元；6—定额肆拾元；7—定额伍拾元；8—定额壹佰元；9—表示其他。）

//         var arr = res.result.split(",");
//         console.log("发票代码：", arr[0]+arr[1]+arr[2]);
//         console.log("发票号码：", arr[3]);
//         console.log("发票金额：", arr[4]);
//         console.log("开票日期：", arr[5]);
//         console.log("校验码：", arr[6]);

//         this.setData({
//           text: initData + '\n' //+ extraLine.join('\n')
//         })

//         extraLine.push(res.result)
//         var length = extraLine.length;
//         for(var i = 0; i< length;i++)
//         {
//           this.setData({
//             text: this.queryCartList(extraLine[i])
//           });
//         }
        
//       }
//     })
//   },

//   queryCartList: function (str) {
    
//     return str;
//   }
 
// })

//var listData = [];
Page({
  data: {
     listData: [
     ]
  },
  //    /**
//    * button点击事件监听
//    */
  clickButton: function (e) {

    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        // 增值税电子普通发票：01, 10, 011001605111, 80100798, 64.9, 20161018, 85342965681116380258
        // 该字符串以逗号分隔每一个属性值，从左到右依次是：
        // 01：第一个属性值，尚未搞清楚含义；
        // 10：第二个属性值，代表发票种类代码，10 - 增值税电子普通发票，04 - 增值税普通发票，01 - 增值税专用发票；
        // 011001605111：第三个属性值，代表发票代码；
        // 80100798：第四个属性值，代表发票号码；
        // 64.9：第五个属性值，代表开票金额；
        // 20161018：第六个属性值，代表开票日期，该值为2016年10月18日；
        // 85342965681116380258：第七个属性值，代码发票校验码，我们都知道增值税专用发票是没有发票校验码的，没有则为空字符串；


         var arr = res.result.split(",");

        // console.log("发票代码：", arr[0]+arr[1]+arr[2]);
        // console.log("发票号码：", arr[3]);
        // console.log("发票金额：", arr[4]);
        // console.log("开票日期：", arr[5]);
        // console.log("校验码：", arr[6]);
        // console.log("随机码：", arr[7]);
         var total = arr[4]*1.11
         addTable(this, arr[3], arr[5], arr[4] ); 
      }
    })
  },
 
  onLoad: function () {
    console.log('onLoad')
  }

})

var addTable = function(that, code, codedate, money){
  console.log(code, codedate, money)
  
  var list = that.data.listData;
  list.push({ "code": code, "codeDate": codedate, "money": money  })

  that.setData({
    listData: list
  }); 
}
 
 