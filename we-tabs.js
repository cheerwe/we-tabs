(function($) {
    if (!$) {
        return;
    }



    var WeTabs = function(config) {
        $.extend(this, config);
        this.init(config);
    };

    var createId = function(prix) {
        var id = (Math.random(1000) + '').replace('.', '-')
        return (prix || '') + id;
    };

    var CLS_ACTIVE = "active";
    $.extend(WeTabs.prototype, {
        activeIndex: 0, //默认激活第一个
        slideStep: 150,
        /**
         * 在当前el中根据selector寻找元素
         * @param  {String} selector jQuery的选择器
         * @return {[type]}          [description]
         */
        $: function(selector) {
            return this.el.find(selector);
        },
        /**
         * 私有方法：获取Tab的容器元素
         * @return {[type]} [description]
         */
        _getTabsEl: function() {
            return this.$('[data-role="tabs"]');
        },
        /**
         * 私有方法：获取Nav的容器元素
         * @return {[type]} [description]
         */
        _getNavsEl: function() {
            return this.$('[data-role="navs"]');
        },
        /**
         * 获取NavLi元素
         * @return {[type]} [description]
         */
        _getNavLiEl: function() {
            return this._getNavsEl().find('li');
        },
        /**
         * 获取header的jQueryDom
         * @return {[type]} [description]
         */
        _getHeaderEl: function() {
            return this.$('[data-role="header"]');
        },
        /**
         * 私有方法：根据trigger激活Table
         * @param  {[type]} trigger [description]
         * @return {[type]}         [description]
         */
        _activeByTrigger: function(trigger) {
            if (!trigger) {
                return;
            }
            this._getTabsEl().children().removeClass(CLS_ACTIVE);
            this._getTabsEl().find('[data-id="' + trigger + '"]').addClass(CLS_ACTIVE);

            this._getNavsEl().children().removeClass(CLS_ACTIVE);
            this._getNavsEl().find('[data-trigger="' + trigger + '"]').parent().addClass(CLS_ACTIVE);

            //计算nav的长度
            this._syncSize();
        },
        _initEvents: function() {
            this.el.on('click', '[data-role="navs"]>li', {
                scope: this
            }, function(e) {
                var scope = e.data.scope;
                scope._doActive(e);
            });


            this.el.on('click', '[data-role="header"]>a', {
                scope: this
            }, function(e) {
                var scope = e.data.scope;
                scope._doSliderNavs(e);
            })
        },
        _doSliderNavs: function(e) {
            var el = $(e.currentTarget);
            var role = el.data('role');
            var navsEl = this._getNavsEl();
            var navLeft = parseInt(navsEl.css('left')) || 0;
            var lastLi = this._getNavLiEl().last();
            var lastLeft = this._getVisibleLeft(lastLi);

            if (role == 'left') {
                navLeft -= this.slideStep;

                if (lastLeft > navLeft) {
                    navLeft = lastLeft;
                }
            } else {
                navLeft += this.slideStep;
                if (navLeft >= 0) {
                    navLeft = 'auto';
                }
            }

            if (navLeft !== 0) {
                navsEl.css('left', navLeft);
            }
        },
        /**
         * 私有方法：处理Tab的点击事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        _doActive: function(e) {
            var el = $(e.currentTarget).find('a');
            var trigger = el.data('trigger');

            this._activeByTrigger(trigger);
        },
        /**
         * 同步不计算宽度
         * @return {[type]} [description]
         */
        _syncSize: function() {
            var navsWidth = 10;
            var navsEl = this._getNavsEl();

            navsEl.children().each(function() {
                navsWidth += $(this).outerWidth();
            });

            navsEl.width(navsWidth);
            var headerWidth = this._getHeaderEl().width();


            //超过宽度，展示btn
            this._toggleBtns(headerWidth < navsWidth);

            //同步计算位置
            this._syncPos();

        },
        _syncPos: function(el) {
            var el = this._getActiveNavLiEl();
            var left = this._getVisibleLeft(el);

            if (left !== 0) {
                this._getNavsEl().css('left', left);
            }
        },
        _getVisibleLeft: function(el) {
            var headerEl = this._getHeaderEl();
            var elRight = Math.ceil(el.offset().left + el.outerWidth());

            var headerElRight = Math.floor(headerEl.offset().left + headerEl.width() + parseInt(headerEl.css('padding-left')));

            var subWidth = headerElRight - elRight;

            if (subWidth < 0) {
                var navsEl = this._getNavsEl();
                var left = parseInt(navsEl.css('left')) || 0;

                return left + subWidth - 3;
            }
            return 0;
        },
        _getActiveNavLiEl: function() {
            return this._getNavsEl().find('.' + CLS_ACTIVE);
        },
        _toggleBtns: function(isShow) {
            var fn = isShow ? 'show' : 'hide';
            this.$('[data-role="header"]>a.btn')[fn]();
        },
        /**
         * 添加tab
         * @param {Object} tabData
         *{
         *  title:'',
         *  content:''
         *}
         * @param {Boolean} autoActive 是否自动激活，默认为true
         */
        addTab: function(tabData, autoActive) {
            var tabId = tabData.id || createId('tab-');
            var navHtmls = [
                '<li>',
                '<a data-trigger="', tabId, '" title="', tabData.title, '">', tabData.title, '</a>',
                '</li>'
            ].join('');

            var tabHtmls = [
                '<div data-id="', tabId, '">',
                tabData.content,
                '</div>'
            ].join('');


            this._getNavsEl().append(navHtmls);
            this._getTabsEl().append(tabHtmls);

            if (autoActive !== false) {
                this.activeLastTab();
            } else {
                this._syncSize();
            }
        },
        /**
         * 获取Tab的个数
         * @return {[type]} [description]
         */
        getLength: function() {
            return this._getNavLiEl().length;
        },
        /**
         * 激活第一个TAB
         * @return {[type]} [description]
         */
        activeFirstTab: function() {
            this.activeTabByIndex(0);
        },
        /**
         * 激活最后一个Tab
         * @return {[type]} [description]
         */
        activeLastTab: function() {
            var len = this.getLength();
            this.activeTabByIndex(len - 1);
        },
        /**
         * 根据trigger激活tab
         * @param  {[type]} trigger [description]
         * @return {[type]}         [description]
         */
        activeTab: function(trigger) {
            this._activeByTrigger(trigger);
        },
        /**
         * 根据index激活tab
         * @param  {Int} index 需要激活的Tab的index
         * @return {[type]}       [description]
         */
        activeTabByIndex: function(index) {
            var navEl = this._getNavsEl().find('li').eq(index).find('a');

            if (navEl && navEl.length) {
                var trigger = navEl.data('trigger');

                this._activeByTrigger(trigger);
            }
        },
        init: function() {
            this.el.addClass('we-tabs');

            this._initEvents();

            //初始化的激活
            this.activeTabByIndex(this.activeIndex);
        }
    });


    $.fn.weTabs = function(config) {
        var tabs = [];
        $(this).each(function() {
            var _config = $.extend({}, config, {
                el: $(this)
            });


            tab = new WeTabs(_config);

            tabs.push(tab);
        });

        return tabs.length == 1 ? tabs[0] : tabs;
    };
})($);
