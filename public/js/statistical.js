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
      compare_cs(result.data);
    }
  });
}

function compare_cs(data) {
  $("#tbl_body_sdt").html("");
  data.forEach((item, i) => {
    render_record_sdt(item, i);
  });

}

function render_record_sdt(data_item, index) {
  console.log(data_item);
  const country_sale = data_item.country_sale;
  const x = COUNTRY_SALE_CORRECT.filter((x) => { return x.country === country_sale.country && x.sale_code === country_sale.sale_code; }).length;
  var wrong = "class='text-info'";
  if (x <= 0) {
    wrong = "class='text-danger'";
  }
  $("#tbl_body_sdt").append(
    `<tr class="d-flex">
      <td class="col-1">${index + 1}</td>
      <td class="col-11">
        <p class="text-primary"><strong>Reslut: </strong>${data_item.file_name}</p>
        <p class="text-danger"><strong>Carrier: </strong>${country_sale.sale_code}</p>
        <p class="text-danger"><strong>Country: </strong>${country_sale.country}</p>
        <p class="text-primary"><strong>Fingerprint: </strong>${data_item.fingerprint}</p>
        <p class="text-primary"><strong>Gms Version: </strong>${data_item.gms_version}</p>
        <p class="text-primary"><strong>Gms Apps Version: </strong>${data_item.gms_version}</p>
        <p class="text-primary"><strong>TSS Model: </strong>${data_item.tss_model}</p>
      </td>
    </tr>`
  );
}
