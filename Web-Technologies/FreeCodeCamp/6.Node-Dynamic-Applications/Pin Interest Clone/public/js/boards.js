//skeleton
$(document).ready(function () {

    function geteditBoardVals() {
        var boardName = $('#editboardname').val();
        var categoryVal = $('.edit-category-select').val();
        // produces on
        var radioValue = $("input[name='editsecret']:checked").val();
        var boardid = $('#editboardForm').data("boardid");
        return { BoardName: boardName, Category: categoryVal, Secret: radioValue, BoardId: boardid };
    }
    function validateEditBoardFormValues(formValues) {

        var formvalid = true;

        var elemToChange = $('#editboardname').parent().parent();
        if (formValues.BoardName === "" || formValues.BoardName === undefined ||
            formValues.Category === "" || formValues.Category === undefined) {
            if (!elemToChange.hasClass('has-warning')) {
                elemToChange.addClass('has-warning');
                // add feedback msg
                $('#editboardname').after('<div class="form-control-feedback ' + 'feedback-boardname"' + '>Field! is required</div>');
            }
            formvalid = false;
        }
        if (formValues.Secret === undefined) {
            formValues.Secret = "off";
        }
        else {
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
        return { validform: formvalid };
    }

    $('.board').click(function () {
        //refactor get values of board
        var cachedThis = $(this);
        var category = $(cachedThis).data("category");
        var isSecret = $(cachedThis).attr("data-secret");
        var boardname = $(cachedThis).data("boardname");
        var boardid = $(cachedThis).data("id");

        // check state of secret
        if (isSecret === "true" || isSecret === true) {
            $(".edit-secret").prop("checked", true);
        }
        if (isSecret == "false" || isSecret == false) {
            $(".edit-secret").prop("checked", false);
        }


        // edit modal 
        $("#editboard").text("Edit board " + boardname);

        $('.edit-board-name').text(boardname);
        $('#editboardForm').attr('data-boardid', boardid);
        $('#editboardForm').attr('data-secret', isSecret);
        $('.edit-category-select').val(category);
        $("#editboardModal").modal('toggle');
        $(".boardname").attr('value', boardname);
    });
    $('#secretmodal').click(function(){
        $(".secret").prop("checked", true);
        $("#addboardModal").modal('toggle');
    });

    //submit button and validation V1
    $('#submit-edit-board').click(function () {

        //var values = addBoardFormValues ();
        var editedVals = geteditBoardVals();

        var isFormValid = validateEditBoardFormValues(editedVals);
        if (isFormValid.validform) {

            // POST request 
            $("#editboardModal").modal('toggle');

            // Get board id to work with
            var id = $('#editboardForm').attr('data-boardid');

            //  Change the boardname and category
            $("[data-id='" + id + "'] h5").text(editedVals.BoardName);
            $("[data-id='" + id + "']").data('category', editedVals.Category);

            var secret = $('#editboardForm').attr('data-secret');

            //NOW SECRET
            if (secret == "false" && editedVals.Secret === "on") {

                // set secret to true
                $("[data-id='" + id + "']").attr('data-secret', "true");
                // fetch that board 
                var cardToAppend = $("[data-id='" + id + "']");
                //append to secret
                cardToAppend.appendTo('.secret-pins .categories');
                $('#editboardForm').attr('data-secret', "true");


            }//NO longer SECRET
            else if (secret == "true" && editedVals.Secret === "off") {
                // set secret to false
                $("[data-id='" + id + "']").attr('data-secret', "false");
                // fetch that board 
                var cardToAppend = $("[data-id='" + id + "']");
                //append to secret
                $('#editboarduser').after(cardToAppend);

                $('#editboardForm').attr('data-secret', "false");

            }


            var jqxhr = $.post("/users/profile/editboard", editedVals)
                .done(function (data) {
                    // get card and change it


                }).fail(function () {
            
                });
        }

    });

    // model delete
    $('#deleteBoard').on('click', function (e) {
        var target = $(e.target);
        var userid = $('#editboarduser').data("userid");
        var id = $('#editboardForm').attr('data-boardid');
        $("#editboardModal").modal('toggle');

        //$(".board").attr('data-id', id).remove();

        $.ajax({
            type: 'DELETE',
            url: 'deleteboard/' + id + '/' + userid,
            success: function (response) {
                $("[data-id='" + id + "']").remove();
                //remove board myself
                //window.location.href='/users/profile/';
            },
            error: function (err) {

            }
        });
    });

    // open delete modal
    $('.pin-saved-img').click(function(){

        var id = $(this).data("id");
        var user = $(this).data("username");
        $("#deletePinModal").modal('toggle');

        $("#deletePinForm").attr("data-id", id);
        $("#deletePinForm").attr("data-username", user);
    });
    

     // model delete
     $('#deletePin').on('click', function (e) {

        var pinid = $("#deletePinForm").attr("data-id");
        var username = $("#deletePinForm").attr("data-username");

        $("#deletePinModal").modal('toggle');
        
        //data-username

        //$(".board").attr('data-id', id).remove();

        $.ajax({
            type: 'DELETE',
            ///profile/deletepin/:id/:userid
            url: 'deletepin/' + pinid + '/' + username,
            success: function (response) {

                
                $("img").attr('data-id', pinid).remove();
            
                //remove board myself
                //window.location.href='/users/profile/';
            },
            error: function (err) {

            }
        });
    });
});