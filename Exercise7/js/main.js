var width =600;
var height=400;
var flag = true;
var t = d3.transition().duration(750);
var margin = {top: 10, right: 10, bottom: 200, left:100};


d3.json("data/revenues.json").then((data)=> {

	data.forEach((d)=>{

		d.revenue = +d.revenue;
		d.profit= +d.profit;

	});

var g = d3.select("#chart-area")


.append("svg")

	.attr("width", width + margin.left + margin.right)

	.attr("height", height + margin.top + margin.bottom)

.append("g")

	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

	var x = d3.scaleBand().range([0, width]).padding(0.2);
	var y = d3.scaleLinear().range([height, 0]);
	var bottomAxis = d3.axisBottom(x);
	var leftAxis = d3.axisLeft(y).ticks(5)
.tickFormat((d) => { return "$"+d/1000 + "K"; });
	var xAxisGroup = g.append("g").attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")");
	var yAxisGroup = g.append("g").attr("class", "y-axis");
var yLabel = g.append("text")
	.attr("class", "y axis-label")

	.attr("x", - (height / 2))

	.attr("y", -60)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(-90)")

	.style("fill","black")

	.text("Revenue (dlls.)");


g.append("text")

	.attr("class", "x axis-label")

	.attr("x", width/2)

	.attr("y", height+40)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(0)")

	.style("fill","black")

	.text("Month");

	d3.interval( ( ) => { 
		var newData = flag ? data : data.slice(1);
		update(newData,x,xAxisGroup,y,yAxisGroup,bottomAxis,leftAxis,g,yLabel); flag = !flag;}, 1000);

update(data,x,xAxisGroup,y,yAxisGroup,bottomAxis,leftAxis,g,yLabel);
}).catch((error)=> {

	console.log(error);

});
function update(data,x,xAxisGroup,y,yAxisGroup,bottomAxis,leftAxis,g,yLabel) {
	var label = flag ? "Revenue" : "Profit";
	yLabel.text(label);
	var value = flag ? "revenue" : "profit";
	x.domain(data.map((d) => { return d.month; }));
	y.domain([0, d3.max(data, function(d) { return d[value] })])
	xAxisGroup.call(bottomAxis);
	xAxisGroup.transition(t).call(bottomAxis);
	yAxisGroup.call(leftAxis);




var rects = g.selectAll("rect").data(data, (d) => { return d.month; });

	rects.exit().attr("fill", "red")

	.transition(t)

		.attr("y", y(0))

		.attr("height", 0)

	.remove();

	rects.attr("y", (d) => { return y(d[value]); })

	.attr("x", (d) => { return x(d.month); })

	.attr("height", (d) => { return height - y(d[value]); })

	.attr("width", x.bandwidth)

	rects.enter().append("rect")

	.attr("fill", "grey")

	.attr("y", y(0))

	.attr("height", 0)

	.attr("x",(d) => { return x(d.month) })

	.attr("width", x.bandwidth)
	.merge(rects)

	.transition(t)

		.attr("x", (d) => { return x(d.month) })

		.attr("width", x.bandwidth)

		.attr("y", (d) => { return y(d[value]); })

		.attr("height", (d) => { return height - y(d[value]); });

}