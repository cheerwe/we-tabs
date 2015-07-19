# We-Tabs


一款jQuery的Tabs导航插件，具备超多个导航的展示能力，当tabs的数量超过了可现实的宽度，导航条左右两端出现按钮，可以手动调节导航条，以便展示。



## 使用说明


**引用**

````` html
<script src="http://cdn.bootcss.com/jquery/1.8.0/jquery.min.js"></script>

<script src="./we-tabs.js" type="text/javascript"></script>
<link href="./we-tabs.css" type="text/css" rel="stylesheet"/>
<link href="./we-tabs-theme.css" type="text/css" rel="stylesheet"/>

`````


**HTML代码**

````` html
<div id="we-tabs" class="we-tabs-blue">
    <div class="navs" data-role="header">
        <a data-role="left" class="btn btn-left"></a>
        <ul data-role="navs">
            <li class="active"><a data-trigger="tab1">Tab1</a></li>
            <li><a data-trigger="tab2">Tab2</a></li>
            <li><a data-trigger="tab3">Tab3</a></li>
        </ul>
        <a data-role="right" class="btn btn-right"></a>
    </div>
    <div data-role="tabs" class="tabs">
        <div data-id="tab1">Tab1</div>
        <div data-id="tab2">Tab2</div>
        <div data-id="tab3">Tab3</div>
    </div>
</div>
`````

**JS代码**

````` js
<script type="text/javascript">
    $(function() {
        var tabs = $('#we-tabs').weTabs({
            activeIndex:0
        });

        var index = 4;

        //添加tab
        $('#btn-add-tab').on('click', function() {
            tabs.addTab({
                title: 'Tab' + index,
                content: '<p>Tab' + index + '</p>'
            });
            index++;
        });
    });

</script>

`````


## API接口说明

**getLength()**

* 名称：获取导航页签个数
* 参数：
    无
* 返回值：
    int 导航页签的个数


**activeTab(trigger)**

* 名称：激活tab
* 参数：
    trigger:
    + 类型：string
    + 说明：需要激活的tab的trigger，该trigger参看HTML代码内，data-role="navs"的li元素包括的a元素的data-trigger属性
* 返回值：
    无


**activeTabByIndex(index)**

* 说明：根据index激活tab
* 参数：
    index:
    + 类型：int
    + 说明：根据index激活tab
返回值：
    无

**activeFirstTab()**

* 说明：激活第一个tab
* 参数：
    无
* 返回值：
    无


**activeLastTab()**

* 说明：激活最后tab
* 参数：
    无
* 返回值：
    无

**addTab(tabData)**

* 说明：添加tab
* 参数：
    tabData:
    + 类型：object
    + 说明：
        - tabData.id：tab的id，默认自动生成
        - tabData.title：tab的标题
        - tabData.content：tab的内容，HTML代码片段
* 返回值：
    无



## 主题二次开发

````` css
/**
 * 以下属性内容为在配置个性化主题时，可修改的内容，运行时，如果需要切换多个主题，请保持padding、margin、height、width等值一致，以达到最佳可视效果
 * 背景色、背景图片、边框颜色、字体颜色、字体粗体等，是设置不同主题时通常需要设置的属性值，此处不一一列举
*/

.we-tabs-blue{

}

.we-tabs-blue>.navs {
    padding: 6px 30px 0 30px;
    height: 33px;
}

.we-tabs-blue>.navs>a.btn{
    background-color: none;
    width: 30px;/**该值请与.we-tabs-blue>.navs选择器的padding-left和padding-right保持一致，以达到最佳可是效果*/
}
.we-tabs-blue>.navs>a.btn-left{
    background-image: url("./imgs/left.png");
}
.we-tabs-blue>.navs>a.btn-right{
    background-image: url("./imgs/right.png");
}

/*导航页签激活状态下的样式*/
.we-tabs>.navs>ul>li.active{
}

.we-tabs-blue>.navs>ul>li>a{
    padding: 8px 10px;/*设置该值后，请同步设置.we-tabs-blue>.navs的height值，以达到最佳展示效果*/
}

.we-tabs-blue>.tabs>div{
    padding: 10px;
}
`````




