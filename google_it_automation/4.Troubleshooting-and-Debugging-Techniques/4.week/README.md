# Debugging and Solving Software Problems


## Introduction

You're a member of your company's IT department. A colleague that recently left the company wrote a program that's 90% complete; it's designed to read some data files with information on employees and then generate a report. It's up to you to finish the code -- this includes fixing any errors, bugs, and slowness that might be in the unfinished code.


## Prerequisites:

You should have a sound knowledge of the following things prior to performing the lab:

    Debugging (gathering information, root cause analysis, and remediation)
    Identifying and understanding system performance (I/O, Network, CPU, Memory)
    Understanding and troubleshooting the environment around the program (file system, OS, etc.)


## Debug issue

You have a start_date_report.py Python script with a bunch of functions like get_start_date(), list_newer() and others. This script will operate on the data file employees-with-date.csv, which is generated from a file URI within the script. The script then generates a report of all employees that started on the given start date.


Grant the executable and editable file permission to the start_date_report.py

    sudo chmod 777 ~/start_date_report.py

Now, run the python program start_date_report.py

    ./start_date_report.py


Enter the values for the year, month, and day respectively as the prompt appears.**


### TypeError: an integer is required (got type str) 


The program crashes with a TypeError. This is because it reads the value entered at prompts as a string. Refer to the function datetime.datetime() within the script. The arguments passed to the datetime.datetime() function should be of integer type, but in our case, the input values are strings.

In order to fix this ERROR, open start_date_report.py by using the following command:

    nano ~/start_date_report.py


    year = int(input('Enter a value for the year: '))
    month = int(input('Enter a value for the month: '))
    day = int(input('Enter a value for the day: '))



## Improve performance

Once you debug the issue, the program will start processing the file but it takes a long time to complete. This is because the program goes slowly line by line instead of printing the report quickly. You need to debug why the program is slow and then fix it. In this section, you need to find bottlenecks, improve the code, and make it finish faster.

The problem with the script is that it’s downloading the whole file and then going over it for each date. The current script takes almost 2 minutes to complete for 2019-01-01. An optimized script should generate reports for the same date within a few seconds.


To check the execution time of a script, add a prefix "time" and run the script.

Example:

    time ./test.py


In order to fix this issue, open the start_date_report.py script using nano editor. Now, modify the get_same_or_newer() function to preprocess the file, so that the output generated can be used for various dates instead of just one.

    nano ~/start_date_report.py


## Solution 

#!/usr/bin/env python3
import csv
import datetime
import requests

FILE_URL="http://marga.com.ar/employees-with-date.csv"
#output = dict()
def get_start_date():
    """Interactively get the start date to query for."""

    print()
    print('Getting the first start date to query for.')
    print()
    print('The date must be greater than Jan 1st, 2018')
    year = int(input('Enter a value for the year: '))
    month = int(input('Enter a value for the month: '))
    day = int(input('Enter a value for the day: '))
    print()

    return datetime.datetime(year, month, day)

def csv_to_dict(data):
    reader = csv.DictReader(data)
    output = dict()
    for row in reader:
        output[row['Start Date']] = row['Name'] +  " " + row['Surname']
    return output

def get_file_lines(url):
    """Returns the lines contained in the file at the given URL"""

    # Download the file over the internet
    response = requests.get(url, stream=True)

    # Decode all lines into strings
    lines = []
    for line in response.iter_lines():
        #print(line)
        lines.append(line.decode("UTF-8"))
    return lines

def get_same_or_newer(start_date, data, d):
    """Returns the employees that started on the given date, or the closest one."""
    #data = get_file_lines(FILE_URL)
    reader = csv.reader(data[1:])

    # We want all employees that started at the same date or the closest newer
    # date. To calculate that, we go through all the data and find the
    # employees that started on the smallest date that's equal or bigger than
    # the given start date.

    min_date = datetime.datetime.today()
    min_date_employees = []

    for date in d:
        #print(d[date])
        row_date = datetime.datetime.strptime(date, '%Y-%m-%d')
        #print(row_date)
        if row_date < start_date:
            #print("row is less than start")
            continue

        # If this date is smaller than the current minimum,
        # we pick it as the new minimum, resetting the list of
        # employees at the minimal date.
        if row_date < min_date:
            min_date = row_date
            min_date_employees = []
        # If this date is the same as the current minimum,
        # we add the employee in this row to the list of
        # employees at the minimal date.
        if row_date == min_date:
            #print("match")
            min_date_employees.append(d[date])

    #for row in reader: 

        # If this date is smaller than the current minimum,
        # we pick it as the new minimum, resetting the list of
        # employees at the minimal date.
        #if row_date < min_date:
           # min_date = row_date
           # min_date_employees = []
        #row_date = datetime.datetime.strptime(row[3], '%Y-%m-%d')

        # If this date is smaller than the one we're looking for,
        # we skip this row
        #if row_date < start_date:
            #continue

        # If this date is smaller than the current minimum,
        # we pick it as the new minimum, resetting the list of
        # employees at the minimal date.
        #if row_date < min_date:
        #    min_date = row_date
        #    min_date_employees = []

        # If this date is the same as the current minimum,
        # we add the employee in this row to the list of
        # employees at the minimal date.
        #if row_date == min_date:
        #    min_date_employees.append("{} {}".format(row[0], row[1]))

    return min_date, min_date_employees





def list_newer(start_date):
    data = get_file_lines(FILE_URL)
    d = csv_to_dict(data)
    #print(d)
    while start_date < datetime.datetime.today():
        start_date, employees = get_same_or_newer(start_date, data, d)
        print("Started on {}: {}".format(start_date.strftime("%b %d, %Y"), employees))

        # Now move the date to the next one
        start_date = start_date + datetime.timedelta(days=1)

def main():
    start_date = get_start_date()
    list_newer(start_date)

if __name__ == "__main__":
    main()



## Congratulations!

Congrats! You've successfully fixed errors, bugs, and increased the performance of execution. Debugging an issue from a program and reducing execution time by fixing a repeatable call will be beneficial as an IT Specialist.