# Qwiklabs Assessment: Debugging Python Scripts


## Introduction

Imagine one of your colleagues has written a Python script that's failing to run correctly. They're asking for your help to debug it. In this lab, you'll look into why the script is crashing and apply the problem-solving steps that we've already learned to get information, find the root cause, and remediate the problem.

### 1. Reproduce the error

    ./greetings.py
    print("hello" + name + ", your random number is " + 12)
    TypeError: can't convert 'int' object to str implicitly


### 2. Debug the issue

The print statement within the script is trying to concatenate two different data types.


str() function takes in an integer as a parameter and converts it into string data type. 
       print("hello " + name + ", your random number is " + str(number))


./greetings.py

Outputs correctly

## Congratulations!

You successfully debugged your colleague's python script. You reproduced the error, found its root cause, and applied the remediation to the issue. You can now close the RDP/SSH window. The lab will automatically end when the time runs out, or you can end it manually.