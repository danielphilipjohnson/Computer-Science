




/*
// tidy up everything
function openTab(evt, cityName) {
    var i, x, tablinks;
   
    x = document.getElementsByClassName("Tab");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
 
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-gray", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-gray";
}

*/




// add class


$(document).ready(function () {



    // tablink  turn into a function 
    $('.tablink').click(function () {
        // set each tab to hide content
        $('.Tab').each(function () {
            $(this).css("display", 'none');
        });
        // remove the active color from tab
        $('.tablink').each(function () {
            $(this).removeClass("w3-gray");
        });
        // set the current clicked tab to display and add active color
        // get correct tab
        $('#' + $(this).text()).css("display", 'block');

        $(this).addClass("w3-gray");
    });






    // UTILS

    function createClassFromSearchTerm(searchTerm) {
        var elementClass = searchTerm.slice(0, 10).replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "");
        console.log(elementClass);
        return elementClass.replace(" ", "_");


    }


    function removeErrorPanel() {
        if ($('.error').length > 0) {
            $('.error').remove();
        }
    }

    function addErrorPanel(heading, message) {
        if ($('.error').length <= 0) {
            var partial = '<div class="w3-container w3-red  w3-card-4 error"><h3>' + heading + '</h3> <p>' + message + '</p></div> ';
            $(partial).prependTo('#results');

        }
    }

    // UI 

    function createContainer(searchQuery, elementClass) {
        //create a function to upodate ui
        $('.search-history').append("<li class='search-item'>" + searchQuery + "</li>");
        var partial = '<div class="w3-panel w3-signal-grey w3-round w3-card-4"><h2 class="search-word">Word searched: ' + searchQuery.toUpperCase()
            + '</h2><p class=' + elementClass + '>Results where found for :'
            + searchQuery.toUpperCase() + '</p></div>';
        $(partial).prependTo('#results');
        $('.input-group').val("");
    }

    // Perform Jsonp wiki call if success it create an container and child elements. Draws them to screen
    // on failure draws error message to screen 
    function wikiSearch(searchItem) {
        // search variables 
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var title = searchItem;
        var elementClass = createClassFromSearchTerm(searchItem);
        var parsedTitle = title.replace(" ", "_");


        var url = api + parsedTitle; // + cb;
        //var url ="";
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            format: "json",

            success: function (data) {
                var page = 'https://en.wikipedia.org/?curid=';

                createContainer(searchItem, elementClass);
                // make a function called data validation
                if (typeof data.query === 'undefined') {
                    removeErrorPanel();
                    addErrorPanel("Could not find a match", "try narrowing your search");
                    return null;
                }


                //cut this down USe a function
                var results = data.query.pages;
                var thumbnail;
                var thumbnailSource;
                var thumbnailHeight;
                var thumbnailWidth;
                var thumbnailTitle;
                var wikiResult;
                var title;
                var extract;
                var pageId;

                for (var result in results) {
                    var wikiResult = results[result];
                    console.log(wikiResult);

                    title = wikiResult.title;
                    extract = wikiResult.extract;
                    pageId = wikiResult.pageid;


                    var resultPartial = '<a href="' + page + pageId + '" target="_blank"><div class="w3-panel w3-signal-white  w3-border w3-round-large result-bar">' +
                        '<h4 class="result-title">' + title + '</h4>' +
                        '<p class="extract" >' + extract + '</p>' + '</div></a>';
                    $('.' + elementClass).append(resultPartial);

                }
                $('a').click(function () {
                    $('iframe').attr("src", $(this).attr("href"));
                });
            },

        }).fail(function () {
            //should be able to run these together filter down
            removeErrorPanel();
            addErrorPanel("Could not contact wikipedia", "they may have server issues or you could check your internet connection. Sorry about that.");
        });
    }
    //generate bad data
    //wikiSearch(".fdfm.dfms.fjdslfsdi");



    // validates search input rejects or sends jsonp request
    function validateSearchAndUpdateUi(searchQuery) {
        var elementClass = createClassFromSearchTerm(searchQuery);
        var heading = "Required Field";
        var message = "Please enter text into the search box";

        function validateSearch(searchQuery) {
            $('.holder-column').remove();
            //search meets minium validation
            if (searchQuery.length > 0) {
                removeErrorPanel();
                //perform search
                wikiSearch(searchQuery);
            }
            else {
                //search failed
                removeErrorPanel();
                addErrorPanel(heading, message);
            }
        }
        validateSearch(searchQuery);
    }

    function setupSideNav() {
        //events
        function sideNavEvents() {
            function sidebarOpen() {
                $("#mySidebar").toggleClass('open');
            }
            function sidebarClose() {
                if ($("#mySidebar").hasClass('open')) {
                    $("#mySidebar").removeClass('open');
                }
            }
            $('#sidebar-open').click(function () {
                sidebarOpen();
            });



            $('.Tab').click(function () {
                sidebarClose();
            });
            $('.sidebar-close').click(function () {
                sidebarClose();
            });



        }

        
        sideNavEvents();


        //side nav collections 
        var animals = [
            'baboon', 'alpaca',
            'muskrat', 'dingo',
            'mountain goat', 'peccary', 'leopard', 'rabbit',
            'gnu', 'jerboa', 'guinea pig', 'iguana',
            'snowy owl', 'chipmunk', 'mole'];

        var randomCities = [
            'Suzhou',
            'Lima',
            'Berlin',
            'Dhaka',
            'Addis Ababa',
            'New York City',
            'Bangalore',
            'Jakarta',
            'Hyderabad'
        ];
        var randomCountries = [
            'China',
            'Peru',
            'Germany',
            'Bangladesh',
            'Ethiopia',
            'United States',
            'Thailand',
            'China',
            'Indonesia',
            'India'
        ];

        var randomCelebrities = [
            'Seth Rogen',
            'Kamal Hassan',
            'Jessica Biel',
            'Tom Hiddleston',
            'Jason Statham',
            'Christopher Nolan',
            'Christina Aguilera',
            'Nathan Sykes',
            'Robin Williams'
        ];

        var randomMovies = [
            'The Amazing Spider-Man',
            'Passengers',
            'The Lord of the Rings: The Two Towers',
            'Avatar',
            'The Godfather',
            'The Founder',
            'Rogue One: A Star Wars Story',
            'Pulp Fiction',
            'Cars 3',
            'Transformers: Age of Extinction',
            'Zombieland',
            'Deadpool',
            'District 9',
            'Fantastic Beasts and Where to Find Them',
            'Transformers: The Last Knight'
        ];

        function sideNavClick(id, list) {
            $('#' + id).click(function () {
                var maxLength = list.length;
                var generateIndex = Math.floor(Math.random() * maxLength);
                var item = list[generateIndex];
                $('.input-group').val("");
                validateSearchAndUpdateUi(item);
            });
        }

        sideNavClick('Animal', animals);
        sideNavClick('City', randomCities);
        sideNavClick('Country', randomCountries);
        sideNavClick('Celebrity', randomCelebrities);
        sideNavClick('Movie', randomMovies);
    }
    setupSideNav();
  
    // search bar event
    $(".inner-search").click(function () {
        // get search box value
        var searchResult = $('.input-group').val();
        //break down into pieces
        validateSearchAndUpdateUi(searchResult);
    });



















});