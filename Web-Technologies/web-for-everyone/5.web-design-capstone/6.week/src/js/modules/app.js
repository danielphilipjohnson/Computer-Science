var Portfolio = (function () {
  var style = {
    color: "#fff",
    position: "absolute",
    right: "17px",
    top: "0",
    padding: 0,
    margin: 0,
    transform: null,
  };

  var createBar = function (id, style, percent) {
    // progressbar.js@1.0.0 version is used
    // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
    var bar = new ProgressBar.Line(id, {
      strokeWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      color: "#04a70c",
      trailColor: "#eee",
      trailWidth: 1,
      svgStyle: { width: percent + "%", height: "100%" },
      text: {
        style: style,
        autoStyleContainer: false,
      },
      from: { color: "#FFEA82" },
      to: { color: "#ED6A5A" },
      step: (state, bar) => {
        bar.setText(Math.round(bar.value() * percent) + " %");
      },
    });
    bar.animate(1.0); // Number from 0.0 to 1.0
  };

  return {
    check: function () {
      // check for broken images
      $("img").each(function () {
        if (
          (typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) ||
          this.readyState == "uninitialized"
        ) {
          $(this).attr("src", "assets/img/imagenotfound.png");
        }
      });
    },

    init: function () {
      if (document.getElementById("html") !== null) {
        createBar("#html", style, 86);
        createBar("#css", style, 82);
        createBar("#js", style, 70);
        createBar("#react", style, 64);
        createBar("#angular", style, 54);
        createBar("#node", style, 40);
        createBar("#gulp", style, 78);
        createBar("#django", style, 56);
      }
      Portfolio.check();
      new WOW().init();
      new AOS.init();
    },
  };
})();

Portfolio.init();
