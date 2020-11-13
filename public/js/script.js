var ACTIVE_TAB = 1;

$(document).ready(function () {
  showTab();
  $('body').on('click', '.btn-tab', tabSelect);
  $('body').on('focusout', '#path_folder', setCookieFolderPath);
  $('body').on('focusout', '#submission_id', setCookieSubmission);
  $('#path_folder').val(getCookie('folder_path'));
  $('#submission_id').val(getCookie('submission_id'));
});

function showTab() {
  $('.nav-tab').find('.btn-tab').removeClass('btn-success');
  $(`#tab_${ACTIVE_TAB}`).removeClass('btn-outline-success');
  $(`#tab_${ACTIVE_TAB}`).addClass('btn-success');
}

function dataTab(check_tab) {
  if (check_tab) {
    $('.text-primary').show();
  } else {
    $('.text-primary').hide();
  }
}

function tabSelect() {
  const index_tab = parseInt($(this).data('tab'));
  if (index_tab === ACTIVE_TAB)
    return;
  ACTIVE_TAB = index_tab;
  showTab();
  dataTab(ACTIVE_TAB === 1);
}

function setCookieFolderPath() {
  setCookie("folder_path", $(this).val().trim(), 90);
}

function setCookieSubmission() {
  setCookie("submission_id", $(this).val().trim(), 90);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
