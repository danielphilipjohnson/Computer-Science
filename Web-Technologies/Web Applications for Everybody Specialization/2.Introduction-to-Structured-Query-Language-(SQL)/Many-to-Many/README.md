# Many-to-Many Databases

In this assignment, you will create a many-to-many database with User, Course, and Membership tables and fill them in with provided data.

## Tables for the Assignment

Create the following tables in a database named "roster". Make sure that your database and tables are named exactly as follows including matching case.

    DROP TABLE IF EXISTS Member;
    DROP TABLE IF EXISTS `User`;
    DROP TABLE IF EXISTS Course;

    CREATE TABLE `User` (
        user_id     INTEGER NOT NULL AUTO_INCREMENT,
        name        VARCHAR(128) UNIQUE,
        PRIMARY KEY(user_id)
    ) ENGINE=InnoDB CHARACTER SET=utf8;

    CREATE TABLE Course (
        course_id     INTEGER NOT NULL AUTO_INCREMENT,
        title         VARCHAR(128) UNIQUE,
        PRIMARY KEY(course_id)
    ) ENGINE=InnoDB CHARACTER SET=utf8;

    CREATE TABLE Member (
        user_id       INTEGER,
        course_id     INTEGER,
        role          INTEGER,

        CONSTRAINT FOREIGN KEY (user_id) REFERENCES `User` (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FOREIGN KEY (course_id) REFERENCES Course (course_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

        PRIMARY KEY (user_id, course_id)
    ) ENGINE=InnoDB CHARACTER SET=utf8;


## Course Data


    Taliah, si106, Instructor
    Briana, si106, Learner
    Coran, si106, Learner
    Demileigh, si106, Learner
    Dior, si106, Learner
    Carlie, si110, Instructor
    Jedidiah, si110, Learner
    Kallan, si110, Learner
    Lexis, si110, Learner
    Rasul, si110, Learner
    Rowan, si206, Instructor
    Aahron, si206, Learner
    Eirann, si206, Learner
    Jahid, si206, Learner
    Kensey, si206, Learner



You can test to see if your data has been entered properly with the following SQL statement


SELECT `User`.name, Course.title, Member.role
    FROM `User` JOIN Member JOIN Course
    ON `User`.user_id = Member.user_id AND Member.course_id = Course.course_id
    ORDER BY Course.title, Member.role DESC, `User`.name


## What Turn In

When you have the data all inserted, use phpMyAdmin to Export the data as follows:

    Select the database (do not select a table within the database)
    Select the Export Tab
    Select "Custom - display all possible options"
    Select "Save output to a file"
    Set the format to JSON
    Do not select "pretty print" the output
    Leave everything else as default and run the export.
