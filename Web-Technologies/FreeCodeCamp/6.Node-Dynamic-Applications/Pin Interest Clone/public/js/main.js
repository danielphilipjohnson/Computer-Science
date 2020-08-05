$(document).ready(function () {
    var isUserLoggedIn = function () {
        if ($(".UserIsLogged").length > 0) {
            return true;
        }
        else {
            return false;
        }

    };
    // check for broken images
    $('img').each(function() {
        if((typeof this.naturalWidth != "undefined" &&
            this.naturalWidth == 0 ) || this.readyState == 'uninitialized' ) {
            $(this).attr('src', '/img/imagenotfound.png');
            $(this).attr('style','width:50px; height:50px;');
        }
    });

    var userStatus = isUserLoggedIn();

    // Gets the values of them form we need stores them into an object
    // Keys match the Form field ids to access later 
    function getLoginFormValues() {
        var username = $('#userform input#Username').val();
        var password = $('#userform input#Password').val();
        return { Username: username, Password: password };
    }
    // get AddBoard Values
    function addBoardFormValues() {
         var boardName = $('#boardname').val();
         var categoryVal = $('.category-select').val();
         // produces on
         var radioValue = $("input[name='secret']:checked").val();


        return { BoardName: boardName, Category: categoryVal, Secret: radioValue };
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
            if (valueToCheck === "" || valueToCheck === undefined) {
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
                    formGroup.removeClass('has-warning');
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

    function validateAddBoardFormValues(formValues){
        var formvalid = true;
        //var secret = false;


        var elemToChange = $('#boardname').parent().parent();
        if(formValues.BoardName === "" || formValues.BoardName === undefined ||
            formValues.Category === "" || formValues.Category === undefined){
                if (!elemToChange.hasClass('has-warning')) {
                    elemToChange.addClass('has-warning');
                    // add feedback msg
                    elemToChange.after('<div class="form-control-feedback ' + 'feedback-boardname"' + '>Field! is required</div>');
                }

                formvalid = false;

        }
        else{
            if (elemToChange.hasClass('has-warning')) {
                // remove warning add success
                elemToChange.removeClass('has-warning');
                elemToChange.addClass('has-success');
                // remove warning field
                $('.feedback-boardname').remove();
            }
            else {
                elemToChange.addClass('has-success');
            }
        }
        return {validform: formvalid};
    }

    function canFormBeSubmitted(formfield){
        var formValid = true;

        for (var field in formfield) {
            // check if the form has a warningifield
            if($('.feedback-'+ field).length > 0){
                
                formValid = false;
            }
        }
        return formValid;
    }
    function submitForm(route){
        $("#userlogin").modal('toggle');
        // change its action
        $("#userform").attr("action", route);
        $("#userform").submit();
    }

    $('#login').click(function () {

        var fetchedformValues = getLoginFormValues();

        ValidateFormValues(fetchedformValues);
        // now we need to do the logic 
        //var loginForm = $('#loginForm');
        if(canFormBeSubmitted(fetchedformValues)){
            submitForm('/users/login');
            
        }



    });

    $('#register').click(function () {

        var fetchedformValues = getLoginFormValues();

        ValidateFormValues(fetchedformValues);

        if(canFormBeSubmitted(fetchedformValues)){

            submitForm('/users/register');
        }
    });

    $('#submit-add-board').click(function(){
  
        var values = addBoardFormValues();

        var validity = validateAddBoardFormValues(values);
        // if(
        if(validity.validform){
           
            $("#addboard").submit();
       
        }
    
    });

});