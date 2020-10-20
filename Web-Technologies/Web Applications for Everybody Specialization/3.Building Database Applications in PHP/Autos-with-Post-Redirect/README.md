# Assignment: Automobiles, Sessions, and POST-Redirect

What To Hand In

For this assignment you will hand in:

    A screen shot (including the URL) of your login.php rejecting an account without an at-sign (@). You must also include the developer console network tab showing both the POST and GET.
    A screen shot of your error log showing correct messages for both a successful and failed login attempt.
    A screen shot (with URL) of your add.php showing a data validation error. You must also include the developer console network tab showing both the POST and GET.
    A screen shot (including the URL) of your view.php with three vehicles in the list. At least one of the vehicles must have '<b>' in its title and it must be shown properly (i.e. the title should not be bold)
    Source code of login.php
    Source code of view.php
    Source code of add.php

See the sample screenshots below to see how to show a POST-Redirect-GET happenned. 

## Specifications

The changes to index.php are new wording and pointing to view.php to test for login bypass.
Specifications for the Login Screen

The basic functionality, password checking using salt and hashing, error logging, and data validation for the login.php is the same as in the previous assignment.
Image of the login screen

There are several changes that are needed for this assignment as follows:

    The script must redirect after every POST. It must never produce HTML output as a result of a POST operation.
    It must redirect to view.php instead of autos.php and must pass the logged in user's name through the session. A GET parameter is not allowed.

    // Redirect the browser to view.php
    $_SESSION['name'] = $_POST['email'];
    header("Location: view.php");
    return;

    All error messages must be passed between the POST and GET using the session and "flash message" pattern:

    $_SESSION['error'] = "Email must have an at-sign (@)";
    header("Location: login.php");
    return;

    The error message must be displayed only on the next GET request. (i.e. properly implement the POST-Redirect-GET-Flash pattern)

    if ( isset($_SESSION['error']) ) {
        echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
        unset($_SESSION['error']);
    }

    Subsequent GET requests (i.e. refreshing the page) should not show the error message to properly implement the POST-Redirect-GET-Flash pattern.

## Specifications for the Auto Database Screens

The autos.php script from the previous assignment is broken into two scripts in this assignment. The view.pbp script shows the list of automobiles in the database and the add.php script handles adding new automobiles to the database but does not list any autos. The view.pbp includes a link to add.php and logout.php and the add.php has a Cancel button.

The view.php screen
Image of the auto management application

The add.php screen
Image of the auto management application

In order to protect the database from being modified without the user properly logging in, the view.php and add.php must first check the session to see if the user's name is set and if the user's name is not present, the view.php must stop immediately using the PHP die() function:

if ( ! isset($_SESSION['name']) ) {
    die('Not logged in');
}

To test, navigate to view.php manually without logging in - it should fail with "Not logged in".

In view.php if the Logout button is pressed the user should be redirected back to the logout.php page. The logout.php page should clear the session and immediately reditect back to index.php:

session_start();
session_destroy();
header('Location: index.php');

In the add.php script, when the "Add" button is pressed, you need to the same input validation as in the previus assignment, except that you must display the error using a proper POST-ReDirect-GET-Flash pattern.
In the add.php script, when you successfully add data to your database, you need to redirect back to view.php and pass a "success message" to view.php using the session:

$_SESSION['success'] = "Record inserted";
header("Location: view.php");
return;

The view.php must detect and display the success message using the flash pattern:

if ( isset($_SESSION['success']) ) {
    echo('<p style="color: green;">'.htmlentities($_SESSION['success'])."</p>\n");
    unset($_SESSION['success']);
}

