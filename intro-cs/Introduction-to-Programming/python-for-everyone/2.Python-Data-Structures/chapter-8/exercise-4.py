fname = input("Enter file name: ")
fh = open(fname)
lst = list()
for line in fh:
	#For each line, split the line into a list of words using the split function.
	list_of_words = line.split(" ")
    
    # For each word, check to see if the word is already in a list.
	for word in list_of_words:

		word_stripped_lower = word.rstrip()
        
        # For each word, check to see if the word is already in a list.
		if word_stripped_lower not in lst:

            # If the word is not in the list, add it to the list.
			lst.append(word_stripped_lower)
# sort and print the resulting words in alphabetical order.
lst.sort()
print(lst)
