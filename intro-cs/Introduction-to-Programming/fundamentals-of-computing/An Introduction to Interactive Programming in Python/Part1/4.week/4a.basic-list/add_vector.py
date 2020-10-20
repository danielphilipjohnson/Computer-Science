# Vector addition function

###################################################
# Student should enter code below
def add_vector(u, v):

    u1, u2 = u
    v1, v2 = v

    return [u1 + v1, u2 + v2]


###################################################
# Test
print(add_vector([3, 4], [5, -1]))
print(add_vector([4, 3], [0, 0]))
print(add_vector([1, 2], [3, 4]))
print(add_vector([2, 3], [-6, -3]))



###################################################
# Output

#[4, 3]
#[4, 6]
#[-4, 0]

