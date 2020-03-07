#filepath = input("Enter a file name: ")
#file = open(filepath)
file = open("romeo.txt")
words_found =[]

#For each line, split the line into a list of words using the split function.
for line in file:
    list_of_words = line.split(" ")
    
    # For each word, check to see if the word is already in a list.
    for word in list_of_words:

        word_stripped_lower = word.rstrip().lower()
        
        # For each word, check to see if the word is already in a list.
        if word_stripped_lower not in words_found:

            # If the word is not in the list, add it to the list.
            words_found.append(word_stripped_lower)
# sort and print the resulting words in alphabetical order.
words_found.sort()
print(words_found)
