Learning Python interpreter basics
Debugging through logging
Debugging with breakpoints
Improving your debugging skills


Any debugging process roughly follows this path:
1. You realize there's a problem
2. You understand what the correct behavior should be
3. You discover why the current code produces the bug
4. You change the code to produce the proper result


95% of the time, everything but step 3 is trivial, which is the bulk of the debugging process.

Realizing the why of a bug, at its core, uses the scientific method:

1. Measure and observe what the code is doing
2. Produce a hypothesis on why that is
3. Validate or disprove that's correct, maybe through an experiment
4. Use the resulting information to iterate the process



Debugging is an ability, and as such, it will improve over time. Practice plays an important
role in developing intuition on what paths look promising to identify an error, but there are
some general ideas that may help you:

Divide and conquer: Isolate small parts of the code, so that it is possible to
understand the code. Simplify the problem as much as possible.



Move backwards from the error: If there's a clear error at a specific point, the
bug is likely located in the surroundings. Move progressively backwards from
the error, following the track until the source of the error is found.

You can assume anything you want, as long as you prove your
assumption: Code is very complex to keep in your head all at once. You need to
validate small assumptions that, when combined, will provide solid ground to
move forward with detecting and fixing the problem. Make small experiments,
which will allow you to remove from your mind parts of the code that actually
work and focus on untested ones.








Or in the words of Sherlock Holmes:
"Once you eliminate the impossible, whatever remains, no matter how improbable,
must be the truth."
But remember to prove it. Avoid untested assumptions.



Learning Python interpreter basics



3. Display globals into this environment:
>>> globals()


4. Print the globals dictionary in a readable format with pprint:
>>> pprint(globals())


5. Display all of the attributes of the dictionary:
>>> dir(dictionary)

6. Show the help for the dictionary object:
>>> help(dictionary)


# Debugging through logging
Debugging is, after all, detecting what's going on inside our program and what unexpecteor incorrect effects may be happening. A simple, yet very effective, approach is to output
variables and other information at strategic parts of your code to follow the flow of the
program.

The simplest form of this approach is called print debugging, or inserting print statements
at certain points to print the value of variables or points while debugging.



## Debugging with breakpoints
Python has a ready-to-go debugger called pdb. Given that Python code is interpreted, this
means that stopping the execution of the code at any point is possible by setting a
breakpoint, which will jump into a command line where any code can be used to analyze
the situation and execute any number of instructions.
Let's see how to do it.


1. Run the code to see all the assertions are valid:
$ python debug_algorithm.py
2. Add breakpoint(), after the while loop, just before line 7, resulting in the
following:
while lower > 1:
    breakpoint()
    if candidate / lower == candidate // lower:




There are other debuggers available that have an increased set of features. For example:
ipdb (https:/​/​github.​com/​gotcha/​ipdb): Adds tab completion and syntax
highlights
pudb (https:/​/​documen.​tician.​de/​pudb/​): Displays an old-style, semi-
graphical, text-based interface, in the style of early 90s tools that display the
environment variables automatically
web-pdb (https:/​/​pypi.​org/​project/​web-​pdb/​): Opens a web server to access a
graphic interface with the debugger

