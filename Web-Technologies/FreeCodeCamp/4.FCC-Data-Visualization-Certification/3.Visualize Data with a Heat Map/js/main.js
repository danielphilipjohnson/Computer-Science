//document ready
$('document').ready(function () {
  var URL_temperatureData = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';

  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var colors = ['#1C1C95', '#3A3AEF', '#3276F7', '#2A94FF', '#17DA61', '#3DF059', '#F7EA1F', '#FFD40E', '#F7821F', '#E61F1F', '#9B1F1F'];

  var buckets = colors.length;

  var margin = {
    top: 10,
    right: 30,
    bottom: 120,
    left: 100
  };

  // GOD CTOR: refactor
  function calculatedCanvas(margin) {

    var legendElementWidth = 35;

    // Get current CARD dimensions
    var cardWidth = document.getElementById("card").offsetWidth;
    var cardHeight = document.getElementById("card").offsetHeight;

    //prevent chart overflow
    // pull in cardsrespective of margins
    width = cardWidth - margin.left - margin.right;
    height = cardHeight - 200 - margin.top - margin.bottom;

    // AXIS 
    var axisYLabelX = -65;
    var axisYLabelY = height / 2;

    var axisXLabelX = width / 2;
    var axisXLabelY = height + 45;

    // SVG dimensions
    var svgWidth = width + margin.left + margin.right;
    var svgHeight = height + margin.top + margin.bottom;

    return {
      cardHeight: height, cardWidth: width,

      axisYLabelX: axisYLabelX,
      axisYLabelY: axisYLabelY,

      axisXLabelX: axisXLabelX,
      axisXLabelY: axisXLabelY,
      legendElementWidth: legendElementWidth,
      svgWidth: svgWidth,
      svgHeight: svgHeight
    };


  }

  d3.json(URL_temperatureData, function (error, data) {
    if (error) throw error;


    var temperatureData = data.monthlyVariance;

    var yearData = temperatureData.map(function (obj) {
      return obj.year;
    }).filter(function (v, i, arr) {
      return arr.indexOf(v) == i;
    });

    var varianceData = temperatureData.map(function (obj) {
      return obj.variance;
    });


    function calculatedGrid() {

      var gridWidth = calculatedCanvas(margin).cardWidth / yearData.length;
      var gridHeight = calculatedCanvas(margin).cardHeight / month.length;
      return {
        gridWidth: gridWidth,
        gridHeight: gridHeight
      };
    }

    /* HELPER FUNCTIONS */
    function getColorScale(colors) {

      var lowVariance = d3.min(varianceData);
      var highVariance = d3.max(varianceData);
      var baseTemp = data.baseTemperature;


      /// base temp issu
      var colorScale = d3.scaleQuantile()

        .domain([lowVariance + baseTemp, highVariance + baseTemp])
        //.domain([0,10])
        .range(colors);
      return colorScale;
    }
    function minAndMaxDate() {
      var lowYear = d3.min(yearData);
      var highYear = d3.max(yearData);

      var minDate = new Date(lowYear, 0);
      var maxDate = new Date(highYear, 0);
      return {
        minDate: minDate,
        maxDate: maxDate
      };

    }

    function setupSVG(margin) {
      var svg = d3.select("#chart").append("svg")
        .attr("width", calculatedCanvas(margin).svgWidth)
        .attr("height", calculatedCanvas(margin).svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      return svg;
    }

    var svg = setupSVG(margin);

    // crewaty a func
    function createToolTip() {
      var div = d3.select("#chart").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      return div;
    }
    var div = createToolTip();


    function setupYAxis(svg) {
      var axisYLabelX = calculatedCanvas(margin).axisYLabelX;
      var axisYLabelY = calculatedCanvas(margin).axisYLabelY;

      // Y axis Values
      var monthLabels = svg.selectAll(".monthLabel")
        .data(month)
        .enter()
        .append("text")
        .text(function (d) {
          return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * calculatedGrid().gridHeight;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + calculatedGrid().gridHeight / 1.5 + ")")
        .attr("class", "monthLabel scales axis axis-months");

      // Y axis label 
      svg.append('g')
        .attr('transform', 'translate(' + axisYLabelX + ', ' + axisYLabelY + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr("class", "axislabel")
        .text('Months');
    }
    function setupXAxis(svg) {

      var axisXLabelX = calculatedCanvas(margin).axisXLabelX;
      var axisXLabelY = calculatedCanvas(margin).axisXLabelY;

      //  x Axis Values 
      var minDate = minAndMaxDate().minDate;
      var maxDate = minAndMaxDate().maxDate;
      var yScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, calculatedCanvas(margin).cardWidth]);


      svg.append("g")
        .attr("class", "axis axis-years")
        .attr("transform", "translate(0," + (calculatedCanvas(margin).cardHeight + 1) + ")")
        .call(d3.axisBottom(yScale)
          .ticks(10)
        );
      // x axis label
      svg.append('g')
        .attr('transform', 'translate(' + axisXLabelX + ', ' + axisXLabelY + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr("class", "axislabel")
        .text('Years');
    }
    setupXAxis(svg);
    setupYAxis(svg);

    //tempertures
    function setupTemp(svg) {
      var baseTemp = data.baseTemperature;
      var lowYear = d3.min(yearData);

      // grid width calculations 
      var colorScale = getColorScale(colors);

      var temps = svg.selectAll(".years")
        .data(temperatureData, function (d) {
          return (d.year + ':' + d.month);
        });

      // works as far as i know
      temps.enter()
        .append("rect")
        .attr("x", function (d) {
          return ((d.year - lowYear) * calculatedGrid().gridWidth);
        })
        .attr("y", function (d) {
          return ((d.month - 1) * calculatedGrid().gridHeight);
        })
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", calculatedGrid().gridWidth)
        .attr("height", calculatedGrid().gridHeight)
        // responsible for color
        .style("fill", "white")
        .on("mouseover", function (d) {
          div.transition()
            .duration(100)
            .style("opacity", 0.8);
          div.html("<span class='year'>" + month[d.month - 1] + " - " + d.year + "</span><br>" +
            "<span class='temperature'> Temp " + (Math.floor((d.variance + baseTemp) * 1000) / 1000) + " &#8451" + "</span><br>" +
            "<span class='variance'> Variance " + d.variance + " &#8451" + "</span>")
            .style("left", (d3.event.pageX - ($('.tooltip').width() / 1.2)) + "px")
            .style("top", (d3.event.pageY - 75) + "px");
        })
        .on("mouseout", function (d) {
          div.transition()
            .duration(200)
            .style("opacity", 0);
        }).transition().duration(100)
        .style("fill", function (d) {
          return colorScale(d.variance + baseTemp);
        });
    }
    setupTemp(svg);

    // Legend values 
    function setupLegend(svg) {

      var colorScale = getColorScale(colors);
      var legendElementWidth = calculatedCanvas(margin).legendElementWidth;


      var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function (d) {
          console.log("what is d");
          console.log(d);
          return d;
        }).enter().append("g")
        .attr("class", "legend");

      // this is the bottom scale 
      legend.append("rect")
        .attr("x", function (d, i) {
          return legendElementWidth * i + (calculatedCanvas(margin).cardWidth - legendElementWidth * buckets);
        })
        .attr("y", height + 50)
        .attr("width", legendElementWidth)
        .attr("height", calculatedGrid().gridHeight / 2)
        .style("fill", function (d, i) {
          return colors[i];
        });

      legend.append("text")
        .attr("class", "scales")
        .text(function (d) {
          return (Math.floor(d * 10) / 10);
        })
        .attr("x", function (d, i) {
          return ((legendElementWidth * i) + Math.floor(legendElementWidth / 2) - 10 + (calculatedCanvas(margin).cardWidth - legendElementWidth * buckets));
        })
        .attr("y", calculatedCanvas(margin).cardHeight + calculatedGrid().gridHeight + 45);

      $("svg").after("<p class='measurement-scale'>Temperture increase in ℃</p>");


    }

    setupLegend(svg);
  });
});