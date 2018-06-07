# Yqmwdateselect
Year,Quarter,Month,Week select components for js

![Year](https://github.com/LeoXionggg/Yqmwdateselect/blob/master/y.jpg)
![Quarter](https://github.com/LeoXionggg/Yqmwdateselect/blob/master/q.jpg)

![Month](https://github.com/LeoXionggg/Yqmwdateselect/blob/master/m.jpg)
![Week](https://github.com/LeoXionggg/Yqmwdateselect/blob/master/w.jpg)

require Jquery and easyui

    <script src="/js/lib/jquery1.8.0.min.js" type="text/javascript"></script>
    <script src="/js/lib/jquery-easyui/jquery.easyui.min.js" type="text/javascript"></script> 
    <script src="/js/YqmwDateSelect.js" type="text/javascript"></script>
    
Usage:

```javascript
var YqmwDate;
$(document).ready(function () {
    YqmwDate = $(document).YqmwDateSelect({
        DateTypes: {
            YearValue: 15,   //Year type value
            YearShow: true,
            QuarterValue: 14,
            QuarterShow: true,
            MonthValue: 13,
            MonthShow: true,
            WeekValue: 12,
            WeekShow: true
        },
        DateType: 13,
        YearObjID: '#WSDateYear',
        DateValObjID: '#WSDateVal',
        LastNowNextBtnObjID: '#spanDateButton',
        ShowLastNowNextBtn: true,
        ShowDateType: true,
        DateTypeObjID: '',
        DateTypeName: 'WSType',
        DateTypeObjID: '#spanWSType',
        DateInfoObjID: '#spanDateInfo',
        ReadOnly: false,
        CallMethod: function () {
            // call function...
        }
    });
});
```

```html
<span id="spanWSType"></span>
<div style="padding-top:10px;">
    <span id="spanDateButton"></span>
</div>
<div style="padding:10px;"> 
        <input name="WSDateYear" id="WSDateYear" style="width:90px;" /> 
        <input name="WSDateVal" id="WSDateVal" style="width:80px;" /> 
</div>
<div style="padding:10px;">[<span id="spanDateInfo"></span>]</div>
```
