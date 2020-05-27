
try {
  var dataCircle = [];
var difference=0
var counter=0
d3.json("data/ages.json").then((data)=> {

	data.forEach((d)=>{

		d.age = +d.age;
		dataCircle[counter]=d.age;
		counter++;

	});

	var svg = d3.select("#chart-area").append("svg")

	.attr("width", 400)

	.attr("height", 400);
for (i = 0; i < dataCircle.length; i++) {
  var rect = svg.append("circle")

	.attr("cx", difference+i*45+10)

	.attr("cy", 20)

	.attr("r", dataCircle[i])

	.attr("fill","blue");
}
});
}
catch(err) {
  console.log("e");
} 

