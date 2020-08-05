$('document').ready(function () {


	var graph = d3.select('.graph');

	function setupGraph() {

		var graph = d3.select('.graph');
		var width = document.getElementById("graph").offsetWidth;
		var height = document.getElementById("graph").offsetHeight;


		var margin = { top: 0, left: 0, bottom: 0, right: 0 };

		var svg = d3.select(".graph")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
		var chartLayer = svg.append("g").classed("chartLayer", true);

		chartLayer
			.attr("width", width)
			.attr("height", height)
			.attr("transform", "translate(" + [margin.left, margin.top] + ")");
		return svg;
	}
	var svg = setupGraph();


	var request = new XMLHttpRequest();
	request.addEventListener("load", loaded);

	function loaded() {
		var data = JSON.parse(request.responseText);

		var width = document.getElementById("graph").offsetWidth;
		var height = document.getElementById("graph").offsetHeight;


		var simulation = d3.forceSimulation(node)
			.force("link", d3.forceLink().id(function (d) { return d.index; }))
			.force("collide", d3.forceCollide(function (d) { return d.r + 8; }).iterations(16))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("y", d3.forceY(0))
			.force("x", d3.forceX(0));

		var link = svg.selectAll('.link')
			.attr('class', 'link')
			.data(data.links)
			.enter()
			.append('line')
			.attr("stroke", "black");


		var tooltip = d3.select("#tooltip");

		// nodes arent binding
		var node = graph.select('.flagbox').selectAll('.node')
			.data(data.nodes)
			.enter()
			.append('img')
			.attr("class", function (d) { return "flag flag-" + d.code; })
			.on("mouseover", function (d) {
				tooltip.style("display", "block");
				tooltip.html(d.country)
					.style("left", d3.event.pageX + "px")
					.style("top", (d3.event.pageY - 28) + "px");
			})
			.on("mouseout", function (d) {
				tooltip.style("display", "none");
			})
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));



		var ticked = function () {
			link
				.attr("x1", function (d) { return d.source.x; })
				.attr("y1", function (d) { return d.source.y; })
				.attr("x2", function (d) { return d.target.x; })
				.attr("y2", function (d) { return d.target.y; });

			node
				.style('left', function (d) { return d.x - 8 + "px"; })
				.style('top', function (d) { return d.y - 5 + "px"; })
				.attr("cx", function (d) { return d.x; })
				.attr("cy", function (d) { return d.y; });

		};


		simulation
			.nodes(data.nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(data.links);


		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragended(d) {
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}
	}

	request.open('GET', "https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/countries.json", true);
	request.send(null);
});