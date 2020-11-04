var ACTIVE_TAB = 1;

$(document).ready(function () {
  showTab();
  $('body').on('click', '.btn-tab', tabSelect);
});

function showTab() {
  $('.nav-tab').find('.btn-tab').removeClass('btn-success');
  $(`#tab_${ACTIVE_TAB}`).removeClass('btn-outline-success');
  $(`#tab_${ACTIVE_TAB}`).addClass('btn-success');
}

function tabSelect() {
  const index_tab = parseInt($(this).data('tab'));
  if (index_tab === ACTIVE_TAB)
    return;
  ACTIVE_TAB = index_tab;
  showTab();
}
