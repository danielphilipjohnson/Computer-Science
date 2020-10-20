$(document)
    .ready(function() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');


        // refactor into generic form submit
        $('#ctof').click(function(e) {

            e.preventDefault();

            var form = $(this).parent();

            var celsiusValue = form.get(0).firstChild.firstChild;
            var santizedData = $(celsiusValue).val().trim()


            function isDataValid(value) {

                /* data isnt empty */
                if (value.length >= 1) {

                    if (!isNaN(value)) return true; /* is data a number */

                } else return false; /* data is empty */
            }

            // check for empty input
            if (isDataValid(santizedData)) {

                var displayValue = form.find("p");

                $.post("/api/ctof", {
                    celsius: $(celsiusValue).val(),

                }).done(function(data) {
                    displayValue.text($(celsiusValue).val() + "°C to " + data.Farenheit + " °F");
                    // repetitive code refactor
                    var fieldToAddErrorClass = form.get(0).firstChild;
                    $(fieldToAddErrorClass).removeClass("error");
                    form.find(".ui.error.message").css("display", "none");

                }).fail(function(data) {
                    // reuse this message
                    console.log(JSON.stringify(data.responseJSON))
                })

            } else {

                // add field error 
                var fieldToAddErrorClass = form.get(0).firstChild;
                $(fieldToAddErrorClass).addClass("error");
                form.find(".ui.error.message").css("display", "block")


            }
        })
    });