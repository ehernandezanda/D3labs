/*
*    main.js
*/
var width =600;
var height=400;
var flag = true;
var margin = {top: 10, right: 10, bottom: 200, left:100};
d3.json("data/data.json").then(function(data){
	const formattedData = data.map((year) => {

	return year["countries"].filter((country) => {

		var dataExists = (country.income && country.life_exp);

		return dataExists

	}).map((country) => {


		country.income = +country.income;

		country.life_exp = +country.life_exp;

		return country;

	})

});
var dlist = d3.entries(formattedData);
var mapped = formattedData.map(d => {
  return {
    
    countries: d[Object.keys(d)[0]]
  }
});

var mappedYear = data.map(d => {
  return {
    yearid: Object.keys(d)[1],
    year: d[Object.keys(d)[1]]
  }
  });
var cool=[];
cool=mappedYear
console.log(cool[0].year)
//console.log(mappedYear.map(d => d.year));
//console.log(mapped.map(d => d.countries));
//console.log(d3.max(mapped.map(d => d.countries.life_exp)));
//console.log(formattedData.map((d) => { d.countries })) ;
//console.log(d3.max(formattedData, function(d) { return d3.max(d.countries,(c)=>{return c.life_exp})}));

var g = d3.select("body")

	.append("svg")

		.attr("width", width + margin.right + margin.left)

		.attr("height", height + margin.top + margin.bottom)

	.append("g")

		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
var area = d3.scaleLinear()

	.domain([2000, 1400000000])
	.range([25*Math.PI,1500*Math.PI]);
var color = d3.scaleOrdinal()
	.domain(d3.schemePastel1)
var x = d3.scaleLog().domain([142, 150000]).range([0, width]).base(10);
var y = d3.scaleLinear()

	.domain([90,0])
	.range([0,height]);

var bottomAxis = d3.axisBottom(x).tickValues([400, 4000, 40000])
.tickFormat((d) => { return '$'+d; });

g.append("g")

		.attr("class", "x axis")

	.attr("transform", "translate(0, " + height + ")")

	.call(bottomAxis)

.selectAll("text")

	.attr("y", "10")

	.attr("x", "-5")

	.attr("text-anchor", "middle");

var leftAxis = d3.axisLeft(y);

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

	.text("Life Expectancy (Years)");
g.append("text")

	.attr("class", "x axis-label")

	.attr("x", width/2)

	.attr("y", height+40)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(0)")

	.style("fill","black")

	.text("GDP Per Capita ($)");
var yearLabel = g.append("text")
	.attr("class", "y axis-label")

	.attr("x", width-10)

	.attr("y", height-10)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(0)")

	.style("fill","black")

	.text(mappedYear.map(d => d.year));

var rects = g.selectAll("rect").data(data)
	.enter()

	.append("rect")

	.attr("y", (d) => { return y(d.revenue); })

	.attr("x", (d) => { return x(d.month); })

	.attr("width", x.bandwidth)

	.attr("height", (d) => { return height - y(d.revenue); })

	.attr("fill", "yellow");
});