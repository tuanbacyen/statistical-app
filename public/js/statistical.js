$(document).ready(function () {
  $('body').on('click', '#btn_statistical', readDir);
});

function readDir() {
  $.ajax({
    url: "/read_dir",
    data: {
      directory: $("#path_folder").val(),
      submission_id: $("#submission_id").val()
    },
    type: "post",
    success: function (result) {
      compare_sdt(result.data);
    }
  });
}

function compare_sdt(data) {
  data.forEach((item, i) => {
    render_record_sdt(item, i);
    SDT_IN_FILE.push(item)
  });

}

function render_record_sdt(data_item, index) {
  const x = SDT_ORIGINS.filter((x) => { return x.country === data_item.country && x.sale_code === data_item.sale_code; }).length;
  var wrong = "";
  if (x <= 0) {
    wrong = "class='bg-danger'";
  }
  $("#tbl_body_sdt").append(`<tr ${wrong}><th scope="row">${index}</th><td>${data_item.country}</td><td>${data_item.sale_code}</td><td>${x > 0}</td></tr>`);
}
