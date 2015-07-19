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
