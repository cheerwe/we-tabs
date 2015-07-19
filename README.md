# We-Tabs
--------------------------------

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




