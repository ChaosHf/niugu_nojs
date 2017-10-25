'use strict';
$(document).on('pageInit', '#page-media', function (e, id, page) {
  $('.swiper-container').swiper({
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true
  });
});
