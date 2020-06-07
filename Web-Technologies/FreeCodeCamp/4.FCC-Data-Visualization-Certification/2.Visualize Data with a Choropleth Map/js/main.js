var Choropleth = (function() {
    var Choropleth = {},
        width = 960,
        height = 600,
        svg = d3.select("svg").attr("id", "chart"),
        body = d3.select("body"),
        xAxis,
        colorScale,
        legend,
        tooltip,
        path = d3.geoPath(),
        EDUCATION_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json',
        COUNTY_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';


    function createXaxis() {
        xAxis = d3.scaleLinear()
            .domain([2.6, 75.1])
            .rangeRound([600, 860]);
    }

    function createColorScale() {
        colorScale = d3.scaleThreshold()
            .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
            .range(d3.schemePurples[9]);
    }

    function createLegend() {
        legend = svg.append("g")
            .attr("class", "key")
            .attr("id", "legend")
            .attr("transform", "translate(0,40)");
    }

    function createTooltip() {
        tooltip = body.append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);
    }

    function setupLegend(legend, xAxis, color) {

        legend.selectAll("rect")
            .data(color.range().map(function(d) {
                d = color.invertExtent(d);
                if (d[0] == null) d[0] = xAxis.domain()[0];
                if (d[1] == null) d[1] = xAxis.domain()[1];
                return d;
            }))
            .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) {
                return xAxis(d[0]);
            })
            .attr("width", function(d) {
                return xAxis(d[1]) - xAxis(d[0]);
            })
            .attr("fill", function(d) {
                return color(d[0]);
            });

        // maybe refactor this out
        legend.append("text")
            .attr("class", "caption")
            .attr("x", xAxis.range()[0])
            .attr("y", -6)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")

        legend.call(d3.axisBottom(xAxis)
                .tickSize(13)
                .tickFormat(function(xAxis) {
                    return Math.round(xAxis) + '%'
                })
                .tickValues(color.domain()))
            .select(".domain")
            .remove();
    }


    Choropleth.init = function() {

        createXaxis();

        createColorScale();

        createTooltip()

        createLegend();

        setupLegend(legend, xAxis, colorScale);

    }

    function ready(error, us, education) {
        if (error) throw error;

        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("class", "county")
            .attr("data-fips", function(d) {
                return d.id
            })
            .attr("data-education", function(d) {
                var result = education.filter(function(obj) {
                    return obj.fips == d.id;
                });

                if (result[0]) {
                    return result[0].bachelorsOrHigher
                }

                return 0
            }).attr("fill", function(d) {
                var result = education.filter(function(obj) {
                    return obj.fips == d.id;
                });
                if (result[0]) {

                    return colorScale(result[0].bachelorsOrHigher)
                }
                return colorScale(0)
            })
            .attr("d", path)
            .on("mouseover", function(d) {
                tooltip.style("opacity", .9);
                tooltip.html(function() {
                        var result = education.filter(function(obj) {
                            return obj.fips == d.id;
                        });
                        if (result[0]) {
                            return result[0]['area_name'] + ', ' + result[0]['state'] + ': ' + result[0].bachelorsOrHigher + '%'
                        }
                        return 0
                    })
                    .attr("data-education", function() {
                        var result = education.filter(function(obj) {
                            return obj.fips == d.id;
                        });
                        if (result[0]) {
                            return result[0].bachelorsOrHigher
                        }
                        return 0
                    })
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.style("opacity", 0);
            });

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) {
                return a !== b;
            }))
            .attr("class", "states")
            .attr("d", path);

    }

    Choropleth.populateGraph = function(callback) {

        if (callback instanceof Function) {
            d3.queue()
                .defer(d3.json, COUNTY_FILE)
                .defer(d3.json, EDUCATION_FILE)
                .await(callback)
        }
    }

    Choropleth.run = function() {

        Choropleth.init();
        Choropleth.populateGraph(ready);

    }

    return Choropleth;
}());


Choropleth.run()