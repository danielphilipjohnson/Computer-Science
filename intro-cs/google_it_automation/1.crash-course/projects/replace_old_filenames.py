filenames = ["program.c", "stdio.hpp", "sample.hpp", "a.out", "math.hpp", "hpp.out"]
newfilenames = []
for file in filenames:
  oldfilename = file
  extension_change = file.replace(".hpp", ".h")
  #newfilenames.append(extension_change)
  newfilenames.append((oldfilename, extension_change))
    
print (newfilenames) # Should be [('program.c', 'program.c'), ('stdio.hpp', 'stdio.h'), ('sample.hpp', 'sample.h'), ('a.out', 'a.out'), ('math.hpp', 'math.h'), ('hpp.out', 'hpp.out')]