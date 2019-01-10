//index.js
const topTitleMap = {
  'gn': "国内",
  'gj': "国际",
  'cj': "财经",
  'yl': "娱乐",
  'js': "军事",
  'ty': "体育",
  'other': "其他"
}


Page({
  data: {
    topTitleList: ["gn", "gj", "cj", "yl", "js", "ty", "other"],
    topTitleMap,
    topTitle:'',
    bottomList: [],
    firstId : '' ,
    firstTitle:'' ,
    firstDate: '',
    firstImage:'',
    firstSource: '',
  },

  onLoad(){
    this.setType('gn')
  },
  //获取标题
  onTapCategory(e) {
    const { cat } = e.currentTarget.dataset;
    this.setData({
      topTitle: cat
    })
    this.setType(cat);
  },
  //根据标题获取内容
  setType(topTitle){
      //let type = topTitleMap[topTitle];
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data:{
          type: topTitle
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
  },

  //跳转第二页面
  onSelect(e) {
    const { cat } = e.currentTarget.dataset;
    console.log(cat['id'])
    wx.navigateTo({
      url: '/pages/info/info?id='+cat['id'],
    })
  },

})
