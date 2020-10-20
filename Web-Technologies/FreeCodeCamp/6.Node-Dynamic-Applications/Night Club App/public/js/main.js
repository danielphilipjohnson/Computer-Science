$(document).ready(function () {
    var isUserLoggedIn = function () {
        if ($(".UserIsLogged").length > 0) {
            //User is logged
            //console.log("logged in");
            return true;
        }
        else {
            //console.log("Not logged in");
            return false;
        }

    }

    var userStatus = isUserLoggedIn();

    // Gets the values of them form we need stores them into an object
    // Keys match the Form field ids to access later 
    function getLoginFormValues() {
        var username = $('#loginForm input#Username').val();
        var password = $('#loginForm input#Password').val();
        return { Username: username, Password: password };
    }

    // validate the form fields
    // later add custom function to drop in
    function ValidateFormValues(formFields) {
        for (var field in formFields) {

            // Value to validate
            var valueToCheck = formFields[field];

            // Input field that needs validation 
            var cachedFormField = $('#' + field);

            // Get its form group
            var formGroup = cachedFormField.parent();

            // eventually build a func to validate certain checks
            // TODO
            if (valueToCheck === "") {
                // Check whether the group has a warning already
                // if it doesnt have the class add it and add
                // feedback
                if (!formGroup.hasClass('has-warning')) {
                    formGroup.addClass('has-warning');
                    cachedFormField.after('<div class="form-control-feedback ' + 'feedback-' + field + '"' + '>Field! is required</div>');
                }

            }
            else {
                if (formGroup.hasClass('has-warning')) {
                    // remove warning add success
                    formGroup.removeClass('has-warning')
                    formGroup.addClass('has-success');
                    // remove warning field
                    $('.feedback-' + field).remove();
                }
                else {
                    formGroup.addClass('has-success');
                }
            }
        }


    }

    $('#login').click(function () {

        var formValues = getLoginFormValues();

        ValidateFormValues(formValues);
        // now we need to do the logic 
        var loginForm = $('#loginForm');

        // clean up any potential errors
        if ($('#username-exists').length > 0) {
            $('#username-exists').remove();
        }
        if ($('#account-created').length > 0) {
            $('#account-created').remove();
        }
        // POST request 

        var jqxhr = $.post("/users/login", { username: formValues.Username, password: formValues.Password })
            .done(function (data) {
                $('#userlogin').modal('hide');
                window.location.replace("/");
            }).fail(function () {
                // display to user that failed
                if ($('#username-login-failed').length === 0) {
                    $(loginForm).prepend('<div id="username-login-failed" class="alert alert-danger"> Username or password didnt match please try again </div>');
                }

            });



    });
    $('#register').click(function () {

        var formValues = getLoginFormValues();

        ValidateFormValues(formValues);

        // now we need to do the logic 
        var loginForm = $('#loginForm');

        // POST request 
        var jqxhr = $.post("/users/register", { username: formValues.Username, password: formValues.Password })
            .done(function (data) {
                if ($('#username-exists').length > 0) {
                    $('#username-exists').remove();
                }
                $(loginForm).prepend('<div id="account-created" class="alert alert-success"> Account Created please now login </div>')
                $('.register').remove();


            }).fail(function () {
                // display to user that username already exists 
                if ($('#username-exists').length === 0) {
                    $(loginForm).prepend('<div id="username-exists" class="alert alert-danger"> Username exists </div>');
                }
            });

    });



    $('#submitBars').click(function () {

        var type = "nightclub";

        function getJson() {
            var cachedResult = $('#searchresults');
            if ($('#searchresults').children()) {

                //console.log($('#searchresults').children());
                $('#searchresults').children().each(function () {

                    $(this).remove();
                });
            }

            if ($('.search-header').length < 1) {
                $('.search-container').after('<h3 class="section-header search-header">Search Results</h3>')
            }

            var venuePlace = $('#state').val() !== "" ? $('#state').val() : true;


            if (venuePlace === true) {
                if ($('#search-empty').length === 0) {
                    $('.search-header').prepend('<div id="search-empty" class="alert alert-danger"> SearchBox cant be empty </div>');
                }

            }
            else {
   
                if ($('#search-empty').length > 0) {
                    $('#search-empty').remove();
                }

                var url = 'https://api.foursquare.com/v2/venues/search?near=' + venuePlace + '&query=nightclub&limit=10&oauth_token=VVCQKONQF1WBUY4XOOKVAEWDU2SF1WC4JRIAK0ZOHGX0J0SW&v=20170918';

                var jqxhr = $.get(url, function (data) {

                    var items = [];
                    $.each(data.response.venues, function (key, val) {

                        var venueName = val.name;

                        var venuPhone = val.contact.formattedPhone !== undefined ? val.contact.formattedPhone : "No registered number";
                        // undefined check
                        var locationAddress = val.location.address !== undefined ? val.location.address : "No current address";
                        var locationCity = val.location.city !== undefined ? val.location.city : " ";
                        var locationCountry = val.location.country !== undefined ? val.location.country : " ";
                        var locationPostalCode = val.location.postalCode !== undefined ? val.location.postalCode : " ";

                        function addStatus(userStatus) {
                            if (userStatus) {
                                return '<i class="save fa fa-floppy-o " aria-hidden="true"></i> ' +
                                    '</address>';
                            }
                            else {
                                return '<i class="fa fa-floppy-o" aria-hidden="true" data-toggle="modal" data-target="#userlogin"></i> ' +
                                    '</address>';
                            }
                        }
                        var i = addStatus(userStatus);

                        function addAttending(userStatus) {
                            if (userStatus) {
                                return '<div class="dropdown">' +
                                    '<i class="fa fa-plus" id="dropdownattendingbutton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>' +
                                    '<div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownattendingbutton">' +
                                    '<p>I am attending this event <i class="fa fa-check" aria-hidden="true"></i></p></div></div></div>';
                            }
                            else {
                                return '<i class="fa fa-plus" aria-hidden="true" aria-expanded="false" data-toggle="modal" data-target="#userlogin"></i></div>';
                            }


                        }
                        var attending = addAttending(userStatus);

                        function addimage(index, userStatus) {
                            if (index % 4 === 0) {
                                return '<div class="card-block main-content">' +
                                    '<img class="img-fluid" src="' + '/src/img/1.jpg" alt="">' +
                                    '</div>';
                            }
                            else if (index % 4 === 1) {
                                return '<div class="card-block main-content">' +
                                    '<img class="img-fluid" src="' + '/src/img/2.jpg" alt="">' +
                                    '</div>';
                            }
                            else if (index % 4 === 2) {
                                return '<div class="card-block main-content">' +
                                    '<img class="img-fluid" src="' + '/src/img/3.jpg" alt="">' +
                                    '</div>';
                            }
                            else if (index % 4 === 3) {
                                return '<div class="card-block main-content">' +
                                    '<img class="img-fluid" src="' + '/src/img/4.jpg" alt="">' +
                                    '</div>';
                            }

                        }
                        var img = addimage(key, userStatus);

                        var elem = '<div class="card">' +
                            '<div class="card-header">' +
                            '<h5 class="card-title">' + venueName + '</h5>' +
                            '</div>' +
                            img +
                            '<div class="card-block attend-block-stats">' +
                            //'<p class="attend text-muted">Attending' +
                            //'<span>100,000</span>' +
                            //'</p>' +
                            '<address class="attend">' +
                            '<strong>' + venueName + ' ,</strong>' +
                            '<br><span>' + locationAddress + ",  </span>" +
                            '<br><span>' + locationCity + " : " + locationCountry + " " + locationPostalCode + ",  </span>" +
                            '<br><abbr title="Phone"> P: </abbr>' + venuPhone + ",  " +
                            i +
                            '</div>' +
                            '<div class="card-block polls-social-bar">' +
                            '<div class="left">' +
                            attending +
                            '<div class="right">' +
                            '<div class="dropdown"><i class="fa fa-share-alt" id="dropdownsharebutton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownsharebutton"><div class="share-content"><i class="fa fa-twitter"></i>' +
                            '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=who%20wants%20to%20attend%20' + venueName + '"' + '><span>Share on Twitter</span></a></div></div></div></div></div>' +
                            '</div>' +
                            '</div>'
                        cachedResult.append(elem);
                    });
                    if (userStatus) {
                        // only works if logged in 
                        $('.save').click(function () {

                            var node = $(this).closest('address');

                            var child = node.children();

                            var dataToStore = child.text().split(',');

                            var dataToClean = [];

                            dataToStore.forEach(function (elem) {
                                dataToClean.push(elem.trim());
                            });
                            var address = {
                                venuename: dataToClean[0],
                                address: dataToClean[1],
                                state: dataToClean[2],
                                phone: dataToClean[3],
                            }
                            // add alert of saved
                            $(this).after('<div class="alert alert-success"> Saved nightclub</div>');
                            // remove saved
                            $(this).remove();
                            // next iteration add the card manually to stop refresh updating

                            //POST TO SERVER
                            var jqxhr = $.post("/savebars", address)
                                .done(function (data) {

                                });
                        })
                    }

                }).done(function () { });
            }


            /*
                $.getJSON("/bars.json", function (data) {
                //console.log(data.response)
                var items = [];
                $.each(data.response.venues, function (key, val) {
  
                    var venueName = val.name;

                    var venuPhone = val.contact.formattedPhone !== undefined ? val.contact.formattedPhone  : "No registered number";
                     // undefined check
                    var locationAddress = val.location.address !== undefined ? val.location.address : "No current address";
                    var locationCity = val.location.city !== undefined ? val.location.city : " ";
                    var locationCountry = val.location.country !== undefined ? val.location.country : " ";
                    var locationPostalCode = val.location.postalCode !== undefined ? val.location.postalCode  : " ";
                   
                    function addStatus(userStatus){
                        if(userStatus){
                            return '<i class="save fa fa-floppy-o " aria-hidden="true"></i> ' +
                            '</address>';
                        }
                        else{
                            return '<i class="fa fa-floppy-o" aria-hidden="true" data-toggle="modal" data-target="#userlogin"></i> ' +
                            '</address>';
                        }
                    }
                    var i = addStatus(userStatus);

                    function addAttending(userStatus){
                        if(userStatus){
                            return  '<div class="dropdown">' +
                            '<i class="fa fa-plus" id="dropdownattendingbutton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>' +
                            '<div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownattendingbutton">' +
                            '<p>I am attending this event <i class="fa fa-check" aria-hidden="true"></i></p></div></div></div>';
                        }
                        else{
                            return '<i class="fa fa-plus" aria-hidden="true" aria-expanded="false" data-toggle="modal" data-target="#userlogin"></i></div>';
                        }


                    }
                    var attending = addAttending(userStatus);

                    function addimage(index, userStatus){
                        if(index % 4 === 0){
                            return  '<div class="card-block main-content">' +
                            '<img class="img-fluid" src="' + '/src/img/1.jpg" alt="">' +
                            '</div>';
                        }
                        else if(index % 4 === 1){
                            return  '<div class="card-block main-content">' +
                            '<img class="img-fluid" src="' + '/src/img/2.jpg" alt="">' +
                            '</div>';
                        }
                        else if(index % 4 === 2){
                            return  '<div class="card-block main-content">' +
                            '<img class="img-fluid" src="' + '/src/img/3.jpg" alt="">' +
                            '</div>';
                        }
                        else if(index % 4 === 3){
                            return  '<div class="card-block main-content">' +
                            '<img class="img-fluid" src="' + '/src/img/4.jpg" alt="">' +
                            '</div>';
                        }
                             
                    }
                    var img = addimage(key, userStatus);

                    var elem = '<div class="card">' +
                        '<div class="card-header">' +
                        '<h5 class="card-title">' + venueName + '</h5>' +
                        '</div>' +
                        img +
                        '<div class="card-block attend-block-stats">' +
                        //'<p class="attend text-muted">Attending' +
                         //'<span>100,000</span>' +
                        //'</p>' +
                        '<address class="attend">' +
                        '<strong>' + venueName + ' ,</strong>' +
                        '<br><span>' + locationAddress + ",  </span>" +
                        '<br><span>' + locationCity + " : " + locationCountry + " " + locationPostalCode + ",  </span>" +
                        '<br><abbr title="Phone"> P: </abbr>' + venuPhone + ",  " +
                        i +
                        '</div>' +
                        '<div class="card-block polls-social-bar">' +
                        '<div class="left">' +
                         attending +
                        '<div class="right">' +
                        '<div class="dropdown"><i class="fa fa-share-alt" id="dropdownsharebutton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownsharebutton"><div class="share-content"><i class="fa fa-twitter"></i>' +
                        '<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=who%20wants%20to%20attend%20' + venueName + '"' + '><span>Share on Twitter</span></a></div></div></div></div></div>' +
                        '</div>' +
                        '</div>'
                    cachedResult.append(elem);
                });
                if (userStatus) {
                    // only works if logged in 
                    $('.save').click(function () {

                        var node = $(this).closest('address');

                        var child = node.children();

                        var dataToStore = child.text().split(',');

                        var dataToClean = [];

                        dataToStore.forEach(function (elem) {
                            dataToClean.push(elem.trim());
                        });
                        var address = {
                            venuename: dataToClean[0],
                            address: dataToClean[1],
                            state: dataToClean[2],
                            phone: dataToClean[3],
                        }
                        // add alert of saved
                        $(this).after('<div class="alert alert-success"> Saved nightclub</div>');
                        // remove saved
                        $(this).remove();
                        // next iteration add the card manually to stop refresh updating

                        //POST TO SERVER
                        var jqxhr = $.post("/savebars", address)
                            .done(function (data) {
                                alert("Data Loaded: " + data);
                            });

                    })



                }
                else {
                    $('.save').click(function () {
                        alert("please login");
                    });
                }
            });
            */
        }
        getJson();
    })

    $('.fa-check').click(function () {


        var barname = $(this).children()[0].id;

        var containerToAdd = $(this).parent();

        var itemsToRemove = $(this).parent().children().each(function () {

            $(this).remove()

        });
        containerToAdd.append('<p> I am attending this event </p>' +
            '<p> I would like to unattend</p>' +
            '<i class="fa fa-times" aria-hidden="true" data-id="' + barname + '"><input id="Berlin Nightclub" type="hidden"></i>');

        var jqxhr = $.post("/attending", { barname: barname })
            .done(function (data) {


                // window.location.replace("/");
            });
    });
    $('.fa-times').click(function () {

        var barname = $(this).children()[0].id;
        var containerToAdd = $(this).parent();

        var itemsToRemove = $(this).parent().children().each(function () {
            $(this).remove()
        });
        containerToAdd.append('<p> I am not attending this event  </p>' +
            '<p> Would you like to attend this event</p>' +
            '<i class="fa fa-check" aria-hidden="true" data-id="' + barname + '"><input id="Berlin Nightclub" type="hidden"></i>');

        var jqxhr = $.post("/notattending", { barname: barname })
            .done(function (data) {



            });
    });
    $('.fa-trash').click(function () {

        var barname = $(this).children()[0].id;
        var containerToAdd = $(this).parent().parent().parent().remove();

        var jqxhr = $.post("/remove", { barname: barname })
            .done(function (data) {
            });
    });
});