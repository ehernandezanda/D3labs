

var width =600
var height=400
var margin = {top: 10, right: 10, bottom: 200, left:100};

d3.json("data/buildings.json").then((data)=> {

	data.forEach((d)=>{

		d.height = +d.height;

	});

var g = d3.select("body")

	.append("svg")

		.attr("width", width + margin.right + margin.left)

		.attr("height", height + margin.top + margin.bottom)

	.append("g")

		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
var x = d3.scaleBand()

	.domain(data.map((d)=>{return d.name}))

	.range([0,width])

	.paddingInner(0.3)

	.paddingOuter(0.3);
var y = d3.scaleLinear()

	.domain([828,0])

	.range([0,height]);

var bottomAxis = d3.axisBottom(x);

g.append("g")

		.attr("class", "x axis")

	.attr("transform", "translate(0, " + height + ")")

	.call(bottomAxis)

.selectAll("text")

	.attr("y", "10")

	.attr("x", "-5")

	.attr("text-anchor", "end")

	.attr("transform", "rotate(-40)");

var leftAxis = d3.axisLeft(y).ticks(5)
.tickFormat((d) => { return d + "m"; });


g.append("g")

	.attr("class", "left axis")
	.call(leftAxis);
g.append("text")

	.attr("class", "y axis-label")

	.attr("x", - (height / 2))

	.attr("y", -60)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(-90)")

	.style("fill","black")

	.text("Height (m)");
g.append("text")

	.attr("class", "x axis-label")

	.attr("x", width/2)

	.attr("y", height+140)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(0)")

	.style("fill","black")

	.text("The word's tallest buildings");





var ordinal = d3.scaleOrdinal()
	.domain(data.map((d)=>{return d.name}))

	.range(d3.schemeSet3);
var rects = g.selectAll("rect").data(data)
	.enter()

	.append("rect")

	.attr("y", (d) => { return y(d.height); })

	.attr("x", (d) => { return x(d.name); })

	.attr("width", x.bandwidth)

	.attr("height", (d) => { return height - y(d.height); })

	.attr("fill", "grey");
console.log(ordinal("Shanghai Tower"));
});
/*
for (i = 0; i < dataBuilding.length; i++) {
  var rect = svg.append("rect")

	.attr("x", difference+i*45+10)

	.attr("y", 20+dataBuilding[i]/2)

	.attr("width", 30)
	.attr("height", dataBuilding[i]/2)

	.attr("fill",ordinal(data));
}
});*/


