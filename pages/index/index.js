//index.js
const topTitleMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他':'other'
}


Page({
  data: {
    topTitleList: ['国内','国际','财经','娱乐','军事','体育','其他'],
    bottomList: [1,2,3,4,5,6,7],
    firstId : '' ,
    firstTitle:'' ,
    firstDate: '',
    firstImage:'',
    firstSource: '',
  },

  onLoad(){
    this.setType('国内')
  },

  setType(topTitle){
      let type = topTitleMap[topTitle];
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data:{
          type: type
        },
        success: res=>{
          let result = res.data.result
          // let id = result.id;
          // let title = result.title;
          // let date = result.date;
          // let source = result.source;
          // let firstImage = result.firstImage;
          //console.log(result)
          this.getFirstNew(result)
        }
      })
  },
  getFirstNew(result){
      var util = require('../../utils/util.js')
      let firstNew = result[0]
      console.log(firstNew)
      let firstId = firstNew.id;
      let firstTitle = firstNew.title;
      let firstDate = firstNew.date;
      let firstImage = firstNew.firstImage;
      let firstSource = firstNew.source;
      if(firstSource ===''){
        firstSource = '未知网络'
      }
      console.log(firstDate)
      console.log(firstSource)
      this.setData({
        firstId: firstId,
        firstTitle: firstTitle,
        firstDate: util.formatTime(new Date(firstDate)),
        firstImage: firstImage,
        firstSource: firstSource,
       })
  }
})
