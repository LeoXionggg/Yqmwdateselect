# Yqmwdateselect
Year,Quarter,Month,Week select components for js


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
            WeekShow: false
        },
        DateType: 3,
        YearObjID: '#fmSetPerformance #WSDateYear',
        DateValObjID: '#fmSetPerformance #WSDateVal',
        LastNowNextBtnObjID: '#fmSetPerformance #spanDateButton',
        ShowLastNowNextBtn: true,
        ShowDateType: false,
        DateTypeName: 'WSType',
        DateTypeObjID: '#fmSetPerformance #spanWSType',
        DateInfoObjID: '#spanDateInfo',
        ReadOnly: false,
        CallMethod: function () {
            // call function...
        }
    });
});
```

```html
<form id="fmSetPerformance" method="post">
    <div style="text-align:center;padding:20px;font-size:16px;border-bottom:dashed 1px #ccc;">
        <span id="spanWSType"></span>
        <div style="padding-top:20px;">
            <span id="spanDateButton"></span>
        </div>
    </div>    
    <div style="padding:10px;">
        <b> 时间：</b>
         <span id="spanWSDateYear">
            <input name="WSDateYear" id="WSDateYear" style="width:90px;" />
        </span>
        <span id="spanWSDateValue">
            <input name="WSDateVal" id="WSDateVal" style="width:80px;" />
        </span>
        <div style="padding:10px 70px;">
            [<span id="spanDateInfo"></span>]
        </div>
    </div>
</form>
```
