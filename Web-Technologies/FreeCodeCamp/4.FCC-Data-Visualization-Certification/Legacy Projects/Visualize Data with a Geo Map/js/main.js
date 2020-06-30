$('document').ready(function () {

  var projection = d3.geoMercator()
    .center([0, 5])
    .translate([780, 360])
    .scale(300);


  function setupCanvas() {

    var width = '100%';

    var height = '100%';

    var oceanBlue = '#3987c9';

    var svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Sets background dimensions and color
    var rect = svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', oceanBlue);

    return svg;
  }

  var svg = setupCanvas();

  var path = d3.geoPath()
    .projection(projection);


  function setupMap() {
    var map = svg.append('g');
    var grassColors = '#CBE6A3';
    var countryBorderColors = '#666666';
    // Map of earth
    d3.json('https://d3js.org/world-50m.v1.json', function (json) {
      map.selectAll('path')
        .data(topojson.feature(json, json.objects.countries).features)
        .enter()
        .append('path')
        //paint the countries
        .attr('fill', grassColors)
        //borderlines
        .attr('stroke', countryBorderColors)
        .attr('d', path);
    });
  }

  setupMap();

  // Data points
  d3.json('https://data.nasa.gov/resource/y77d-th95.geojson', function (json) {
    var hue = 0;
    var colors = {};
    // swap days a > b
    json.features.sort(function (a, b) {
      return new Date(a.properties.year).getFullYear() - new Date(b.properties.year).getFullYear();
    });
    json.features.map(function (e) {
      hue += 0.45;
      colors[e.properties.year] = hue;
      e.color = 'hsl(' + hue + ',100%, 50%)';
    });
    // swap mass a < b
    json.features.sort(function (a, b) {
      return b.properties.mass - a.properties.mass;
    });


    function setupToolTip() {
      var div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      return div;



    } // Tooltip
    var div = setupToolTip();

    function createMeteors() {
      //local helper 
      // Resize map on window resize
      function sizeChange() {
        d3.selectAll("g").attr("transform", "scale(" + $("#container").width() / 1900 + ")");
        $("svg").height($("#container").width() / 2);
      }
      var meteorites = svg.append('g')
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('circle')
        .attr('cx', function (d) { return projection([d.properties.reclong, d.properties.reclat])[0]; })
        .attr('cy', function (d) { return projection([d.properties.reclong, d.properties.reclat])[1]; })
        .attr('r', function (d) {

          var range = 718750 / 2 / 2;

          if (d.properties.mass <= range) return 2;
          else if (d.properties.mass <= range * 2) return 10;
          else if (d.properties.mass <= range * 3) return 20;
          else if (d.properties.mass <= range * 20) return 30;
          else if (d.properties.mass <= range * 100) return 40;
          else return 50;
        })
        .attr('fill-opacity', function (d) {
          var range = 718750 / 2 / 2;
          if (d.properties.mass <= range) return 1;
          return 0.5;
        })
        .attr('stroke-width', 0.5)
        .attr('stroke', '#fff')
        .attr('fill', function (d) { return d.color; })
        .on('mouseover', function (d) {
          d3.select(this).attr('d', path).style('fill', 'black');
          // Show tooltip
          div.transition()
            .duration(200)
            .style('opacity', 0.9);
          div.html('<span class="def">Fall:</span> ' + d.properties.fall + '<br>' +
            '<span class="def">Mass:</span> ' + d.properties.mass + '<br>' +
            '<span class="def">Meteor Name:</span> ' + d.properties.name + '<br>' +
            //'<span class="def">nametype:</span> ' + d.properties.nametype + '<br>' +
            '<span class="def">Recclass:</span> ' + d.properties.recclass + '<br>' +
            '<span class="def">Reclat:</span> ' + d.properties.reclat + '<br>' +
            '<span class="def">Year:</span> ' + new Date(d.properties.year).getFullYear() + '<br>')
            .style('left', (d3.event.pageX + 30) + 'px')
            .style('top', (d3.event.pageY / 0.9) + 'px');
        })
        .on('mouseout', function (d) {
          // Reset color of dot
          d3.select(this).attr('d', path).style('fill', function (d) { return d.properties.hsl });
          // Fade out tooltip
          div.transition()
            .duration(600)
            .style('opacity', 0);
        });
      // Initialize map sizes
      sizeChange();
      d3.select(window).on("resize", sizeChange);
    }
    createMeteors();
  });

  function zoomListener() {
    // https://github.com/d3/d3/blob/master/CHANGES.md#zooming-d3-zoom

    var zoomListener = d3.zoom()
      // how big data points can get
      .scaleExtent([0.5, 3])
      .on("zoom", // Move and scale map and meteorites on interaction
      function () {

        var transform = d3.event.transform;


        var g = svg.selectAll('g');

        g.attr("transform", transform);

        g.selectAll("circle")
          .attr("d", path.projection(projection));
        g.selectAll("path")
          .attr("d", path.projection(projection));

      }
      );

    return zoomListener;

  }
  svg.call(zoomListener());

});