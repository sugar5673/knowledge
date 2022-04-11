# PUBGM重构相关注意事项
## PUBGM重构模板
[PUBGM重构模板](/template/PUBGM模板.zip)
## PUGBM在线规范
-  [Pubgm通用规范](https://www.pubgmobile.com/act/a20200519testen/specification/#/multi_language_in_the_game)

## 一、重构注意事项
### 按钮的两种状态：高亮和灰态。
- 如果设计师没有做，记得提醒加上去

​ ![1](/pubgm/1.png)

### 关于注释
- 如果按钮有多种状态，记得写清楚注释，及调用方法，方便开发同学调用

### 字体
- 通用模板的样式里面有字体，不用再次引入

### 设计稿的迭代
- 一定注意设计稿的多次更新时的小细节
- 多对比设计稿，不要遗漏
- 也可以请设计师帮忙标注修改点



### 适配
- 只做单语言的时候，注意添加多语言后，会不会有样式问题

### 多语言接入

**接入多语言方法**

```JS
    //language.js
    var GLanguage = {
        "ZH": {
            "key1": "1. 玩家完成日常任务",
            "key2": "2. 玩家完成日常任务2",
        }
        "EN": {
            "key1": "1. Player need to complete a daily quest",
            "key2": "2. Player need to complete a daily quest2",
        },
        "TW": {},
        "HK": {},
        "TH": {},
        "ES": {},
        "FR": {},
        "TR": {},
        "VI": {},
        "DE": {},
        "PT": {},
        "ID": {},
        "RU": {},
        "AR": {},
        "MY": {}
    }

    
    var language = "EN";
    var langObj = null;
    var areaLan = ["EN", "ZH", "TH", ];

    if (getQueryString("setLan") == null || $.trim(getQueryString("setLan")) == "") {
        language = getQueryString("language") ? $.trim(getQueryString("language")).toUpperCase() : "EN";
        if (areaLan.indexOf(language) < 0) {
            language = "EN";
        }
    } else {
        language = $.trim(getQueryString("setLan"));
    }

    //这里的类名，注意与页面中的相对应起来
    $('.wrap').addClass('lang-' + language.toLowerCase());

    langObj = GLanguage[language];
    initLang(langObj);

    function initLang(obj) {
        $("[data-lang]").each(function(index) {
            var texts = $(this).attr("data-lang");
            $(this).html(obj[texts]);
        });
        $("[data-placeholder]").each(function(index) {
            var texts = $(this).attr("data-placeholder");
            $(this).attr("placeholder", obj[texts]);
        });
    }


    //html

    <h2 class="main-title"  data-lang="key1">这里是标题文字</h2>
    <h3 class="main-title2"  data-lang="key2">这里是标题文字</h3>


```


### 注意添加预加载
**效果图**
​ ![loading](/pubgm/loading.png)

```CSS
.wrap,.loading-box {
    width: 100%;
    height: 100%;
    position: relative;
}


.loading-box {
    background: url(../images/loading-bg.jpg) 50% 50%/100% auto no-repeat;
    background-size: 100% auto;
}

.jdt-pro {
    width: 11.36rem;
    height: 6.4rem;
    margin: 0 auto;
    position: relative;
}

.jdt-k {
    position: absolute;
    top: 2.7rem;
    left: 50%;
    margin-left: -3.375rem;
    width: 6.75rem;
    height: .20rem;
    background-color: rgba(8, 104, 177, 0.74);
    padding: 0.02rem;
    border-radius: 0.07rem;
}

.j-num {
    position: absolute;
    left: 50%;
    top: 3rem;
    width: 6rem;
    margin-left: -3rem;
    text-align: center;
    color: #ffffff;
    display: block;
}

#out {
    width: 6.74rem;
    height: .20rem;
    background: rgba(8, 104, 177, 0.74);
    border-radius: 0.07rem;
}

#in {
    width: .10rem;
    height: .20rem;
    border-radius: 0.07rem;
    position: relative;
}

.demo_process {
    height: .20rem;
    position: relative;
    width: 20%;
    background-color: #01f4f6;
    background-size: 2.89em 2.89em;
    background-image: linear-gradient(-45deg, #008ef2 0em, #008ef2 0.8em, #00bef9 0.9em, #00bef9 2.1em, #008ef2 2.1em, #00a9f3 2.9em, #00bef9 2.9em, #00bef9 4.1em);
    animation: process-animation 750ms infinite linear;
}

.demo_process::after {
    content: "";
    display: block;
    position: absolute;
    top: -0.6rem;
    right: -.2rem;
    width: 0.42rem;
    height: 0.53rem;
    background: url(../../no_cache/images/process.png) 50% 50%/100% auto no-repeat;
}

@keyframes process-animation {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 2.89em 0;
    }
}

.demo_process::before {
    content: '';
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-image: linear-gradient(to bottom, #0098f5, rgba(69, 135, 223, 0.4) 15%, transparent 55%, #42fef0);
}

```

```html
 <div class="loading-box">
        <div class="wrap">
            <div class="jdt-pro">
                <div class="jdt-k">
                    <div id="out">
                        <div id="in" class="demo_process progress"></div>
                    </div>
                </div>
                <strong class="fw j-num num" id="j-num"> <span></span>%</strong>
            </div>
        </div>
    </div>

```

```js
 var rateNum = document.querySelector('.num span'),
        progress = document.querySelector('.progress'),
        imgPath = "no_cache/images/",
        sourceArr = ['bg1.jpg', 'bg2.jpg', 'sprite.png'];
    for (var i = 0; i < sourceArr.length; i++) {
        sourceArr[i] = imgPath + sourceArr[i];
    };
    var loadImage = function(path, callback) {
        var img = new Image();
        img.onload = function() {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }
    var imgLoader = function(imgs, callback) {
        var len = imgs.length,
            i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function(path) {
                callback(path, ++i, len);
            });
        }
    }
    imgLoader(sourceArr, function(path, curNum, total) {
        var percent = curNum / total
        rateNum.innerHTML = Math.floor(percent * 100);
        progress.style.width = Math.floor(percent * 100) + '%';
        if (percent == 1) {
            setTimeout(showPage, 500);
        }
    });
    var showPage = function() {
        document.querySelector('.num').innerHTML = "加载完成";
        $(".loading-box").hide();
        $(".page1").show();

    }

```





## 二、设计注意事项

### 尺寸

#### 一整屏页面

::: warning 注意
​   (如果产品有其他尺寸要求，按照产品给定尺寸设计)
:::

::: tip 竖屏设计尺寸
​   竖屏：750×1624（主内容646x1206，如果页面有跳转如登录等，主内容646x1112 并且居中；）
:::

::: tip 横屏设计尺寸
 横屏：2000×750（主内容1334×750 并且居中；）
:::

::: tip ipad适配尺寸
iPad：1624*1624（主内容1334×750 并且居中）
:::

#### 长页面

::: tip 竖屏
​   竖屏：宽度750px（最小高度1624px）
:::

::: tip 横屏
​   横屏：宽度1334px（最小高度616px）
:::