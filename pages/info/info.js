// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:[],
    date: '',
    readCount: '',
    title: '',
    source:'' ,
    firstImage:'',
  },

  onLoad(options){
    this.getInfo(options.id);
    
  },

  //获取数据
  getInfo(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id:id
      },
      success:res=>{
        var util = require('../../utils/util.js')
        let result = res.data.result
        let date = util.formatTime(new Date(result.date))
        let readCount = result.readCount;
        let title = result.title;
        let source = result.source;
        let firstImage = result.firstImage
        console.log("ddddddddd"+firstImage)
        if (source === '') {
          source = '未知网络'
        }
        this.setData({
          date:date,
          readCount:readCount,
          title:title,
          source:source,
          firstImage: firstImage,
        })
        this.getContent(result.content)
      }
    })
  },

  //解析内容
  getContent(content){
    let textList = []
    for(let i=0;i<content.length;i++){
      if('image'===content[i].type){
        let image = content[i].src
        if (content[i].src===''){
          image = this.data.firstImage
          console.log("s"+image)
        }
        console.log("h" + image)
        textList.push({
          type: content[i].type,
          src: image,
        })
      }else{
        textList.push({
          type: content[i].type,
          text: content[i].text,
        })
      }
    }
    console.log(textList)
    this.setData({
      textList: textList
    })
  }
})