'use strict';
$(document).on('pageInit', '#page-enchashment', function (e, id, page) {
  var timerArray = [];
  function qrCdTime() {
    while (timerArray.length > 0) {
      clearInterval(timerArray.pop());
    }
    $('.j-get_qr').hide();
    $('.j-disable_qr').css('display', 'block');
    var time_att = 60;
    var time_new = time_att;
    $('.j-disable_qr').text('' + time_new + 's');
    var timer = setInterval(function () {
      time_new = parseInt(time_new - 1);
      $('.j-disable_qr').text('' + time_new + 's');
      if (time_new < 0) {
        $('.j-get_qr').show();
        $('.j-disable_qr').hide();
        $('.j-disable_qr').text('' + time_att + 's');
        clearInterval(timer);
      }
    }, 1000);
    timerArray.push(timer);
  }

  $('.j-get_qr').click(function(){
    qrCdTime();
  });
});
