$('document').ready(function() {
    var Chart = (function(window, d3) {

        var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var formatCurrency = d3.format("$,.2f");

        $.getJSON(url).success(function(grossProductData) {
            // Set up the Title at top of the Page
            var data = grossProductData.data;
            var fromDate = new Date(grossProductData.from_date);
            var toDate = new Date(grossProductData.to_date);
            $('.bar-graph-title').append('<span class="period"> From ' + fromDate.getFullYear() + ' to ' + toDate.getFullYear());


            function initChart() {

                $('#chart').remove();
                $('#tooltip').remove();
                $('<svg class="chart" id="chart"></svg>').insertBefore(".addition-info");


                var margin = {
                    top: 25,
                    right: 25,
                    bottom: 30,
                    left: 65
                };
                // Get the width of the card
                // used to prevent overflow
                var cardWidth = document.getElementById("card").offsetWidth;
                var cardHeight = document.getElementById("card").offsetHeight;
                //prevent graph overflow
                width = cardWidth - margin.left - margin.right;
                height = cardHeight - 200 - margin.top - margin.bottom;

                var barWidth = Math.ceil(width / data.length);

                minDate = new Date(data[0][0]);
                maxDate = new Date(data[274][0]);

                // scale good
                var x = d3.scaleTime()
                    .domain([minDate, maxDate])
                    .range([0, width]);


                var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(data, function(d) {
                        return d[1];
                    })]);


                var infobox = d3.select(".infobox");

                // init the tooltip 
                // add class and set invisible with opacity at 0
                var tooltip = d3.select(".card").append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);

                // make chart
                var chart = d3.select(".chart")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                // if chart to small 
                if (cardWidth <= 779) {
                    console.log("i am lower than target value")
                    chart.append("g")
                        .attr('id', 'x-axis')
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x)
                            .ticks(5));
                } else {
                    chart.append("g")
                        .attr('id', 'x-axis')
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x));
                }

                chart.append("g")
                    .attr('id', 'y-axis')
                    .attr("class", "y axis")
                    .call(d3.axisLeft(y))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.8em")
                    .style("text-anchor", "end")
                    .text("Unit: Billions");

                chart.selectAll(".react")
                    .data(data)
                    .enter().append("rect")

                .attr("class", "bar")
                    .attr("x", function(d) {
                        return x(new Date(d[0]));
                    })
                    .attr("y", function(d) {
                        return y(d[1]);
                    })
                    .attr("height", function(d) {
                        return height - y(d[1]);
                    })
                    .attr("width", barWidth)
                    .attr('data-date', function(d, i) {
                        return data[i][0]
                    })
                    .attr('data-gdp', function(d, i) {
                        return data[i][1]
                    })
                    .on("mouseover", function(d, i) {
                        var rect = d3.select(this);
                        rect.attr("class", "mouseover");
                        var currentDateTime = new Date(d[0]);
                        var year = currentDateTime.getFullYear();
                        var month = currentDateTime.getMonth();
                        var day = currentDateTime.getDay() + 1;
                        var dollars = d[1];
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 0.9);

                        // format date nicely 
                        tooltip.html("<span class='amount'>" + formatCurrency(dollars) + "&nbsp;Billion </span><br>" + " <span class='year'>" + day + ' - ' + months[month] + ' - ' + year + "</span>")
                            .style('top', height - 100 + 'px')
                            .style('transform', 'translateX(60px)')

                        .attr('data-date', data[i][0]);
                    })
                    .on("mouseout", function() {
                        var rect = d3.select(this);
                        rect.attr("class", "mouseoff");
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });

            }

            initChart()

            d3.select(".info")
                .append("blockquote")
                .text(grossProductData.description);
            d3.select(".addition-info .source")
                .append("cite")
                .text(grossProductData.source_name);


            function reRender() {
                initChart()
            }

            window.addEventListener('resize', reRender);

        });


    })(window, d3);
});