'use strict';
$('.j-link').each(function () {
  $(this).click(function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var hide_obj = $(this).data('tab');
    $(hide_obj).show();
    for(var i = 0; i < $(this).siblings().length; i++) {
      var oHide_obj = $(this).siblings().eq(i).data('tab');
      $(oHide_obj).hide();
    }
  });
});
$('.j-m-alert').each(function () {
  $(this).click(function () {
    var show_obj = $(this).data('alert');
    $(show_obj).show();
  });
});
$('.j-close').on('click', function () {
  var close_obj = $(this).data('close-obj');
  $(close_obj).hide();
});
$.init();
