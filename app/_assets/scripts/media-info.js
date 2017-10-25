'use strict';
$(document).on('pageInit', '#page-media-info', function (e, id, page) {
  $('.j-red_click').click(function () {
    $('.j-plate_red').show();
  });
  $('.j-close').on('click', function () {
    var close_obj = $(this).data('close-obj');
    $(close_obj).hide();
  });
  $('.j-share_click').click(function () {
    $('.j-plate_share').show();
  });
  $('.j-plate_share').click(function () {
    $('.j-plate_share').hide();
  });
});
