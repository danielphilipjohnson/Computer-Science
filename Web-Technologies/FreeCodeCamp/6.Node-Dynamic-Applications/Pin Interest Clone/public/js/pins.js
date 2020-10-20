//skeleton
$(document).ready(function () {

    function getPinVals() {
        var pindescription = $('#pindescription').val();
        //var avatar = $('#avatar').val();
    
        // produces on
        var pinCategory = $(".pin-category-select").val();

        return {
            pindescription: pindescription,
            pinCategory: pinCategory,
            //avatar: avatar 
        };
    }
    function validatePinFormValues(formValues) {

        var formvalid = true;

        if (formValues.pindescription === "" || formValues.pindescription === undefined) {
            var elemToChange = $('#pindescription').parent().parent();

            if (!elemToChange.hasClass('has-warning')) {
                elemToChange.addClass('has-warning');
                // add feedback msg
                $('#pindescription').after('<div class="form-control-feedback feedback-pindescription">Field! is required</div>');
            }
            formvalid = false;
        }
        else {
            if ($('#pindescription').parent().parent().hasClass('has-warning')) {
                // remove warning add success
                $('#pindescription').parent().parent().removeClass('has-warning');
                $('#pindescription').parent().parent().addClass('has-success');

                // remove warning fields
                $('.feedback-pindescription').remove();
            }
            else {

                $('#pindescription').addClass('has-success');
            }
        }
        return { validform: formvalid };
    }

    ///////////////////PIN
    $('.openpin').click(function () {
        $('#addPinModal').modal('toggle');

    });

    $('#submit-pin').click(function () {

        var pinValues = getPinVals();
        var isFormValid = validatePinFormValues(pinValues);

        if (isFormValid.validform) {
            $( "#addPinForm" ).submit();
            /*
            var jqxhr = $.post("http://localhost:3000/users/pins/addpin", pinValues)
                .done(function (data) {
                    // get card and change it

                    //window.location.href = '/';
                    // edit page
                }).fail(function () {

                    // provide error check
                });
                */
        }
        else {
            //console.log("form is not valid");
        }
        //console.log(pinValues);
    });

    $('.mustlogin').click(function () {
        $("#userlogin").modal('toggle');
    });

    $('#likepin').click(function () {

        var pinid = $(this).data("pinid");
        
        var isLiked = false;
        var likeAction = $('#likepin').text();
        if(likeAction === "Like"){
            isLiked = true;
            $('#likepin').text('Unlike');
        }
        //likepin
   
        else if(likeAction === "Unlike"){
            isLiked = false;
            $('#likepin').text('Like');
        }
        var jqxhr = $.post("/pin/" + pinid + "/like",{isLiked: isLiked})
            .done(function (data) {
           
               
                //window.location.href = '/';

            }).fail(function () {

                // provide error check
            });
    });

});