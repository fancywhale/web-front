
$('button#dateRange')['daterangepicker']({
  locale: {
    applyLabel: '确定',
    cancelLabel: '取消'
  }
}, function(startDate, endDate) {
  let startDateStr = startDate.format(dateFormat);
  let endDateStr = endDate.format(dateFormat);
  $('#startDate').text(startDateStr);
  $('#endDate').text(endDateStr);  
});
