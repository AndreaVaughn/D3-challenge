// @TODO: YOUR CODE HERE!
var margin = {top: 10, right: 10, bottom: 50, left: 60},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svgWidth = 1000;
var svgHeight = 1000;
var margin = {
  top: 10,
  right: 10,
  bottom: 50,
  left: 60
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", 'translate(${margin.left}, ${margin.top})');
d3.csv("assets/data/data.csv").then(function(data){
// Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data1) {
      data1.age = +data1.age;
      data1.smokes = +data1.smokes;
    });
  // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([1, d3.max(data, d => d.age)])
      .range([0, width]);
    var yLinearScale = d3.scaleLinear()
      .domain([1, d3.max(data, d => d.smokes)])
      .range([height, 0]);
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
   // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .style("fill", "purple")
    .attr("opacity", "1");
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return ('${d.id}<br>Age:'+ d.age+'<br>Smokes' +d.smokes);
      });
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });
    chartGroup.append("text")
      .attr("transform", 'translate(${width / 2.5}, ${height + margin.top + 25})')
      .attr("class", "axisText")
      .text("Age by Smokes");
});