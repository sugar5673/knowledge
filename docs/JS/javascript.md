# JS相关的踩坑指南

## HTML5 Audio Player Duration 在IOS兼容问题

**问题描述**
> 移动端使用自定义HTML5 Audio，播放音频，安卓可以正常播放，IOS下面进度条获取显示NaN，是duration兼容问题

**解决办法**
- 增加一个事件监听就可以解决了
  
```JS
var audio = new Audio();
audio.src=""; //audio链接
audio.addEventListener('loadedmetadata',function(){
    //console.log(audio,duration);
})

```
