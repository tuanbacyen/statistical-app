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
      render_td(result.data);
    }
  });
}

function render_td(data) {
  $("#tbl_body_sdt").html("");
  data.forEach((item, i) => {
    render_record_sdt(item, i);
  });

}

function render_record_sdt(data_item, index) {
  $("#tbl_body_sdt").append(
    `<tr class="d-flex">
      <td class="col-1">${index + 1}</td>
      <td class="col-11">
        <p class="text-primary"><strong>Reslut: </strong>${data_item.file_name}</p>
        ${country_sale_check(data_item.country_sale)}
        <p class="text-primary"><strong>Fingerprint: </strong>${data_item.fingerprint}</p>
        <p class="text-primary"><strong>Gms Version: </strong>${data_item.gms_version}</p>
        ${gms_app_check(data_item.gms_apps)}
        <p class="text-primary"><strong>TSS Model: </strong>${data_item.tss_model}</p>
      </td>
    </tr>`
  );
}

function country_sale_check(country_sale) {
  const cs_with_key = COUNTRY_SALE_CORRECT.filter((x) => { return x.sale_code === country_sale.sale_code; });
  const x = cs_with_key.filter((x) => { return x.country === country_sale.country }).length;
  if (cs_with_key.length === 0) {
    return `<p class="text-danger">Undefined sale_code ${country_sale.sale_code} from database</p>`;
  } else if (x <= 0) {
    return `<p class="text-danger">Incorrect mapping ${country_sale.sale_code} with ${country_sale.country}</p>
    <p class="text-danger">Expected: ${country_sale.sale_code} should be mapped with ${cs_with_key[0].country}</p>`
  } else {
    return `<p class="text-primary"><strong>Carrier: </strong>${country_sale.sale_code}</p>
        <p class="text-primary"><strong>Country: </strong>${country_sale.country}</p>`;
  }
}

function gms_app_check(gms_apps) {
  let wrong_gms = [];
  gms_apps.forEach((ga) => {
    const gas = GMS_APP_CORRECT.filter((x) => { return x.packages === ga.name; });
    const gas_with_name = gas.filter((x) => { return x.full_code === ga.value; });
    if (gas.length > 0 && gas_with_name.length <= 0) {
      wrong_gms.push({
        origin: ga,
        correct: (gas[0] === undefined) ? "Nodata" : gas[0].full_code,
      });
    }
  });

  if (wrong_gms.length <= 0) {
    return `<p class="text-primary">Gms apps versions: correct</p>`;
  } else {
    let wrong = "";
    wrong_gms.forEach((w) => {
      wrong += `<p class="text-danger">Incorrect ${w.origin.name} version: ${w.origin.value}</p>
                <p class="text-danger">expected ${w.correct}</p>`
    });
    return wrong;
  }
}
