'use strict';
$(document).on('pageInit', '#page-note-read', function (e, id, page) {
  $('.j-red_click').click(function () {
    $('.j-plate_red').show();
  });
  $('.j-close').on('click', function () {
    var close_obj = $(this).data('close-obj');
    $(close_obj).hide();
  });
});
