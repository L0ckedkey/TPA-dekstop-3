import { Chart } from "chart.js"

var canvasElement = document.getElementById("myChart")



var config = {
    type: "bar",
    data: { labels: ["January", "February"], datasets: [123, 321] }

}

var cookieChart = new Chart(canvasElement, config)