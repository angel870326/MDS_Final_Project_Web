// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


// Line Chart
var mainColor = "rgba(75, 121, 254, 1)"
var secondColor = "rgba(254, 75, 121, 1)"

function createLineChart(data) {
  console.log("JS loads data from Python", data);
  let result = JSON.parse(data);
  var config = {
    type: 'line',
    data: {
      labels: result.labels,
      datasets: [
        {
          label: "Adj.",
          data: result.values_adj,    
          lineTension: 0.3,
          backgroundColor: "rgba(254, 75, 121, 0.1)",
          borderColor: secondColor,
          pointRadius: 3,
          pointBackgroundColor: secondColor,
          pointBorderColor: secondColor,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: secondColor,
          pointHoverBorderColor: secondColor,
          pointHitRadius: 10,
          pointBorderWidth: 2,
        },
        {
          label: "Orig.",
          data: result.values,    
          lineTension: 0.3,
          backgroundColor: "rgba(75, 121, 254, 0.1)",
          borderColor: mainColor,
          pointRadius: 3,
          pointBackgroundColor: mainColor,
          pointBorderColor: mainColor,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: mainColor,
          pointHoverBorderColor: mainColor,
          pointHitRadius: 10,
          pointBorderWidth: 2,
        },
      ]
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value, index, values) {
              return number_format(value) + '%';
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + " " + number_format(tooltipItem.yLabel) + '%';
          }
        } 
      }
    }
  };
  var ctx = document.getElementById("adjustedLineChart").getContext('2d');
  var adjLineChart = new Chart(ctx, config);
}






