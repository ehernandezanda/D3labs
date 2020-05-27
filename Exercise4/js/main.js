
var dataBuilding = [];
var heights =[];
var height=900
var difference=0
var counter=0

d3.json("data/buildings.json").then((data)=> {

	data.forEach((d)=>{

		d.height = +d.height;

	});

	var svg = d3.select("#chart-area").append("svg")

	.attr("width", 500)

	.attr("height", height);
var x = d3.scaleBand()

	.domain(data.map((d)=>{return d.name}))

	.range([0,400])

	.paddingInner(0.3)

	.paddingOuter(0.3);
var y = d3.scaleLinear()

	.domain(data.map((d)=>{return d.height}))

	.range([0,400]);

var ordinal = d3.scaleOrdinal()
	.domain(data.map((d)=>{return d.name}))

	.range(d3.schemeSet3);
var rects=svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("y", (d) => { return y(d.height); })
	.attr("x",(d)=>{return x(d.name);})
	.attr("width",x.bandwidth)
	.attr("height", (d) => { return height-y(d.height); })
	.attr("fill",(d)=>{return ordinal(d.name)});

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


