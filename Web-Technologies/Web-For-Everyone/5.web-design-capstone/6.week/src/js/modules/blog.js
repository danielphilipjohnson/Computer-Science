var Blogs = (function () {
  var blogSettings = {
    //full-image
    Parent: ".card-columns#blogs",
    HTMLcardText: `<div class="card blog wow fadeIn" data-wow-duration="2s" data-wow-delay="0s"></div>`,
    HTMLcardFullImage: `<div class="card blog full-image wow fadeIn" data-wow-duration="2s" data-wow-delay="0s"></div>`,
    HTMLcard: `<div class="x card blog image wow fadeIn" data-wow-duration="2s" data-wow-delay="0s"></div>`,
    HTMLbar: `
      <div class="bar" data-src="">
        <i class="fas fa-blog"></i>
        <i></i>
        <span class="title">blog</span>
      </div>`,

    HTMLcardHalfBody: `<div class="card-body">
                      <div class="media"> 
                        <img class="thumbnail mr-3" src="/assets/img/processed-images/profile1_400w.png" alt="profile pic"/>
                        <div class="media-body">
                        <p>   Posted by  <span class="title title">Daniel Johnson</span>  </p>
                        <small class="text-muted text-muted">APRIL 29, 2020</small>
                      </div>
                    </div>
                    <ul class="topics">
                      <li class="text-muted"><i class="fab fa-markdown"></i></li>
                      <li class="text-muted"><i class="fab fa-less"></i></li>
                      <li class="text-muted"><i class="fab fa-node-js"></i></li>
                    </ul>
                    <h5 class="card-title">Be the change that you wish to see in the world.</h5>
                    <p class="card-text text-muted">
                      This is a longer card with supporting text below as a natural lead-in to
                      additional content. This content is a little bit longer.
                    </p>
                  </div>`,
    HTMLcardFullBody: `<div class="image" style="background-image:url(/assets/img/processed-images/photo%number%_400w.png)">
                        <div class="card-body image">
                            <div class="media">
                                <img class="thumbnail mr-3" src="/assets/img/processed-images/profile1_400w.png" alt="profile pic">
                                <div class="media-body">
                                    <p>Posted by
                                        <span class="title">Daniel Johnson</span>
                                    </p>
                                    <small class="text-muted">APRIL 29, 2020</small>
                                </div>
                            </div>
                            <h5 class="card-title">Be the change that you wish to see in the world.</h5>
                            <p class="card-text text-muted">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <ul class="topics">
                                <li class="text-muted">
                                    <i class="fab fa-html5"></i>
                                </li>
                                <li class="text-muted">
                                    <i class="fab fa-css3"></i>
                                </li>
                                <li class="text-muted">
                                    <i class="fab fa-angular"></i>
                                </li>
                            </ul>
                        </div>
                      </div>`,
    HTMLcardTextBody: `<div class="card-body">
            <div class="media">
                <img class="thumbnail mr-3" src="/assets/img/processed-images/profile1_400w.png" alt="profile pic"/>
                <div class="media-body">
                    <p>Posted by
                        <span class="title">Daniel Johnson</span>
                    </p>
                    <small class="text-muted">APRIL 29, 2020</small>
                </div>
            </div>
            <ul class="topics">
                <li class="text-muted">
                    <i class="fab fa-markdown"></i>
                </li>
                <li class="text-muted">
                    <i class="fab fa-sass"></i>
                </li>
                <li class="text-muted">
                    <i class="fab fa-gulp"></i>
                </li>
            </ul>
            <h5 class="card-title">Be the change that you wish to see in the world.</h5>
            <p class="card-text text-muted">
                Kitsch jean shorts mustache, squid chicharrones butcher organic cliche
                      cardigan chartreuse hell of. Franzen kale chips DIY cardigan everyday
                      carry raw denim try-hard. Ramps dreamcatcher adaptogen, photo booth
                      typewriter cloud bread pickled flannel taiyaki shaman YOLO selvage hell of
                      farm-to-table. Selfies mustache echo park air plant. Plaid messenger bag
                      forage cardigan chicharrones kombucha glossier selfies hexagon chia
                      williamsburg. Scenester everyday carry viral, artisan flexitarian small
                      batch truffaut. Letterpress messenger bag enamel pin twee knausgaard
                      schlitz pickled.
            </p>
          </div>`,
    HTMLfooter: `<div class="card-body-footer">
                        <a href="#">
                            <i class="fab fa-codepen"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="#">
                            <i class="fab fa-jsfiddle"></i>
                        </a>
                    </div>`,
  };

  function createHalfImageBlog(
    Parent,
    HTMLcard,
    HTMLbar,
    HTMLcardHalfBody,
    HTMLfooter
  ) {
    var randomNumber = Math.ceil(Math.random() * 6);
    var card = $(HTMLcard);

    var HTMLimage =
      '<img class="card-img-top"  src="/assets/img/processed-images/photo' +
      randomNumber +
      '_400w.png"  alt="Card image cap"/>';

    $(card).append(HTMLbar);
    $(card).append(HTMLcardHalfBody);
    $(card).append(HTMLimage);
    $(card).append(HTMLfooter);
    $(card).appendTo(Parent);
  }

  // create full image
  function createFullBlog(
    Parent,
    HTMLcardFullImage,
    HTMLbar,
    HTMLcardFullBody,
    HTMLfooter
  ) {
    var card = $(HTMLcardFullImage);

    $(card).append($(HTMLbar));
    var randomNumber = Math.ceil(Math.random() * 6);

    $(card).append(HTMLcardFullBody.replace("%number%", randomNumber));
    $(card).append(HTMLfooter);
    $(card).appendTo(Parent);
  }

  //make an object
  function createTextBlog(
    Parent,
    HTMLcardText,
    HTMLbar,
    HTMLcardTextBody,
    HTMLfooter
  ) {
    var card = $(HTMLcardText);
    $(card).append(HTMLfooter);
    $(card).append(HTMLbar);

    $(card).append(HTMLcardTextBody);

    $(card).appendTo(Parent);
  }

  function typeOfBlog(number, blogSettings) {
    if (number === 1) {
      return createTextBlog(
        blogSettings.Parent,
        blogSettings.HTMLcardText,
        blogSettings.HTMLbar,
        blogSettings.HTMLcardTextBody,
        blogSettings.HTMLfooter
      );
    } else if (number === 2) {
      return createFullBlog(
        blogSettings.Parent,
        blogSettings.HTMLcardFullImage,
        blogSettings.HTMLbar,
        blogSettings.HTMLcardFullBody,
        blogSettings.HTMLfooter
      );
    } else {
      return createHalfImageBlog(
        blogSettings.Parent,
        blogSettings.HTMLcard,
        blogSettings.HTMLbar,
        blogSettings.HTMLcardHalfBody,
        blogSettings.HTMLfooter
      );
    }
  }

  return {
    create: function (amount) {
      for (var i = 0; i <= amount; i++) {
        //determine which time of blog to make
        var randomNumber = Math.ceil(Math.random() * 3);
        typeOfBlog(randomNumber, blogSettings);
      }
    },

    init: function () {
      if (document.getElementById("blogs") !== null) {
        window.addEventListener("scroll", function () {
          if (
            window.scrollY + window.innerHeight + 150 >=
            document.documentElement.scrollHeight
          ) {
            Blogs.create(10);
          }
        });
      }
    },
  };
})();
Blogs.init();
