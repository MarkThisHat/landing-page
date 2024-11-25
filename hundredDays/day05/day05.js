const data = {
  revenue: "$3621.79",
  dateRange: "01. Nov - 07. Nov",
  views: [458, 812, 746, 877, 517, 434, 458],
  purchases: [26, 41, 22, 36, 25, 13, 20],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

const chartSettings = {
  width: 260,
  height: 80,
  padding: 5,
};

const scaleValue = (value, maxValue, chartSize) => {
  return (value / maxValue) * chartSize;
};

document.querySelector(".date.small").textContent = data.dateRange;
document.querySelector(".value.big").textContent = data.revenue;

const daysContainer = document.querySelector(".days");
daysContainer.innerHTML = "";
data.days.forEach((day) => {
  const dayElement = document.createElement("span");
  dayElement.className = "day";
  dayElement.textContent = day;
  daysContainer.appendChild(dayElement);
});

const generateChart = (values, colorClass) => {
  const dataPointsContainer = document.querySelector(".data-points");
  const chart = document.querySelector(".chart");

  if (!chart) {
    console.error("SVG chart container not found!");
    return;
  }

  const polyline = chart.querySelector(`.${colorClass}-line`);

  polyline.style.fill = "none";
  polyline.style.stroke = colorClass === "red" ? "red" : "blue";
  polyline.style.strokeWidth = "2";

  dataPointsContainer.innerHTML = "";
  let pointsString = "";

  const maxValue = Math.max(...values);

  values.forEach((value, index) => {
    const usableWidth = chartSettings.width - 2 * chartSettings.padding;
    const x = chartSettings.padding + scaleValue(index, values.length -0.7, usableWidth);
    const y = chartSettings.height - scaleValue(value, maxValue, chartSettings.height);

    console.log(`Point ${index}: x=${x}, y=${y}`);

    const SVG_NS = "http://www.w3.org/2000/svg";
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", x + chartSettings.padding);
    dot.setAttribute("cy", y + chartSettings.padding);
    dot.setAttribute("r", 4);
    dot.setAttribute("fill", colorClass === "red" ? "red" : "blue");

    const title = document.createElementNS(SVG_NS, "title");
    title.textContent = value;
    dot.appendChild(title);

    chart.appendChild(dot);

    console.log(`Added circle at: cx=${x + chartSettings.padding}, cy=${y + chartSettings.padding}`);

    const point = document.createElement("div");
    point.className = `point ${colorClass}`;
    point.style.left = `${x + chartSettings.padding}px`;
    point.style.top = `${y + chartSettings.padding}px`;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = value;
    point.appendChild(tooltip);

    dataPointsContainer.appendChild(point);

    pointsString += `${x + chartSettings.padding},${y + chartSettings.padding} `;
  });

  polyline.setAttribute("points", pointsString.trim());
};

const addGridLines = () => {
  const chart = document.querySelector(".chart");
  const SVG_NS = "http://www.w3.org/2000/svg";

  const numHorizontalLines = 2;

  for (let i = 0; i <= numHorizontalLines; i++) {
    const y = (chartSettings.height / (numHorizontalLines + 1)) * i + chartSettings.padding / 2 + 5;

    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", chartSettings.padding);
    line.setAttribute("y1", y);
    line.setAttribute("x2", chartSettings.width - chartSettings.padding);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#e0e0e0");
    line.setAttribute("stroke-width", "0.42");
    chart.appendChild(line);
  }
};


addGridLines();
generateChart(data.views, "red");
generateChart(data.purchases, "blue");
