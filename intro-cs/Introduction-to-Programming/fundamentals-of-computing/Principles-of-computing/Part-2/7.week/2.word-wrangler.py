"""
Student code for Word Wrangler game
"""
import urllib2
import codeskulptor
import poc_wrangler_provided as provided
WORDFILE = "assets_scrabble_words3.txt"

# Functions to manipulate ordered word lists
def remove_duplicates(list1):
    """
    Eliminate duplicates in a sorted list.
    Returns a new sorted list with the same elements in list1, but
    with no duplicates.
    This function can be iterative.
    """
    new_lst = []
    for item in list1:
        if item not in new_lst:
            new_lst.append(item)

    return new_lst

def intersect(list1, list2):
    """
    Compute the intersection of two sorted lists.
    Returns a new sorted list containing only elements that are in
    both list1 and list2.
    This function can be iterative.
    """
    matches = []
    idx1, idx2 = 0, 0
    len1, len2 = len(list1), len(list2)
    while idx1 < len1 and idx2 < len2:
        val1, val2 = list1[idx1], list2[idx2]
        if val1 < val2:
            idx1 += 1
        elif val1 > val2:
            idx2 += 1
        else:
            matches.append(val1)
            idx1 += 1
            idx2 += 1
    return matches

# Functions to perform merge sort
def merge(list1, list2):
    """
    Merge two sorted lists.
    Returns a new sorted list containing those elements that are in
    either list1 or list2.
    This function can be iterative.
    """  
    i,j =0,0
    result = []
    while i<len(list1) and j<len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i+=1
        else:
            result.append(list2[j])
            j+=1
    #print(result)
    result += list1[i:]
    result += list2[j:]
    return result
                
def merge_sort(list1):
    """
    Sort the elements of list1.
    Return a new sorted list with the same elements as list1.
    This function should be recursive.
    """
     #Now we will divide this array into two subarrays
    if (len(list1) <= 1):
        return list1
    midpoint = int(len(list1) / 2)
    
    left_side = merge_sort(list1[:midpoint])
    right_side = merge_sort(list1[midpoint:])
    return merge(left_side,right_side)  # finally return merge over left and right
# Function to generate all strings for the word wrangler game
def gen_all_strings(word):
    """
    Generate all strings that can be composed from the letters in word
    in any order.
    Returns a list of all strings that can be formed from the letters
    in word.
    This function should be recursive.
    """
    if len(word) < 1:
        return [""]
    #Split the input word into two parts: the first character
    #and the remaining part (rest).
    head = word[0]
    tail = word[1:]
    
    tail_strings = gen_all_strings(tail)
    new_string = []
    
    for letter in tail_strings:
        if len(letter) == 0:
            new_string.append(head)
            continue
        #tail_strings.append(head + letter)
        length = len(letter)
        new_list = [letter[:idx] + head + letter[idx:] for idx in range(length + 1)]
        new_string.extend(new_list)
    tail_strings.extend(new_string)
    #Return a list containing the strings in rest_strings as well as the new strings generated in step 3.
    return tail_strings
# Function to load words from a file
def load_words(filename):
    """
    Load word list from the file named filename.
    Returns a list of strings.
    """
    url = codeskulptor.file2url(filename)
    netfile = urllib2.urlopen(url)
 
    return [word[:-1] for word in netfile]

def run():
    """
    Run game.
    """
    words = load_words(WORDFILE)
    wrangler = provided.WordWrangler(words, remove_duplicates,
                                     intersect, merge_sort,
                                     gen_all_strings)
    provided.run_game(wrangler)
# Uncomment when you are ready to try the game
run()
