'use strict';
$(document).on('pageInit', '#page-account', function (e, id, page) {
  $('.j-recharge').on('click', function(){
    $('.j-alert_account').show();
  });
  $('.j-close').on('click', function () {
    var close_obj = $(this).data('close-obj');
    $(close_obj).hide();
  });
  $('.m-account_num').each(function(){
    $(this).click(function(){
      $('.m-box').removeClass('active');
      $(this).children('.m-box').addClass('active');
    });
  });
  $('.j-enchashment').click(function(){
    window.location.href = 'enchashment.html';
  });
});
