/* 
  年，季度，月，周，天 组件
  如：上月，当月，本月 按纽功能，下拉框值的初始化等

  Leo 2016.12
*/

;(function($){
    "use strict";
    var defaults = {
        DateTypes: {
            YearValue: 5,                      //类型配置年
            YearShow: true,
            QuarterValue: 4,
            QuarterShow: true,
            MonthValue: 3,
            MonthShow: true,
            WeekValue: 2,
            WeekShow: true
        },
        DateYearValue: undefined,
        DateValue: undefined,
        DateType: 3,                        //默认为月状态
        YearObjID: undefined,               //年输入框DOM对像ID
        DateValObjID: undefined,            //日期值，季度，月，周，输入框DOM对像ID        
        LastNowNextBtnObjID: undefined,     //上一个，当前，下一个，的按钮DOM对像ID
        ShowLastNowNextBtn: true,           //是否显示上一个，当前，下一个，的按钮
        DateInfoObjID: undefined,           //显示日期范围信息的DOM对像ID
        DateTypeObjID: undefined,           //显示日期类型的单选按纽的DOM对像ID
        DateTypeName: undefined,            //指示年，季度，月，周，天类型的Name值
        ShowDateType: true,                 //是否显示年，季度，月，周，天类型的单选按纽
        CallMethod: undefined,              //点击上一，当前，下一后执行的方法
        ReadOnly: false
    };
 
    function YqmwDateSelect($ele, options) {
        this.$ele = $ele;
        this.options = options = $.extend(true, defaults, options || {});
        this.init();
    }

    YqmwDateSelect.prototype = {
        constructor: YqmwDateSelect,
        init: function () {
            this._renderHtml();
            this._initValue(this.options.DateType);
            this._renderLastNextBtn(this.options.DateType);
        },
        _renderHtml: function () {
 
            var _self = this;
            var opt = _self.options;
            var dtn = opt.DateTypeName;
            var dt = opt.DateType;
            var ro = opt.ReadOnly;
 
            if (!opt.YearObjID || !opt.DateValObjID) {
                return false;
            }

            $(opt.YearObjID).numberspinner({
                suffix: '年',
                onSpinDown: function () {
                    _self.ChangeDateValue();
                },
                onSpinUp: function () {
                    _self.ChangeDateValue();
                }
            });

            $(opt.DateValObjID).combobox({
                editable: false,
                valueField: 'id',
                textField: 'text',
                onSelect: function () {
                    _self.ChangeDateValue();
                }
            });

            if (opt.DateTypeObjID && dtn) {
                if (opt.ShowDateType) {
                    var str = '';
                    if (opt.DateTypes.WeekShow) {
                        str += '<label for="' + dtn + '1"><input type="radio" name="' + dtn + '" id="' + dtn + '1" ' +
                            (dt == opt.DateTypes.WeekValue ? 'checked="checked"' : '') + ' value="' + opt.DateTypes.WeekValue + '" '
                            + (ro ? 'disabled="disabled"' : '') + '/>周</label> ';
                    }
                    if (opt.DateTypes.MonthShow) {
                        str += '<label for="' + dtn + '2"><input type="radio" name="' + dtn + '" id="' + dtn + '2" ' +
                            (dt == opt.DateTypes.MonthValue ? 'checked="checked"' : '') + ' value="' + opt.DateTypes.MonthValue + '" '
                            + (ro ? 'disabled="disabled"' : '') + '/>月</label> ';
                    }

                    if (opt.DateTypes.QuarterShow) {
                        str += '<label for="' + dtn + '3"><input type="radio" name="' + dtn + '" id="' + dtn + '3" ' +
                            (dt == opt.DateTypes.QuarterValue ? 'checked="checked"' : '') + ' value="' + opt.DateTypes.QuarterValue + '" '
                            + (ro ? 'disabled="disabled"' : '') + '/>季</label> ';
                    }

                    if (opt.DateTypes.YearShow) {
                        str += '<label for="' + dtn + '4"><input type="radio" name="' + dtn + '" id="' + dtn + '4" ' +
                            (dt == opt.DateTypes.YearValue ? 'checked="checked"' : '') + ' value="' + opt.DateTypes.YearValue + '" '
                            + (ro ? 'disabled="disabled"' : '') + '/>年</label> ';
                    }
                    $(opt.DateTypeObjID).html(str);
                    if (!opt.ReadOnly) {
                        $(opt.DateTypeObjID + ' input[name="' + dtn + '"]').unbind('click');
                        $(opt.DateTypeObjID + ' input[name="' + dtn + '"]').click(function () {
                            _self._changeType();
                        });
                    }
                } else {
                    $(opt.DateTypeObjID).html('<input type="hidden" name="' + dtn + '" id="yqmw_' + dtn + '" value="' + opt.DateType + '" />');
                }
            }
        },
        _initValue: function (dt) {
            var opt = this.options;
            if (!opt.YearObjID || !opt.DateValObjID) {
                return false;
            }
            $(opt.DateValObjID).combobox('loadData', this.GetDateValueData(dt));
            
            this._goNow();
        },
        _getValues:function (){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            _self.DateYearValue = $(opt.YearObjID).numberspinner('getValue');
            if (dt != opt.DateTypes.YearValue) {
                _self.DateValue = $(opt.DateValObjID).combobox('getValue');
            }
        },
        _setValues:function (){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            $(opt.YearObjID).numberspinner('setValue', _self.DateYearValue);
            if (dt != opt.DateTypes.YearValue) {
                $(opt.DateValObjID).combobox('setValue', _self.DateValue);
            }
        },
        _dealDateInfo: function(){
            var _self = this;
            var opt = _self.options;
            if (!opt.DateInfoObjID) {
                return false;
            }
            $(opt.DateInfoObjID).text(_self._dateformatter(_self.GetStartDate())
                + ' → ' + _self._dateformatter(_self.GetEndDate()));
        },
        _dateformatter: function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
        },
        GetDateValueData: function (dt) {
            var opt = this.options;
            var str1 = '', str2 = '月';
            var len = 12;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    str1 = '第';
                    str2 = '周';
                    len = 52;
                    break;
                case (opt.DateTypes.MonthValue): //月
                    str1 = '';
                    str2 = '月';
                    len = 12;
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    str1 = '第';
                    str2 = '季度';
                    len = 4;
                    break;
            }
            var dat = [];
            for (var i = 1; i <= len; i++) {
                dat.push({
                    id: i,
                    text: str1 + i + str2
                });
            }
            return dat;
        },
        //获取某年的第一天
        _getFirstWeekBegDay: function (year) {
            var tempdate = new Date(year, 0, 1);
            var temp = tempdate.getDay();
            if (temp == 1) {
                return tempdate;
            }
            temp = temp == 0 ? 7 : temp;
            tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
            return new Date(tempdate);
        },
        GetStartDate:function(){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            var y = _self.DateYearValue;
            var m = 0, d = 1;
            var dv = _self.DateValue;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    var firstDay = _self._getFirstWeekBegDay(y);
                    //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
                    var time = (dv - 1) * 7 * 24 * 3600000;
                    var beginDay = firstDay;
                    //为日期对象 date 重新设置成时间 time
                    beginDay.setTime(firstDay.valueOf() + time);
                    return beginDay;
                    m = 1;
                    d = 2;
                    break;
                case (opt.DateTypes.MonthValue): //月
                    m = dv;
                    d = 1;
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    m = dv * 3 - 2;
                    d = 1;
                    break;
                case (opt.DateTypes.YearValue): //年
                    m = 1;
                    d = 1;
                    break;
            }
            return new Date(y, m - 1, d);
        },
        GetEndDate:function(){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            var y = _self.DateYearValue;
            var m = 0, d = 0;
            var dv = _self.DateValue;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    var firstDay = _self._getFirstWeekBegDay(y);
                    //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
                    var time = (dv - 1) * 7 * 24 * 3600000;
                    var weekTime = 6 * 24 * 3600000;
                    var endDay = firstDay;
                    //为日期对象 date 重新设置成时间 time
                    endDay.setTime(firstDay.valueOf() + weekTime + time);
                    return endDay;
                    break;
                case (opt.DateTypes.MonthValue): //月
                    m = dv;
                    return new Date(y, m, 0);
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    m = dv * 3;
                    return new Date(y, m, 0);
                    break;
                case (opt.DateTypes.YearValue): //年
                    m = 12;
                    return new Date(y, m, 0);
                    break;
            }
            return new Date(y, m - 1, d);
        },
        ChangeDateValue: function () {
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            _self._getValues();
            _self._dealDateInfo();
            var objbtnNow = opt.LastNowNextBtnObjID + ' #lkNowTime';            
            $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
            if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                opt.CallMethod();
            }
        },
        CheckIsCurrent: function (dt) {
            var opt = this.options;
            if (!opt.YearObjID || !opt.DateValObjID) {
                return false;
            }
            var objYear = opt.YearObjID;  
            var objDataVal = opt.DateValObjID;

            var y = new Date().getFullYear();
            var dv = 0;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    dv = this.GetWeekIndex();
                    break;
                case (opt.DateTypes.MonthValue): //月
                    dv = new Date().getMonth() + 1;
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    var m = new Date().getMonth() + 1;
                    dv = Math.floor((m % 3 == 0 ? (m / 3) : (m / 3 + 1)));
                    break;
                case (opt.DateTypes.YearValue): //年
                    return y == $(objYear).numberspinner('getValue');
                    break;
            }
            return y == $(objYear).numberspinner('getValue') && dv == $(objDataVal).combobox('getValue');

        },
        GetWeekIndex: function () {  //取当前时间的一年中的第几周
            var totalDays = 0;
            var now = new Date();
            var years = now.getYear();
            if (years < 1000)
                years += 1900;
            var days = new Array(12);
            days[0] = 31;
            days[2] = 31;
            days[3] = 30;
            days[4] = 31;
            days[5] = 30;
            days[6] = 31;
            days[7] = 31;
            days[8] = 30;
            days[9] = 31;
            days[10] = 30;
            days[11] = 31;

            //判断是否为闰年，针对2月的天数进行计算
            if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
                days[1] = 29;
            } else {
                days[1] = 28;
            }

            if (now.getMonth() == 0) {
                totalDays = totalDays + now.getDate();
            } else {
                var curMonth = now.getMonth();
                for (var count = 1; count <= curMonth; count++) {
                    totalDays = totalDays + days[count - 1];
                }
                totalDays = totalDays + now.getDate();
            }
            //得到第几周
            var week = Math.round(totalDays / 7);
            return week + 1;
        },
        _changeType: function () {
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            var dtn = opt.DateTypeName;
 
            var getdt = parseInt(
                opt.ShowDateType ?
                $(opt.DateTypeObjID + ' input[name="' + dtn + '"]:checked').val() : $('#yqmw_' + dtn).val()
                );
            if (dt == getdt) {
                return false;
            }
            else {
                this.options.DateType = getdt;
            }
 
            if (getdt == opt.DateTypes.YearValue) {
                $(opt.DateValObjID + " + .combo").hide();
            }
            else {
                $(opt.DateValObjID + " + .combo").show();
            }
            this._initValue(getdt);
            this._renderLastNextBtn(getdt);
            if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                opt.CallMethod();
            }
        },
        _goLast:function(){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    _self.DateValue--;
                    if (_self.DateValue <= 0) {
                        _self.DateYearValue--;
                        _self.DateValue = 52;
                    }
                    break;
                case (opt.DateTypes.MonthValue): //月
                    _self.DateValue--;
                    if (_self.DateValue <= 0) {
                        _self.DateYearValue--;
                        _self.DateValue = 12;
                    }
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    _self.DateValue--;
                    if (_self.DateValue <= 0) {
                        _self.DateYearValue--;
                        _self.DateValue = 4;
                    }
                    break;
                case (opt.DateTypes.YearValue): //年
                    _self.DateYearValue--;
                    break;
            }
            _self._setValues();
            _self._dealDateInfo();
        },
        _goNow: function () {
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            var y = new Date().getFullYear();
            _self.DateYearValue = y;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    _self.DateValue = _self.GetWeekIndex();
                    break;
                case (opt.DateTypes.MonthValue): //月
                    _self.DateValue = new Date().getMonth() + 1;
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    var m = new Date().getMonth() + 1;
                    var q = Math.floor((m % 3 == 0 ? (m / 3) : (m / 3 + 1)));
                    _self.DateValue = q;
                    break;
            }
            _self._setValues();
            _self._dealDateInfo();
        },
        _goNext:function(){
            var _self = this;
            var opt = _self.options;
            var dt = opt.DateType;
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    _self.DateValue++;
                    if (_self.DateValue > 52) {
                        _self.DateYearValue++;
                        _self.DateValue = 1;
                    }
                    break;
                case (opt.DateTypes.MonthValue): //月
                    _self.DateValue++;
                    if (_self.DateValue > 12) {
                        _self.DateYearValue++;
                        _self.DateValue = 1;
                    }
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    _self.DateValue++;
                    if (_self.DateValue > 4) {
                        _self.DateYearValue++;
                        _self.DateValue = 1;
                    }
                    break;
                case (opt.DateTypes.YearValue): //年
                    _self.DateYearValue++;
                    break;
            }
            _self._setValues();
            _self._dealDateInfo();
        },
        _renderLastNextBtn: function (dt) {
            var _self = this;
            var opt = _self.options;
            if (!opt.ShowLastNowNextBtn || !opt.LastNowNextBtnObjID) {
                return false;
            }
            $(opt.LastNowNextBtnObjID).html('<a id="lkLastTime">上</a> <a id="lkNowTime">本</a> <a id="lkNextTime">下</a>');
 
            if (!opt.YearObjID || !opt.DateValObjID) {
                return false;
            }
            var objYear = opt.YearObjID;
            var objDataVal = opt.DateValObjID;

            var objbtnLast = opt.LastNowNextBtnObjID+' #lkLastTime';
            var objbtnNow = opt.LastNowNextBtnObjID + ' #lkNowTime';
            var objbtnNext = opt.LastNowNextBtnObjID + ' #lkNextTime';

            $(objbtnLast).unbind("click");
            $(objbtnNow).unbind("click");
            $(objbtnNext).unbind("click");
             
            switch (dt) {
                case (opt.DateTypes.WeekValue): //周
                    $(objbtnLast).linkbutton({
                        iconCls: 'icon-undo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '上一周'
                    });
                    $(objbtnLast).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goLast();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNow).linkbutton({
                        iconCls: 'icon-home',
                        plain: true,
                        disabled: _self.CheckIsCurrent(dt) || opt.ReadOnly,
                        text: '本周'
                    });
                    $(objbtnNow).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        if (_self.CheckIsCurrent(dt)) {
                            $.messager.show({ title: 'Info', msg: '已是本周！' });
                            return false;
                        }
                        _self._goNow();
                        $(objbtnNow).linkbutton('disable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNext).linkbutton({
                        iconCls: 'icon-redo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '下一周'
                    });
                    $(objbtnNext).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goNext();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    break;
                case (opt.DateTypes.MonthValue): //月
                    $(objbtnLast).linkbutton({
                        iconCls: 'icon-undo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '上一月'
                    });
                    var v = this;
                    $(objbtnLast).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goLast();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNow).linkbutton({
                        iconCls: 'icon-home',
                        plain: true,
                        disabled: _self.CheckIsCurrent(dt) || opt.ReadOnly,
                        text: '当月'
                    });
                    $(objbtnNow).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        if (_self.CheckIsCurrent(dt)) {
                            $.messager.show({ title: 'Info', msg: '已是当月！' });
                            return false;
                        }
                        _self._goNow();
                        $(objbtnNow).linkbutton('disable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNext).linkbutton({
                        iconCls: 'icon-redo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '下一月'
                    });
                    $(objbtnNext).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goNext();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    break;
                case (opt.DateTypes.QuarterValue): //季
                    $(objbtnLast).linkbutton({
                        iconCls: 'icon-undo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '上一季度'
                    });
                    $(objbtnLast).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goLast();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNow).linkbutton({
                        iconCls: 'icon-home',
                        plain: true,
                        disabled: _self.CheckIsCurrent(dt) || opt.ReadOnly,
                        text: '本季度'
                    });
                    $(objbtnNow).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        if (_self.CheckIsCurrent(dt)) {
                            $.messager.show({ title: 'Info', msg: '已是本季度！' });
                            return false;
                        }
                        _self._goNow();
                        $(objbtnNow).linkbutton('disable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNext).linkbutton({
                        iconCls: 'icon-redo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '下一季度'
                    });
                    $(objbtnNext).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goNext();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    break;
                case (opt.DateTypes.YearValue): //年
                    $(objbtnLast).linkbutton({
                        iconCls: 'icon-undo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '上一年'
                    });
                    $(objbtnLast).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goLast();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNow).linkbutton({
                        iconCls: 'icon-home',
                        plain: true,
                        disabled: _self.CheckIsCurrent(dt) || opt.ReadOnly,
                        text: '今年'
                    });
                    $(objbtnNow).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        if (_self.CheckIsCurrent(dt)) {
                            $.messager.show({ title: 'Info', msg: '已是今年！' });
                            return false;
                        }
                        _self._goNow();
                        $(objbtnNow).linkbutton('disable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    $(objbtnNext).linkbutton({
                        iconCls: 'icon-redo',
                        plain: true,
                        disabled: opt.ReadOnly,
                        text: '下一年'
                    });
                    $(objbtnNext).click(function () {
                        if (opt.ReadOnly) {
                            return false;
                        }
                        _self._goNext();
                        $(objbtnNow).linkbutton(_self.CheckIsCurrent(dt) ? 'disable' : 'enable');
                        if (opt.CallMethod && typeof (opt.CallMethod) == "function") {
                            opt.CallMethod();
                        }
                    });
                    break;
            }

        }
    };

    $.fn.YqmwDateSelect = function (options) {
        options = $.extend(true, defaults, options || {});

        return new YqmwDateSelect($(this), options);
    };
 

})(jQuery);
