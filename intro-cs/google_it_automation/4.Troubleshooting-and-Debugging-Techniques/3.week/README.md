# Fixing Errors in Python Scripts


## Introduction

You're an IT professional who's in charge of the deployment and maintenance of software in your company's fleet. A piece of software that's deployed on all machines in your fleet is throwing an error on a number of these machines. You haven't written the software and don't have access to the source code. You'll need to examine the environment where the software is running in and try to work out what's going on.
What you'll do

- Understand the error messages
- Track down the root cause and work to fix it
- Understand what to do when you can't modify the program that's throwing errors


## ImportError

Since you haven't written the software and don't have access to the source code, you'll need to examine the environment where the software is running and try to work out what's going on. There's a python script named infrastructure in /usr/bin directory that reads data from a CSV file and prints them to the terminal in a nicely formatted manner. Let's run this script and see whether it generates any errors.

    ImportError: No Module named 'matplotlib'

The script crashed, displaying an ImportError. This error is raised when an import statement has trouble importing a specific module. You could also see the module that the import statement hasn't found (i.e. matplotlib). We'll need to import this module before we continue to run the script again.

### Fix:
    sudo apt install python3-pip
    pip3 install matplotlib

## NoFileError

This time it returns a NoFileError with a message that it could not find data.csv file in the working directory. Try debugging this issue.

### Fix:
    cd ~
    ls

File is named data.bak not data.csv

Let's move forward by renaming the file data.bak to data.csv.

    mv data.bak data.csv


## MissingColumnError

    firstname, surname,, job title

Grant the permissions to the data.csv file.
    sudo chmod 777 ~/data.csv

Open data.csv file using nano editor.
    nano ~/data.csv

### CSV with MissingColumnError

firstname,surname,company,job title
Oliver,Jefferson,Quam Vel Corporation,IT Resident
Xenos,Snow,Tellus LLC,CTO
Emerson,Delgado,Sagittis Ltd,CFO
Ignatius,Henderson,Id Risus Quis Ltd, CTO
Abel,Burnett,Dui Cum Sociis Limited,CEO
Dustin,Daugherty,Pharetra Corp., IT Resident
Thaddeus,Macdonald,Magna Nam Ligula LLP, CTO
Guy,Chen,Dictum Eu LLP, IT Resident
Ulysses,Mcgowan,Aliquam Adipiscing Lacus Incorporated, CFO
Clinton,Ellis,Placerat Velit Limited, CTO
Dolan,Cohen,Sed LLP, IT Resident
Theodore,Ford,Montes Nascetur Ridiculus Limited, IT Resident
Carson,Sykes,Non Dapibus PC, IT Resident
Ulric,Mercer,Orci Lobortis Associates,CEO
Jackson,Dotson,Eget Tincidunt Dui Corporation,CEO
Elliott,Rojas,Nec Metus Facilisis PC, CFO
Judah,Salinas,Orci Foundation, CTO
Ryan,Potter,Dignissim Consulting,CEO
Barry,Shannon,Augue Corporation, CFO
Clarke,Davidson,Purus Corporation, CFO
Rahim,Nunez,Est Company, CFO
Orson,Watkins,A Purus Institute, CTO
Jackson,Lambert,Vel Faucibus Foundation, CFO
Oliver,Sims,Vivamus Nibh Consulting, CTO
Noble,Ortiz,Sit Corporation,CEO
Thor,Pacheco,Semper Et Inc.,CEO
Ivan,Gilliam,Elit Fermentum Inc., IT Resident
Aladdin,Forbes,Nulla Aliquet Incorporated, IT Resident
Jeremy,Cooley,Mauris Vel Turpis Inc., CFO
Cadman,Shepherd,Nunc Laoreet Lectus Ltd, CFO
Mark,Howe,Adipiscing Elit Corp., CFO
Coby,Alston,Sed Institute, CTO
Valentine,Chaney,Eu Ligula Aenean Inc., CFO
Gareth,Booth,Eu LLP, IT Resident
Conan,Beard,Enim Consequat Purus PC, IT Resident
Baker,Horn,Sapien Institute, CFO
Davis,Baird,Lectus Sit Amet LLP, IT Resident
Harrison,Manning,Donec Tincidunt Company,CEO
Cairo,Mathis,Primis In Faucibus Corporation, CTO
Grady,Erickson,Etiam Gravida Molestie Corporation, CFO
Marsden,Holman,Elit Pellentesque Industries, IT Resident
Malcolm,Lane,Lorem Ipsum Dolor Corporation, CTO
Quamar,Nguyen,Eu Euismod Ac Corp.,CEO
Yuli,Elliott,Elementum Incorporated, CTO
Flynn,Fuller,Primis Consulting, CTO
Raphael,Mcintyre,Semper LLC, IT Resident
Ralph,West,At Augue Industries, CTO
Baxter,Dillon,Commodo At Foundation, IT Resident
Hector,Carpenter,Quisque Nonummy Corp., CTO
Uriah,Austin,Vulputate Dui Nec Industries,CEO
Benedict,Ballard,Turpis Associates, CFO
Wang,Little,Ac PC, CFO
Brendan,Reid,Placerat Inc., CTO
Kyle,Gould,Fusce Aliquet Magna Consulting, IT Resident
Giacomo,Salinas,Magna Duis Dignissim Company, IT Resident
Wade,Bullock,Tristique Senectus LLP, IT Resident
Abdul,Gibbs,Duis At Lacus PC, CTO

### Fixed MissingColumnError

firstname,surname,company,job, title
Oliver,Jefferson,Quam Vel Corporation,IT Resident
Xenos,Snow,Tellus LLC,CTO
Emerson,Delgado,Sagittis Ltd,CFO
Ignatius,Henderson,Id Risus Quis Ltd, CTO
Abel,Burnett,Dui Cum Sociis Limited,CEO
Dustin,Daugherty,Pharetra Corp., IT Resident
Thaddeus,Macdonald,Magna Nam Ligula LLP, CTO
Guy,Chen,Dictum Eu LLP, IT Resident
Ulysses,Mcgowan,Aliquam Adipiscing Lacus Incorporated, CFO
Clinton,Ellis,Placerat Velit Limited, CTO
Dolan,Cohen,Sed LLP, IT Resident
Theodore,Ford,Montes Nascetur Ridiculus Limited, IT Resident
Carson,Sykes,Non Dapibus PC, IT Resident
Ulric,Mercer,Orci Lobortis Associates,CEO
Jackson,Dotson,Eget Tincidunt Dui Corporation,CEO
Elliott,Rojas,Nec Metus Facilisis PC, CFO
Judah,Salinas,Orci Foundation, CTO
Ryan,Potter,Dignissim Consulting,CEO
Barry,Shannon,Augue Corporation, CFO
Clarke,Davidson,Purus Corporation, CFO
Rahim,Nunez,Est Company, CFO
Orson,Watkins,A Purus Institute, CTO
Jackson,Lambert,Vel Faucibus Foundation, CFO
Oliver,Sims,Vivamus Nibh Consulting, CTO
Noble,Ortiz,Sit Corporation,CEO
Thor,Pacheco,Semper Et Inc.,CEO
Ivan,Gilliam,Elit Fermentum Inc., IT Resident
Aladdin,Forbes,Nulla Aliquet Incorporated, IT Resident
Jeremy,Cooley,Mauris Vel Turpis Inc., CFO
Cadman,Shepherd,Nunc Laoreet Lectus Ltd, CFO
Mark,Howe,Adipiscing Elit Corp., CFO
Coby,Alston,Sed Institute, CTO
Valentine,Chaney,Eu Ligula Aenean Inc., CFO
Gareth,Booth,Eu LLP, IT Resident
Conan,Beard,Enim Consequat Purus PC, IT Resident
Baker,Horn,Sapien Institute, CFO
Davis,Baird,Lectus Sit Amet LLP, IT Resident
Harrison,Manning,Donec Tincidunt Company,CEO
Cairo,Mathis,Primis In Faucibus Corporation, CTO
Grady,Erickson,Etiam Gravida Molestie Corporation, CFO
Marsden,Holman,Elit Pellentesque Industries, IT Resident
Malcolm,Lane,Lorem Ipsum Dolor Corporation, CTO
Quamar,Nguyen,Eu Euismod Ac Corp.,CEO
Yuli,Elliott,Elementum Incorporated, CTO
Flynn,Fuller,Primis Consulting, CTO
Raphael,Mcintyre,Semper LLC, IT Resident
Ralph,West,At Augue Industries, CTO
Baxter,Dillon,Commodo At Foundation, IT Resident
Hector,Carpenter,Quisque Nonummy Corp., CTO
Uriah,Austin,Vulputate Dui Nec Industries,CEO
Benedict,Ballard,Turpis Associates, CFO
Wang,Little,Ac PC, CFO
Brendan,Reid,Placerat Inc., CTO
Kyle,Gould,Fusce Aliquet Magna Consulting, IT Resident
Giacomo,Salinas,Magna Duis Dignissim Company, IT Resident
Wade,Bullock,Tristique Senectus LLP, IT Resident
Abdul,Gibbs,Duis At Lacus PC, CTO


## Congratulations!

Congrats! You've correctly understood the error messages and fixed them by tracking down the root cause. This will help you as an IT professional who's in charge of the deployment and maintenance of software in your company's fleet.