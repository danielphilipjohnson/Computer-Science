var Portfolio = (function () {
  var portfolioSettings = {
    // moved onto card columns
    // each tab has its on parent
    Parent: ".card-columns",
    HTMLcard: `<div class="card wow fadeInRight" data-wow-duration="2s" data-wow-delay="1s">
                <div class="bar" data-src="">
                    <i class="fab fa-firefox"></i>
                    <i></i>
                    <span class="title">Title for first item</span>
                </div>
                <img class="card-img-top" src="/assets/img/website%number%.png" alt="Kitten"><a href="#">
                    <div class="card-body-footer">
                        <i class="fab fa-codepen"></i>
                        <i class="fab fa-github"></i>
                        <i class="fab fa-bitbucket"></i>
                    </div>
                </a>
            </div>`,
  };
  
  function createPortfolio(Parent, HTMLcard, randomNumber) {
    var card = $(HTMLcard.replace("%number%", randomNumber));

    $(Parent).append(card);
  }
  return {
    create: function (amount) {
      for (var i = 0; i <= amount; i++) {
        var randomNumber = Math.ceil(Math.random() * 6);
        createPortfolio(
          portfolioSettings.Parent,
          portfolioSettings.HTMLcard,
          randomNumber
        );
      }
    },

    init: function (amount) {
      if (document.getElementById("myTabContent") !== null) {
        window.addEventListener("scroll", function () {
          if (
            window.scrollY + window.innerHeight + 100 >=
            document.documentElement.scrollHeight
          ) {
            Portfolio.create(10);
          }
        });
      }
    },
  };
})();

Portfolio.init();
