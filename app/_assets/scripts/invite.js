'use strict';
$(document).on('pageInit', '#page-invite', function (e, id, page) {
  //$('.j-havecode').click(function () {
  //    if($('.qr-block').hasClass('disnone') && $('.icon-block').hasClass('disblock')){
  //      $('.qr-block').removeClass('disnone').addClass('disblock');
  //      $('.icon-block').removeClass('disblock').addClass('disnone');
  //    }else if($('.qr-block').hasClass('disblock') && $('.icon-block').hasClass('disnone')){
  //      $('.icon-block').removeClass('disnone').addClass('disblock');
  //      $('.qr-block').removeClass('disblock').addClass('disnone');
  //    }
  //});
  $('.j-rule_click').click(function () {
    $('.j-plate_rule').show();
  });
  $('.j-close').on('click', function () {
    var close_obj = $(this).data('close-obj');
    $(close_obj).hide();
  });
});
