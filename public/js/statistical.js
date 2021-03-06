$(document).ready(function () {
  $('body').on('click', '#btn_statistical', readDir);
  $('body').on('click', '#btn_reset', resetView)
  if (DATA != []) {
    render_td(DATA);
    window.history.pushState('Check', 'Check', window.location.origin);
  }
});

function readDir() {
  $.ajax({
    url: "/read_dir",
    data: {
      directory: $("#path_folder").val()
    },
    type: "post",
    success: function (result) {
      render_td(result.data);
    }
  });
}

function resetView() {
  $("#tbl_body_sdt").html("");
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
        ${gms_version(data_item.gms_version)}
        ${gms_app_check(data_item.gms_apps)}
        <p class="text-primary"><strong>TSS Model: </strong>${data_item.tss_model}</p>
      </td>
    </tr>`
  );
}

function gms_version(gv) {
  if (GMS_VERSION === gv) {
    return `<p class="text-primary"><strong>Gms Version: </strong>${gv}</p>`;
  } else {
    return `<p class="text-danger"><strong>Incorrect version</strong>: ${gv}</p>
            <p class="text-danger"><strong>expected: </strong>${GMS_VERSION}</p>`;
  }
}

function country_sale_check(country_sale) {
  const cs_with_key = COUNTRY_SALE_CORRECT.filter((x) => { return x.sale_code.toLowerCase() === country_sale.sale_code.toLowerCase(); });
  const x = cs_with_key.filter((x) => { return x.country.toLowerCase() === country_sale.country.toLowerCase() }).length;
  if (cs_with_key.length === 0) {
    return `<p class="text-danger">Undefined sale_code ${country_sale.sale_code} from database</p>`;
  } else if (x <= 0) {
    return `<p class="text-danger"><strong>Incorrect mapping: </strong> ${country_sale.sale_code} with ${country_sale.country}</p>
    <p class="text-danger"><strong>Expected: </strong> ${country_sale.sale_code} should be mapped with ${cs_with_key[0].country}</p>`
  } else {
    return `<p class="text-primary"><strong>Carrier: </strong>${country_sale.sale_code}</p>
        <p class="text-primary"><strong>Country: </strong>${country_sale.country}</p>`;
  }
}

function gms_app_check(gms_apps) {
  let wrong_gms = [];
  gms_apps.forEach((ga) => {
    const gas = GMS_APP_CORRECT.filter((x) => { return x.packages.toLowerCase() === ga.name.toLowerCase(); });
    const gas_with_name = gas.filter((x) => { return x.full_code.toLowerCase() === ga.value.toLowerCase(); });
    if (gas.length > 0 && gas_with_name.length <= 0) {
      wrong_gms.push({
        origin: ga,
        correct: (gas[0] === undefined) ? "Nodata" : gas[0].full_code,
      });
    }
  });

  if (wrong_gms.length <= 0) {
    return `<p class="text-primary"><strong>Gms apps versions:</strong> correct</p>`;
  } else {
    let wrong = "";
    wrong_gms.forEach((w) => {
      wrong += `<p class="text-danger"><strong>Incorrect: </strong> ${w.origin.name} version: ${w.origin.value}</p>
                <p class="text-danger"><strong>expected: </strong> ${w.correct}</p>`
    });
    return wrong;
  }
}
