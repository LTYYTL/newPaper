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
    bottomList: [],
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
          this.getFirstNew(result)
          this.getNewList(result)
        }
      })
  },

  //获取中间部分新闻
  getFirstNew(result){
      var util = require('../../utils/util.js')
      let firstNew = result[0]
      let firstId = firstNew.id;
      let firstTitle = firstNew.title;
      let firstDate = firstNew.date;
      let firstImage = firstNew.firstImage;
      let firstSource = firstNew.source;
      if(firstSource ===''){
        firstSource = '未知网络'
      }
      this.setData({
        firstId: firstId,
        firstTitle: firstTitle,
        firstDate: util.formatTime(new Date(firstDate)),
        firstImage: firstImage,
        firstSource: firstSource,
       })
  },
  //获取新闻列表
  getNewList(result){
      var util = require('../../utils/util.js')
      let bottomList = []
      for(let i = 1;i<result.length;i++){
        let source = result[i].source;
        if (source === '') {
          source = '未知网络'
        }
        bottomList.push({
          id : result[i].id,
          title: result[i].title,
          date: util.formatTime(new Date(result[i].date)),
          image: result[i].firstImage,
          source: source,
        })
      }
      this.setData({
        bottomList: bottomList
      })
  }


})
