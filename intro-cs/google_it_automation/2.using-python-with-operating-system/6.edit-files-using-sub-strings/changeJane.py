#!/usr/bin/env python3


import sys
import subprocess


filename = sys.argv[1]

with open(filename) as f:
    
    data = f.read().rstrip("\n").split("\n")
    
    for line in data:
       source = ".." + line
       print(source)
       destination = source.replace("jane", "jdoe")

       print("Source {} - Destination {} \n".format(line, destination))
       subprocess.run(["mv", source, destination])


