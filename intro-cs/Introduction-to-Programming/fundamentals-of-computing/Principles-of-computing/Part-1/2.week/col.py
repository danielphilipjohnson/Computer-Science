import  math

row = 2
col = 3
nested_list = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]]

# print(nested_list[row][col])


# die_ev = (1+2+3+4) / float(4) #2.5
# print(die_ev * die_ev)

# one_pos = 0.1 ** 5 # 0.00001
# print(one_pos * 12)

# def q4():
#     '''
#     Permutations
#     Consider a trial in which five digit strings are formed as permutations of the digits
#     ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]. (In this case, repetition of digits is not allowed.)
#     If the probability of each permutation is the same, what is the probability that this five digits
#     string consists of consecutive digits in either ascending or descending order (e.g; "34567" or "43210") ?
#     Enter your answer as a floating point number with at least four significant digits of precision.
#     '''
#     all_permutations = math.factorial(10) / math.factorial(5) # permutation equation
#     return 12 / all_permutations # 12 possibilities / all possibilities
  
  
# print(q4())


# def gen_permutations(outcomes, length):
#   """
#   Iterative function that generates set of permutations of
#   outcomes of length num_trials
#   No repeated outcomes allowed
#   """


#   ans = set([()])
#   for dummy_idx in range(length):
#       temp = set()
#       for seq in ans:
#           for item in outcomes:
#               if item in seq:
#                   continue
#               else:
#                   new_seq = list(seq)
#                   new_seq.append(item)
#                   temp.add(tuple(new_seq))
#       ans = temp
#   return ans




# outcome = set(["a", "b", "c", "d", "e", "f"])
# permutations = gen_permutations(outcome, 4)
# permutation_list = list(permutations)
# permutation_list.sort()
# print()
# print("Answer is", permutation_list[100])



def q8():
    '''
    Combinations
    Given a standard 52 card deck of playing cards, what is the probability of being dealt
    a five card hand where all five cards are of the same suit?
    Hint: Use the formula for combinations to compute the number of possible five card hands
    when the choice of cards is restricted to a single suit versus when the choice of cards is unrestricted.
    Compute your answer in Python using math.factorial and enter the answer below as a floating
    point number with at least four significant digits of precision.
    '''
    # flush - q8 #1st way to calc
    print((12 / float(51)) * \
    (11 / float(50)) * \
    (10 / float(49)) * \
    (9 / float(48)))

    # q8 second way to count
    a = math.factorial(13) / (math.factorial(8) * math.factorial(5)) * 4 # number of possible flushes
    b = math.factorial(52) / (math.factorial(47) * math.factorial(5)) # number of possible 52 card hands combinations
    return a / float(b)
  
  
print(q8())

def pascal_factor(m, n):

    top = math.factorial(m)
    bot = math.factorial(n) * math.factorial((m)-(n))
    return top / bot    
#m! / (n! * (m - n))


pascal_factor_size = 6
for z in range(pascal_factor_size):
    for x in range(pascal_factor_size):
        if x <= z:
            print(z, x, ' is ', pascal_factor(z, x))

       
            
            