(function (global) {
  'use strict';
  /**
   * Makes the XMDD namespace.
   * var XMDD = MakeXMDD();
   */
  global.MakeHF = function () {
    var serve = location.host;
    //var serve = 'dev.xiaomadada.com';
    var protocol = location.protocol;
    //var protocol = 'https:';

    /** @namespace
     */
    var HF = function () {
      return HF.get.apply(global, arguments);
    };

    HF.config = {
      serve: serve,
      server: protocol + '//' + serve + '/webhuzhu/rest/api',
      server2: protocol + '//' + serve + '/9huzhu/rest/api',
      serverupload: protocol + '//' + serve + '/paa/rest/api',
      server9huzhu: protocol + '//' + serve + '/xmdd-web/xmdd-huzhu-9yuan',
      serverglobal: protocol + '//' + serve + '/webhuzhu',
      // server: 'http://192.168.1.225:8081/9huzhu.local/rest/api',
      // server: '/paasnx',
      imgDefault: protocol + '//7xjclc.com2.z0.glb.clouddn.com/shop-list-default.png',
      timeout: 10000,
      ckCookie: '9HUZHU_PHONE',
      carlicence: {
        regExp: /^[\u6d59\u6caa\u4eac\u7ca4\u6d25\u82cf\u5ddd\u8fbd\u9ed1\u9c81\u6e58\u8499\u7518\u5180\u9752\u65b0\u9655\u5b81\u7696\u8c6b\u9102\u664b\u6e1d\u9ed4\u8d35\u6842\u85cf\u4e91\u8d63\u5409\u95fd\u743c\u4f7f]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{5}$/
      },
      cellphone: {
        regExp: /^1[0-9]{10}$/
      },
      verifycode: {
        regExp: /^[0-9]{12}$/
      },
      vcode: {
        regExp: /^[0-9]{4}$/
      },
      rating: {
        regExp: /^[1-5]{1}$/
      },
      comment: {
        limit: {
          min: 0,
          max: 100
        },
        regExp: /^(.){0,100}$/
      },
      path: '',
      icons: {
        amap: {
          default: 'assets/images/xm-ic-amap-marker.png',
          click: 'assets/images/xm-ic-amap-marker-click.png'
        },
        coupon: {
          default: 'assets/images/xm-ic-coupon-logo-default.png',
          gray: 'assets/images/xm-ic-coupon-logo-gray.png'
        }
      }
    };

    HF.api = {

      services: {
        openid: {
          wx: protocol + '//' + serve + '/9huzhu/general/wx/auth/get'
        },
        auth: {
          getVcode: HF.config.server + '/vcode/get',
          getVcode2: HF.config.server2 + '/vcode/get',
          byVcode: HF.config.server + '/auth/by-vcode',
          byVcode2: HF.config.server2 + '/auth/by-vcode',
          loginOut: HF.config.server + '/auth/loginout',
          judegeUser: HF.config.server + '/activity/join/group/vcode'
        }
      }

    };
    HF.isWeixin = function () {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i)) {
        return true;
      } else {
        return false;
      }
    };

    HF.pay = function (cars, paychannel, tradetype, groupid) {
      var tkCookie = Cookies.get('9yuan-pay');
      var tkObj = (tkCookie !== undefined && tkCookie !== null) ? $.parseJSON(Base64.decode(tkCookie)) : undefined;
      var invitationcode;
      if (tkObj) {
        invitationcode = tkObj.invitationcode;
      }
      var payinfo = [];
      var payParams = [];
      for (var i = 0; i < cars.length; i++) {
        var usercarid = cars[i].id;
        var licencenumber = cars[i].licencenumber;
        var memberid = cars[i].refid;
        var price = $('#' + usercarid).text();
        var cnt = price / 9;
        var all = {};
        if (cnt > 0) {
          all = {
            usercarid: usercarid,
            licencenumber: licencenumber,
            memberid: memberid,
            cnt: cnt
          };
          payinfo.push(all);
        }
      }
      if (invitationcode) {
        payParams = {
          params: {
            payinfo: payinfo,
            paychannel: paychannel,
            tradetype: tradetype,
            groupid: groupid,
            channel: 999999,
            invitationcode: invitationcode
          },
          id: 1
        };
      } else {
        payParams = {
          params: {
            payinfo: payinfo,
            paychannel: paychannel,
            tradetype: tradetype,
            groupid: groupid,
            channel: 999999
          },
          id: 1
        };
      }
      //console.log(JSON.stringify(payParams));
      $.HFAjax({
        url: HF.api.services.mine.pay,
        data: JSON.stringify(payParams),
        type: 'POST',
        timeout: HF.config.timeout,
        success: function (respDataPay, statusPay) {
          if (respDataPay.rc === 0) {
            var payUrl = respDataPay.payurl;
            window.location.href = payUrl;
          }
        },
        error: function () {
          HF.errorMessage().alert(1, '网络异常，请重试', 2);
        }
      });
    };

    //错误消息下滑窗口
    HF.errorMessage = function () {
      // SETTINGS
      // *********************************************
      // General
      var shadow = true;
      var font_size_small = '14px';
      var font_size_big = '24px';
      var font_change_screen_width = 600;
      var animation_delay = 0.3;

      // notie.alert colors
      var alert_color_success_background = '#fff';
      var alert_color_text = '#f59332';
      // ID's for use withn your own .css file (OPTIONAL)
      // (Be sure to use !important to override the javascript)
      // Example: #notie-alert-inner { padding: 30px !important; }
      var alert_outer_id = 'notie-alert-outer';
      var alert_inner_id = 'notie-alert-inner';
      var alert_text_id = 'notie-alert-text';
      var alert_is_showing = false;
      var alert_timeout_1;
      var alert_timeout_2;
      var height = 0;
      var was_clicked_counter = 0;
      var original_body_height, original_body_overflow;
      // notie elements and styling
      var alert_outer = document.createElement('div');
      alert_outer.id = alert_outer_id;
      alert_outer.style.position = 'fixed';
      alert_outer.style.top = '0';
      alert_outer.style.left = '0';
      alert_outer.style.zIndex = '999999999';
      alert_outer.style.height = 'auto';
      alert_outer.style.width = '100%';
      alert_outer.style.display = 'none';
      alert_outer.style.textAlign = 'center';
      alert_outer.style.cursor = 'default';
      alert_outer.style.MozTransition = '';
      alert_outer.style.WebkitTransition = '';
      alert_outer.style.transition = '';
      alert_outer.style.cursor = 'pointer';

      var alert_inner = document.createElement('div');
      alert_inner.id = alert_inner_id;
      alert_inner.style.padding = '10px';
      alert_inner.style.display = 'table-cell';
      alert_inner.style.verticalAlign = 'middle';
      alert_outer.appendChild(alert_inner);

      // Initialize notie text
      var alert_text = document.createElement('span');
      alert_text.id = alert_text_id;
      alert_text.style.color = alert_color_text;
      if (window.innerWidth <= font_change_screen_width) {
        alert_text.style.fontSize = font_size_small;
      } else {
        alert_text.style.fontSize = font_size_big;
      }
      var resizeListener = function resizeListener(ele) {
        if (window.innerWidth <= font_change_screen_width) {
          ele.style.fontSize = font_size_small;
        } else {
          ele.style.fontSize = font_size_big;
        }
      };


      // Debounce function (credit to Underscore.js)
      var debounce_time = 500;
      var debounce = function debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };


      function alert_hide(callback) {

        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        setTimeout(function () {

          if (shadow) {
            alert_outer.style.boxShadow = '';
          }
          alert_outer.style.MozTransition = '';
          alert_outer.style.WebkitTransition = '';
          alert_outer.style.transition = '';

          alert_outer.style.top = '-10000px';

          alert_is_showing = false;

          if (callback) {
            callback();
          }

        }, (animation_delay * 1000 + 10));

      }

      function alert_show(type, message, seconds) {

        alert_is_showing = true;

        var duration = 0;
        if (typeof seconds === 'undefined') {
          duration = 3000;
        } else if (seconds < 1) {
          duration = 1000;
        } else {
          duration = seconds * 1000;
        }

        // Set notie type (background color)
        switch (type) {
          case 1:
            alert_outer.style.backgroundColor = alert_color_success_background;
            break;
        }

        // Set notie text
        alert_text.innerHTML = message;

        // Get notie's height
        alert_outer.style.top = '-10000px';
        alert_outer.style.display = 'table';
        alert_outer.style.top = '-' + alert_outer.offsetHeight - 5 + 'px';

        alert_timeout_1 = setTimeout(function () {

          if (shadow) {
            alert_outer.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)';
          }
          alert_outer.style.MozTransition = 'all ' + animation_delay + 's ease';
          alert_outer.style.WebkitTransition = 'all ' + animation_delay + 's ease';
          alert_outer.style.transition = 'all ' + animation_delay + 's ease';

          alert_outer.style.top = 0;

          alert_timeout_2 = setTimeout(function () {

            alert_hide(function () {
              // Nothing
            });

          }, duration);

        }, 20);

      }


      function alert(type, message, seconds) {

        // Blur active element for use of enter key, focus input
        document.activeElement.blur();

        was_clicked_counter++;

        setTimeout(function () {
          was_clicked_counter--;
        }, (animation_delay * 1000 + 10));

        if (was_clicked_counter === 1) {

          if (alert_is_showing) {

            clearTimeout(alert_timeout_1);
            clearTimeout(alert_timeout_2);

            alert_hide(function () {
              alert_show(type, message, seconds);
            });

          } else {
            alert_show(type, message, seconds);
          }

        }

      }


      // Event listener for enter and escape keys
      window.addEventListener('keydown', function (event) {
        var enter_clicked = (event.which === 13 || event.keyCode === 13);
        var escape_clicked = (event.which === 27 || event.keyCode === 27);
        if (alert_is_showing) {
          if (enter_clicked || escape_clicked) {
            clearTimeout(alert_timeout_1);
            clearTimeout(alert_timeout_2);
            alert_hide();
          }
        }
      });


      // addEventListener polyfill, fixes a style.height issue for IE8
      if (typeof Element.prototype.addEventListener === 'undefined') {
        Element.prototype.addEventListener = Window.prototype.addEventListener = function (e, callback) {
          e = 'on' + e;
          return this.attachEvent(e, callback);
        };
      }


      // Scroll disable and enable for notie.confirm and notie.input


      function scroll_disable() {
        original_body_height = document.body.style.height;
        original_body_overflow = document.body.style.overflow;
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
      }

      function scroll_enable() {
        document.body.style.height = original_body_height;
        document.body.style.overflow = original_body_overflow;
      }

      // *********************************************

      // NOTIE.ALERT
      // *********************************************


      // Hide alert on click
      alert_outer.onclick = function () {
        clearTimeout(alert_timeout_1);
        clearTimeout(alert_timeout_2);
        alert_hide();
      };


      window.addEventListener('resize', debounce(resizeListener.bind(null, alert_text), debounce_time), true);
      alert_inner.appendChild(alert_text);

      // Attach notie to the body element
      document.body.appendChild(alert_outer);

      // Declare variables


      return {
        alert: alert
      };
    };

    HF.weChatShare = function (groupid, getShareCode) {
      var title, link, imgUrl, desc;
      var enableShare = true;
      // var href_arr = location.href.split('/');
      // href_arr.pop();
      //(protocol + '//' + serve + '/9huzhu/general/wx/auth/get?type=2');
      //console.log(href_arr);
      var linkUrl;
      var urlGroupid = 1;
      var sharecode;
      if (groupid === 1 || groupid === 2) {
        urlGroupid = groupid;
      } else {
        urlGroupid = 1;
      }
      if (getShareCode === undefined || getShareCode === '' || getShareCode === 'undefined') {
        sharecode = '';
      } else {
        sharecode = getShareCode;
      }
      linkUrl = protocol + '//' + serve + '/9huzhu/general/wx/auth/get?type=2&sharecode=' + sharecode + '&groupid=' + urlGroupid;
      $.ajax({
        url: HF.config.serverglobal + '/general/v2/getJddkData?url=' + encodeURIComponent(location.href),
        // url: 'http://dev.xiaomadada.com/paaagent/rest/api/user/wx/config?url=' + encodeURIComponent(location.href),
        data: null,
        type: 'get',
        timeout: HF.config.timeout,
        success: function (respData, status) {
          title = '9元即享30万保障，前3名免费加入，先到先得！';
          imgUrl = 'http://o78yed0m9.qnssl.com/1066.png';
          desc = '小马达达9互助，一车有难万车支援，安全透明的汽车互助平台。';
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: respData.appid, // 必填，公众号的唯一标识
            timestamp: respData.timestamp, // 必填，生成签名的时间戳
            nonceStr: respData.nonceStr, // 必填，生成签名的随机串
            signature: respData.signature, // 必填，签名，见附录1
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            if (enableShare) {
              wx.hideAllNonBaseMenuItem();
              wx.showMenuItems({
                menuList: [
                  'menuItem:share:appMessage', // 发送给朋友
                  'menuItem:share:timeline', // 分享到朋友圈
                  'menuItem:copyUrl' //查看链接
                ],
                success: function (res) {

                },
                fail: function (res) {
                  console.log(JSON.stringify(res));
                }
              });
              wx.onMenuShareAppMessage({
                title: title,
                link: linkUrl,
                imgUrl: imgUrl,
                desc: desc,
                success: function () {
                  $('.j-simple_tip').hide();
                },
                cancel: function () {
                  $('.j-simple_tip').hide();
                }
              });
              wx.onMenuShareTimeline({
                title: title,
                link: linkUrl,
                imgUrl: imgUrl,
                success: function () {
                  $('.j-simple_tip').hide();
                },
                cancel: function () {
                  $('.j-simple_tip').hide();
                }
              });
              wx.error(function (res) {
                console.log('errorMSG:' + res.errMsg);
              });
            } else {
              wx.hideAllNonBaseMenuItem();
            }
          });
        },
        error: function () {
          HF.errorMessage().alert(1, '网络异常，请重试', 2);
        }
      });
    };

    HF.noShare = function () {
      $.ajax({
        url: HF.config.serverglobal + '/general/v2/getJddkData?url=' + encodeURIComponent(location.href),
        // url: 'http://dev.xiaomadada.com/paaagent/rest/api/user/wx/config?url=' + encodeURIComponent(location.href),
        data: null,
        type: 'get',
        timeout: HF.config.timeout,
        success: function (respData, status) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: respData.appid, // 必填，公众号的唯一标识
            timestamp: respData.timestamp, // 必填，生成签名的时间戳
            nonceStr: respData.nonceStr, // 必填，生成签名的随机串
            signature: respData.signature, // 必填，签名，见附录1
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            wx.hideAllNonBaseMenuItem();
            wx.showMenuItems({
              menuList: [
                'menuItem:copyUrl' //查看链接
              ],
              success: function (res) {

              },
              fail: function (res) {
                console.log(JSON.stringify(res));
              }
            });
            wx.error(function (res) {
              console.debug('errorMSG:' + res.errMsg);
            });
          });
        }
      });
    };

    fecha.masks.YYYYMMDD = 'YYYY-MM-DD';
    fecha.masks.YYYYMMDDHHmm = 'YYYY-MM-DD HH:mm';
    fecha.masks.YYYYMMDDHHmmss = 'YYYY-MM-DD HH:mm:ss';
    fecha.masks.HHmmss = 'HH:mm:ss';
    fecha.masks.YYYYdotMMdotDD = 'YYYY.MM.DD';
    fecha.masks.YYYYdotMMdotDDHHmmss = 'YYYY.MM.DD HH:mm:ss';
    fecha.masks.YYYYdotMMdotDDHHmm = 'YYYY.MM.DD HH:mm';

    HF.fecha = function (dateObj, format, pattern) {
      if (Object.prototype.toString.call(dateObj) === '[object Date]') {
        return fecha.format(dateObj, fecha.masks[format]);
      } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
        try {
          return fecha.format(fecha.parse(dateObj, fecha.masks[pattern]), fecha.masks[format]);
        } catch (e) {
          return '';
        }
      } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
        return fecha.format(new Date(dateObj), fecha.masks[format]);
      } else {
        return '';
      }
    };

    return HF;

  };

  global.HF = MakeHF();

})(window);

