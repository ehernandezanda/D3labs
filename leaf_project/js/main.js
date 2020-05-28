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

//console.log(data[1].countries[0].continent)
console.log(formattedData);
console.log(formattedData[1][0].income);
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

var continentColor = d3.scaleOrdinal()
	.domain(["europe", "asia", "americas", "africa"])
	.range(d3.schemePastel1);
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
var legend = g.append("g")

	.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");
var continents = ["europe", "asia", "americas", "africa"];

continents.forEach((continent, i) => {

	var legendRow = legend.append("g")

		.attr("transform", "translate(0, " + (i * 20) + ")");

	legendRow.append("rect")

		.attr("width", 10)

		.attr("height", 10)

		.attr("fill", continentColor(continent));

	legendRow.append("text")

		.attr("x", -10)

		.attr("y", 10)

		.attr("text-anchor", "end")

		.style("text-transform", "capitalize")

		.text(continent);

});

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
var counterYear=0

var time=0
var yearLabel = g.append("text")
	.attr("class", "y axis-label")

	.attr("x", width-20)

	.attr("y", height-10)

	.attr("font-size", "20px")

	.attr("text-anchor", "middle")

	.attr("transform", "rotate(0)")

	.style("fill","black")

d3.interval( ()=> { 
		time = (time < 214)?time+1:0
		counterYear=counterYear+1
		update(formattedData[time],data,counterYear,g,yearLabel,continentColor,y,x,yearLabel,time,area);}, 100);

update(formattedData[0],data,counterYear,g,yearLabel,continentColor,y,x,yearLabel,time,area);
}).catch((error)=> {

	console.log(error);

});

function update(formattedData,data,counterYear,g,yearLabel,continentColor,y,x,yearLabel,time,area) {
	var t= d3.transition().duration(100);

	yearLabel.text(data[counterYear].year);
	//console.log(formattedData.map((year) => { return year}).map((country) => {return country.continent}))
	var circles=g.selectAll("circle").data(formattedData,(d)=>{return d.country;});

	circles.exit()
	.attr("class","exit").remove();


	circles.enter()
	.append("circle")
	.attr("class","enter")
	.attr("fill",(d)=>{return continentColor(d.continent);})
	.merge(circles)
	.transition(t)
	.attr("cy",(d)=>{return y(d.life_exp);})
	.attr("cx",(d)=>{return x(d.income)})
	.attr("r",(d)=>{return Math.sqrt(area(d.population)/Math.PI)});

	
}