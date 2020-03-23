import math
def polygon(n,s):
    top = n * s ** 2 
    bottom = 4 *  math.tan(math.pi / n)
    return top / bottom


print(polygon(7, 3))
