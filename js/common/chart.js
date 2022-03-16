$(function () {
  // 어드민 대쉬보드 dashboard page

  // chart

  // chart header btn
  const allOrderWeekend = $(".all_order_btn_weekend");
  const allOrderOneMonth = $(".all_order_btn_one_month");
  const allOrderThreeMonth = $(".all_order_btn_three_month");

  $(allOrderWeekend)
    .add(allOrderOneMonth)
    .add(allOrderThreeMonth)
    .on("click", function (e) {
      e.preventDefault();
      $(this).addClass("chip_active").removeClass("chip_default");
      allOrderWeekend.add(allOrderOneMonth).add(allOrderThreeMonth).not(this).removeClass("chip_active").addClass("chip_default");
    });

  const chart1 = $("#all_order_chart");
  const chart2 = $("#top5_order_chart");
  const chart3 = $("#abnormal_argument_chart");
  const chart4 = $("#abnormal_argument_chart");
  const allOrderChart = new Chart(chart1, {
    type: "line",

    data: {
      labels: ["", "01", "02", "03", "04", "05", "06", "07", ""],
      datasets: [
        {
          data: [null, 1500000, 1000000, 3300000, 4600000, 2300000, 347000, 1302000, null],
          borderColor: "#A72B2A",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            borderColor: "transparent",
          },
        },
        y: {
          grid: {
            borderColor: "transparent",
            borderDash: [4, 4],
            tickColor: "transparent",
          },
          ticks: {
            min: "0",
            max: "5,000,000",
            backdropPadding: "2",
            // callback: function (value, index, ticks) {
            //   value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //   if (value.toString().charAt(1) == 5) return
            //   return value;
            // },
          },
        },
      },
    },
  });

  const top5OrderBtnWeekend = $(".top5_order_btn_weekend");
  const top5OrderBtnOneMonth = $(".top5_order_btn_one_month");
  const top5OrderBtnThreeMonth = $(".top5_order_btn_three_month");

  $(top5OrderBtnWeekend)
    .add(top5OrderBtnOneMonth)
    .add(top5OrderBtnThreeMonth)
    .on("click", function (e) {
      e.preventDefault();
      $(this).addClass("chip_active").removeClass("chip_default");
      top5OrderBtnWeekend.add(top5OrderBtnOneMonth).add(top5OrderBtnThreeMonth).not(this).removeClass("chip_active").addClass("chip_default");
    });

  const top5Chart = new Chart(chart2, {
    type: "line",
    data: {
      labels: ["", "01", "02", "03", "04", "05", "06", "07", ""],
      datasets: [
        {
          data: [null, 1500000, 1000000, 3300000, 4600000, 2300000, 3470000, 1302000, null],
          label: "a사업장",
          borderColor: "#A72B2A",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
        {
          data: [null, 1900000, 4000000, 3100000, 1600000, 4300000, 347000, 1802000, null],
          label: "b사업장",
          borderColor: "#039BE5",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
        {
          data: [null, 3900000, 4000000, 1300000, 4900000, 3300000, 1470000, 4302000, null],
          label: "c사업장",
          borderColor: "#FF9E22",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
        {
          data: [null, 4000000, 3000000, 3392000, 3500000, 1300000, 447000, 2302000, null],
          label: "d사업장",
          borderColor: "#43A047",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
        {
          data: [null, 4900000, 2000000, 1400000, 5000000, 4200000, 3470000, 1902000, null],
          label: "e사업장",
          borderColor: "#746661",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
      ],
    },

    options: {
      backgroundColor: "color",
      borderColor: "transparent",
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "end",
          labels: {
            usePointStyle: true,
            padding: 20,
            boxWidth: 12,
            boxHeight: 12,
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            borderColor: "transparent",
          },
        },
        y: {
          grid: {
            borderColor: "transparent",
            borderDash: [4, 4],
            tickColor: "transparent",
          },
          ticks: {
            min: "0",
            max: "5,000,000",
            backdropPadding: "2",
            // callback: function (value, index, ticks) {
            //   value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //   if (value.toString().charAt(1) == 5) return
            //   return value;
            // },
          },
        },
      },
    },
  });

  const abnormalArgumentChart = new Chart(chart3, {
    type: "doughnut",
    label: true,
    data: {
      labels: ["제품", "주문", "운송", "현장", "기타"],
      datasets: [
        {
          data: [425, 370, 285, 85, 60],
          backgroundColor: ["#A72B2A", "#039BE5", "#FF9E22", "#43A047", "#BBBBBB"],
          borderColor: "transparent",
        },
      ],
    },
    options: {
      cutout: 60,
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            padding: 20,
            generateLabels: function (chart) {
              const data = chart.data;
              const ds = data.datasets[0];

              return data.labels.map(function (label, i) {
                return {
                  text: label + ds.data[i],
                  fillStyle: ds.backgroundColor[i],
                };
              });
              return [];
            },
          },
        },
      },
      // maintainAspectRatio: false,
    },
  });

  const partialArgumentChart = new Chart(chart4, {
    type: "doughnut",
    label: true,
    data: {
      labels: ["", "01", "02", "03", "04", "05", "06", "07", ""],
      datasets: [
        {
          data: [null, 1500000, 1000000, 3300000, 4600000, 2300000, 347000, 1302000, null],
          borderColor: "#A72B2A",
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
            borderColor: "transparent",
          },
        },
        y: {
          grid: {
            borderColor: "transparent",
            borderDash: [4, 4],
            tickColor: "transparent",
          },
          ticks: {
            min: "0",
            max: "5,000,000",
            backdropPadding: "2",
            // callback: function (value, index, ticks) {
            //   value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //   if (value.toString().charAt(1) == 5) return
            //   return value;
            // },
          },
        },
      },
    },
  });
});
