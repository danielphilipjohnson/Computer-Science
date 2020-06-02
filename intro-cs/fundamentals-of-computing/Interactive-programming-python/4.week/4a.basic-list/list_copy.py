# List reference problem

###################################################
# Student should enter code below

a = [5, 3, 1, -1, -3, 5]
b = list(a)
b[0] = 0
print a
print b


###################################################
# Explanation

# The assignment b = list(a) created a copy of the list a.
# Setting b[0] = 0 only mutated the copy of the list, not
# the original list.  As a result, a[0] == 5.