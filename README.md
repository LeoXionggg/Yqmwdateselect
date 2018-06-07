# Yqmwdateselect
Year,Quarter,Month,Week select components for js


require Jquery and easyui

Usage:

    <script src="../uifiles/js/lib/jquery1.8.0.min.js" type="text/javascript"></script>
    <script src="../uifiles/js/lib/jquery-easyui/jquery.easyui.min.js" type="text/javascript"></script> 
    <script src="../uifiles/js/YqmwDateSelect.js" type="text/javascript"></script>
    
var YqmwDate;
        $(document).ready(function () {

            YqmwDate = $(document).YqmwDateSelect({
                DateTypes: {
             
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
                    doLoadUserList();
                    doLoadPerformance();
                }
            });
        });
