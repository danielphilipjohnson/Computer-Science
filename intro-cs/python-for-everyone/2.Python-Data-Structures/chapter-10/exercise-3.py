"""
Exercise 3: Write a program that reads a file and prints the letters
in decreasing order of frequency. Your program should convert all the
input to lower case and only count the letters a-z. Your program should
not count spaces, digits, punctuation, or anything other than the letters
a-z. Find text samples from several different languages and see how
letter frequency varies between languages. Compare your results with
the tables at https://wikipedia.org/wiki/Letter_frequencies.
"""

example_str = "The frequency of letters in text has been studied for use in cryptanalysis, and frequency analysis in particular, dating back to the Iraqi mathematician Al-Kindi (c. 801–873 AD), who formally developed the method (the ciphers breakable by this technique go back at least to the Caesar cipher invented by Julius Caesar, so this method could have been explored in classical times). Letter frequency analysis gained additional importance in Europe with the development of movable type in 1450 AD, where one must estimate the amount of type required for each letterform, as evidenced by the variations in letter compartment size in typographer's type cases. "
words = example_str.lower().split()

def split_word(word):
    return [char for char in word]

frequency = {}


for word in words:
    splitted_word = split_word(word)
    for s_word in splitted_word:
        if s_word.isalpha():
            if s_word not in frequency and s_word.isalpha():
                frequency[s_word] = 1
            else:
                frequency[s_word] = frequency[s_word] + 1
    
    
 
print(frequency)