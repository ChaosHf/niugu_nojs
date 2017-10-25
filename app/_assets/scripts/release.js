'use strict';
$(document).on('pageInit', '#page-release', function (e, id, page) {
  $('.j-submit').on('click', function(event) {
    $('.j-upload').trigger('click');
  });

});
