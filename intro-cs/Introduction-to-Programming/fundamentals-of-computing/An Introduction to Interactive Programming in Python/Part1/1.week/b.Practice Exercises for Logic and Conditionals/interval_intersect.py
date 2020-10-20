# Compute whether two intervals intersect.

###################################################
# Interval intersection formula
# Student should enter function on the next lines.
def interval_intersect(a, b, c, d):
    """
    [A, B) [X, Y)
    [a, b ) [c, d)
    # X < B AND A < Y
    [c < b ) [a, d)
    """
    if c <= b and a <= d:
        return True
    else:
        return False

###################################################
# Tests
# Student should not change this code.

def test(a, b, c, d):
    """Tests the interval_intersect function."""
    print("Intervals [" + str(a) + ", " + str(b) + "] and [" + str(c) + ", " + str(d) + "]", end= " ")
    if interval_intersect(a, b, c, d):
        print("intersect.")
    else:
        print("do not intersect.")

test(0, 1, 1, 2)
test(1, 2, 0, 1)
test(0, 1, 2, 3)
test(2, 3, 0, 1)
test(0, 3, 1, 2)


###################################################
# Expected output
# Student should look at the following comments and compare to printed output.

#Intervals [0, 1] and [1, 2] intersect.
#Intervals [1, 2] and [0, 1] intersect.
#Intervals [0, 1] and [2, 3] do not intersect.
#Intervals [2, 3] and [0, 1] do not intersect.
#Intervals [0, 3] and [1, 2] intersect.