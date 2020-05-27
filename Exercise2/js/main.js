var difference=0
var svg = d3.select("#chart-area").append("svg")

	.attr("width", 400)

	.attr("height", 400);
var data = [25, 20, 15, 10, 5];
for (i = 0; i < data.length; i++) {
  var rect = svg.append("rect")

	.attr("x", difference+i*45)

	.attr("y", 20+(20-data[i]))

	.attr("width", 40)

	.attr("height", data[i])

	.attr("fill","red");
}
/* 
var rect = svg.append("rect")

	.attr("x", difference)

	.attr("y", 20)

	.attr("width", 20)

	.attr("height", data[0])

	.attr("fill","red");

difference=difference+40
var rect = svg.append("rect")

	.attr("x", difference)

	.attr("y", 20)

	.attr("width", 20)

	.attr("height", data[1])

	.attr("fill","red");
	*/