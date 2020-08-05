$('document').ready(function() {
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';


    $.getJSON(url).success(function(alpData) {

        // private fields 
        var ridersWithDopingAllegationsLegendColor = "#b20000";
        var ridersNoDopingAllegationsLegendColor = "#000";
        var legendKeyRadius = 7;

        // First place time located at index 0
        var fastestTime = alpData[0].Seconds;


        // Prep the data for D3, add legend field and amount of seconds behind  fastest time
        alpData.forEach(function(finish) {

            //turn finishing time into seconds behind winner
            finish.behind = finish.Seconds - fastestTime;

            //add data legend
            if (finish.Doping != "") {
                finish.legend = "Doping Allegations";
            } else {
                finish.legend = "No Doping Allegation";
            }
        });


        // Formatters for counts and times (converting numbers to Dates).
        var formatCount = d3.format(",.0f"),
            formatTime = d3.timeFormat("%H:%M"),
            formatMinutes = function(d) {
                var t = new Date(2012, 0, 1, 0, d);
                t.setSeconds(t.getSeconds() + d);
                return formatTime(t);
            };

        // SVG margin 
        var margin = {
            top: 15,
            right: 100,
            bottom: 70,
            left: 60
        };

        function calculatedWidthAndHeight(margin) {
            // Get the width and height of the card
            // take away margin to make fit on canvas
            // used to prevent overflow
            var cardWidth = document.getElementById("card").offsetWidth;
            var cardHeight = document.getElementById("card").offsetHeight;
            //prevent graph overflow
            var width = cardWidth - margin.left - margin.right;
            var height = cardHeight - 200 - margin.top - margin.bottom;

            var scatterplotWidth = width + margin.left + margin.right;
            var scatterplotHeight = height + margin.top + margin.bottom;
            return { cardHeight: height, cardWidth: width, scatterplotWidth: scatterplotWidth, scatterplotHeight: scatterplotHeight };
        }

        var yScale = d3.scaleLinear()
            // max riders = 36
            .domain([1, 36])
            .range([0, calculatedWidthAndHeight(margin).cardHeight]);


        var xScale = d3.scaleLinear()
            .domain([205, 0])
            .range([0, calculatedWidthAndHeight(margin).cardWidth]);





        //Create svg canvas
        var scatterplot = d3.select(".card #chart").append("svg")
            .attr("width", calculatedWidthAndHeight(margin).scatterplotWidth)
            .attr("height", calculatedWidthAndHeight(margin).scatterplotHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Display the scatterplots 
        function displayDataPoints(scatterplot, alpData) {
            var ascents = scatterplot.selectAll("circle")
                .data(alpData)
                .enter()
                .append("circle").attr("id", "x-axis")
                // scale x on time behind
                .attr("cx", function(d) {
                    return xScale(d.behind);
                })
                // scale on y by the riders finishing position
                .attr("cy", function(d) {
                    return yScale(d.Place);
                })
                .attr("r", 7)
                .attr("fill", function(d) {
                    if (d.Doping == "") {
                        return ridersNoDopingAllegationsLegendColor;
                    }
                    return ridersWithDopingAllegationsLegendColor;
                })
                .attr("data-legend", function(d) {
                    return d.legend;
                })
                .on("mouseover", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);

                    tooltip.html(createToolTip(d))
                        .style("left", (d3.event.pageX - 59) + "px")
                        .style("top", (d3.event.pageY - 150) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });


            function friendlySeconds(seconds) {
                return parseInt(seconds / 60) + ":" + seconds % 60;
            }
            // add the tooltip area to the webpage
            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);




            function createToolTip(d) {
                var tooltipHTML = "<span class = 'name'>" + d.Name + ": " + d.Nationality + "</span>";
                tooltipHTML += "<br/>Year: " + d.Year + ", Time: " + friendlySeconds(d.Seconds) + "<br/>";
                if (d.doping !== "") {
                    tooltipHTML += "<br/>" + d.Doping;
                } else {
                    tooltipHTML += "<br/>No Doping Allegation";
                }
                return tooltipHTML;
            }



        }

        displayDataPoints(scatterplot, alpData);

        //text labels
        scatterplot.selectAll("text")
            .data(alpData)
            .enter()
            .append("text")
            .text(function(d) {
                return d.Name;
            })
            .attr("x", function(d) {
                return xScale(d.behind);
            })
            .attr("y", function(d) {
                return yScale(d.Place);
            })
            .attr("transform", "translate(15,+4)");



        //create X Axis
        function createxAxis(scatterplot) {
            scatterplot.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + calculatedWidthAndHeight(margin).cardHeight + ")")
                .call(d3.axisBottom(xScale)
                    .ticks(6)
                    .tickFormat(formatMinutes))
                .append("text")
                .attr("x", 300)
                .attr("y", 45)
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .text("Minutes Behind Fastest Time");
        }
        createxAxis(scatterplot);
        // creat Y AXIS 
        function createyAxis(scatterplot) {

            //Create Y axis
            scatterplot.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0, 0)")
                .call(d3.axisLeft(yScale)
                    .ticks(8))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -10)
                .attr("y", 15)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text("Ranking");
        }


        createyAxis(scatterplot);




        function setupTitles() {
            //title
            var titleDiv = d3.select(".title");
            titleDiv.append("span")
                .text("Doping in Professional Bicycle Racing");
            //subtitle
            var subtitleDiv = d3.select(".subtitle");
            subtitleDiv.append("span")
                .text("35 Fastest times up Alpe d'Huez");

            //extra-info
            var extraInfoDiv = d3.select(".extra-info");
            extraInfoDiv.append("span")
                .text("Normalized to 13.8km distance");
        }

        setupTitles();

        function SetUpLegend() {
            var circleColor = '<span class="legend-key" style="background-color:%color%"></span>';
            var legendText = '<span class="legend-text">%text%</span>';
            $('.legend-map').append('<div class="legend-and-key">' + circleColor.replace('%color%', ridersWithDopingAllegationsLegendColor) +
                legendText.replace('%text%', 'Riders with doping allegations') + '</div>');

            $('.legend-map').append('<div class="legend-and-key">' + circleColor.replace('%color%', ridersNoDopingAllegationsLegendColor) +
                legendText.replace('%text%', 'No doping allegations') + '</div>');

        }
        SetUpLegend();
    });
});