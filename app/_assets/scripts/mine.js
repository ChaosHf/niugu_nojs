'use strict';
$(document).on('pageInit', '#page-mine', function (e, id, page) {
  $('.j-name_click').click(function () {
    $('.j-plate_name').show();
  });
  $('.j-close').on('click', function () {
    var close_obj = $(this).data('close-obj');
    $(close_obj).hide();
  });

});
